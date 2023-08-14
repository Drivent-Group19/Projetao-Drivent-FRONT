import useAsync from '../useAsync';
import useToken from '../useToken';

import * as enrollmentApi from '../../services/enrollmentApi';

export default function useGetEnrollment() {
  const token = useToken();

  const {
    data,
    loading: getEnrollmentLoading,
    error: getEnrollmentError,
    act: getEnrollment
  } = useAsync(() => enrollmentApi.getPersonalInformations(token), true);

  return {
    data,
    getEnrollmentLoading,
    getEnrollmentError,
    getEnrollment
  };
}
