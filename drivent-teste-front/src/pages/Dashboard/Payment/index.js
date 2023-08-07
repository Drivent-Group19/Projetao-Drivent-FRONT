import React, { useEffect } from 'react';
import useGetEnrollment from '../../../hooks/api/useGetEnrollment';
import { ticketTypeApi } from '../../../services/ticketTypeApi';
import useToken from '../../../hooks/useToken';
import Option from './Option';
import card from '../../../assets/images/card.png';
import { FormWrapper } from '../../../components/PersonalInformationForm/FormWrapper';
import { InputWrapper } from '../../../components/PersonalInformationForm/InputWrapper';
import Input from '../../../components/Form/Input';
import { toast } from 'react-toastify';
import { makePayment, reserveTicket } from '../../../services/paymentApi';
import styled from 'styled-components';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { useState } from 'react';

export default function Payment() {
  const token = useToken();
  const [ticketsType, setTicketsType] = React.useState([]);
  const [typeSelected, setTypeSelected] = React.useState({ id: '', name: '', price: '', includesHotel: false, isRemote: false });
  const [hotelSelected, setHotelSelected] = React.useState({ name: '', price: '' });
  const { data: enrollmentData, getEnrollmentLoading } = useGetEnrollment();
  const [savedEnrollment, setSavedEnrollment] = React.useState(enrollmentData ? true : false);
  const [show, setShow] = React.useState('ingresso');
  const initialValues = {
    name: '',
    validThru: '',
    cardNumber: '',
    cvc: '',
    issuer: 'mastercard',
  };
  const [data, setData] = React.useState(initialValues);

  useEffect(() => {
    if (enrollmentData) {
      setSavedEnrollment(true);
    } else {
      setSavedEnrollment(false);
    }
    ticketTypeApi(token)
      .then((data) => setTicketsType(data))
      .catch((err) => console.log(err));
  }, [getEnrollmentLoading]);

  if (getEnrollmentLoading) return <></>;

  const [value, setValue] = useState(0);
  const [model, setModel] = useState('');
  const [hotel, setHotel] = useState('');
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [reserved, setReserved] = useState('');
  const { enrollment } = useEnrollment();

  function calculateFinalPrice() {
    if (!typeSelected.isRemote) return Number(typeSelected.price) + Number(hotelSelected.price);
    return typeSelected.price;
  }

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

  return (
    <>
      <PaymentPage isAllowed={savedEnrollment}>
        <Title>Ingresso e Pagamento</Title>
        <Container show={show}>
          <Description includesHotel={true}>Primeiro, escolha sua modalidade de ingresso</Description>

          <OptionContainer includesHotel={true}>
            {ticketsType.map(({ id, name, includesHotel, isRemote, price }) => {
              return (
                <Option key={id}
                  id={id}
                  name={name}
                  includesHotel={includesHotel}
                  isRemote={isRemote}
                  price={price}
                  setTypeSelected={setTypeSelected}
                  selected={(name === typeSelected.name)}
                ></Option>
              );
            })}
          </OptionContainer>

          <Description includesHotel={typeSelected.includesHotel} >Ótimo! Agora escolha sua modalidade de Hospedagem</Description>
          <OptionContainer includesHotel={typeSelected.includesHotel} >
            <SelectOption selectedBackground={hotelSelected.name === 'Sem hotel'}
              onClick={() => setHotelSelected({ name: 'Sem hotel', price: '0' })}>
              <OptionType>Sem hotel</OptionType>
              <OpetionPrice>+ R$ 0</OpetionPrice>
            </SelectOption>

            <SelectOption selectedBackground={hotelSelected.name === 'Com hotel'}
              onClick={() => setHotelSelected({ name: 'Com hotel', price: '250' })}>
              <OptionType>Com Hotel</OptionType>
              <OpetionPrice>+ R$ 250</OpetionPrice>
            </SelectOption>
          </OptionContainer>
          <Description includesHotel={hotelSelected.name !== '' || typeSelected.isRemote} >Fechado! O total ficou em <strong>R$ {calculateFinalPrice()}</strong>. Agora é só confirmar!</Description>
          <ConfirmButton includesHotel={hotelSelected.name !== '' || typeSelected.isRemote}
            onClick={() => {
              setShow('ingresso escolhido');
              console.log(typeSelected.id);
              reserveTicket({ ticketTypeId: typeSelected.id }, token)
                .then(data => console.log(data))
                .catch((err) => console.log(err));
            }}>RESERVAR INGRESSO</ConfirmButton>
        </Container>
        <FinalDescription show={show}>Ingresso escolhido</FinalDescription>
        <OptionBoxB show={show}>
          <OptionType>{typeSelected.name} + {hotelSelected.name}</OptionType>
          <OpetionPrice>R$ {Number(typeSelected.price) + Number(hotelSelected.price)}</OpetionPrice>
        </OptionBoxB>
        <FinalDescription show={show}>Pagamento</FinalDescription>
        <CardContainer show={show}>
          <img src={card} alt="Cartão" />
          <SubContainer>
            <FormWrapper>
              <InputWrapper>
                <Input
                  label="Número do Cartão"
                  name="cardNumber"
                  type="text"
                  mask='9999 9999 9999 9999'
                  maxLength="16"
                  value={data.cardNumber}
                  onChange={(e) => setData({ ...data, cardNumber: e.target.value })}
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  name="name"
                  label="Nome no Cartão"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  name="validThru"
                  label="Valid Thru"
                  type="text"
                  maxLength="5"
                  mask="99/99"
                  value={data.validThru}
                  onChange={(e) => setData({ ...data, validThru: e.target.value })}
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  name="cvc"
                  label="CVC"
                  type="text"
                  mask="999"
                  maxLength="3"
                  value={data.cvc}
                  onChange={(e) => setData({ ...data, cvc: e.target.value })}
                />
              </InputWrapper>
            </FormWrapper>
          </SubContainer>
        </CardContainer>
        <Button show={show} onClick={() => {
          const body = {
            ticketId: typeSelected.id,
            cardData: {
              issuer: data.issuer,
              number: data.cardNumber,
              name: data.name,
              expirationDate: data.validThru,
              cvv: data.cvc
            }
          };
          makePayment(body, token)
            .then(() => {
              setShow('confirmação');
              toast('Pagamento feito com sucesso!!');
            })
            .catch((err) => {
              console.log(err);
              toast('Não foi possível realizar o pagamento');
            });
        }}>FINALIZAR PAGAMENTO</Button>
        <ContainerC show={show}>
          <Icon />
          <div>
            <h2>Pagamento confirmado!!</h2>
            <h3>Prossiga para escolha de hospedagem e atividades</h3>
          </div>
        </ContainerC>
      </PaymentPage>
      <NotAvailablePage isAllowed={savedEnrollment}>Você precisa completar sua inscrição antes de prosseguir para a escolha de ingresso</NotAvailablePage>
      {reserved !== 'reserved' ? <>
        <Label>Escolha de atividades</Label>
        <Category>Primeiro, escolha sua modalidade de ingresso</Category>
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
          <Category>Ótimo! Agora escolha sua modalidade de hospedagem</Category>
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
          <Category>Fechado! O total ficou em R$ {value}. Agora é só confirmar:</Category>
          <Reserv onClick={() => reserv()}>
            <p>Reservar Ingresso</p>
          </Reserv>
        </> : ''}
      </> : <>
        <Label>Escolha de atividades</Label>
        <Category>Ingresso escolhido</Category>
        <Ticket>
          <Text>{model} + {hotel} </Text>
          <Text2>R$ {value}</Text2>
        </Ticket>
      </>}
    </>
  );
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
const Container = styled.div`
  display: ${(props) => (props.show === 'ingresso' ? 'initial' : 'none')};
`;

const CardContainer = styled.div`
  display: ${(props) => (props.show === 'ingresso escolhido' ? 'initial' : 'none')};
  img {
    width: 300px;
    height: 200px;
  }
  position: relative;
`;

const ContainerC = styled.div`
  display: ${(props) => (props.show === 'confirmação' ? 'flex' : 'none')};
  margin-top: 15px;
  div {
    padding-top: 8px;
  }
  h2 {
    font-family: Roboto;
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
  }
  h3 {
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
  }
`;

const Icon = styled(AiFillCheckCircle)`
  width: 44px;
  height: 44px;
  color: #6bba54;
  margin-right: 10px;
`;

const SubContainer = styled.div`
  width: 500px;
  height: 200px;
  position: absolute;
  top: 10%;
  left: 40%;
`;

const PaymentPage = styled.div`
  padding: 15px;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.isAllowed ? '' : 'none')};
`;

const Title = styled.h1`
  width: 438px;
  height: 40px;
  font-family: Roboto;
  font-size: 34px;
  font-weight: 400;
  line-height: 40px;
  letter-spacing: 0em;
  text-align: left;
  color: #000000;
`;

const Description = styled.p`
  width: 600px;
  height: 23px;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: #8e8e8e;
  margin-top: 30px;
  display: ${(props) => (props.includesHotel ? 'initial' : 'none')};
`;

const FinalDescription = styled.p`
  width: 600px;
  height: 23px;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: #8e8e8e;
  margin-top: 30px;
  display: ${(props) =>
    props.show === 'ingresso escolhido' || props.show === 'confirmação'
      ? 'initial'
      : 'none'};
`;

const SelectOption = styled.div`
  width: 145px;
  height: 145px;
  border-radius: 20px;
  border: 1px solid #cecece;
  margin-top: 15px;
  margin-right: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.selectedBackground ? '#ffe ed2' : 'white'};
`;

const OptionBoxB = styled.div`
  width: 290px;
  height: 108px;
  border-radius: 20px;
  border: 1px solid #cecece;
  margin-top: 15px;
  margin-right: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffe ed2;
  display: ${(props) =>
    props.show === 'ingresso escolhido' || props.show === 'confirmação'
      ? 'initial'
      : 'none'};
`;

const OptionType = styled.p`
  width: 200px;
  height: 19px;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
`;

const OpetionPrice = styled.p`
  width: 94px;
  height: 16px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: #898989;
  margin-top: 8px;
`;

const OptionContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  display: ${(props) => (props.includesHotel ? 'initial' : 'none')};
`;

const ConfirmButton = styled.button`
  width: 182px;
  height: 37px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: #000000;
  margin-top: 12px;
  display: ${(props) => (props.includesHotel ? 'initial' : 'none')};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  width: 182px;
  height: 37px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: #000000;
  margin-top: 12px;
  display: ${(props) =>
    props.show === 'ingresso escolhido' ? 'initial' : 'none'};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
`;

const NotAvailablePage = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props) => (!props.isAllowed ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;

  font-family: Roboto;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: center;
`;