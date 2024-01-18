import React, { useEffect } from "react";
import {
  Button,
  Heading,
  Box,
  ListItem,
  List,
  Flex,
  Text,
  Divider,
} from "@chakra-ui/react";
import { getReservations } from "../../store/reservations/reservationActions";
import { useDispatch, useSelector } from "react-redux";
import { getStores } from "../../store/stores/storeActions";
import "./reservation.scss";

const Reserva = ({ store, date, hour, onEdit, onCancel }) => {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" m="2" w="300px">
      <Heading as="h3" size="lg" mb="2">
        {store}
      </Heading>
      <Divider />
      <br />
      <Text mb="2">{date.toLocaleDateString("es-ES", options)}</Text>
      <Text mb="4">{`${hour} - ${String(parseInt(hour) + 1)}:00`}</Text>
      <Flex justifyContent="space-between">
        <Button bg="#B0E0E6" _hover={{ bg: "#87CEEB" }} onClick={onEdit}>
          Editar
        </Button>
        <Button bg="#FF6666" _hover={{ bg: "#CC3333" }} onClick={onCancel}>
          Cancelar
        </Button>
      </Flex>
    </Box>
  );
};

const Reservation = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { stores } = useSelector((store) => store.store);
  const { reservations } = useSelector((store) => store.reservation);

  useEffect(() => {
    dispatch(getReservations());
    dispatch(getStores());
  }, []);

  const myReservations = reservations.filter(
    (reservation) => reservation.userId === user.uid
  );

  // console.log(myReservations[0]?.reservationDate);

  const findStoreNameById = (storeId) => {
    const store = stores.find((store) => store.id === storeId);
    return store ? store.name : "Unknown Store";
  };

  const convertToDate = ({ seconds, nanoseconds }) =>
    new Date(seconds * 1000 + nanoseconds / 1e6);

  // console.log(convertToDate(myReservations[0]?.reservationDate));

  return (
    <main>
      <section className="section_reservas">
        <Heading className="titulo">Mis Reservas</Heading>
        <br />
        <Flex flexWrap="wrap" alignItems="center" justifyContent="center">
          {myReservations.map((myReservation, index) => (
            <Reserva
              key={index}
              store={findStoreNameById(myReservation.storeId)}
              date={convertToDate(myReservation.reservationDate)}
              hour={myReservation.reservationHour}
              onEdit={() => console.log("Editar primera reserva")}
              onCancel={() => console.log("Cancelar primera reserva")}
            />
          ))}
        </Flex>
        <br />
        <br />
        <br />
      </section>
    </main>
  );
};

export default Reservation;
