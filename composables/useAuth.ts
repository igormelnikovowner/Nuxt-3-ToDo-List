import {
  getAuth, setPersistence, signInWithEmailAndPassword,
  browserLocalPersistence,
  createUserWithEmailAndPassword, onAuthStateChanged, type User,
} from "firebase/auth";
import useFirebase from "./useFirebase";
import type { ICredentials } from "~/interfaces/auth";
import useAuthValidator from "./useAuthValidator";

export default function useAuth() {
  const user = useState("userStore", () => ({}));

  const errorBag = ref({
    email: null,
    password: null,
    name: null,
  });

  useFirebase();
  const auth = getAuth();

  const login = ({ email, password }: ICredentials) => {
    resetErrors();
    const validatedData = useAuthValidator({ email, password }, "signin");

    if (!validatedData.flag) {
        errorBag.value = validatedData;
        return;
    };

    setPersistence(auth, browserLocalPersistence).then(() => {
        signInWithEmailAndPassword(auth, email, password).then((userDetails) => {
          user.value = userDetails.user;
          userDetails.user.getIdToken().then((token) => {
            serverAuth(token);
          });
        }).catch((error: { code: string }) => {
          firebaseAuthErrors(error.code);
        });
    });
  };

  const logout = () => {
    auth.signOut()
      .then(() => {});
    const authCookie = useCookie('authCookie');
    authCookie.value = null;
  };

  const signUp = ({ email, password, name }: ICredentials) => {
    resetErrors();
    const validatedData = useAuthValidator({ email, password, name }, "signup");

    if (!validatedData.flag) {
      errorBag.value = validatedData;
      return;
    }
    setPersistence(auth, browserLocalPersistence).then(() => {
      createUserWithEmailAndPassword(auth, email, password).then((userDetails) => {
        user.value = userDetails.user;
        userDetails.user.getIdToken().then((token) => {
          serverAuth(token);
        });
      }).catch((error: { code: string }) => {
        firebaseAuthErrors(error.code);
      });
    });
  };

  const firebaseAuthErrors = (code: string) => {
    switch (code) {
      case 'auth/email-already-in-use':
        alert('email-already-in-use');
        break;
      case 'auth/invalid-credential':
        alert('invalid-credential');
        break;
      case 'auth/invalid-email':
        alert('invalid-email');
        break;
      case 'auth/operation-not-allowed':
        alert('operation-not-allowed');
        break;
      case 'auth/week-password':
        alert('week-password');
        break;
      default:
        alert('default-auth-error');
    };
  };

  const resetErrors = () => {
    errorBag.value = {
      email: null,
      password: null,
      name: null,
    };
  };

  const serverAuth = (token: string) => {
    $fetch("api/login", {
        method: "POST",
        body: JSON.stringify({token}),
    }).then((res) => {
      if ((res as { statusCode: number }).statusCode == 200) {
        navigateTo("/notes");
      }
    }).catch((err) =>{
      alert('wrongCreds');
    });
  };

  onAuthStateChanged(auth, (userDetails: User | null) => {
    if (userDetails) {
      user.value = userDetails;
    };
  });

  return { user, login, signUp, logout, errorBag };
};
