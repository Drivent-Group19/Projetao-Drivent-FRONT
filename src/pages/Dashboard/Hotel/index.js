import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useHotel from '../../../hooks/api/useHotel';
import Card from '../../../components/Hotel/Card';
import Room from '../../../components/Hotel/Rooms';

export default function Hotel() {
  const [hoteis, setHoteis] = useState([]);
  const { hotels } = useHotel();
  const [selectedHotelId, setSelectedHotelId] = useState(0);
  const [selectedHotel, setSelectedHotel]= useState({});

  useEffect( () => {
    if(hotels) {
      setHoteis(hotels);
    }
  }, [hotels, selectedHotelId]);

  const [buttons, setButtons]= useState('');

  function Select(info) {
    setButtons(info.name);
    setSelectedHotelId(info.id);
    setSelectedHotel(info);
  }

  return (<div>
    <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
    <ChooseHotel>Primeiro escolha seu hotel!</ChooseHotel>
    <CardContainer>{hoteis[0] ? hoteis.map((i) => <Button onClick={() => Select(i)} name={i.name} disabled={i.name === buttons ? true : false}><Card hotelInfo={i} selected={i.name === buttons ? true: false}/></Button>) : ''}</CardContainer>
    <BedroomsContainer>{ selectedHotelId !== 0 ? <Room hotel={selectedHotel}/> : '' }</BedroomsContainer>

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

