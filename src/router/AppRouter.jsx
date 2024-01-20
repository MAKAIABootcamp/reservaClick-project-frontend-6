import React, { useEffect, useState } from 'react';
import { ChakraProvider, Heading, Spinner } from '@chakra-ui/react';
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
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, userLogged => {
      if (userLogged?.uid && !user) {
        dispatch(setIsAuthenticated(true));
        dispatch(
          setUser({
            uid: userLogged.uid,
            email: userLogged.email,
            displayName: userLogged.displayName,
            photoURL: userLogged.photoURL,
            accessToken: userLogged.accessToken,
          })
        );
        //dispatch(setError(false));
      }
      setLoading(false);
    });
  }, [dispatch, user]);

  if (loading) {
    return (
      <div className='spinner_container'>
        <Heading className='title'>Cargando</Heading>
        <Spinner className='spinner' thickness='20px' />
      </div>
    );
  }

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='home/:storeName/calendar' element={<Calendar />} />
              <Route
                path='reservation/:storeName/calendar'
                element={<Calendar />}
              />
              <Route path='/profile' element={<UserProfile />} />
              <Route path='/reservation' element={<Reservation />} />
            </Route>
          </Route>

          <Route element={<PublicRoutes isAuthenticated={isAuthenticated} />}>
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default AppRouter;
