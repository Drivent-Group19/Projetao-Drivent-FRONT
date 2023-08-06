import * as hotelApi from '../../services/hotelApi';
import useToken from '../useToken';
import useAsync from '../useAsync';

export default function useBookingByRoomId(roomId) {
  const token= useToken();

  const {
    data: bookings,
    loading: bookingLoading,
    error: bookingError,
    act: getBookingsByRoomId
  } = useAsync(() => hotelApi.getBookingsByRoomId(token, roomId));

  return {
    bookings,
    bookingLoading,
    bookingError,
    getBookingsByRoomId
  };
}
