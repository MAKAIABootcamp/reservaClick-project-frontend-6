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

import userProfileImage from '../../assets/img/userProfile.png';
import { FaEdit } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { FaWindowClose } from 'react-icons/fa';
import './userProfile.scss';

const UserProfile = () => {
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

  return (
    <main className='main_container'>
      <Heading as='h1' size='xl'>
        Perfil de usuario
      </Heading>
      <br />
      <Image src={userProfileImage} alt='user profile' boxSize='9em' />
      <br />
      <Editable
        className='main_container__editable'
        textAlign='center'
        defaultValue='Pepito Perez'
        fontSize='2xl'
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
        defaultValue='pepito25@gmail.com'
        fontSize='2xl'
        isPreviewFocusable={false}
      >
        <EditablePreview />
        {/* Here is the custom input */}
        <Input as={EditableInput} />
        <EditableControls />
      </Editable>
      <br />
      <Button type='submit' colorScheme='blue' w={[300]}>
        Cerrar Sesión
      </Button>
    </main>
  );
};

export default UserProfile;
