import API_URL from 'constants/API_URL';
import {useQuery} from 'react-query';
import {get} from 'utils/Service';

export default function useGetSponsor2() {
  return useQuery(
    ['sponsors2'],
    async ({signal}) => {
      const response = await get(API_URL.SPONSOR_2, '', {signal});
      console.log('asdsa', response?.data);

      return response?.data || {};
    },
    {
      cacheTime: 0,
    },
  );
}
