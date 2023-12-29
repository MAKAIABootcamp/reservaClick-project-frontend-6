import { setError, setIsAuthenticated, setUser } from './userSlice';
import { auth } from '../../firebase/firebaseConfig';
import { createUserInCollection } from '../../services/userServices';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  FacebookAuthProvider,
} from 'firebase/auth';
import { sweetAlert } from '../../utils/alerts';

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
        id: user.uid,
        displayName: userLogged.name,
        email: userLogged.email,
        photoURL: userLogged.photoURL,
        accessToken: user.accessToken,
      })
    );

    dispatch(setError(false));
    dispatch(setIsAuthenticated(true));
    sweetAlert('success', 'Bienvenid@', 'Has creado tu cuenta');
  } catch (error) {
    console.warn(error);
    dispatch(
      setError({ error: true, code: error.code, message: error.message })
    );
    sweetAlert('error', 'Ups!', 'Ha ocurrido un error');
    return false;
  }
};

export const loginWithEmailAndPassword = ({ email, password }) => {
  return async dispatch => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setIsAuthenticated(true));
      dispatch(
        setUser({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          accessToken: user.accessToken,
        })
      );
      dispatch(setError(false));
      sweetAlert('success', `Bienvenid@ ${user.displayName}`);
    } catch (error) {
      dispatch(setIsAuthenticated(false));
      dispatch(
        setError({ error: true, code: error.code, message: error.message })
      );
      sweetAlert('error', 'Ups!', 'Verifica tus credenciales');
    }
  };
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

export const loginWithFacebook = () => async dispatch => {
  const facebookProvider = new FacebookAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, facebookProvider);
    console.log(userCredential);
    dispatch(setIsAuthenticated(true));
    dispatch(setUser(userCredential.user));
  } catch (error) {
    console.log(error);
    dispatch(setIsAuthenticated(false));
    setError({ error: true, code: error.code, message: error.message });
  }
};

export const logoutAsync = () => {
  return async dispatch => {
    try {
      await signOut(auth);
      dispatch(setIsAuthenticated(false));
      dispatch(setUser(null));
      dispatch(setError(null));
    } catch (error) {
      console.error(error);
      dispatch(
        setError({ error: true, code: error.code, message: error.message })
      );
    }
  };
};
