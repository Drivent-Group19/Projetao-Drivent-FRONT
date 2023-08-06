
import styled from 'styled-components';
import useRoomById from '../../hooks/api/useRoomById';
import useHotelById from '../../hooks/api/useHotel';
import { useState, useEffect } from 'react';

export default function FinalCard({ booking }) {
  const [hotelInfo, setInfo] = useState({});
  const { hotel } = useHotelById( booking.Room.hotelId);
  console.log(hotel);

  return (
    <Container >
      <Image src={hotel?.image} alt="imagem"/>
      <Name>{hotel?.name}</Name>
      <Details>Tipo de Acomodação: <div>Single, Double e Triple</div>
      </Details>
      <Details>Pessoas no seu quarto: <div></div>
      </Details>
    </Container>
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
