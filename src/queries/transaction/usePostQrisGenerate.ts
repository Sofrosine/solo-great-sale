import API_URL from 'constants/API_URL';
import {useMutation} from 'react-query';
import {post} from 'utils/Service';

export default function usePostQrisGenerate() {
  return useMutation((payload: any) => {
    return post(API_URL.QRIS, payload?.data, '', {
      'Access-Control-Allow-Origin': '*',
      Accept: 'multipart/form-data',
      'content-type': 'multipart/form-data',
    });
  });
}
