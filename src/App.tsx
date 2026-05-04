import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';

export default function App() {
  const { state, dispatch } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm border border-blue-100 px-8 py-8">
          <h1 className="text-2xl font-semibold text-sky-600 mb-7 text-center tracking-wide">
            ✦ TODO アプリ ✦
          </h1>
          <TodoInput dispatch={dispatch} />
          <TodoList state={state} dispatch={dispatch} />
        </div>
      </div>
    </div>
  );
}
