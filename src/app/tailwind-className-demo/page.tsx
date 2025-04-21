export default function Page() {
  return (
    <div className="flex h-screen flex-col bg-amber-600 pb-10">
      <header className="flex h-14 items-center gap-2 px-6 py-4">
        <h1 className="text-[18px] font-bold">翻译助手</h1>
      </header>
      <div className="mx-2 flex flex-1">
        <div className="w-1/2 rounded-tl-3xl rounded-bl-3xl border bg-white px-6 py-4">
          left
        </div>
        <div className="w-1/2 rounded-tr-3xl rounded-br-3xl border px-6 py-4">
          right
        </div>
      </div>
    </div>
  );
}
