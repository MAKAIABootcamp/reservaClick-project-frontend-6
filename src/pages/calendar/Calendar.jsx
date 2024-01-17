import React, { useState } from 'react';
import {
  Box,
  Grid,
  Button,
  Text,
  ButtonGroup,
  Heading,
  Flex,
} from '@chakra-ui/react';
import { format, addDays, addMonths, subMonths } from 'date-fns';
import es from 'date-fns/locale/es';
import { useNavigate, useParams } from 'react-router-dom';
import './calendar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setStore } from '../../store/stores/storeActions';

const Calendar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { storeName } = useParams();
  const { user } = useSelector(store => store.user);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(null);

  const handleDateChange = newDate => {
    setSelectedDate(newDate);
    console.log(newDate);
    setSelectedHour(null);
  };

  const handleHourSelection = (hour, availability) => {
    setSelectedHour(hour);
    if (!availability) {
      console.log('Esta horario NO esta disponible');
    } else {
      selectedDate.setHours(hour.split(':').shift());
      console.log(selectedDate);
    }
  };

  const handleConfirmReservation = () => {
    console.log('-----------------------------');
    console.log('Reserva exitosa!');
    console.log(storeName.replaceAll('-', ' '));
    console.log(user.displayName);
    console.log(selectedDate);
  };

  const handleCancel = () => {
    navigate('/home');
    dispatch(setStore(null));
  };

  const schedule = {
    '08:00': true,
    '09:00': false,
    '10:00': true,
    '11:00': false,
    '12:00': true,
    '14:00': false,
    '15:00': true,
    '16:00': false,
    '17:00': true,
  };

  const noAvailability = Object.values(schedule).every(
    value => value === false
  );

  const renderCalendar = () => {
    const daysInMonth = [];
    let currentDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );

    const dayNames = [...Array(7)].map((_, index) =>
      format(addDays(currentDate, index), 'EEEE', { locale: es })
    );

    while (currentDate.getMonth() === selectedDate.getMonth()) {
      daysInMonth.push(new Date(currentDate));
      currentDate = addDays(currentDate, 1);
    }

    // daysInMonth.map(day => console.log(day));

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
          {daysInMonth.map(day => (
            <Button
              key={day}
              variant={
                day.getDate() === selectedDate.getDate() ? 'solid' : 'outline'
              }
              colorScheme={noAvailability ? 'red' : 'teal'}
              onClick={() => handleDateChange(day)}
            >
              {format(day, 'dd')}
            </Button>
          ))}
        </Grid>
      </>
    );
  };

  const renderHours = () => {
    const hours = Object.keys(schedule);

    return (
      <Grid templateColumns='repeat(4, 1fr)' gap={2} mt={4}>
        {hours.map(hour => (
          <Button
            key={hour}
            variant={hour === selectedHour ? 'solid' : 'outline'}
            colorScheme={schedule[hour] ? 'teal' : 'red'}
            onClick={() => handleHourSelection(hour, schedule[hour])}
          >
            {hour}
          </Button>
        ))}
      </Grid>
    );
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

  return (
    <Box p={4} className='calendar'>
      <Heading as='h2' size='xl' display={'flex'} justifyContent={'center'}>
        {`Reserva tu cita en ${storeName.replaceAll('-', ' ')}`}
      </Heading>
      <br />
      <Flex p={4} justifyContent={'space-between'}>
        <Button onClick={handlePrevMonth}>Mes anterior</Button>
        <Text fontSize='xl' mb={4}>
          {format(selectedDate, 'MMMM yyyy', { locale: es }).toUpperCase()}
        </Text>
        <Button onClick={handleNextMonth}>Mes siguiente</Button>
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
          bg='transparent'
          color='green.500'
          borderColor='green.500'
          _hover={{ bg: 'green.500', color: 'white' }}
          onClick={() => handleConfirmReservation()}
        >
          Confirmar
        </Button>
        <Button
          bg='transparent'
          color='red.500'
          borderColor='red.500'
          _hover={{ bg: 'red.500', color: 'white' }}
          onClick={() => handleCancel()}
        >
          Cancelar
        </Button>
      </ButtonGroup>
      <br />
    </Box>
  );
};

export default Calendar;
