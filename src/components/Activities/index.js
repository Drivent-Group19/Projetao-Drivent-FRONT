import EventDay from './EventDay';
import EventTime from './EventTime';
import { useState } from 'react';
import useActivities from '../../hooks/api/useActivities';
import { Label } from '../../components/Auth';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export default function ActivitiesBlock() {
  const [clickeDay, setClickeDay] = useState();
  const { activities, getActivities } = useActivities();

  if (!activities) {
    return <h5>Something went wrong. Try again later.</h5>;
  }

  return (
    <>
      <StyledTypography>Escolha de atividades</StyledTypography>
      <EventDay setClickeDay={setClickeDay} activities={activities} />
      <EventTime getActivities={getActivities} activities={activities} clickeDay={clickeDay} />
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
