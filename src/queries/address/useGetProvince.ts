import API_URL from 'constants/API_URL';
import {useQuery} from 'react-query';
import {get} from 'utils/Service';

export default function useGetProvinces() {
  return useQuery(
    ['provinces'],
    async ({signal}) => {
      const response = await get(API_URL.PROVINCE, '', {signal});
      let arr: any[] = [];
      response?.data?.map((item: any) => {
        arr.push({
          id: item?.id,
          label: item?.name,
        });
      });

      return arr || [];
    },
    {
      cacheTime: 0,
    },
  );
}
