import * as hotelApi from '../../services/hotelApi';
import useAsync from '../useAsync';

export default function useRoomsByHotelId(hotelId) {
  const {
    data: roomsByHotelId,
    loading: roomLoading,
    error: roomError,
    act: getRoomsByHotelId
  } = useAsync(() => hotelApi.getRoomsByHotelId( hotelId));

  return {
    roomsByHotelId,
    roomLoading,
    roomError,
    getRoomsByHotelId
  };
};
