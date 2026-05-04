import { useReducer, useEffect } from 'react';
import type { State, Action, Todo } from '../types';

const STORAGE_KEY = 'todos';

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD': {
      const newTodo: Todo = {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      return { ...state, todos: [newTodo, ...state.todos] };
    }
    case 'TOGGLE':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };
    case 'DELETE':
      return { ...state, todos: state.todos.filter(t => t.id !== action.payload) };
    case 'EDIT':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload.id ? { ...t, title: action.payload.title } : t
        ),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

function loadState(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as State;
  } catch {
    // 読み込み失敗時は初期値にフォールバック
  }
  return { todos: [], filter: 'all' };
}

export function useTodos() {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return { state, dispatch };
}
