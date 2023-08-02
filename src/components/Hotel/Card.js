
import styled from 'styled-components';

export default function Card(hotelInfo) {
  return (
    <Container>
      <Image src={hotelInfo.image}/>
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

