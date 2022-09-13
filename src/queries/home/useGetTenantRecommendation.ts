import API_URL from 'constants/API_URL';
import {useQuery} from 'react-query';
import {get} from 'utils/Service';

export default function useGetTenantRecommendation() {
  return useQuery(
    ['tenantRecommendation'],
    async ({signal}) => {
      const response = await get(API_URL.TENANT_RECOMMENDATION, '', {signal});
      return response?.data || {};
    },
    {
      cacheTime: 0,
    },
  );
}
