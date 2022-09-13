import API_URL from 'constants/API_URL';
import {useMutation} from 'react-query';
import {post} from 'utils/Service';

export default function useLogin() {
  return useMutation((payload: any) => {
    return post(API_URL.LOGIN, payload?.data);
  });
}
