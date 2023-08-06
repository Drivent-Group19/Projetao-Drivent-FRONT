import { useState } from 'react';
import styled from 'styled-components';

export default function EventDay() {
  const [clicked, setClicked] = useState(null);
  function isActive(e) {
    console.log('entrou', e.target.innerText);
    if(e.target.innerText === clicked) {
      setClicked(null);
    }
    else{
      setClicked(e.target.innerText);
    }
  }

  return (
    <>
      <Dates>Primeiro, filtre pelo dia do evento:</Dates>
      <AllDates>
        <Date isClicked={'Sexta, 22/10'===clicked} onClick={(e) => isActive(e)}>Sexta, 22/10</Date>
        <Date isClicked={'Sábado, 23/10'===clicked} onClick={(e) => isActive(e)}>Sábado, 23/10</Date>
        <Date isClicked={'Domingo, 24/10'===clicked} onClick={(e) => isActive(e)}>Domingo, 24/10</Date>
      </AllDates>
    </>
  );
};

const Dates = styled.h1`
    family-font: Roboto;
    weight: 400;
    font-size: 20px;
    line-height: 23.44px;
    color: #8E8E8E;
    margin-bottom: 20px;
`;

const AllDates = styled.div`
    display: flex;
    flex-direction: row;
`;

const Date = styled.button`
    family-font: Roboto;
    weight: 400;
    font-size: 14px;
    font-color: #000000;
    text-align: center;
    justify-content: center;
    line-height: 16.41px;
    /* background-color: #E0E0E0; */
    background-color: ${props => (props.isClicked ? '#FFD37D' : '#E0E0E0')};
    width: 131px;
    height: 37px;
    border-radius: 4px;
    border:none;
    box-shadow: 0px 2px 10px 0px #00000040;
    margin-right: 15px;
`;
