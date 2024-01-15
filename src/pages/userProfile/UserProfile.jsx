import React, { useState } from "react";
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
} from "@chakra-ui/react";

import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
import {
  deleteUserAccount,
  logoutAsync,
  updateUserName,
} from "../../store/users/userActions";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

import "./userProfile.scss";
import { sweetAlert } from "../../utils/alerts";

const UserProfile = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<FaCheck />} {...getSubmitButtonProps()} />
        <IconButton icon={<FaWindowClose />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<FaEdit />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  const handleDeleteAccount = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esto cambios no se pueden revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserAccount(user));
        sweetAlert("success", "Eliminada!", "Tu cuenta ha sido eliminada");
      }
    });
  };

  const handleUpdateName = (displayName) => {
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
    <Flex align="center" justify="center" height="100vh">
      <Box
        width={{ base: "100%", md: "50%" }}
        p={6}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        mx="auto"
      >
        <Heading as="h1" size="xl" align="center" justify="center">
          Perfil de usuario
        </Heading>
        <Flex align="center">
          <Box mr={4}>
            <Avatar src={user.photoURL} size="2xl" />
          </Box>
          <Box>
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
            <Text color="gray.500">{user.email}</Text>
          </Box>
        </Flex>
        <Button
          onClick={() => handleLogout()}
          type="submit"
          colorScheme="blue"
          w={{ base: "100%" }}
          mt={4}
        >
          Cerrar Sesión
        </Button>
        <Button
          onClick={() => handleDeleteAccount()}
          type="submit"
          colorScheme="red"
          w={{ base: "100%" }}
          mt={2}
        >
          Eliminar Cuenta
        </Button>
      </Box>
    </Flex>
  );
};

export default UserProfile;
