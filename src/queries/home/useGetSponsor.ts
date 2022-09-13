import API_URL from 'constants/API_URL';
import {useQuery} from 'react-query';
import {get} from 'utils/Service';

export default function useGetSponsor() {
  return useQuery(
    ['sponsors'],
    async ({signal}) => {
      const response = await get(API_URL.SPONSOR, '', {signal});
      return response?.data || {};
    },
    {
      cacheTime: 0,
    },
  );
}
