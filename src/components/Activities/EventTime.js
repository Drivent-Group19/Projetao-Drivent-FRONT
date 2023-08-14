import styled from 'styled-components';
import { BiLogIn, BiXCircle } from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import useUserData from '../../hooks/useData';
import { createActivity } from '../../services/activitiesApi';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import useToken from '../../hooks/useToken';

export default function EventTime({ getActivities, activities, clickeDay }) {
  const userId = useUserData();
  const token = useToken();

  if (!activities || !clickeDay) return <></>;

  const auditorioActivity = activities.reduce((acc, activity) => {
    const auditorioId = activity.activityPlaceId;

    if (!acc[auditorioId]) {
      acc[auditorioId] = [];
    }
    acc[auditorioId].push(activity);
    return acc;
  }, {});

  async function aplication(id) {
    console.log(token);
    try {
      await createActivity(token, id);
      await getActivities();
      toast('Activity registered successfully.');
    } catch (error) {
      toast('Unable to register.');
    }
  }

  return (
    <ActivitiesContainer>
      {Object.entries(auditorioActivity).map(([auditorioId, activities]) => (
        <Auditorio key={auditorioId}>
          <Locals>{activities[0].ActivityPlace.name}</Locals>
          <Activities>
            {activities.map((a) => {
              const endsAt = new Date(a.endsAt);
              const startsAt = new Date(a.startsAt);
              const capacity = a.capacity;

              const hours = Math.abs(endsAt - startsAt) / 36e5;
              const booking = a.ActivityBooking.length;
              const positions = capacity - booking;

              const date = format(startsAt, 'dd/MM');
              const dateStr = clickeDay.split(',')[1].trim();

              const booked = a.ActivityBooking?.find((b) => b.userId === userId.id);

              if (date !== dateStr) return null;

              return (
                <Box key={a.id} ActivityHour={hours} booked={!booked}>
                  <>
                    <Text>
                      <h2>{a.title}</h2>
                      <h3>
                        {startsAt.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        -{' '}
                        {endsAt.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </h3>
                    </Text>
                    <Line />
                    {!booked ? (
                      positions ? (
                        <Activity isAvailable={positions} onClick={() => aplication(a.id)}>
                          <BiLogIn size={20} color="green" />
                          <p>{positions} vagas</p>
                        </Activity>
                      ) : (
                        <Activity isAvailable={positions}>
                          <BiXCircle size={20} color="#CC6666" />
                          <p>Esgotado</p>
                        </Activity>
                      )
                    ) : (
                      <Activity isAvailable={positions}>
                        <AiOutlineCheckCircle size={20} color="green" />
                        <p>Inscrito</p>
                      </Activity>
                    )}
                  </>
                </Box>
              );
            })}
          </Activities>
        </Auditorio>
      ))}
    </ActivitiesContainer>
  );
}

const ActivitiesContainer = styled.div`
  display: flex;
`;

const Auditorio = styled.div`
  width: 100%;
  height: auto;
  min-height: 424px;
  align-items: center;
  flex-direction: column;
`;

const Locals = styled.div`
  display: flex;
  color: #7b7b7b;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 17px;
  margin-top: 50px;
  padding: 3% 30%;
  text-align: center;
  justify-content: space-between;
  p {
    color: #7b7b7b;
  }
`;

const Activities = styled.div`
  display: flex;
  height: 350px;
  border: 2px solid #d7d7d7;
`;

const Text = styled.div`
  h3 {
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
  }
  h2 {
    color: #343434;
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    margin-bottom: 6px;
    width: 171px;
    margin-right: 10px;
  }
`;

const Line = styled.div`
  width: 1px;
  background-color: #cfcfcf;
  height: ${(props) => props.ActivityHour * 60}px;
`;

const Box = styled.div`
  display: flex;
  width: 90%;
  height: ${(props) => props.ActivityHour * 70}px;
  margin: 5%;
  background-color: ${(props) => (props.booked ? '#F1F1F1' : '#D0FFDB')};
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: default;
`;

const Activity = styled.div`
  display: flex;
  width: 66px;
  font-size: 12px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  cursor: ${(props) => (props.isAvailable ? 'pointer' : 'default')};
  p {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 9px;
    color: ${(props) => (props.isAvailable ? '#078632' : '#CC6666')};
    line-height: 11px;
  }
`;
