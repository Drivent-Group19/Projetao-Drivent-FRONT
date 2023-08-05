import styled from 'styled-components';
import { Label } from '../../../components/Auth';
import useTicket from '../../../hooks/api/useTicket';
import ActivitiesComponents from '../../../components/Activities';

export default function Activities() {
  const { ticket } = useTicket();

  if (ticket?.status !== 'PAID') {
    return (
      <>
        <Label>Escolha de atividades</Label>
        <Paragraph>
          Você precisa ter confirmado pagamento antes
          <br /> de fazer a escolha de atividades
        </Paragraph>
      </>
    );
  }
  // fazer outro if para verificar se o tipo do ticket inclue hotel

  return <ActivitiesComponents />;
}

const Paragraph = styled.p`
  font-family: Roboto;
  font-size: 20px;
  line-height: 23px;
  font-weight: 400;
  text-align: center;
  color: #8e8e8e;
  margin-top: 240px;
`;
