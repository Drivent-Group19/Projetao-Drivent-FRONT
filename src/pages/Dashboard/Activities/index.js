import styled from 'styled-components';
import useTicket from '../../../hooks/api/useTicket';
import { Typography } from '@material-ui/core';

export default function Activities() {
  const { ticket } = useTicket();

  if (ticket?.status !== 'PAID') {
    return (
      <>
        <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
        <Paragraph>Você precisa ter confirmado o pagamento antes de fazer a escolha de atividades</Paragraph>
      </>
    );
  }

  if (ticket?.ticketType.includesHotel === false) {
    return (
      <>
        <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
        <Paragraph>Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades</Paragraph>
      </>
    );
  }
  return;
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const Paragraph = styled.div`
  font-size: 20px;
  line-height: 23.44px;
  text-align: center;
  color: #8e8e8e;
  width: 411px;
  height: 46px;
  position: absolute;
  top: 40%;
  left: 30%;
`;
