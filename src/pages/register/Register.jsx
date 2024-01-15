import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import uploadFile from '../../services/uploadFile';
import { useDispatch } from 'react-redux';
import { createAnAccountAsync } from '../../store/users/userActions';
import { useFormik } from 'formik';
import { object, string, ref } from 'yup';
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
  FormLabel,
  Flex,
} from '@chakra-ui/react';
import { FaUser, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import cameraIcon from '../../assets/icon/camera-icon.svg';

import './register.scss';

const Register = () => {
  /* estados para mostrar o esconder la contraseña */
  const [showPassword, setShowPassword] = useState([false, false]);
  const handleClickShowPassword = () =>
    setShowPassword([!showPassword[0], showPassword[1]]);
  const handleClickShowPasswordConfirmation = () =>
    setShowPassword([showPassword[0], !showPassword[1]]);
  /* --------------------------------------------- */

  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const schema = object({
    name: string().min(6, 'Mínimo 6 caracteres').required('Campo requerido'),
    email: string()
      .email('Es necesario un correo valido')
      .required('Campo requerido'),
    password: string()
      .min(6, 'Mínimo 6 caracteres')
      .required('Campo requerido'),
    confirmPassword: string()
      .min(6, 'Mínimo 6 caracteres')
      .required('Campo requerido')
      .oneOf([ref('password'), null], 'Las contraseñas deben coincidir'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      const photoURL = await uploadFile(file);
      const newUser = {
        ...values,
        photoURL,
      };
      dispatch(createAnAccountAsync(newUser));
      actions.resetForm({});
    },
  });

  return (
    <main className='main_register_container'>
      <Flex direction='column' align='center' justify='center' height='100vh'>
        <Heading>Crea tu cuenta</Heading>
        <form
          className='main_register_container__form'
          onSubmit={formik.handleSubmit}
        >
          <Stack spacing={5}>
            <FormControl isInvalid={formik.errors.name}>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <FaUser />
                </InputLeftElement>
                <Input
                  type='text'
                  name='name'
                  variant='filled'
                  placeholder='Nombre y apellido'
                  focusBorderColor='#87CEEB'
                  errorBorderColor='#FF6666'
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  w={[300, 400, 500]}
                />
              </InputGroup>
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>
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
                  focusBorderColor='#87CEEB'
                  errorBorderColor='#FF6666'
                  onChange={formik.handleChange}
                  value={formik.values.email}
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
                  type={showPassword[0] ? 'text' : 'password'}
                  name='password'
                  variant='filled'
                  placeholder='Contraseña'
                  focusBorderColor='#87CEEB'
                  errorBorderColor='#FF6666'
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <InputRightElement width='4rem'>
                  <span onClick={handleClickShowPassword}>
                    {showPassword[0] ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.confirmPassword}>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <RiLockPasswordFill />
                </InputLeftElement>
                <Input
                  type={showPassword[1] ? 'text' : 'password'}
                  name='confirmPassword'
                  variant='filled'
                  placeholder='Confirmar contraseña'
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  focusBorderColor='#87CEEB'
                  errorBorderColor='#FF6666'
                />
                <InputRightElement width='4rem'>
                  <span onClick={handleClickShowPasswordConfirmation}>
                    {showPassword[1] ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {formik.errors.confirmPassword}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='file' className='fileText'>
                Foto de perfil
                <img src={cameraIcon} alt='cameraIcon' className='cameraIcon' />
                <input
                  id='file'
                  name='file'
                  type='file'
                  onChange={event => {
                    const file = event.target.files[0];
                    setFile(file);
                  }}
                />
                <span id='imageName'>{file?.name || ''}</span>
              </FormLabel>
            </FormControl>

            <Button
              type='submit'
              bg='#B0E0E6'
              _hover={{ bg: '#87CEEB' }}
              isDisabled={!file ? true : false}
            >
              Registrarse
            </Button>
          </Stack>
        </form>
        <p>
          <Link to='/login'>Ya tengo una cuenta</Link>
        </p>
      </Flex>
    </main>
  );
};

export default Register;
