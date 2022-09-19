import API_URL from 'constants/API_URL';
import {useQuery} from 'react-query';
import {get} from 'utils/Service';

export default function useGetProductDirect() {
  return useQuery(
    ['productDirect'],
    async ({signal}) => {
      const response = await get(API_URL.PRODUCT_DIRECT, '', {signal});
      return response?.data || {};
    },
    {
      cacheTime: 0,
    },
  );
}
