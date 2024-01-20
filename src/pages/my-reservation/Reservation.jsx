import React, { useEffect } from 'react';
import {
  Button,
  Heading,
  Box,
  ListItem,
  List,
  Flex,
  Text,
  Divider,
} from '@chakra-ui/react';
import {
  deleteReservation,
  getReservations,
  setReservation,
} from '../../store/reservations/reservationActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getStores } from '../../store/stores/storeActions';
import './reservation.scss';
import Swal from 'sweetalert2';
import { sweetAlert } from '../../utils/alerts';

const Reserva = ({ store, date, hour, onEdit, onDelete }) => {
  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const hourInt = Number.parseInt(hour);
  let identifier = hourInt < 12 ? 'AM' : 'PM';

  return (
    <Box borderWidth='1px' borderRadius='lg' p='4' m='2' w='300px'>
      <Heading as='h3' size='lg' mb='2' textAlign='center'>
        {store}
      </Heading>
      <Divider />
      <br />
      <Text mb='2'>{date.toLocaleDateString('es-ES', options)}</Text>
      <Text mb='4'>{`${hour} - ${String(hourInt + 1)}:00 ${identifier}`}</Text>
      <Flex justifyContent='space-between'>
        <Button bg='#B0E0E6' _hover={{ bg: '#87CEEB' }} onClick={onEdit}>
          Editar
        </Button>
        <Button bg='#FF6666' _hover={{ bg: '#CC3333' }} onClick={onDelete}>
          Eliminar
        </Button>
      </Flex>
    </Box>
  );
};

const Reservation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(store => store.user);
  const { stores } = useSelector(store => store.store);
  const { reservations } = useSelector(store => store.reservation);

  useEffect(() => {
    dispatch(getReservations());
    dispatch(getStores());
    dispatch(setReservation(null));
  }, []);

  const myReservations = reservations.filter(
    reservation => reservation.userId === user.uid
  );

  const findStoreNameById = storeId => {
    const store = stores.find(store => store.id === storeId);
    return store ? store.name : 'Unknown Store';
  };

  const convertToDate = ({ seconds, nanoseconds }) =>
    new Date(seconds * 1000 + nanoseconds / 1e6);

  const handleEditReservation = (reservation, storeName) => {
    dispatch(setReservation(reservation));
    navigate(`${storeName.replaceAll(' ', '-')}/calendar`);
  };

  const handleCancelReservation = (reservation, storeName) => {
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
        dispatch(deleteReservation(reservation));

        Swal.fire({
          title: 'Eliminada!',
          text: `Tu reserva en ${storeName} fue eliminada`,
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Aceptar',
        }).then(result => {
          if (result.isConfirmed) {
            navigate('/home');
          }
        });
      }
    });
  };
  return (
    <main>
      <section className='section_reservas'>
        <Heading className='titulo'>Mis Reservas</Heading>
        <br />
        <Flex flexWrap='wrap' alignItems='center' justifyContent='center'>
          {myReservations.length > 0 ? (
            myReservations.map((myReservation, index) => {
              const storeName = findStoreNameById(myReservation.storeId);
              const date = convertToDate(myReservation.reservationDate);

              return (
                <Reserva
                  key={index}
                  store={storeName}
                  date={date}
                  hour={myReservation.reservationHour}
                  onEdit={() => handleEditReservation(myReservation, storeName)}
                  onDelete={() =>
                    handleCancelReservation(myReservation, storeName)
                  }
                />
              );
            })
          ) : (
            <Text fontSize='lg' textAlign='center'>
              Oops!..., parece que aún no tienes reservas
            </Text>
          )}
        </Flex>
        <br />
        <br />
        <br />
      </section>
    </main>
  );
};

export default Reservation;
