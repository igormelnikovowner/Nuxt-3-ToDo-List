import type SecureLS from 'secure-ls';
export interface IUserStore {
  uid: number;
  nickname: string;
  notes: INote[];
  ls: SecureLS | null;
};

export interface INote {
  uid: number;
  isDone: boolean;
  title: string;
  todos: ITodo[];
};

export interface ITodo {
  uid: number;
  isDone: boolean;
  title: string;
};
