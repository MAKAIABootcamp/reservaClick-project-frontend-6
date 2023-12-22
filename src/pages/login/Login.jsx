import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Input,
  Button,
  Stack,
  Heading,
  InputLeftElement,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { FaUser, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { MdOutlinePhoneAndroid } from 'react-icons/md';

import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import './login.scss';

const Login = () => {
  /* estados para mostrar o esconder la contraseña */
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () =>
    setShowPassword([!showPassword, showPassword]);
  /* --------------------------------------------- */

  return (
    <main className='main_container'>
      <br />
      <Heading>Inicio de sesión</Heading>
      <form className='main_container__form'>
        <Stack spacing={5}>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <MdEmail />
            </InputLeftElement>
            <Input
              type='text'
              variant='filled'
              placeholder='Correo electrónico'
              w={[300, 400, 500]}
            />
          </InputGroup>

          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <RiLockPasswordFill />
            </InputLeftElement>
            <Input
              type={showPassword ? 'text' : 'password'}
              variant='filled'
              placeholder='Contraseña'
            />
            <InputRightElement width='4rem'>
              <span onClick={handleClickShowPassword}>
                {showPassword[0] ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </InputRightElement>
          </InputGroup>

          <Button type='submit' colorScheme='blue'>
            Iniciar Sesión
          </Button>
        </Stack>
      </form>
      <p>
        <Link to='/register'>Crear nueva cuenta</Link>
      </p>
      <Stack spacing={5}>
        <Button
          rightIcon={<FaGoogle />}
          colorScheme='teal'
          variant='outline'
          w={[300, 400, 500]}
        >
          Iniciar sesión con Google
        </Button>
        <Button rightIcon={<FaFacebook />} colorScheme='teal' variant='outline'>
          Iniciar sesión con Facebok
        </Button>
        <Button
          rightIcon={<MdOutlinePhoneAndroid />}
          colorScheme='teal'
          variant='outline'
        >
          Iniciar sesión con teléfono
        </Button>
      </Stack>
    </main>
  );
};

export default Login;
