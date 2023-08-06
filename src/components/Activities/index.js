import EventDay from './EventDay';
import EventTime from './EventTime';
import { useState } from 'react';
import useActivities from '../../hooks/api/useActivities';
import { Label } from '../../components/Auth';

export default function ActivitiesBlock() {
/*   Instruções
As atividades são divididas por dias e espaços.
Cada atividade tem um número limitado de vagas, sendo assim, se estiver esgotada, 
novos integrantes não podem se cadastrar.
O usuário não pode se cadastrar em dois eventos que acontecem simultaneamente.
Não é possível desfazer uma reserva em um evento. */
  const [dateSelect, setDateSelect] = useState(true);
  const [clickeDay, setClickeDay] = useState();
  const { activities, getActivities } = useActivities();

  if (!activities) {
    //melhorar menssagem de erro
    return <h5>iih deu erro</h5>;
  }

  return (
    <>
      <Label>Escolha de atividades</Label>
      <EventDay />
      { dateSelect ? <EventTime /> : ''}
    </>
  );
};

