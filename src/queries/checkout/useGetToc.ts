import API_URL from 'constants/API_URL';
import {useQuery} from 'react-query';
import {get} from 'utils/Service';

export default function useGetToc() {
  return useQuery(
    ['toc'],
    async ({signal}) => {
      const response = await get(API_URL.TOC, '', {signal});
      return response?.data || {};
    },
    {
      cacheTime: 0,
    },
  );
}
