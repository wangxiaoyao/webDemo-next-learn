'use client';
import { useState } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded border p-4 shadow">
      <h1 className="mb-4 text-xl font-bold">📝 To-Do List</h1>

      <div className="mb-4 flex">
        <input
          className="mr-2 flex-1 border px-2 py-1"
          placeholder="Enter a task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="rounded bg-blue-500 px-4 py-1 text-white" onClick={addTodo}>
          Add
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li className="mb-2 flex items-center justify-between" key={todo.id}>
            <span
              className={`flex-1 cursor-pointer ${
                todo.completed ? 'text-gray-400 line-through' : ''
              }`}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button className="text-red-500" onClick={() => deleteTodo(todo.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
