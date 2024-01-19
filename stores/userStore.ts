import { defineStore } from 'pinia';
import { type IUserStore, type INote, type ITodo } from './state';

export const useUserStore = defineStore({
  id: 'user-store',
  state: () => {
    return {
      uid: 1,
      nickname: 'Lemunruss',
      notes: [
        {
          uid: 1,
          isDone: true,
          title: 'Изучить Nuxt',
          todos: [
            {
              uid: 1,
              isDone: true,
              title: 'Открыть видео',
            },
          ],
        },
        {
          uid: 2,
          isDone: false,
          title: 'Изучить Nuxt',
          todos: [
            {
              uid: 1,
              isDone: false,
              title: 'Открыть видео',
            },
            {
              uid: 2,
              isDone: false,
              title: 'Открыть видео',
            },
          ],
        },
        {
          uid: 3,
          isDone: false,
          title: 'Изучить Nuxt',
          todos: [
            {
              uid: 1,
              isDone: false,
              title: 'Открыть видео',
            },
            {
              uid: 2,
              isDone: true,
              title: 'Открыть видео',
            },
          ],
        }
      ],
    } as IUserStore;
  },
  actions: {
    addNote(note: INote) {
      this.$state.notes.push(note);
    },
    editNote(note: INote) {
      const idx = this.$state.notes.findIndex((n) => n.uid === note.uid);
      this.$state.notes[idx] = note;
    },
    deleteNote(note: number) {
      this.$state.notes.filter((n) => n.uid !== note);
    },
    addTodo(todo: ITodo, note: number) {
      const idx = this.$state.notes.findIndex((n) => n.uid === note);
      this.$state.notes[idx].todos.push(todo);
    },
    editTodo(todo: ITodo, note: number) {
      const idx = this.$state.notes.findIndex((n) => n.uid === note);
      const i = this.$state.notes[idx].todos.findIndex((t) => t.uid === todo.uid);
      this.$state.notes[idx].todos[i] = todo;
    },
    deleteTodo(note: number, todo: number) {
      const idx = this.$state.notes.findIndex((n) => n.uid === note);
      this.$state.notes[idx].todos = this.$state.notes[idx].todos.filter((t) => t.uid !== todo);
    },
  },
  getters: {
    getNote: (state) => (note: number) => state.notes.find((n) => n.uid === note),
    getNoteTodos: (state) => (note: number) => state.notes.find((n) => n.uid === note)?.todos,
    getNoteTodo: (state) => (note: number, todo: number) => state.notes.find((n) => n.uid === note)?.todos.find((t) => t.uid === todo),
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
