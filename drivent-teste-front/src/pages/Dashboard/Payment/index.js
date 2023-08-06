import React, { useEffect } from 'react';
import { SubContainer, Container, ContainerB, ContainerC, Icon, OptionBoxB, Button, PaymentPage, Title, Description, DescriptionB, OptionBox, OptionType, OpetionPrice, OpetionContainer, ConfirmButton, NonAvailablePage } from './style';
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
export default function Payment() {
  const token = useToken();
  const [ticketsType, setTicketsType] = React.useState([]);
  const [typeSelected, setTypeSelected] = React.useState({ id: '', name: '', price: '', includesHotel: false, isRemote: false });
  const [hotelSelected, setHotelSelected] = React.useState({ name: '', price: '' });
  const { data: enrollmentData, getEnrollmentLoading } = useGetEnrollment();
  const [savedEnrollment, setSavedEnrollment] = React.useState(enrollmentData ? true : false);
  const [show, setShow] = React.useState('ingresso');
  const initialValues =  {
    name: '',
    validThru: '',
    cardNumber: '',
    cvc: '',
    issuer: 'mastercard',
  };
  const [data, setData] = React.useState(initialValues);

  function calculateFinalPrice() {
    if(!typeSelected.isRemote) return Number(typeSelected.price) + Number(hotelSelected.price);  
    return typeSelected.price;
  }

  useEffect(() => {
    if(enrollmentData) {
      setSavedEnrollment(true);
    }else {
      setSavedEnrollment(false);
    }
    ticketTypeApi(token)
      .then((data) => setTicketsType(data))
      .catch((err) => console.log(err));
  }, [getEnrollmentLoading]);

  if(getEnrollmentLoading) return <></>;

  return (
    <>
      <PaymentPage isAllowed={savedEnrollment}>
        <Title>Ingresso e Pagamento</Title>
        <Container show={show}>
          <Description includesHotel={true}>Primeiro, escolha sua modalidade de ingresso</Description>
          
          <OpetionContainer includesHotel={true}>
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
          </OpetionContainer>
          
          <Description includesHotel={typeSelected.includesHotel} >Ótimo! Agora escolha sua modalidade de Hospedagem</Description>
          <OpetionContainer includesHotel={typeSelected.includesHotel} >
            <OptionBox selectedBackground={hotelSelected.name === 'Sem hotel'} 
              onClick={() => setHotelSelected({ name: 'Sem hotel', price: '0' })}>
              <OptionType>Sem hotel</OptionType>
              <OpetionPrice>+ R$ 0</OpetionPrice>
            </OptionBox>

            <OptionBox selectedBackground={hotelSelected.name === 'Com hotel'} 
              onClick={() => setHotelSelected({ name: 'Com hotel', price: '250' })}>
              <OptionType>Com Hotel</OptionType>
              <OpetionPrice>+ R$ 250</OpetionPrice>
            </OptionBox>
          </OpetionContainer>
          <Description includesHotel={hotelSelected.name !== '' || typeSelected.isRemote } >Fechado! O total ficou em <strong>R$ {calculateFinalPrice()}</strong>. Agora é só confirmar!</Description>
          <ConfirmButton includesHotel={hotelSelected.name !== '' || typeSelected.isRemote } 
            onClick={() => {
              setShow('ingresso escolhido');
              console.log(typeSelected.id);
              reserveTicket({ ticketTypeId: typeSelected.id }, token)
                .then(data => console.log(data))
                .catch((err) => console.log(err));
            }}>RERSERVAR INGRESSO</ConfirmButton>
        </Container>
        <DescriptionB show={show}>Ingresso escolhido</DescriptionB>
        <OptionBoxB show={show}>
          <OptionType>{typeSelected.name} + {hotelSelected.name}</OptionType>
          <OpetionPrice>R$ {Number(typeSelected.price) + Number(hotelSelected.price)}</OpetionPrice>
        </OptionBoxB>
        <DescriptionB show={show}>Pagamento</DescriptionB>
        <ContainerB show={show}>
          <img src={card} alt="Cartão" />
          <SubContainer>
            <FormWrapper>
              <InputWrapper>
                <Input
                  label="Card Number"
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
                  label="Name"
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
        </ContainerB>
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
          <Icon/>
          <div>
            <h2>Pagamento confirmado!!</h2>
            <h3>Prossiga para escolha de hospedagem e atividades</h3>
          </div>
        </ContainerC>
      </PaymentPage>
      <NonAvailablePage isAllowed={savedEnrollment}>Voce precisa completar sua incrição antes de prosseguir pra escolha de ingresso</NonAvailablePage>
    </>
  );
}
