
import styled from 'styled-components';
import useRoomsByHotelId from '../../hooks/api/useRoomsByHotelId';

export default function Card({ hotelInfo }, { selected }) {
  let available=0;
  if(hotelInfo.id) {
    const { roomsByHotelId } = useRoomsByHotelId(hotelInfo.id);

    roomsByHotelId?.forEach( (room) => {
      available= available + room.capacity;
    });
  }

  return (
    <Container selected={selected}>
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
background-color: ${props => props.selected ? 'lightyellow' : 'lightgray'};
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
margin-bottom:5px;`;

