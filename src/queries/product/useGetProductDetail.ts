import API_URL from 'constants/API_URL';
import {useQuery} from 'react-query';
import {get} from 'utils/Service';

export default function useGetProductDetail({id}: any) {
  return useQuery(
    ['productDetail'],
    async ({signal}) => {
      const response = await get(API_URL.PRODUCT_DETAIL + `/${id}`, '', {
        signal,
      });

      return response?.data || {};
    },
    {
      cacheTime: 0,
    },
  );
}
