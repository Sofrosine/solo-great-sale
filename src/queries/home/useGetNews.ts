import API_URL from 'constants/API_URL';
import {useQuery} from 'react-query';
import {get} from 'utils/Service';

export default function useGetNews() {
  return useQuery(
    ['news'],
    async ({signal}) => {
      const response = await get(API_URL.NEWS + '?limit=5', '', {signal});
      return response?.data || {};
    },
    {
      cacheTime: 0,
    },
  );
}
