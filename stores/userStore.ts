import { defineStore, createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { type IUserStore, type INote, type ITodo } from './state';
import CryptoJS from 'crypto-js';
import forge from 'node-forge';
import { key, publicKey, privateKey } from './key';
import SecureLS from 'secure-ls';

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const useUserStore = defineStore('user-store', {
  state: () => {
    return {
      uid: 1,
      nickname: 'Lemunruss',
      notes: [] as INote[],
      ls: null,
      isLoading: true,
    } as IUserStore;
  },
  persist: true,
  actions: {
    setLsToStore(ls: SecureLS) {
      this.$state.ls = ls;
      this.$state.isLoading = false;
    },
    setNotesToStore(notes: string) {
      const decryptedData = CryptoJS.AES.decrypt(notes, key);
      const plaintext = decryptedData.toString(CryptoJS.enc.Utf8);
      // const decryptedData = forge.pki.decrypt(forge.util.decode64(notes), privateKey);
      this.$state.notes = JSON.parse(plaintext);
      // this.$state.notes = JSON.parse(decryptedData);
    },
    addNote(note: INote) {
      this.$state.notes.push(note);
      this.encryptData();
    },
    editNote(note: INote) {
      const idx = this.$state.notes.findIndex((n) => n.uid === note.uid);
      this.$state.notes[idx] = note;
      this.encryptData(idx);
    },
    deleteNote(note: number) {
      this.$state.notes = this.$state.notes.filter((n) => n.uid !== note);
      this.encryptData();
    },
    addTodo(todo: ITodo, note: number) {
      const idx = this.$state.notes.findIndex((n) => n.uid === note);
      this.$state.notes[idx].todos.push(todo);
      this.encryptData(idx);
    },
    editTodo(todo: ITodo, note: number) {
      const idx = this.$state.notes.findIndex((n) => n.uid === note);
      const i = this.$state.notes[idx].todos.findIndex((t) => t.uid === todo.uid);
      this.$state.notes[idx].todos[i] = todo;
      this.encryptData(idx);
    },
    deleteTodo(note: number, todo: number) {
      const idx = this.$state.notes.findIndex((n) => n.uid === note);
      this.$state.notes[idx].todos = this.$state.notes[idx].todos.filter((t) => t.uid !== todo);
      this.encryptData(idx);
    },
    encryptData(idx?: number) {
      if (idx === 0 || idx) {
        if (this.$state.notes[idx].todos.every((t) => t.isDone)) {
          this.$state.notes[idx].isDone = true;
        } else {
          this.$state.notes[idx].isDone = false;
        }
      }
      const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(this.$state.notes), key).toString();
      // const encryptedData = forge.pki.publicKey.encrypt(JSON.stringify(this.$state.notes), publicKey).toString();
      this.$state.ls?.set('notes', encryptedData);
    }
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
