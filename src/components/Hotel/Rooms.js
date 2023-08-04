import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useHotelWithRooms from '../../hooks/api/useHotelWithRooms';
import SpecificRoom from './SpecificRoom';

export default function Room(hotelId, buttons) {
  const { hotelWithRoom } = useHotelWithRooms(hotelId);
  const [details, setDetails] = useState({});
  const [room, setRoom] =useState(0);

  useEffect( () => {
    if(hotelWithRoom) {
      setDetails(hotelWithRoom);
    }
  }, [hotelWithRoom]);

  function Select2(id) {
    setRoom(id);
  }
  
  return (
    <RoomsContainer selected={buttons}>{details?.rooms?.map((j) => <Button2 onClick={() => Select2(j.id)} disabled={room === j.id ? true : false} color={j.id === room ? true : false} >{SpecificRoom(j)}</Button2>)}</RoomsContainer>
  );
};

const RoomsContainer = styled.div `
display: ${props => props.selected === '' ? 'none' : 'flex'};
flex-wrap: wrap;
width: 500px;
`;

const Button2= styled.div `
background-color: ${props => props.disabled ? 'lightgray': props.color ? 'lightyellow' : 'white'};
width:100px;
height: 30px;`;
