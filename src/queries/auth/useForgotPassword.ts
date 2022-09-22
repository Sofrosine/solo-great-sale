import API_URL from 'constants/API_URL';
import {useMutation} from 'react-query';
import {post} from 'utils/Service';

export default function useForgotPassword() {
  return useMutation((payload: any) => {
    return post(API_URL.FORGOT_PASSWORD, payload?.data);
  });
}
