import { useContext } from 'react';

import UserContext from '../contexts/UserContext';

export default function useUserData() {
  const { userData: user } = useContext(UserContext);

  return user.user;
}