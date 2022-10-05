import API_URL from 'constants/API_URL';
import {useMutation} from 'react-query';
import {post} from 'utils/Service';

export default function usePostSearchTenant() {
  return useMutation((payload: {data: {keyword: string}}) => {
    return post(API_URL.SEARCH_TENANT, payload?.data);
  });
}
