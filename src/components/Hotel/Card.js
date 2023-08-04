
import styled from 'styled-components';
import useHotelWithRooms from '../../../hooks/api/useHotelWithRooms';
import { useState } from 'react';
import { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

export default function Card(hotelInfo, selected) {
  const { hotelWithRoom } = useHotelWithRooms(hotelInfo.id);
  const [details, setDetails] = useState({});

  useEffect( () => {
    if(hotelWithRoom) {
      setDetails(hotelWithRoom);
    }
  }, [hotelWithRoom]);

  let available=0;

  for (let i=0; i < details.rooms.length; i++) {
    available = available + details.rooms[i].capacity;
  }

  return (
    <Container selecao={selected}>
      <Image src={hotelInfo.image} alt="imagem"/>
      <Name>{hotelInfo.name}</Name>
      <Details>Tipo de Acomodação: <div>Single, Double e Triple</div>
      </Details>
      <Details>Vagas disponíveis: <div>{available}</div>
      </Details>
    </Container>
  );
}

const Container = styled.div `
display: flex;
flex-direction:column;
background-color: ${props => props.selecao ? 'lightyellow' : 'lightgray'};
justify-content:space-evenly;
align-items: center;
height: 230px;
width:200px;
border-radius: 8px;
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
margin-bottom: 5px;`;

