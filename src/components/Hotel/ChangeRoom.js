import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useRoomsByHotelId from '../../hooks/api/useRoomsByHotelId';
import SpecificRoom from './SpecificRoom';
import { updateBooking } from '../../services/hotelApi';
import useToken from '../../hooks/useToken';

export default function ChangeRoom({ hotel }, { bookingId } ) {
  console.log(bookingId);
  const token = useToken();
  const { roomsByHotelId } = useRoomsByHotelId(hotel.id);
  const [rooms, setRooms] = useState([]);

  useEffect( () => {
    if(roomsByHotelId) {
      setRooms(roomsByHotelId);
    }
  }, [roomsByHotelId]);

  const [room, setRoom] =useState({});

  function Select2(info) {
    setRoom(info);
  }

  function Reserva() {
    console.log(bookingId);
    updateBooking(token, room.id, bookingId);
  }
  
  return (
    <div>
      <RoomsContainer>{rooms?.map((j) => <Button2 onClick={() => Select2(j)} disabled={room.id === j.id ? true : false} color={j.id === room ? true : false} ><SpecificRoom roomInfo={j}/></Button2>)}</RoomsContainer>
      <ReserveContainer> {room.id !== undefined  && bookingId !== undefined ? <Reserve onClick={Reserva}>RESERVAR QUARTO</Reserve> : ''}</ReserveContainer>
    </div>

  );
};

const RoomsContainer = styled.div `
display: flex;
flex-wrap: wrap;
width: 800px;
justify-content: space-between;
align-items: center;
`;

const Button2= styled.div `
background-color: ${props => props.disabled ? 'lightyellow': props.color ? 'lightyellow' : 'white'};
width:160px;
height: 40px;
border-radius:8px;
margin-top:5px;
padding:5px;
border: solid;
border-color: lightgray;`;

const ReserveContainer = styled.div `
width:160px;`;

const Reserve = styled.button `
width:160px;
height: 40px;
justify-content:center;
align-items: center;
margin-top: 40px;
border-radius:8px;
border-style:groove;`;

