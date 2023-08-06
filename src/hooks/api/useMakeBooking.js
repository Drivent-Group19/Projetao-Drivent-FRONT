import * as hotelApi from '../../services/hotelApi';
import useToken from '../useToken';
import useAsync from '../useAsync';

export default function useMakeBooking(roomId) {
  const token= useToken();

  const {
    data: reserve,
    loading: reserveLoading,
    error: reserveError,
    act: makeBooking
  } = useAsync(() => hotelApi.makeBooking(token, roomId));

  return {
    reserve,
    reserveLoading,
    reserveError,
    makeBooking
  };
}
