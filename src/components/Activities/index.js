import EventDay from './EventDay';
import EventTime from './EventTime';
import { useState } from 'react';

export default function ActivitiesBlock() {
  const [dateSelect, setDateSelect] = useState(true);

  return (
    <>
      <EventDay />
      { dateSelect ? <EventTime /> : ''}
    </>
  );
};
