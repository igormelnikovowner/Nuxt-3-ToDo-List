import { defineStore } from 'pinia';
import { type IUserStore, type INote, type ITodo } from './state';
import CryptoJS from 'crypto-js';
import { key } from './key';
import type SecureLS from 'secure-ls';

export const useUserStore = defineStore({
  id: 'user-store',
  state: () => {
    return {
      uid: 1,
      nickname: 'Lemunruss',
      notes: [] as INote[],
    } as IUserStore;
  },
  actions: {
    // setNotesToStore(notes: string, ls: SecureLS) {
    setNotesToStore(notes: string) {
      const decryptedData = CryptoJS.AES.decrypt(notes, key);
      const plaintext = decryptedData.toString(CryptoJS.enc.Utf8);
      this.$state.notes = JSON.parse(plaintext);


      // const encryptedData = CryptoJS.AES.encrypt('yourData', key).toString();
      // ls.set('encryptedData', encryptedData);

      // // Извлекаем и расшифровываем данные
      // console.log('notes', notes);
      // this.$state.ls = ls;
      // const dData = CryptoJS.AES.decrypt(notes, key).toString(CryptoJS.enc.Utf8);
      // this.$state.notes = JSON.parse(dData);
      // console.log('dData', dData);
      // console.log('this.$state.notes', this.$state.notes);
    },
    addNote(note: INote) {
      this.$state.notes.push(note);
      const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(this.$state.notes), key);
      localStorage.setItem('notes', encryptedData);
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
    getNotes: (state) => state.notes,
    getNote: (state) => (note: number) => state.notes.find((n) => n.uid === note),
    getNoteTodos: (state) => (note: number) => state.notes.find((n) => n.uid === note)?.todos,
    getNoteTodo: (state) => (note: number, todo: number) => state.notes.find((n) => n.uid === note)?.todos.find((t) => t.uid === todo),
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
