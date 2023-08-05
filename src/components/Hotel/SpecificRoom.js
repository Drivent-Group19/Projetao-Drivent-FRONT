import styled from 'styled-components';
import useBookingByRoomId from '../../hooks/api/useBookingByRoomId';
import { useEffect, useState } from 'react';

export default function SpecificRoom({ roomInfo }) {
  const { bookings } = useBookingByRoomId(roomInfo.id);

  let quantidade = [];
  for (let i=0; i < roomInfo.capacity; i++) {
    quantidade.push(i);
  }
  
  let tam= quantidade.length;
  let dif;
  let notAvailable=0;

  if(bookings) {
    notAvailable= bookings.length;
    dif = tam - notAvailable;
  }
  
  return (
    <Container>
      <div>{roomInfo.id}</div>
      <div>{tam === notAvailable ? quantidade?.map((i) => <ion-icon name="person"></ion-icon>) : dif === tam ? quantidade?.map((i) => <ion-icon name="person" color="gray"></ion-icon>) : true }</div>
    </Container>
  );
};

const Container = styled.div `
width:160px;
height: 30px;
display:flex;
flex-direction:row;
justify-content: space-between;
div {
    width:60px
}
`;
