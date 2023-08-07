import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useHotel from '../../../hooks/api/useHotel';
import Card from '../../../components/Hotel/Card';
import Room from '../../../components/Hotel/Rooms';
import useTicket from '../../../hooks/api/useTicket';

export default function Hotel() {
  const [hoteis, setHoteis] = useState([]);
  const { hotels } = useHotel();
  const { ticket } = useTicket();
  const [selectedHotelId, setSelectedHotelId] = useState(0);
  const [selectedHotel, setSelectedHotel]= useState({});
  const [buttons, setButtons]= useState('');
  const [isNotPaid, setIsNotPaid] = useState(false);
  const [isNotIncludeHotel, setIsNotIncludeHotel] = useState(false);

  useEffect( () => {
    //buscar informações sobre pagamento
    //se não estiver pago 
    /*  if (ticket.status === 'RESERVED') {
      setIsNotPaid(true);
      setIsNotIncludeHotel(false);
    }
    // se não houver hotel
    else if (ticket.includesHotel === false) {
      setIsNotPaid(false);
      setIsNotIncludeHotel(true); 
    }*/
    /* else  */ if(hotels) {
      /* setIsNotPaid(false); */
      /* setIsNotIncludeHotel(false); */
      setHoteis(hotels);
      console.log(hotels);
    }
  }, [/* ticket, */ hotels, selectedHotelId]);

  function Select(info) {
    setButtons(info.name);
    setSelectedHotelId(info.id);
    setSelectedHotel(info);
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {isNotPaid ? (
        <MessageContainer>Seu pagamento não foi confirmado.
          <p>Efetue o pagamento para reservar um hotel.</p></MessageContainer>
      ) : (isNotIncludeHotel ? (
        <MessageContainer>Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades.</MessageContainer>
      ) : ( 
        <>
          <ChooseHotel>Primeiro escolha seu hotel!</ChooseHotel>
          <CardContainer>
            {hoteis[0] ? (
              hoteis.map((i) => 
                <Button onClick={() => Select(i)} name={i.name} disabled={i.name === buttons ? true : false}>
                  <Card hotelInfo={i} selected={i.name === buttons ? true: false}/>
                </Button>)
            ) : ''}
          </CardContainer>
          <BedroomsContainer>
            { selectedHotelId !== 0 ? <Room hotel={selectedHotel}/> : '' }
          </BedroomsContainer>
        </>
      ))}
    </>
  );
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
  font-size: 20px;
  line-height: 23.44px;
  text-align: center;
  color: #8E8E8E;
  width: 411px;
  height: 46px;
  position: absolute; 
  top: 40%;
  left: 30%;
`;
