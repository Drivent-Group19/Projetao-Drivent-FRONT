import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useHotel from '../../../hooks/api/useHotel';
import Card from '../../../components/Hotel/Card';

export default function Hotel() {
  const [hoteis, setHoteis] = useState([]);
  const { hotels } = useHotel();

  useEffect( () => {
    if(hotels) {
      setHoteis(hotels);
    }
  }, [hotels]);

  return (<div>
    <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
    <ChooseHotel>Primeiro escolha seu hotel!</ChooseHotel>
    <CardContainer>{hotels.map((i) => Card(i))}</CardContainer>
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
margin-top:20px;`;
