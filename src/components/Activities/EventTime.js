import styled from 'styled-components';
import { CgEnter } from 'react-icons/cg';
import { GiCancel } from 'react-icons/gi';

export default function EventTime() {
  return (
    <>
      <Locals>
        <p>Auditório Principal</p>
        <p>Auditório Lateral</p>
        <p>Sala de Workshop</p>
      </Locals>
      <Activities>
        <Principal>
          <Box>
            <Activity>
              <span>Minecraft: montando o PC ideal</span>
              <p>09:00 - 10:00</p>
            </Activity>
            <Line2></Line2>
            <Icon>
              <CgEnter size={20} color="green"/>
              <p>20 vagas</p>
            </Icon>
          </Box>
          <Box>
            <Activity>
              <span>LoL: montando o PC ideal</span>
              <p>10:00 - 11:00</p>
            </Activity>
            <Line2></Line2>
            <Icon>
              <GiCancel size={20} color="red"/>
              <p>Esgotado</p>
            </Icon>
          </Box>
        </Principal>
        <Line></Line>
        <Principal>
          <Box>
            <Activity>
              <span>Minecraft: montando o PC ideal</span>
              <p>09:00 - 10:00</p>
            </Activity>
            <Line2></Line2>
            <Icon>
              <CgEnter size={20} color="green"/>
              <p>20 vagas</p>
            </Icon>
          </Box>
        </Principal>
        <Line></Line>
        <Principal>
          <Box>
            <Activity>
              <span>Minecraft: montando o PC ideal</span>
              <p>09:00 - 10:00</p>
            </Activity>
            <Line2></Line2>
            <Icon>
              <CgEnter size={20} color="green"/>
              <p>20 vagas</p>
            </Icon>
          </Box>
        </Principal>
      </Activities>
    </>
  );
};

const Locals = styled.div`
    margin-top: 50px;
    padding: 2% 8%;
    display: flex;
    justify-content: space-between;
    p {
        color: #7B7B7B;
    }
`;

const Activities = styled.div`
    /* width: 864px; */
    width: 100%;
    height: 300px; 
    border: 2px solid #D7D7D7;
    display: flex;
    flex-direction: row;
`;

const Line = styled.div`
    /* width: 0px; */
    /* height: 392px; */
    height: 100%;
    border: 1px solid #D7D7D7;
`;

const Principal = styled.div`
    width: 33%;
`;

const Box = styled.div`
    display: flex;
    flex-direction: row;
    width:90%;
    height: 79px;
    margin: 5%;
    padding: 3%;
    background: #F1F1F1;
    border-radius: 5px;
    span{
        font-weight: bold;
    }
    p{
        margin-top: 5px;
    }
`;

const Activity = styled.div`
    width: 75%;
    margin: 1%;
    background: #F1F1F1;
    weight:400;
    font-size: 12px;
    line-height: 14.06px;
`;

const Line2 = styled.div`
    height: 95%;
    border: 1px solid #CFCFCF;
`;

const Icon = styled.div`
    width: 25%;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    p{
        font-size: 9px;
        color: #078632;
    }
`;

