import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useHotel from '../../../hooks/api/useHotel';
export default function Hotel() {
  const [hotel, setHotel] = useState([]);
  const { hotels } = useHotel();
  useEffect(() => {
    if (hotels) {
      setHotel(hotels);
    //  console.log(hotels);
    }
  }, []);

  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      <Subtitle>Primeiro, escolha seu hotel</Subtitle>
      <CardConteiner>
        <Card>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcl7wnKXlkPujvGtuCFKDJgMrbocSfVqJURg&usqp=CAU' alt='hotel' />
          <h6>Nome do hotel</h6>
          <p>Tipos de acomodação:</p>
          <span>Single e Double</span>
          <p>Vagas disponíveis:</p>
          <span>103</span>
        </Card>
        <Card>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcl7wnKXlkPujvGtuCFKDJgMrbocSfVqJURg&usqp=CAU' alt='hotel' />
          <h6>Nome do hotel</h6>
          <p>Tipos de acomodação:</p>
          <span>Single e Double</span>
          <p>Vagas disponíveis:</p>
          <span>103</span>
        </Card>
        <Card>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcl7wnKXlkPujvGtuCFKDJgMrbocSfVqJURg&usqp=CAU' alt='hotel' />
          <h6>Nome do hotel</h6>
          <p>Tipos de acomodação:</p>
          <span>Single e Double</span>
          <p>Vagas disponíveis:</p>
          <span>103</span>
        </Card>
      </CardConteiner>
    </>);
};

const Title = styled.h4`
font-family: 'Roboto', sans-serif;
font-weight: 400;
font-size: 2rem;
`;
const Subtitle = styled.h6`
font-family: 'Roboto', sans-serif;
font-weight: 400;
font-size: 1.2rem;
color: #8e8e8e;
margin-top: 2.2rem;
`;
const CardConteiner = styled.div`
display: flex;
`;
const Card = styled.div`
width: 12.25rem;
height: 16.5rem;
border-radius: 10px;
background-color: #EBEBEB;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: flex-start;
padding-left: 0.7rem;
margin: 1rem;
font-family: 'Roboto', sans-serif;
img {
  width: 10.5rem;
  height: 7rem;
  border-radius: 5px;
  padding-top: 1rem;
};
h6{
  font-size: 1.2rem;
  font-weight: 400;
  color: #343434;
};
p{
  font-weight: 700;
  font-size: 0.8rem;
  color: #3C3C3C;
};
span{
  font-size: 0.8rem;
  font-weight: 400;
  color: #3C3C3C;
};
`;
