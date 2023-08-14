
import styled from 'styled-components';
import ChangeRoom from './ChangeRoom';
import useHotelById from '../../hooks/api/useHotelById';
import useBookingByRoomId from '../../hooks/api/useBookingByRoomId';

import { useState, useEffect } from 'react';

export default function FinalCard({ booking }) {
  console.log(booking.id);
  const [hotelInfo, setInfo] = useState({});
  const { hotel } = useHotelById( booking.Room.hotelId);
  const { bookings } = useBookingByRoomId(booking.Room.id);
  const [selected, setSelected]=useState(false);
  console.log(hotel);

  function Change() {
    setSelected(true);
    console.log(booking.id);
  }

  let quantidade = [];
  for (let i=0; i < booking.Room.capacity; i++) {
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
    <><Container>
      <Image src={hotel?.image} alt="imagem" />
      <Name>{hotel?.name}</Name>
      <Details>Tipo de Acomodação: <div>{booking.Room.capacity === 1 ? 'Single' : booking.Room.capacity === 2 ?  'Double' : 'Triple'}</div>
      </Details>
      <Details>Pessoas no seu quarto: { notAvailable ===1 ? 'Somente você' : notAvailable === 2 ? 'Você e mais 1 pessoa' : 'Você e mais duas pessoas'} <div></div>
      </Details>
    </Container>
    <Reserve onClick={Change}>TROCAR QUARTO</Reserve>
    { selected ? <BedroomsContainer>{selected  ? <ChangeRoom hotel={hotel} bookingId={booking.id} /> : ''}</BedroomsContainer> : ''}
    </>
  );
}

const Container = styled.div `
display: flex;
flex-direction:column;
background-color: lightyellow;
justify-content:space-evenly;
align-items: center;
height: 230px;
width:200px;
border-radius: 8px;
margin-bottom:10px;
`;

const Image= styled.img `
width:180px;
height:100px;
border-radius: 8px;
margin-bottom:-15px;`;

const Name= styled.div `
height: 15px;
weight:700;
font-size: 22px;`;

const Details= styled.div `
weight:700;
height: 10px;
div {
  margin-top:5px;
  weight:400
  height: 7px;
};
margin-bottom:5px;`;

const Reserve = styled.button `
    width:160px;
    height: 40px;
    justify-content:center;
    align-items: center;
    margin-top: 40px;
    border-radius:8px;
    border-style:groove;`;

const BedroomsContainer = styled.div `
width: 800px;
margin-top: 40px;
margin-left:40px;
`;
