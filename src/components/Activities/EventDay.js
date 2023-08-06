import styled from 'styled-components';

export default function EventDay() {
  return (
    <>
      <Dates>Primeiro, filtre pelo dia do evento:</Dates>
      <AllDates>
        <Date>Sexta, 22/10</Date>
        <Date>Sábado, 23/10</Date>
        <Date>Domingo, 24/10</Date>
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

const Date = styled.div`
    family-font: Roboto;
    weight: 400;
    font-size: 14px;
    font-color: #000000;
    text-align: center;
    padding-top: 10px;
    line-height: 16.41px;
    background-color: #E0E0E0;
    width: 131px;
    height: 37px;
    border-radius: 4px;
    box-shadow: 0px 2px 10px 0px #00000040;
    margin-right: 15px;
`;
