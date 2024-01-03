import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from '../pages/register/Register';
import Home from '../pages/home/Home';
import { Layout } from '../components/layout/Layout';
import Login from '../pages/login/Login';
import UserProfile from '../pages/userProfile/UserProfile';
import Calendar from '../pages/calendar/Calendar';
import Reservation from '../pages/my-reservation/Reservation';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { setIsAuthenticated, setUser } from '../store/users/userSlice';
import { auth } from '../firebase/firebaseConfig';

const AppRouter = () => {
  const { isAuthenticated, user } = useSelector(store => store.user);
  const [checking, setChecking] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, userLogged => {
      if (userLogged?.uid && !user) {
        dispatch(setIsAuthenticated(true));
        dispatch(
          setUser({
            email: userLogged.email,
            uid: userLogged.uid,
            displayName: userLogged.displayName,
            photoURL: userLogged.photoURL,
            accessToken: userLogged.accessToken,
          })
        );
        //dispatch(setError(false));
      }
    });
    setChecking(false);
  }, [dispatch, user]);

  return checking ? (
    <div>Cargando...</div>
  ) : (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
            <Route element={<Layout />}>
              <Route index path='/home' element={<Home />} />
              <Route path='/profile' element={<UserProfile />} />
              <Route path='/calendar' element={<Calendar />} />
              <Route path='/reservation' element={<Reservation />} />
            </Route>
          </Route>

          <Route element={<PublicRoutes isAuthenticated={isAuthenticated} />}>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default AppRouter;
