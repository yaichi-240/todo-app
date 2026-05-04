import { useState } from 'react';
import type { Todo, Action } from '../types';

const priorityLabel: Record<Todo['priority'], string> = {
  low: '低',
  medium: '中',
  high: '高',
};

const priorityColor: Record<Todo['priority'], string> = {
  low: 'bg-teal-100 text-teal-500',
  medium: 'bg-sky-100 text-sky-500',
  high: 'bg-indigo-100 text-indigo-500',
};

interface Props {
  todo: Todo;
  dispatch: React.Dispatch<Action>;
}

export function TodoItem({ todo, dispatch }: Props) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  function commitEdit() {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== todo.title) {
      dispatch({ type: 'EDIT', payload: { id: todo.id, title: trimmed } });
    } else {
      setEditTitle(todo.title);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') commitEdit();
    if (e.key === 'Escape') { setEditTitle(todo.title); setEditing(false); }
  }

  return (
    <li className="flex items-center gap-3 px-4 py-3 bg-white/80 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch({ type: 'TOGGLE', payload: todo.id })}
        className="w-5 h-5 accent-sky-400 cursor-pointer shrink-0"
      />

      {editing ? (
        <input
          autoFocus
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          className="flex-1 px-2 py-0.5 border border-sky-300 rounded-lg focus:outline-none bg-sky-50"
        />
      ) : (
        <span
          onDoubleClick={() => setEditing(true)}
          className={`flex-1 cursor-text select-none text-sm ${
            todo.completed ? 'line-through text-blue-200' : 'text-sky-800'
          }`}
        >
          {todo.title}
        </span>
      )}

      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium shrink-0 ${priorityColor[todo.priority]}`}>
        {priorityLabel[todo.priority]}
      </span>

      <button
        onClick={() => dispatch({ type: 'DELETE', payload: todo.id })}
        className="shrink-0 text-blue-200 hover:text-sky-400 transition-colors text-lg leading-none"
        aria-label="削除"
      >
        ×
      </button>
    </li>
  );
}
