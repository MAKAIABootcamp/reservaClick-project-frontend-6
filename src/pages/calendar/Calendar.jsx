import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Button,
  Text,
  ButtonGroup,
  Heading,
  Flex,
} from '@chakra-ui/react';
import { format, addDays, addMonths, subMonths, isBefore } from 'date-fns';
import es from 'date-fns/locale/es';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStores, setStore } from '../../store/stores/storeActions';
import {
  createReservation,
  getReservations,
  updateReservation,
} from '../../store/reservations/reservationActions';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import Swal from 'sweetalert2';
import './calendar.scss';

const Calendar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { storeName } = useParams();
  storeName = storeName.replaceAll('-', ' ');

  const { user } = useSelector(store => store.user);
  const { stores, selectedStore } = useSelector(store => store.store);
  const { reservations, reservationToEdit } = useSelector(
    store => store.reservation
  );

  const todayDate = new Date();
  const [selectedDate, setSelectedDate] = useState(
    new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate())
  );
  const [selectedHour, setSelectedHour] = useState(null);

  useEffect(() => {
    dispatch(getReservations());
    dispatch(getStores());
    if (!selectedStore?.id && !reservationToEdit?.storeId) {
      navigate('/home');
    }
  }, [selectedStore, reservationToEdit, navigate]);

  const convertToDate = ({ seconds, nanoseconds }) =>
    new Date(seconds * 1000 + nanoseconds / 1e6);

  let reservationsForStore = null;

  if (selectedStore) {
    reservationsForStore = reservations.filter(
      reservation => reservation.storeId === selectedStore.id
    );
  } else if (reservationToEdit) {
    reservationsForStore = reservations.filter(
      reservation => reservation.storeId === reservationToEdit.storeId
    );
  }

  const handleDateChange = newDate => {
    setSelectedDate(newDate);
    console.log(newDate);
    setSelectedHour(null);
  };

  const handleHourSelection = hour => {
    setSelectedHour(hour);
    console.log(hour);
  };

  const handleConfirmReservation = () => {
    if (!selectedHour) {
      Swal.fire({
        title: '¡Error!',
        text: 'Por favor, elige un horario antes de confirmar la reserva.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#87CEEB',
      });
      return;
    } else {
      const store = stores.find(store => store.name == storeName);

      const reservation = {
        userId: user.uid,
        storeId: store.id,
        creationDate: new Date(),
        reservationDate: selectedDate,
        reservationHour: selectedHour,
      };

      if (!reservationToEdit) {
        dispatch(createReservation(reservation));
        Swal.fire({
          title: '¡Reserva exitosa!',
          text: `¡Tu reserva en ${storeName} fue exitosa!`,
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#87CEEB',
        }).then(result => {
          if (result.isConfirmed) {
            navigate('/reservation');
          }
        });
      } else {
        dispatch(updateReservation(reservation, reservationToEdit.id));
        Swal.fire({
          title: '¡Edición exitosa!',
          text: `¡Tu reserva en ${storeName} fue exitosa!`,
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#87CEEB',
        }).then(result => {
          if (result.isConfirmed) {
            navigate('/reservation');
          }
        });
      }
    }
  };

  const handleCancel = () => {
    navigate('/home');
    dispatch(setStore(null));
  };

  const handlePrevMonth = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    if (
      subMonths(selectedDate, 1).getFullYear() == currentYear &&
      subMonths(selectedDate, 1).getMonth() + 1 >= currentMonth
    ) {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  };

  const handleNextMonth = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };

  if (reservationsForStore) {
    const renderCalendar = () => {
      const daysInMonth = [];
      let currentDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
      );

      const dayNames = [...Array(7)].map((_, index) =>
        format(addDays(currentDate, index), 'EEEE', { locale: es }).slice(0, 2)
      );

      while (currentDate.getMonth() === selectedDate.getMonth()) {
        daysInMonth.push(new Date(currentDate));
        currentDate = addDays(currentDate, 1);
      }

      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      return (
        <>
          <Grid templateColumns='repeat(7, 1fr)' gap={2} mb={2}>
            {dayNames.map(dayName => (
              <Text key={dayName} textAlign='center'>
                {dayName}
              </Text>
            ))}
          </Grid>
          <Grid templateColumns='repeat(7, 1fr)' gap={2}>
            {daysInMonth.map(day => {
              // console.log('Day: ', day);
              return (
                <Button
                  key={day}
                  isDisabled={isBefore(day, yesterday)}
                  variant={
                    day.getDate() === selectedDate.getDate()
                      ? 'solid'
                      : 'outline'
                  }
                  colorScheme='teal'
                  onClick={() => handleDateChange(day)}
                >
                  {format(day, 'dd')}
                </Button>
              );
            })}
          </Grid>
        </>
      );
    };

    const renderHours = () => {
      const hours = [
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '14:00',
        '15:00',
        '16:00',
      ];

      const sortedHours = hours.sort((a, b) => {
        const [hoursA, minutesA] = a.split(':').map(Number);
        const [hoursB, minutesB] = b.split(':').map(Number);

        if (hoursA === hoursB) {
          return minutesA - minutesB;
        }

        return hoursA - hoursB;
      });

      const currentDate = new Date();
      const currentHour = currentDate.getHours();

      return (
        <Grid templateColumns='repeat(4, 1fr)' gap={2} mt={4}>
          {sortedHours.map(hour => {
            const hourInt = Number.parseInt(hour.split(':').shift());

            const isThisHourNotAvailable = reservationsForStore.some(
              reservation =>
                `${selectedDate}${hour}` ===
                `${convertToDate(reservation.reservationDate)}${
                  reservation.reservationHour
                }`
            );

            return (
              <Button
                isDisabled={
                  isThisHourNotAvailable ||
                  (currentDate.getDate() === selectedDate.getDate() &&
                    hourInt <= currentHour)
                }
                key={hour}
                variant={hour === selectedHour ? 'solid' : 'outline'}
                colorScheme={isThisHourNotAvailable ? 'red' : 'teal'}
                onClick={() =>
                  handleHourSelection(hour, isThisHourNotAvailable)
                }
              >
                {hour}
              </Button>
            );
          })}
        </Grid>
      );
    };

    return (
      <Box p={4} className='calendar'>
        <Heading
          as='h2'
          size='xl'
          display={'flex'}
          justifyContent={'center'}
          textAlign='center'
        >
          {`Reserva tu cita en ${storeName}`}
        </Heading>
        <br />
        <Flex p={4} justifyContent={'space-between'}>
          <Button onClick={handlePrevMonth}>
            <MdArrowBackIos />
          </Button>
          <Text fontSize='xl' mb={4}>
            {format(selectedDate, 'MMMM yyyy', { locale: es }).toUpperCase()}
          </Text>
          <Button onClick={handleNextMonth}>
            <MdArrowForwardIos />
          </Button>
        </Flex>
        <br />
        {renderCalendar()}
        <br />
        {selectedDate && renderHours()}
        <ButtonGroup
          variant='outline'
          spacing='6'
          display={'flex'}
          justifyContent={'center'}
          marginTop={39}
        >
          <Button
            bg='#B0E0E6'
            _hover={{ bg: '#87CEEB' }}
            onClick={() => handleConfirmReservation()}
          >
            Confirmar
          </Button>
          <Button
            bg='#FF6666'
            _hover={{ bg: '#CC3333' }}
            onClick={() => handleCancel()}
          >
            Cancelar
          </Button>
        </ButtonGroup>
        <br />
        <br />
        <br />
      </Box>
    );
  }
};

export default Calendar;
