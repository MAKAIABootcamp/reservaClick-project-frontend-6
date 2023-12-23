import React from 'react';
import './reservation.scss';
import { ChakraProvider, Button, Heading, Box } from '@chakra-ui/react';

const Reserva = ({ local, fecha, hora, onEditar, onCancelar }) => (
  <section className='section_container'>
    <a>{local}</a>
    <h2>{fecha}</h2>
    <p>{hora}</p>
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
    <ChakraProvider>
      <Heading className='titulo'>MIS RESERVAS</Heading>

      {/* Primera reserva */}
      <section className='section_reservas'>
        <Reserva
          local='Barbaros'
          fecha='2023-12-23 (sábado)'
          hora='10:00 - 11:00 AM'
          onEditar={() => console.log('Editar primera reserva')}
          onCancelar={() => console.log('Cancelar primera reserva')}
        />
        <Box width='60%' height='1px' bg='white' mx='auto' my={-6} />

        {/* Segunda reserva */}
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
    </ChakraProvider>
  );
};

export default Reservation;
