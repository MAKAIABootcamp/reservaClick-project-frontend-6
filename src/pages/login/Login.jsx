import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import {
  loginWithEmailAndPassword,
  loginWithFacebook,
  loginWithGoogle,
} from '../../store/users/userActions';
import {
  Input,
  Button,
  Stack,
  Heading,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  FormControl,
  FormErrorMessage,
  Flex,
} from '@chakra-ui/react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

import './login.scss';

const Login = () => {
  /* estado para mostrar o esconder la contraseña */
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  /* --------------------------------------------- */

  const dispatch = useDispatch();

  const schema = object({
    email: string()
      .email('Es necesario un correo valido')
      .required('Campo requerido'),
    password: string()
      .min(6, 'Mínimo 6 caracteres')
      .required('Campo requerido'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values, actions) => {
      dispatch(loginWithEmailAndPassword(values));
      actions.resetForm({});
    },
  });

  const handleLoginWithGoogle = () => {
    dispatch(loginWithGoogle());
  };

  const handleLoginWithFacebook = () => {
    dispatch(loginWithFacebook());
  };

  return (
    <main className='main_login_container'>
      <Flex direction='column' align='center' justify='center' height='100vh'>
        <Heading>Inicia sesión</Heading>
        <form
          className='main_login_container__form'
          onSubmit={formik.handleSubmit}
        >
          <Stack spacing={5}>
            <FormControl isInvalid={formik.errors.email}>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <MdEmail />
                </InputLeftElement>
                <Input
                  type='email'
                  name='email'
                  variant='filled'
                  placeholder='Correo electrónico'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  w={[300, 400, 500]}
                />
              </InputGroup>
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.password}>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <RiLockPasswordFill />
                </InputLeftElement>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  variant='filled'
                  placeholder='Contraseña'
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <InputRightElement width='4rem'>
                  <span onClick={handleClickShowPassword}>
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            <Button type='submit' colorScheme='blue'>
              Iniciar Sesión
            </Button>
          </Stack>
        </form>
        <p>
          <Link to='/register'>Crear nueva cuenta</Link>
        </p>
        <br />
        <Stack spacing={5}>
          <Button
            rightIcon={<FaGoogle />}
            colorScheme='teal'
            variant='outline'
            w={[300, 400, 500]}
            onClick={() => handleLoginWithGoogle()}
          >
            Iniciar sesión con Google
          </Button>
          {/* <Button
          rightIcon={<FaFacebook />}
          colorScheme='teal'
          variant='outline'
          onClick={() => handleLoginWithFacebook()}
        >
          Iniciar sesión con Facebok
        </Button> */}
          {/* <Button
          rightIcon={<MdOutlinePhoneAndroid />}
          colorScheme='teal'
          variant='outline'
        >
          Iniciar sesión con teléfono
        </Button> */}
        </Stack>
      </Flex>
    </main>
  );
};

export default Login;
