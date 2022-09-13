import API_URL from 'constants/API_URL';
import {useQuery} from 'react-query';
import {get} from 'utils/Service';

export default function useGetTenantDetail({id}: any) {
  return useQuery(
    ['tenantDetail'],
    async ({signal}) => {
      const response = await get(API_URL.TENANT + `/${id}`, '', {signal});
      return response?.data || {};
    },
    {
      cacheTime: 0,
    },
  );
}
