// Updated src/app/api/chat/route.ts
import { Message } from 'ai';

// Function to send request to Aliyun's Qwen API
async function getBailianResponse(messages: Message[]) {
  const response = await fetch(
    'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DASHSCOPE_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'qwen-plus',
        messages: messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
        stream: false,
      }),
    },
  );

  return response;
}

// This is a direct implementation for the AI SDK's expected SSE format
export async function POST(req: Request) {
  try {
    // Parse the request
    const body = await req.json();
    console.log('Request body:', body);

    // Extract the messages
    const messages = body.messages || [];

    if (messages.length === 0) {
      throw new Error('No messages provided');
    }

    // Get response from Bailian API
    const response = await getBailianResponse(messages);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API error: ${JSON.stringify(error)}`);
    }

    // Get the data
    const responseData = await response.json();
    // console.log('API response:', responseData);

    // Extract content
    const content = responseData.choices[0].message.content;
    console.log('Content:', content);

    // Create a text encoder
    const encoder = new TextEncoder();

    // Create a stream
    // const stream = new ReadableStream({
    //   start(controller) {
    //     // 将content拆分为字符逐步发送（模拟真实流式输出）
    //     const chunks = content.split('');
    //     const sendChunk = (index: number) => {
    //       if (index < chunks.length) {
    //         const data = `data: ${JSON.stringify({
    //           id: Date.now(),
    //           role: 'assistant',
    //           object: 'chat.completion.chunk',
    //           choices: [{ delta: { content: chunks[index] } }],
    //           parts: [
    //             {
    //               type: 'text',
    //               text: chunks[index],
    //             },
    //           ],
    //         })}\n\n`;

    //         controller.enqueue(encoder.encode(data));
    //         setTimeout(() => sendChunk(index + 1), 20); // 20ms逐字输出（模拟流式）
    //       } else {
    //         controller.enqueue(encoder.encode('data: [DONE]\n\n'));
    //         controller.close();
    //       }
    //     };
    //     sendChunk(0);
    //   },
    // });

    // const stream = new ReadableStream({
    //   start(controller) {
    //     const chunk = JSON.stringify({ type: 'text', text: content }) + '\n';
    //     controller.enqueue(encoder.encode(chunk));

    //     controller.enqueue(encoder.encode('[DONE]\n'));
    //     controller.close();
    //   },
    // });
    const stream = new ReadableStream({
      start(controller) {
        const text = content; // 完整回答
        let idx = 0;

        function sendNextChunk() {
          if (idx < text.length) {
            const payloadObj = {
              role: 'assistant',
              parts: [
                {
                  type: 'text',
                  text: text[idx],
                },
              ],
            };
            const sseChunk = `data: ${JSON.stringify(payloadObj)}\n\n`;
            controller.enqueue(encoder.encode(sseChunk));

            idx++;
            // 延迟 40ms 再发送下一字符
            setTimeout(sendNextChunk, 40);
          } else {
            controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
            controller.close();
          }
        }

        sendNextChunk();
      },
    });

    // Return as a streaming response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
