import { useState } from 'react';
import type { Priority, Action } from '../types';

interface Props {
  dispatch: React.Dispatch<Action>;
}

export function TodoInput({ dispatch }: Props) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    dispatch({ type: 'ADD', payload: { title: trimmed, completed: false, priority } });
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="タスクを入力..."
        className="flex-1 px-4 py-2.5 bg-sky-50 border border-sky-200 rounded-xl text-sky-800 placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:bg-white transition-colors"
      />
      <select
        value={priority}
        onChange={e => setPriority(e.target.value as Priority)}
        className="px-3 py-2.5 bg-sky-50 border border-sky-200 rounded-xl text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:bg-white transition-colors"
      >
        <option value="low">低</option>
        <option value="medium">中</option>
        <option value="high">高</option>
      </select>
      <button
        type="submit"
        className="px-5 py-2.5 bg-sky-300 hover:bg-sky-400 active:bg-sky-500 text-white rounded-xl font-medium transition-colors shadow-sm"
      >
        追加
      </button>
    </form>
  );
}
