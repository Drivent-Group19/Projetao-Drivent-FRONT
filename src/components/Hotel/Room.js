import styled from 'styled-components';

export default function Room(roomInfo) {
  let quantidade = [];
  for (let i=0; i < roomInfo.capacity; i++) {
    quantidade.push(i);
  }

  let tam= quantidade.length;

  let notAvailable= roomInfo.bookings.length;
  let dif = tam - notAvailable;

  return (
    <Container>
      <div>{roomInfo.id}</div>
      <div>{tam === notAvailable ? quantidade?.map((i) => <ion-icon name="person"></ion-icon>) : dif === tam ? quantidade?.map((i) => <ion-icon name="person" color="gray"></ion-icon>) : true }</div>
    </Container>
  );
};

const Container = styled.div `
width:100px;
height: 30px;
display:flex;
flex-direction:row;
justify-content: space-between;
div {
    width:40px
}
`;
