import type { State, Action, Filter } from '../types';
import { TodoItem } from './TodoItem';

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'active', label: '未完了' },
  { value: 'completed', label: '完了済み' },
];

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export function TodoList({ state, dispatch }: Props) {
  const { todos, filter } = state;

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <div>
      <div className="flex gap-1.5 mb-5">
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => dispatch({ type: 'SET_FILTER', payload: f.value })}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f.value
                ? 'bg-sky-200 text-sky-700'
                : 'bg-sky-50 text-sky-400 hover:bg-sky-100'
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-sm text-sky-300 self-center">
          残り {activeCount} 件
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-sky-200 py-10 text-sm">タスクがありません</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {filtered.map(todo => (
            <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
          ))}
        </ul>
      )}
    </div>
  );
}
