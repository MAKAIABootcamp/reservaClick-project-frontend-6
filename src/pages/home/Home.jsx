import React, { useEffect } from 'react';
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
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

import './home.scss';
import { useNavigate } from 'react-router-dom';
import { getStores, setStore } from '../../store/stores/storeActions';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const { stores } = useSelector(store => store.store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStores());
  }, []);

  const navigate = useNavigate();

  const navigateToCalendar = store => {
    const param = store.name.replace(/ /g, '-');
    navigate(`${param}/calendar`);
    dispatch(setStore(store));
  };

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
        <List className='list__container'>
          {stores.map((item, index) => (
            <ListItem spacing={3} key={index}>
              <Card
                onClick={() => navigateToCalendar(item)}
                className='main_container__card_container__card'
                maxW='sm'
              >
                <CardBody>
                  <Image
                    src={item.image}
                    alt={item.name}
                    w='14em'
                    h='14em'
                    borderRadius='lg'
                  />
                  <p>{item.name}</p>
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
