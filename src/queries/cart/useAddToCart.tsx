import API_URL from 'constants/API_URL';
import {useMutation} from 'react-query';
import {post} from 'utils/Service';

export default function useAddtoCart({id}: any) {
  return useMutation((payload: any) => {
    return post(API_URL.ADD_TO_CART + `/${id}`, payload?.data);
  });
}
