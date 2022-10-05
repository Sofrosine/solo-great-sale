import API_URL from 'constants/API_URL';
import {useQuery} from 'react-query';
import {get} from 'utils/Service';

export default function useGetTenantByCategory({id}: any) {
  return useQuery(
    ['tenantByCategory'],
    async ({signal}) => {
      const response = await get(
        API_URL.TENANT_BY_CATEGORY + `/${id}/20000`,
        '',
        {
          signal,
        },
      );

      return response?.data[0]?.tenant?.data || {};
    },
    {
      cacheTime: 0,
    },
  );
}
