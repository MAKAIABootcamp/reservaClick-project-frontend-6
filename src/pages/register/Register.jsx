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
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

import './register.scss';

const Register = () => {
  /* estados para mostrar o esconder la contraseña */
  const [showPassword, setShowPassword] = useState([false, false]);
  const handleClickShowPassword = () =>
    setShowPassword([!showPassword[0], showPassword[1]]);
  const handleClickShowPasswordConfirmation = () =>
    setShowPassword([showPassword[0], !showPassword[1]]);
  /* --------------------------------------------- */

  return (
    <main className='main_container'>
      <br />
      <div className='main_container__background'>
        <Heading>Crea tu cuenta</Heading>
        <form className='main_container__form'>
          <Stack spacing={5}>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <FaUser />
              </InputLeftElement>
              <Input
                type='text'
                variant='filled'
                placeholder='Nombre y apellido'
                w={[300, 400, 500]}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <MdEmail />
              </InputLeftElement>
              <Input
                type='email'
                variant='filled'
                placeholder='Correo electrónico'
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <RiLockPasswordFill />
              </InputLeftElement>
              <Input
                type={showPassword[0] ? 'text' : 'password'}
                variant='filled'
                placeholder='Contraseña'
              />
              <InputRightElement width='4rem'>
                <span onClick={handleClickShowPassword}>
                  {showPassword[0] ? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
              </InputRightElement>
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <RiLockPasswordFill />
              </InputLeftElement>
              <Input
                type={showPassword[1] ? 'text' : 'password'}
                variant='filled'
                placeholder='Confirmar contraseña'
              />
              <InputRightElement width='4rem'>
                <span onClick={handleClickShowPasswordConfirmation}>
                  {showPassword[1] ? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
              </InputRightElement>
            </InputGroup>
            <Button type='submit' colorScheme='blue'>
              Registrarse
            </Button>
          </Stack>
        </form>
        <p>
          <Link to='/login'>Ya tengo una cuenta</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
