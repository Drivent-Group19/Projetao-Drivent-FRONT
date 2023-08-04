import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useHotel from '../../../hooks/api/useHotel';
import Card from '../../../components/Hotel/Card';
import Room from '../../../components/Hotel/Room';

export default function Hotel() {
  const [hoteis, setHoteis] = useState([]);
  const { hotels } = useHotel();

  useEffect( () => {
    if(hotels) {
      setHoteis(hotels);
    }
  }, [hotels]);

  const [buttons, setButtons]= useState('');
  const [room, setRoom] =useState(0);
  const [selectedHotelId, setSelectedHotelId] = useState(0);

  function Select(info) {
    setButtons(info.name);
    setSelectedHotelId(info.id);
  }

  function Select2(id) {
    setRoom(id);
  }

  return (<div>
    <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
    <ChooseHotel>Primeiro escolha seu hotel!</ChooseHotel>
    <CardContainer>{hotels?.map((i) => <Button onClick={() => Select(i)} name={i.name} disabled={i.name === buttons ? true : false}>{Card(i, i.name === buttons)}</Button>)}</CardContainer>
    <RoomsContainer selected={buttons}>{hotels.rooms?.map((j) => <Button2 onClick={() => Select2(j.id)} disabled={true} color={j.id === room ? true : false} >{Room(j)}</Button2>)}</RoomsContainer>

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
justify-content: space-between;
align-items: center;
height: 230px;
margin-top:20px;
overflow-x: scroll`;

const Button= styled.button `
background-color: ${props => props.disabled ? 'lightyellow' : 'gray'};
height: 200px;
width:70px;`;

const RoomsContainer = styled.div `
display: ${props => props.selected === '' ? 'none' : 'flex'};
flex-wrap: wrap;
width: 500px;
`;

const Button2= styled.div `
background-color: ${props => props.disabled ? 'gray': props.color ? 'lightyellow' : 'white'};
width:100px;
height: 30px;`;
