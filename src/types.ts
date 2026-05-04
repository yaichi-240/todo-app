export type Priority = 'low' | 'medium' | 'high';
export type Filter = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
}

export interface State {
  todos: Todo[];
  filter: Filter;
}

export type Action =
  | { type: 'ADD'; payload: Omit<Todo, 'id' | 'createdAt'> }
  | { type: 'TOGGLE'; payload: string }
  | { type: 'DELETE'; payload: string }
  | { type: 'EDIT'; payload: { id: string; title: string } }
  | { type: 'SET_FILTER'; payload: Filter };
