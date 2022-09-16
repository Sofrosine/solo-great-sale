import API_URL from 'constants/API_URL';
import {useMutation} from 'react-query';
import {post} from 'utils/Service';

export default function usePostTransactionDetail() {
  return useMutation((payload: any) => {
    return post(API_URL.TRANSACTION_DETAIL, payload?.data, '', {
      'Access-Control-Allow-Origin': '*',
      Accept: 'multipart/form-data',
      'content-type': 'multipart/form-data',
    });
  });
}
