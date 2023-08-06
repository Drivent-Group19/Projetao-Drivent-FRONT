import styled from 'styled-components';
import { AiFillCheckCircle } from 'react-icons/ai';

export const Container = styled.div`
display: ${(props) => props.show === 'ingresso' ? 'init' : 'none'};
`;

export const ContainerB = styled.div`
display: ${(props) => props.show === 'ingresso escolhido' ? 'init' : 'none'};
img{
  width: 300px;
  height: 200px;  
}
position: relative;
// background: pink;
`;

export const ContainerC = styled.div`
display: ${(props) => props.show === 'confirmação' ? 'flex' : 'none'};
margin-top: 15px;
div{
  padding-top: 8px;
}
h2{
font-family: Roboto;
font-size: 16px;
font-weight: 700;
line-height: 19px;
letter-spacing: 0em;
text-align: left;
}
h3{
font-family: Roboto;
font-size: 16px;
font-weight: 400;
line-height: 19px;
letter-spacing: 0em;
text-align: left;
}
`;

export const Icon = styled(AiFillCheckCircle)`
width: 44px;
height: 44px;
color: #6BBA54;
margin-right: 10px;
`;

export const SubContainer = styled.div`
  // background: red;
  width: 500px;
  height: 200px;
  position: absolute;
  top: 10%;
  left: 40%;
`;

export const PaymentPage = styled.div`
  padding: 15px;
  width: 100%;
  height: 100%;
  display: ${(props) => props.isAllowed ? '' : 'none'};
`;

export const Title = styled.h1`
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

export const Description = styled.p`
  width: 600px;
  height: 23px;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: #8E8E8E;
  margin-top: 30px;
  display: ${(props) => props.includesHotel ? 'init' : 'none'};
`;

export const DescriptionB = styled.p`
  width: 600px;
  height: 23px;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: #8E8E8E;
  margin-top: 30px;
  display: ${(props) => props.show === 'ingresso escolhido' || props.show === 'confirmação' ? 'init' : 'none'};
`;

export const OptionBox = styled.div`
  width: 145px;
  height: 145px;
  border-radius: 20px;
  border: 1px solid #CECECE;
  margin-top: 15px;
  margin-right: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.selectedBackground ? '#FFEED2' : 'white'};
`;

export const OptionBoxB = styled.div`
  width: 290px;
  height: 108px;
  border-radius: 20px;
  border: 1px solid #CECECE;
  margin-top: 15px;
  margin-right: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #FFEED2;
  display: ${(props) => props.show === 'ingresso escolhido' || props.show === 'confirmação' ? 'init' : 'none'};
`;

export const OptionType = styled.p`
  width: 200px;
  height: 19px;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
`;

export const OpetionPrice = styled.p`
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

export const OpetionContainer = styled.div`
    width: auto;
    height: auto;
    display: flex;
    display: ${(props) => props.includesHotel ? 'init' : 'none'};
`;

export const ConfirmButton = styled.button`
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
    display: ${(props) => props.includesHotel ? 'init' : 'none'};
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
`;

export const Button = styled.button`
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
    display: ${(props) => props.show === 'ingresso escolhido' ? 'init' : 'none'};
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
`;

export const NonAvailablePage = styled.div`
    width: 100%;
    height: 100%;
    display: ${(props) => !props.isAllowed ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;

    font-family: Roboto;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: center;
`;
