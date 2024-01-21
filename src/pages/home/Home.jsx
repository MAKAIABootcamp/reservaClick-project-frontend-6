import React, { useEffect, useState } from 'react';
import {
  Input,
  Heading,
  InputRightElement,
  InputGroup,
  Card,
  CardBody,
  Image,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

import './home.scss';
import { useNavigate } from 'react-router-dom';
import { getStores, setStore } from '../../store/stores/storeActions';
import { useDispatch, useSelector } from 'react-redux';
import { getReservations } from '../../store/reservations/reservationActions';

const Home = () => {
  const { stores } = useSelector(store => store.store);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getStores());
    dispatch(getReservations());
  }, []);

  const navigate = useNavigate();

  const navigateToCalendar = store => {
    const param = store.name.replace(/ /g, '-');
    navigate(`${param}/calendar`);
    dispatch(setStore(store));
  };

  const navigateToLocation = store => {
    const param = store.name.replace(/ /g, '-');
    navigate(`${param}/location`);
    dispatch(setStore(store));
  };

  return (
    <main className='main_home_container'>
      <br />
      <Heading size='xl'>!Bienvenido a ReservaClick¡</Heading>
      <br />
      <form className='main_home_container__form'>
        <InputGroup>
          <Input
            type='text'
            variant='filled'
            placeholder='Busca un establecimiento...'
            focusBorderColor='#87CEEB'
            onChange={event => setSearch(event.target.value)}
            w={[300, 400, 500, 700, 900]}
          />
          <InputRightElement>
            <FaSearch />
          </InputRightElement>
        </InputGroup>
      </form>
      <br />
      <div className='main_home_container__card_container'>
        <List className='list__container'>
          {stores
            .filter(item =>
              search.toLocaleLowerCase() === ''
                ? item
                : item.name.toLocaleLowerCase().includes(search)
            )
            .map((item, index) => (
              <ListItem spacing={3} key={index}>
                <Card
                  className='main_home_container__card_container__card'
                  maxW='sm'
                  boxShadow='lg'
                  backgroundColor={'#b0e0e6'}
                >
                  <CardBody>
                    <Image
                      className='main_home_container__card_container__card__image'
                      onClick={() => navigateToCalendar(item)}
                      src={item.image}
                      alt={item.name}
                      w='14em'
                      h='14em'
                      borderRadius='lg'
                    />
                    <p>{item.name}</p>
                    <Text
                      className='main_home_container__card_container__card__text'
                      onClick={() => navigateToLocation(item)}
                    >
                      Ver Ubicación
                    </Text>
                  </CardBody>
                </Card>
              </ListItem>
            ))}
        </List>
      </div>
    </main>
  );
};

export default Home;
