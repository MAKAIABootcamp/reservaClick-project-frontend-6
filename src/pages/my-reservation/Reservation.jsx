import React from 'react';
import { Button, Heading, Box } from '@chakra-ui/react';
import './reservation.scss';

const Reserva = ({ local, fecha, hora, onEditar, onCancelar }) => (
  <section className='section_container'>
    <Heading as='h3' size='lg'>
      {local}
    </Heading>
    <Heading as='h3' size='md'>
      {fecha}
    </Heading>
    <Heading as='h3' size='sm'>
      {hora}
    </Heading>
    <Box textAlign='center'>
      <Button
        bg='transparent'
        color='green.500'
        borderColor='green.500'
        _hover={{ bg: 'green.500', color: 'white' }}
        onClick={onEditar}
      >
        Editar
      </Button>
      <Button
        bg='transparent'
        color='red.500'
        borderColor='red.500'
        _hover={{ bg: 'red.500', color: 'white' }}
        onClick={onCancelar}
      >
        Cancelar
      </Button>
    </Box>
  </section>
);

const Reservation = () => {
  return (
    <main>
      <section className='section_reservas'>
        <Heading className='titulo'>Mis Reservas</Heading>
        <Reserva
          local='Barbaros'
          fecha='2023-12-23 (sábado)'
          hora='10:00 - 11:00 AM'
          onEditar={() => console.log('Editar primera reserva')}
          onCancelar={() => console.log('Cancelar primera reserva')}
        />
        <Box width='50%' height='1px' bg='white' mx='auto' my={-6} />

        <Reserva
          local='Pies de angel'
          fecha='2023-12-25 (lunes)'
          hora='1:00 - 2:00 PM'
          onEditar={() => console.log('Editar segunda reserva')}
          onCancelar={() => console.log('Cancelar segunda reserva')}
        />
        <Box width='60%' height='1px' bg='white' mx='auto' my={-6} />

        <Reserva
          local='Odontologia estetica'
          fecha='2023-12-26 (Martes)'
          hora='3:00 - 4:00 PM'
          onEditar={() => console.log('Editar segunda reserva')}
          onCancelar={() => console.log('Cancelar segunda reserva')}
        />
        <Box width='60%' height='1px' bg='white' mx='auto' my={-6} />
      </section>
    </main>
  );
};

export default Reservation;
