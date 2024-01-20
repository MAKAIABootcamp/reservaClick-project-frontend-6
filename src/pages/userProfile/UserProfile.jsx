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
  HStack,
  Divider,
  Tooltip,
  useColorModeValue,
  Center,
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
      <ButtonGroup
        justifyContent="center"
        size="md"
        w="full"
        spacing={2}
        mt={2}
      >
        <IconButton icon={<FaCheck />} {...getSubmitButtonProps()} />
        <IconButton icon={<FaWindowClose />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : null;
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
      confirmButtonColor: "#FF6666",
      cancelButtonColor: "#B0E0E6",
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
    <>
      <div className="desktop">
        <Flex align="center" justify="center" height="100vh">
          <Box
            // width={{ base: '100%', md: '50%' }}
            width="500px"
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="xl"
            mx="auto"
          >
            <Heading as="h1" size="xl" align="left" justify="center">
              Perfil de usuario
            </Heading>
            <br />
            <Divider />
            <br />
            <Flex align="center">
              <Box mr={4}>
                <Avatar src={user.photoURL} size="2xl" />
              </Box>
              <Box>
                <Editable
                  className="main_container__profile__editable"
                  textAlign="left"
                  defaultValue={user.displayName}
                  fontSize={["20px", "25px"]}
                  isPreviewFocusable={true}
                  selectAllOnFocus={false}
                  onSubmit={(displayName) => handleUpdateName(displayName)}
                >
                  <Tooltip
                    label="Haz click para editar"
                    shouldWrapChildren={true}
                  >
                    <EditablePreview
                      _hover={{
                        background: useColorModeValue("gray.100", "gray.700"),
                      }}
                    />
                  </Tooltip>
                  <Input py={2} px={4} as={EditableInput} />
                  <EditableControls />
                </Editable>
                <Text color="gray.500" fontSize="xl">
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
                type="submit"
                bg="#FF6666"
                _hover={{ bg: "#CC3333" }}
                mt={2}
              >
                Eliminar Cuenta
              </Button>
              <Button
                onClick={() => handleLogout()}
                type="submit"
                bg="#B0E0E6"
                _hover={{ bg: "#87CEEB" }}
                mt={2}
              >
                Cerrar Sesión
              </Button>
            </HStack>
          </Box>
        </Flex>
      </div>
      <div className="mobile">
        <Flex align="center" justify="center" height="100vh">
          <Box
            width="350px"
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="xl"
            mx="auto"
          >
            <Heading as="h1" size="xl" align="center" justify="center">
              Perfil de usuario
            </Heading>
            <br />
            <Divider />
            <br />
            <Box mr={4} align="center">
              <Avatar src={user.photoURL} size="2xl" />
            </Box>
            <br />
            <Flex direction={"column"} align="center">
              <Box>
                <Editable 
                  className="main_container__profile__editable"
                  textAlign="center"
                  defaultValue={user.displayName}
                  fontSize={["20px", "25px"]}
                  isPreviewFocusable={true}
                  selectAllOnFocus={false}
                  onSubmit={(displayName) => handleUpdateName(displayName)}
                >
                  <Tooltip
                    label="Haz click para editar"
                    shouldWrapChildren={true}
                  >
                    <EditablePreview
                      _hover={{
                        background: useColorModeValue("gray.100", "gray.700"),
                      }}
                    />
                  </Tooltip>
                  <Input py={2} px={4} as={EditableInput} />
                  <EditableControls />
                </Editable>
                <Text color="gray.500" fontSize="xl">
                  {user.email}
                </Text>
              </Box>
            </Flex>
            <br />
            <Divider />
            <br />
            <Flex direction={"column"}>
              <Button
                onClick={() => handleLogout()}
                type="submit"
                bg="#B0E0E6"
                _hover={{ bg: "#87CEEB" }}
                mt={2}
              >
                Cerrar Sesión
              </Button>
              <Button
                onClick={() => handleDeleteAccount()}
                type="submit"
                bg="#FF6666"
                _hover={{ bg: "#CC3333" }}
                mt={2}
              >
                Eliminar Cuenta
              </Button>
            </Flex>
          </Box>
        </Flex>
        <br />
        <br />
      </div>
    </>
  );
};

export default UserProfile;
