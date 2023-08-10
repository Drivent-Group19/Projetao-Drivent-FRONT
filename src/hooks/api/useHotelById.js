import * as hotelApi from '../../services/hotelApi';
import useToken from '../useToken';
import useAsync from '../useAsync';

export default function useHotelById(hotelId) {
  const token= useToken();

  const {
    data: hotel,
    loading: hotelLoading,
    error: hotelError,
    act: getHotels
  } = useAsync(() => hotelApi.getHotelById(token, hotelId));

  return {
    hotel,
    hotelLoading,
    hotelError,
    getHotels
  };
}
