import API_URL from 'constants/API_URL';
import {useMutation} from 'react-query';
import {post} from 'utils/Service';

export default function useRegister() {
  return useMutation((payload: any) => {
    return post(API_URL.REGISTER, payload?.data);
  });
}
