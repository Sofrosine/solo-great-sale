import API_URL from 'constants/API_URL';
import {useQuery} from 'react-query';
import {get} from 'utils/Service';

export default function useGetRegency({id}: any) {
  return useQuery(
    ['regencies'],
    async ({signal}) => {
      const response = await get(`${API_URL.KABUPATEN}/${id}`, '', {signal});
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
      enabled: false,
    },
  );
}
