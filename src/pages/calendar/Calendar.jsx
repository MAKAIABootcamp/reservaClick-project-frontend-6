import React, { useState } from 'react';
import { Box, Grid, Button, Text, ButtonGroup } from '@chakra-ui/react';
import { format, addDays } from 'date-fns';
import { Heading } from '@chakra-ui/react';
import './calendar.scss';
import { useParams } from 'react-router-dom';

const Calendar = () => {
  const { storeName } = useParams();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(null);

  const handleDateChange = newDate => {
    setSelectedDate(newDate);
    console.log(newDate);
    setSelectedHour(null); // Reiniciar la hora al cambiar la fecha
  };

  const handleHourSelection = hour => {
    setSelectedHour(hour);
    console.log(hour);
  };

  const renderCalendar = () => {
    const daysInMonth = [];
    let currentDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );

    while (currentDate.getMonth() === selectedDate.getMonth()) {
      daysInMonth.push(new Date(currentDate));
      currentDate = addDays(currentDate, 1);
    }

    return (
      <Grid templateColumns='repeat(7, 1fr)' gap={2}>
        {daysInMonth.map(day => (
          <Button
            key={day}
            variant={
              day.getDate() === selectedDate.getDate() ? 'solid' : 'outline'
            }
            colorScheme='teal'
            onClick={() => handleDateChange(day)}
          >
            {format(day, 'dd')}
          </Button>
        ))}
      </Grid>
    );
  };

  const renderHours = () => {
    const hoursOfDay = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
    ];

    return (
      <Grid templateColumns='repeat(4, 1fr)' gap={2} mt={4}>
        {hoursOfDay.map(hour => (
          <Button
            key={hour}
            variant={hour === selectedHour ? 'solid' : 'outline'}
            colorScheme='teal'
            onClick={() => handleHourSelection(hour)}
          >
            {hour}
          </Button>
        ))}
      </Grid>
    );
  };

  return (
    <Box p={4} className='calendar'>
      <Heading as='h2' size='xl' display={'flex'} justifyContent={'center'}>
        {`Reserva tu cita en ${storeName.replaceAll('-', ' ')}`}
      </Heading>
      <Text fontSize='xl' mb={4}>
        {format(selectedDate, 'MMMM yyyy')}
      </Text>
      {renderCalendar()}
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
        >
          Confirmar
        </Button>
        <Button
          bg='transparent'
          color='red.500'
          borderColor='red.500'
          _hover={{ bg: 'red.500', color: 'white' }}
        >
          Cancelar
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default Calendar;
