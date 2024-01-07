import React from 'react';
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
} from '@chakra-ui/react';

import { FaEdit } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { FaWindowClose } from 'react-icons/fa';
import { logoutAsync } from '../../store/users/userActions';
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth, firestore } from '../../firebase/firebaseConfig';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';

import {
  setError,
  setIsAuthenticated,
  setUser,
} from '../../store/users/userSlice';

import './userProfile.scss';
import { useEffect } from 'react';

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);

  const getData = async () => {
    const docRef = doc(firestore, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  };
  getData();

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton icon={<FaCheck />} {...getSubmitButtonProps()} />
        <IconButton icon={<FaWindowClose />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton size='sm' icon={<FaEdit />} {...getEditButtonProps()} />
      </Flex>
    );
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
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
    }).then(async result => {
      if (result.isConfirmed) {
        await deleteDoc(doc(firestore, 'users', user.uid));

        dispatch(setIsAuthenticated(false));
        dispatch(setUser(null));
        dispatch(setError(null));

        const userAuth = auth.currentUser;
        deleteUser(userAuth)
          .then(() => {
            console.log('user was deleted in firebase authentication');
          })
          .catch(error => {
            console.log(error);
          });

        Swal.fire({
          title: 'Eliminada!',
          text: 'Tu cuenta ha sido eliminada',
          icon: 'success',
        }).then(() => {
          window.location.reload(true);
        });
      }
    });
  };

  return (
    <main className='main_container'>
      <Heading as='h1' size='xl'>
        Perfil de usuario
      </Heading>
      <br />
      <Image
        src={user.photoURL}
        alt='user profile'
        boxSize='8em'
        borderRadius='full'
      />
      <br />
      <Editable
        className='main_container__editable'
        textAlign='center'
        defaultValue={user.displayName}
        fontSize={['20px', '25px']}
        isPreviewFocusable={false}
      >
        <EditablePreview />
        {/* Here is the custom input */}
        <Input as={EditableInput} />
        <EditableControls />
      </Editable>
      <br />
      <Editable
        textAlign='center'
        defaultValue={user.email}
        fontSize={['20px', '25px']}
        isPreviewFocusable={false}
      >
        <EditablePreview />
        {/* Here is the custom input */}
        <Input as={EditableInput} />
        <EditableControls />
      </Editable>
      <br />
      <Button
        onClick={() => handleLogout()}
        type='submit'
        colorScheme='blue'
        w={[300]}
      >
        Cerrar Sesión
      </Button>
      <br />
      <Button
        onClick={() => handleDeleteAccount()}
        type='submit'
        colorScheme='red'
        w={[300]}
      >
        Eliminar Cuenta
      </Button>
    </main>
  );
};

export default UserProfile;
