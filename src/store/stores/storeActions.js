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

export const setStore = store => async dispatch => {
  try {
    dispatch(setSelectedStore(store));
    setError(false);
  } catch (error) {
    console.warn(error);
    dispatch(
      setError({ error: true, code: error.code, message: error.message })
    );
  }
};

export const updateHourAvailability =
  (store, hour, availability) => async dispatch => {
    try {
      const storeRef = doc(firestore, 'stores', store.uid);
      console.log('storeRef:', storeRef);

      const schedule = { ...store.schedule, [hour]: availability };
      console.log('updatedSchedule:', schedule);

      await updateDoc(storeRef, {
        schedule,
      });

      dispatch(setSelectedStore(store));
      setError(false);
    } catch (error) {
      console.warn(error);
      dispatch(
        setError({ error: true, code: error.code, message: error.message })
      );
    }
  };
