import * as hotelApi from '../../services/hotelApi';
import useToken from '../useToken';
import useAsync from '../useAsync';

export default function useHotelWithRooms(hotelId) {
  const token= useToken();

  const {
    data: hotelWithRoom,
    loading: hotelLoading,
    error: hotelError,
    act: getHotelsWithRooms
  } = useAsync(() => hotelApi.getHotelsWithRooms(token, hotelId));

  return {
    hotelWithRoom,
    hotelLoading,
    hotelError,
    getHotelsWithRooms
  };
};
