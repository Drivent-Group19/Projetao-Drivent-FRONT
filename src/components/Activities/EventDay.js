import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';
import styled from 'styled-components';

export default function EventDay({ setClickeDay, activities }) {
  const [clicked, setClicked] = useState(null);

  const clickeDate = (date) => {
    setClickeDay(date);
    setClicked(date);
  };

  if (!activities) return <></>;

  const dateUnique = activities.reduce((uniqui, activity) => {
    const startsDate = activity.startsAt.split('T')[0];
    const parsedDate = parseISO(startsDate);
    const formatDate = format(parsedDate, 'EEE, dd/MM', { locale: ptBR });
    if (!uniqui.includes(formatDate)) {
      uniqui.push(formatDate);
    }
    return uniqui;
  }, []);

  return (
    <>
      <Dates>Primeiro, filtre pelo dia do evento:</Dates>
      <AllDates>
        {dateUnique.map((date) => {
          const isClicked = clicked === date;
          return (
            <Date key={date} onClick={() => clickeDate(date)} selected={isClicked}>
              {date}
            </Date>
          );
        })}
      </AllDates>
    </>
  );
}

const Dates = styled.h1`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 20px;
  line-height: 23.44px;
  color: #8e8e8e;
  margin-bottom: 20px;
`;

const AllDates = styled.div`
  display: flex;
  flex-direction: row;
`;

const Date = styled.button`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  color: #000000;
  text-align: center;
  justify-content: center;
  background-color: ${(props) => (props.selected ? '#FFD37D' : '#E0E0E0')};
  width: 131px;
  height: 37px;
  border-radius: 4px;
  border: none;
  box-shadow: 0px 2px 10px 0px #00000040;
  margin-right: 15px;
  cursor: pointer;
  &:hover {
    background-color: #FFD37D;
  }
`;
