import { setError, setIsAuthenticated, setUser } from './userSlice';
import { auth } from '../../firebase/firebaseConfig';
import { createUserInCollection } from '../../services/userServices';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

export const createAnAccountAsync = newUser => async dispatch => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      newUser.email,
      newUser.password
    );

    await updateProfile(auth.currentUser, {
      displayName: newUser.name,
      photoURL: newUser.photoURL,
    });

    const userLogged = await createUserInCollection(user.uid, {
      name: newUser.name,
      email: newUser.email,
      photoURL: newUser.photoURL,
      accessToken: user.accessToken,
    });

    dispatch(
      setUser({
        id: userLogged.uid,
        displayName: userLogged.displayName,
        email: userLogged.email,
        photoURL: userLogged.photoURL,
        accessToken: userLogged.accessToken,
      })
    );

    dispatch(setIsAuthenticated(true));
    dispatch(setError(false));
  } catch (error) {
    console.warn(error);
    dispatch(
      setError({ error: true, code: error.code, message: error.message })
    );
    return false;
  }
};

export const loginWithGoogle = () => async dispatch => {
  const googleProvider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    console.log(userCredential);
    dispatch(setIsAuthenticated(true));
    dispatch(setUser(userCredential.user));
  } catch (error) {
    console.log(error);
    dispatch(setIsAuthenticated(false));
    setError({ error: true, code: error.code, message: error.message });
  }
};
