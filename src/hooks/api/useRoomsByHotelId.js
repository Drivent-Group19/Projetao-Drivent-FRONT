import * as hotelApi from '../../services/hotelApi';
import useToken from '../useToken';
import useAsync from '../useAsync';

export default function useRoomsByHotelId(hotelId) {
  const token= useToken();

  const {
    data: roomsByHotelId,
    loading: roomLoading,
    error: roomError,
    act: getRoomsByHotelId
  } = useAsync(() => hotelApi.getRoomsByHotelId(token, hotelId));

  return {
    roomsByHotelId,
    roomLoading,
    roomError,
    getRoomsByHotelId
  };
};
