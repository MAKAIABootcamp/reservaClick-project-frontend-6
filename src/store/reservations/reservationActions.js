import { firestore } from '../../firebase/firebaseConfig';
import { setError, setReservations } from './reservationSlice';
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  setDoc,
  addDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

export const getReservations = () => async dispatch => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'reservations'));
    let reservations = [];
    querySnapshot.forEach(doc => {
      reservations.push(doc.data());
    });
    dispatch(setReservations(reservations));
    dispatch(setError(false));
  } catch (error) {
    console.warn(error);
    dispatch(
      setError({ error: true, code: error.code, message: error.message })
    );
  }
};

export const createReservation = newReservation => async dispatch => {
  try {
    const newReservationRef = collection(firestore, 'reservations');
    await addDoc(newReservationRef, newReservation);
  } catch (error) {
    console.warn(error);
    dispatch(
      setError({ error: true, code: error.code, message: error.message })
    );
  }
};

/* export const createReservation = (reservation, uid) => async dispatch => {
  try {
    const newReservationRef = doc(firestore, 'reservations', uid);
    await setDoc(newReservationRef, reservation);
  } catch (error) {
    console.warn(error);
    dispatch(
      setError({ error: true, code: error.code, message: error.message })
    );
  }
}; */
