import API_URL from 'constants/API_URL';
import {useQuery} from 'react-query';
import {get} from 'utils/Service';

export default function useFilterCategory({id}: any) {
  return useQuery(
    ['filterCategory'],
    async ({signal}) => {
      const response = await get(API_URL.FILTER_CATEGORY + `/${id}`, '', {
        signal,
      });

      return response?.data || {};
    },
    {
      cacheTime: 0,
    },
  );
}
