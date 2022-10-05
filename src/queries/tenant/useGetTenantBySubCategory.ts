import API_URL from 'constants/API_URL';
import {useQuery} from 'react-query';
import {get} from 'utils/Service';

export default function useGetTenantBySubCategory({id, subId}: any) {
  return useQuery(
    ['tenantBySubCategory'],
    async ({signal}) => {
      console.log(id, subId);

      const response = await get(
        API_URL.TENANT_BY_SUB_CATEGORY + `/${id}/20000`,
        '',
        {
          signal,
        },
      );

      const arr = response?.data?.filter((item: any) => item?.id === subId);

      return arr[0]?.tenant?.data || [];
    },
    {
      cacheTime: 0,
    },
  );
}
