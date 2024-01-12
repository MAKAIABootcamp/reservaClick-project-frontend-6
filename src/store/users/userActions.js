import { setError, setIsAuthenticated, setUser } from './userSlice';
import { auth, firestore } from '../../firebase/firebaseConfig';
import { createUserInCollection } from '../../services/userServices';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  FacebookAuthProvider,
  deleteUser,
} from 'firebase/auth';
import { sweetAlert } from '../../utils/alerts';
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
} from 'firebase/firestore';

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
      displayName: newUser.name,
      email: newUser.email,
      photoURL: newUser.photoURL,
      accessToken: user.accessToken,
    });

    dispatch(
      setUser({
        uid: user.uid,
        displayName: userLogged.displayName,
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
          uid: user.uid,
          displayName: user.displayName,
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

    const docRef = doc(firestore, 'users', userCredential.user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await createUserInCollection(userCredential.user.uid, {
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        photoURL: userCredential.user.photoURL,
        accessToken: userCredential.user.accessToken,
      });
    }
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

export const updateUserName = (user, displayName) => async dispatch => {
  try {
    const userRef = doc(firestore, 'users', user.uid);

    await updateDoc(userRef, {
      displayName,
    });

    updateProfile(auth.currentUser, {
      displayName,
    })
      .then(() => {
        window.location.reload();
        v;
      })
      .catch(error => {
        console.log(error);
      });

    const docSnap = await getDoc(userRef);
    const userUpdated = docSnap.data();

    dispatch(setIsAuthenticated(true));
    dispatch(setError(false));
    dispatch(
      setUser({
        uid: userUpdated.uid,
        displayName: userUpdated.displayName,
        email: userUpdated.email,
        photoURL: userUpdated.photoURL,
        accessToken: userUpdated.accessToken,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(setIsAuthenticated(false));
    setError({ error: true, code: error.code, message: error.message });
  }
};

export const deleteUserAccount = user => async dispatch => {
  try {
    await deleteDoc(doc(firestore, 'users', user.uid));
    const userAuth = auth.currentUser;
    await deleteUser(userAuth);

    dispatch(setIsAuthenticated(false));
    dispatch(setUser(null));
    dispatch(setError(null));
  } catch (error) {
    console.log(error);
    dispatch(setIsAuthenticated(false));
    setError({ error: true, code: error.code, message: error.message });
  }
};

/* export const loginWithCodeAsync = code => {
  return async dispatch => {
    const confirmationResult = window.confirmationResult;
    try {
      confirmationResult.confirm(code).then(response => {
        const user = response.user.auth.currentUser;
        dispatch(setIsAuthenticated(true));
        dispatch(
          setUser({
            id: user.uid,
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
            accessToken: user.accessToken,
          })
        );
        dispatch(setError(false));
      });
    } catch (error) {
      console.error(error);
      dispatch(
        setError({ error: true, code: error.code, message: error.message })
      );
    }
  };
}; */
