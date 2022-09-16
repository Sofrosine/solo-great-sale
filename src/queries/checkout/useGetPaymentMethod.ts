import API_URL from 'constants/API_URL';
import {useQuery} from 'react-query';
import {get} from 'utils/Service';

export default function useGetPaymentMethod() {
  return useQuery(
    ['payment_method'],
    async ({signal}) => {
      const response = await get(API_URL.PAYMENT_METHOD, '', {signal});
      let arr: any[] = [];

      response?.data?.map((item: any) => {
        arr.push({
          id: item?.id,
          label: item?.nama,
          isQris: item?.is_qris,
        });
      });

      return arr || [];
    },
    {
      cacheTime: 0,
    },
  );
}
