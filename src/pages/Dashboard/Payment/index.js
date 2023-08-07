import styled from 'styled-components';
import { Label } from '../../../components/Auth';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { useState } from 'react';

export default function Payment() {
  const [value, setValue] = useState(0);
  const [model, setModel] = useState('');
  const [hotel, setHotel] = useState('');
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [reserved, setReserved] = useState('');
  const { enrollment } =  useEnrollment();

  function presencial(i) {
    setValue(250);
    setModel(i);
    setOptionOne(i);
  }

  function online(i) {
    setValue(100);
    setModel(i);
    setHotel('');
    setOptionOne(i);
    setOptionTwo('');
  }

  function withHotel(i) {
    setValue(value + 350);
    setHotel(i);
    setOptionTwo(i);
  }

  function withoutHotel(i) {
    setValue(250);
    setHotel(i);
    setOptionTwo(i);
  }

  function reserv() {
    setReserved('reserved');
  }

  if (!enrollment) {
    return (
      <>
        <Label>Ingresso e pagamento</Label>
        <Paragraph>
          Você precisa completar sua inscrição antes
          <br /> de prosseguir pra escolha de ingresso
        </Paragraph>
      </>
    );
  } else {
    return (
      <>
        {reserved !== 'reserved' ? <>
          <Label>Escolha de atividades</Label>
          <Category>
            Primeiro, escolha sua modalidade de ingresso
          </Category>
          <Buttons>
            <Option disabled={'Presencial' === optionOne ? true : false} onClick={() => presencial('Presencial')}>
              <Text>Presencial</Text>
              <Text2>R$ 250</Text2>
            </Option>
            <Option disabled={'Online' === optionOne ? true : false} onClick={() => online('Online')}>
              <Text>Online</Text>
              <Text2>R$ 100</Text2>
            </Option>
          </Buttons>
          {model === 'Presencial' ? <>
            <Category>
              Ótimo! Agora escolha sua modalidade de hospedagem
            </Category>
            <Buttons>
              <Option disabled={'Sem Hotel' === optionTwo ? true : false} onClick={() => withoutHotel('Sem Hotel')}>
                <Text>Sem Hotel</Text>
                <Text2>+ R$ 0</Text2>
              </Option>
              <Option disabled={'Com Hotel' === optionTwo ? true : false} onClick={() => withHotel('Com Hotel')}>
                <Text>Com Hotel</Text>
                <Text2>+ R$ 350</Text2>
              </Option>
            </Buttons>
          </> : ''}
          {hotel === 'Com Hotel' || hotel === 'Sem Hotel' || model === 'Online' ? <>
            <Category>
              Fechado! O total ficou em R${value}. Agora é só confirmar:
            </Category>
            <Reserv onClick={() => reserv()}>
              <p>Reservar Ingresso</p>
            </Reserv>
          </> : ''}
        </> : <>
          <Label>
            Escolha de atividades
          </Label>
          <Category>
            Ingresso escolhido
          </Category>
          <Ticket>
            <Text>{model} + {hotel} </Text>
            <Text2>R${value}</Text2>
          </Ticket>
        </>
        }
      </>
    );
  }
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

const Category = styled.p`
  font-family: Roboto;
  font-size: 20px;
  line-height: 23px;
  font-weight: 400;
  color: #8e8e8e;
  margin-top: 240px;
  margin-top: 30px;
`;

const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
`;

const Option = styled.button`
  width: 145px;
  height: 145px;
  top: 323px;
  left: 341px;
  border-radius: 20px;
  margin-right: 20px;
  border: 1px solid ${props => props.disabled ? '#FFEED2' : '#CECECE'};
  background-color: ${props => props.disabled ? '#FFEED2' : '#FFFFFF'};
`;

const Text = styled.p`
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;
    color: #454545;
    margin-top: 10px;
`;

const Text2 = styled.p`
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;
    line-height: 16.41px;
    letter-spacing: 0em;
    text-align: center;
    color: #898989;
    margin-top: 5px;
`;

const Reserv = styled.button`
    margin-top: 15px;
    width: 162px;
    height: 37px;
    top: 552px;
    left: 341px;
    border: none;
    border-radius: 4px;
    box-shadow: 0px 2px 10px 0px #00000040;
   p{
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: center;
}
`;

const Ticket = styled.button`
    margin-top: 15px;
    width: 290px;
    height: 108px;
    top: 292px;
    left: 330px;
    border-radius: 20px;
    background: #FFEED2;
    border: none;
`;
