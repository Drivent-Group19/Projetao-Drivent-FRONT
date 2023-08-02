import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Hotel() {
  const [hotels, setHotels] = useState([]);

  useEffect( () => {

  }, []);
  return (<div>
    <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
    <ChooseHotel>Primeiro escolha seu hotel!</ChooseHotel>
  </div>);
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const ChooseHotel = styled.div `
height: 50px;
color: lightgrey;`;
