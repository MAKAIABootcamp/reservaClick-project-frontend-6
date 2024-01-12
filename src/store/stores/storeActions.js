import { firestore } from '../../firebase/firebaseConfig';
import { setError, setSelectedStore, setStores } from './storeSlice';
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
} from 'firebase/firestore';

export const getStores = () => async dispatch => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'stores'));
    let stores = [];
    querySnapshot.forEach(doc => {
      stores.push(doc.data());
    });
    dispatch(setStores(stores));
    dispatch(setError(false));
  } catch (error) {
    console.warn(error);
    dispatch(
      setError({ error: true, code: error.code, message: error.message })
    );
  }
};
