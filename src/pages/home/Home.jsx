import React from 'react';
import {
  Input,
  Button,
  Stack,
  Heading,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  Card,
  CardBody,
  Text,
  Image,
  List,
  ListItem,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import barbaros from '../../assets/img/barbaros.png';
import dentalhealth from '../../assets/img/dentalhealth.png';
import piel_de_angel from '../../assets/img/piel-de-angel.png';
import spa_integral from '../../assets/img/spa-integral.png';

import './home.scss';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const empresas = [
    {
      "id": 1,
      "nombre": "Barbaros",
      "direccion": "Calle 123",
      "telefono": "123-456-7890",
      "img": "src/assets/img/barbaros.png"
    },
    {
      "id": 2,
      "nombre": "Piel de Ángel",
      "direccion": "Avenida 456",
      "telefono": "987-654-3210",
      "img": "src/assets/img/piel-de-angel.png"
    },
    {
      "id": 3,
      "nombre": "Dental Health",
      "direccion": "Avenida 456",
      "telefono": "987-654-3210",
      "img": "src/assets/img/dentalhealth.png"
    },
    {
      "id": 4,
      "nombre": "Spa Integral",
      "direccion": "Avenida 456",
      "telefono": "987-654-3210",
      "img": "src/assets/img/spa-integral.png"
    }
  ];

  const navigate = useNavigate();

  const handleClickCard  = () => {
    navigate('/calendar');

  }

  return (
    <main className='main_container'>
      <Heading size='xl'>!Bienvenido a ReservaClick¡</Heading>
      <form className='main_container__form'>
        <InputGroup>
          <Input
            type='text'
            variant='filled'
            placeholder='Busca un establecimiento...'
            w={[300, 400, 500]}
          />
          <InputRightElement>
            <FaSearch />
          </InputRightElement>
        </InputGroup>
      </form>
      <div className='main_container__card_container'>
        <List>
          {empresas.map((item, index) => (
          <ListItem spacing={3} key={index} >
            <Card  onClick={handleClickCard} className='main_container__card_container__card' maxW='sm'>
              <CardBody>
                <Image
                  src={item.img}
                  alt='Barbaros'
                  borderRadius='lg'
                  maxW={{ sm: '14em' }}
                />
                <p>{item.nombre}</p>
              </CardBody>
            </Card>
          </ListItem>
          ))}
        </List>
{/*         <Card className='main_container__card_container__card' maxW='sm'>
          <CardBody>
            <Image
              src={piel_de_angel}
              alt='Piel de Ángel'
              borderRadius='lg'
              w='14em'
            />
            <p>Piel de Ángel</p>
          </CardBody>
        </Card>
        <Card className='main_container__card_container__card' maxW='sm'>
          <CardBody>
            <Image
              src={dentalhealth}
              alt='Dental Health'
              borderRadius='lg'
              w='14em'
            />
            <p>Dental Health</p>
          </CardBody>
        </Card>
        <Card className='main_container__card_container__card' maxW='sm'>
          <CardBody>
            <Image
              src={spa_integral}
              alt='Spa Integral'
              borderRadius='lg'
              w='14em'
            />
            <p>Spa Integral</p>
          </CardBody>
        </Card> */}
      </div>
    </main>
  );
};

export default Home;
