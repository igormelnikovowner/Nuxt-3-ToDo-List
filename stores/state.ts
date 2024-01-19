export interface IUserStore {
  uid: number;
  nickname: string;
  notes: INote[];
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
