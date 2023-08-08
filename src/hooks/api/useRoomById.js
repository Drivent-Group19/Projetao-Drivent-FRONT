import * as hotelApi from '../../services/hotelApi';
import useAsync from '../useAsync';

export default function useRoomById(roomId) {
  const {
    data: roomById,
    loading: roomLoading,
    error: roomError,
    act: getRoomById
  } = useAsync(() => hotelApi.getRoomById (roomId));

  return {
    roomById,
    roomLoading,
    roomError,
    getRoomById
  };
};
