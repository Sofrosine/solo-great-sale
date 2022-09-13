import API_URL from 'constants/API_URL';
import {useQuery} from 'react-query';
import {get} from 'utils/Service';

export default function useGetProductRecommendation() {
  return useQuery(
    ['productRecommendation'],
    async ({signal}) => {
      const response = await get(API_URL.PRODUCT_RECOMMENDATION, '', {signal});
      return response?.data || {};
    },
    {
      cacheTime: 0,
    },
  );
}
