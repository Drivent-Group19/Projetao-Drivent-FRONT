import * as hotelApi from '../../services/hotelApi';
import useToken from '../useToken';
import useAsync from '../useAsync';

export default function useGetBookingByUser() {
  const token= useToken();

  const {
    data: userBooking,
    loading: userBLoading,
    error: userBError,
    act: getBookingByUser
  } = useAsync(() => hotelApi.getBookingByUser(token));

  return {
    userBooking,
    userBLoading,
    userBError,
    getBookingByUser
  };
};
