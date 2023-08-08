import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useHotel from '../../../hooks/api/useHotel';
import Card from '../../../components/Hotel/Card';
import Room from '../../../components/Hotel/Rooms';
import FinalCard from '../../../components/Hotel/FinalCard';
import useGetBookingByUser from '../../../hooks/api/useGetBookingByUser';
import useTicket from '../../../hooks/api/useTicket';

export default function Hotel() {
  const [hoteis, setHoteis] = useState([]);
  const { ticket } = useTicket();
  const { hotels } = useHotel();
  const { userBooking }  = useGetBookingByUser();
  const [ingresso, setIngresso] = useState({});
  const [selectedHotelId, setSelectedHotelId] = useState(0);
  const [selectedHotel, setSelectedHotel]= useState({});
  const [book, setBook]= useState({});

  useEffect( () => {
    if(ticket) {
      setHoteis(hotels);
      setBook(userBooking);
      setIngresso(ticket);
      console.log(ticket)
      ;
    }
  }, [ticket]);

  const [buttons, setButtons]= useState('');

  function Select(info) {
    setButtons(info.name);
    setSelectedHotelId(info.id);
    setSelectedHotel(info);
  }

  console.log(ticket);
 
  return (<div>
    <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
    {ingresso.status === 'RESERVED' || !ingresso.id ? 
      <MessageContainer>Seu pagamento não foi confirmado.
        <p>Efetue o pagamento para reservar um hotel.</p></MessageContainer>
      : ticket?.TicketType?.includesHotel ?
        ( userBooking ? <FinalCard booking={userBooking}/> :  <><ChooseHotel>Primeiro escolha seu hotel!</ChooseHotel>
          <CardContainer>{hoteis[0] ? hoteis.map((i) => <Button onClick={() => Select(i)} name={i.name} disabled={i.name === buttons ? true : false}><Card hotelInfo={i} selected={i.name === buttons ? true : false} /></Button>) : ''}</CardContainer>
          <BedroomsContainer>{selectedHotelId !== 0 ? <Room hotel={selectedHotel} /> : ''}</BedroomsContainer></>)
        : <MessageContainer>Sua modalidade de ingresso não inclui hospedagem. 
          <p>Prossiga para a escolha de atividades.</p></MessageContainer> }

  </div>);
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const ChooseHotel = styled.div `
height: 50px;
color: lightgrey;`;

const CardContainer = styled.div `
display:flex;
flex-direction:row;
align-items: center;
justify-content: space-evenly;
height: 280px;
margin-top:20px;
overflow-x: scroll`;

const Button= styled.button `
background-color: transparent;
height: 240px;
width:210px;
z-index:4;
border-radius: 8px;`;

const BedroomsContainer = styled.div `
width: 800px;
margin-top: 40px;
margin-left:40px;
`;
const MessageContainer = styled.div`
  size: 20px;
  line-height: 23.44px;
  text-align: center;
  color: #8E8E8E;
  width: 411px;
  height: 46px;
  position: absolute; 
  top: 40%;
  left: 30%;
`;

