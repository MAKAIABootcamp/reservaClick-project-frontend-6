import React, { useState } from 'react';
import {
  Heading,
  Image,
  Input,
  Button,
  useEditableControls,
  EditablePreview,
  Editable,
  IconButton,
  EditableInput,
  Flex,
  ButtonGroup,
  Text,
  Box,
  Avatar,
  HStack,
  Divider,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';

import { FaEdit } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { FaWindowClose } from 'react-icons/fa';
import {
  deleteUserAccount,
  logoutAsync,
  updateUserName,
} from '../../store/users/userActions';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { firestore } from '../../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

import './userProfile.scss';
import { sweetAlert } from '../../utils/alerts';

const UserProfile = () => {
  const { user } = useSelector(store => store.user);
  const dispatch = useDispatch();

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent='left' size='md' w='full' spacing={2} mt={2}>
        <IconButton icon={<FaCheck />} {...getSubmitButtonProps()} />
        <IconButton icon={<FaWindowClose />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : null; /* (
      <Flex justifyContent='left'>
        <IconButton size='md' icon={<FaEdit />} {...getEditButtonProps()} />
      </Flex>
    ); */
  }

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  const handleDeleteAccount = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto cambios no se pueden revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF6666',
      cancelButtonColor: '#B0E0E6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
    }).then(async result => {
      if (result.isConfirmed) {
        dispatch(deleteUserAccount(user));
        sweetAlert('success', 'Eliminada!', 'Tu cuenta ha sido eliminada');
      }
    });
  };

  const handleUpdateName = displayName => {
    dispatch(updateUserName(user, displayName));
  };

  return (
    /*     <main className="main_container__profile">
      <header className="main_container__profile__header">
        <Heading as="h1" size="xl">
          Perfil de usuario
        </Heading>
      </header>
      <section>
        <div>
          <Image
            className="main_container__profile__avatar"
            src={user.photoURL}
            alt="user profile"
          />
        </div>
        <div>
          <Text>Nombre de usuario</Text>
          <Editable
            className="main_container__profile__editable"
            textAlign="center"
            defaultValue={user.displayName}
            fontSize={["20px", "25px"]}
            isPreviewFocusable={false}
            onSubmit={(displayName) => handleUpdateName(displayName)}
          >
            <EditablePreview />
            <Input as={EditableInput} />
            <EditableControls />
          </Editable>
          <Text>Correo electrónico</Text>
          <Editable
            defaultValue={user.email}
            fontSize={["20px", "25px"]}
            isPreviewFocusable={false}
          >
            <EditablePreview />
            <Input as={EditableInput} />
          </Editable>
        </div>
      </section>
      <section className="main_container__profile__buttons">
        <Button
          onClick={() => handleLogout()}
          type="submit"
          colorScheme="blue"
          w={[300]}
        >
          Cerrar Sesión
        </Button>
        <Button
          onClick={() => handleDeleteAccount()}
          type="submit"
          colorScheme="red"
          w={[300]}
        >
          Eliminar Cuenta
        </Button>
      </section>
    </main> */
    <Flex align='center' justify='center' height='100vh'>
      <Box
        // width={{ base: '100%', md: '50%' }}
        width='500px'
        p={6}
        borderWidth='1px'
        borderRadius='lg'
        boxShadow='xl'
        mx='auto'
      >
        <Heading as='h1' size='xl' align='left' justify='center'>
          Perfil de usuario
        </Heading>
        <br />
        <Divider />
        <br />
        <Flex align='center'>
          <Box mr={4}>
            <Avatar src={user.photoURL} size='2xl' />
          </Box>
          <Box>
            <Editable
              className='main_container__profile__editable'
              textAlign='left'
              defaultValue={user.displayName}
              fontSize={['20px', '25px']}
              isPreviewFocusable={true}
              selectAllOnFocus={false}
              onSubmit={displayName => handleUpdateName(displayName)}
            >
              <Tooltip label='Click to edit' shouldWrapChildren={true}>
                <EditablePreview
                  _hover={{
                    background: useColorModeValue('gray.100', 'gray.700'),
                  }}
                />
              </Tooltip>
              <Input py={2} px={4} as={EditableInput} />
              <EditableControls />
            </Editable>
            <Text color='gray.500' fontSize='xl'>
              {user.email}
            </Text>
          </Box>
        </Flex>
        <br />
        <Divider />
        <br />
        <HStack>
          <Button
            onClick={() => handleDeleteAccount()}
            type='submit'
            bg='#FF6666'
            _hover={{ bg: '#CC3333' }}
            mt={2}
          >
            Eliminar Cuenta
          </Button>
          <Button
            onClick={() => handleLogout()}
            type='submit'
            bg='#B0E0E6'
            _hover={{ bg: '#87CEEB' }}
            mt={2}
          >
            Cerrar Sesión
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default UserProfile;

/* 

import React from 'react';
import { Box, Flex, Avatar, Text, Button, Heading } from '@chakra-ui/react';

const UserProfile = ({ username, email, profileImageUrl }) => {
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box width="400px" p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <Flex align="center">
          <Box mr={4}>
            <Avatar src={profileImageUrl} size="lg" />
          </Box>
          <Box>
            <Heading as="h2" size="md">
              {username}
            </Heading>
            <Text color="gray.500">{email}</Text>
            <Button size="sm" colorScheme="teal" mt={2}>
              Edit
            </Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default UserProfile;*/
