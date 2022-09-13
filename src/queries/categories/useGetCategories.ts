import API_URL from 'constants/API_URL';
import {useQuery} from 'react-query';
import {get} from 'utils/Service';

export default function useGetCategories() {
  return useQuery(
    ['categories'],
    async ({signal}) => {
      const response = await get(API_URL.CATEGORIES, '', {signal});
      let arr: any[] = [];
      response?.data?.map((item: any) => {
        if (item?.induk?.length) {
          const sub: any[] = [];
          item?.induk?.map((val: any) =>
            sub.push({
              id: val?.id,
              label: val?.nama_kategori,
            }),
          );
          arr.push({
            id: item?.id,
            icon: item?.icon,
            label: item?.nama_kategori,
            sub,
          });
        } else {
          arr.push({
            id: item?.id,
            icon: item?.icon,
            label: item?.nama_kategori,
            sub: item?.induk,
          });
        }
      });
      arr = arr.sort((a, b) => b?.sub?.length - a?.sub?.length);

      return arr || {};
    },
    {
      cacheTime: 0,
    },
  );
}
