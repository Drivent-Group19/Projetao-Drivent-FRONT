
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export default function Card(hotelInfo) {
  let available=0;

  for (let i=0; i < hotelInfo.rooms.length; i++) {
    available = available + hotelInfo.rooms[i].capacity;
  }
  return (
    <Container>
      <Image src={hotelInfo.image} alt="imagem"/>
      <Name>{hotelInfo.name}</Name>
      <Details>Tipo de Acomodação:
        <div>{hotelInfo.rooms.map((i) => `${i.name}, `)}</div>
      </Details>
      <Details>Quantidade de Vagas:
        <div>{available}</div>
      </Details>
      
    </Container>
  );
}

const Container = styled.div `
display: flex;
flex-direction:column;
background-color: grey;
justify-content: space-between;
align-items: center;
height: 200px;
width:70px;
`;

const Image= styled.image `
width:50px;
height:30px;
border-radius: 8px;
margin-top: 5px;`;

const Name= styled.div `
height: 15px;
weight:700;
font-size: 25px`;

const Details= styled.div `
weight:700;
height: 10px;
div {
  margin-top:5px;
  weight:400
  height: 7px;
};
margin-bottom: 5px;`;

