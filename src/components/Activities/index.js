import { useState } from 'react';
import useActivities from '../../hooks/api/useActivities';
import { Label } from '../../components/Auth';

export default function ActivitiesComponents() {
  const [clickeDay, setClickeDay] = useState();
  const { activities, getActivities } = useActivities();

  if (!activities) {
    //melhorar menssagem de erro
    return <h5>iih deu erro</h5>;
  }
  return (
    <>
      <Label>Escolha de atividades</Label>
      {/* Chamar o EventDay */}
      {/* Chamar o EventTime */}
    </>
  );
}
