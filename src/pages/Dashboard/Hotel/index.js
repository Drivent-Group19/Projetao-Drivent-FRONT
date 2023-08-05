import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import useToken from '../../../hooks/useToken';
import api from '../../../services/api';

export default function Hotel() {
  const [isNotPaid, setIsNotPaid] = useState(false);
  const [isNotIncludeHotel, setIsNotIncludeHotel] = useState(true);

  //buscar informações sobre pagamento

  const token = useToken();
  console.log(token);
  async function getTicket(token) {
    let res = '';
    try{
      const response = await api.get('/tickets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      res = response.data;
    }
    catch (erro) {
      console.log(erro);
      res = erro;
    }
    //se não estiver pago 
    if (res.status === 'RESERVED') {
      setIsNotPaid(true);
      setIsNotIncludeHotel(false);
    }
    // se não houver hotel
    if(res.includesHotel === false) {
      setIsNotPaid(false);
      setIsNotIncludeHotel(true);
    }
  }
  getTicket(token);

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {isNotPaid ? (
        <MessageContainer>Seu pagamento não foi confirmado.
          <p>Efetue o pagamento para reservar um hotel.</p></MessageContainer>
      ) : (isNotIncludeHotel ?
        <MessageContainer>Sua modalidade de ingresso não inclui hospedagem. 
          <p>Prossiga para a escolha de atividades.</p></MessageContainer>
        : 
        'Mostrar hoteis'
      )}
    </>
  );
}

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

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
