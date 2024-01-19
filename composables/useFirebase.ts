import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyATAgOr9JmzK8AP1LdAB9cmy6LNCSe-Ziw",
  authDomain: "nuxt3todo.firebaseapp.com",
  projectId: "nuxt3todo",
  storageBucket: "nuxt3todo.appspot.com",
  messagingSenderId: "1096569134323",
  appId: "1:1096569134323:web:982a9038fc575d88ebeb86"
};


export default function useFirebase() {
  if (getApps().length === 0) {
    initializeApp(firebaseConfig);
  }
};
