import React, { useEffect } from 'react';
import { Button, Flex, Heading } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './location.scss';

const Location = () => {
  const navigate = useNavigate();

  const { selectedStore } = useSelector(store => store.store);
  let { storeName } = useParams();
  storeName = storeName.replaceAll('-', ' ');

  useEffect(() => {
    if (!selectedStore) {
      navigate('/home');
    }
  }, [selectedStore, navigate]);

  const handleGoToCalendar = () => {
    const param = selectedStore.name.replace(/ /g, '-');
    navigate(`/home/${param}/calendar`);
  };

  if (selectedStore) {
    return (
      <>
        <Flex align='center' height='90vh' direction='column'>
          <Heading textAlign='center' className='mapTitle'>
            {storeName}
          </Heading>
          <br />
          <iframe
            src={selectedStore.coordinates}
            style={{
              border: '0',
              border: '1px solid #87ceeb',
              borderRadius: '10px',
            }}
            loading='lazy'
          ></iframe>
          <br />
          <Button
            bg='#B0E0E6'
            _hover={{ bg: '#87CEEB' }}
            onClick={() => handleGoToCalendar()}
          >
            Realizar reserva
          </Button>
          <br />
        </Flex>
      </>
    );
  }
};

export default Location;
