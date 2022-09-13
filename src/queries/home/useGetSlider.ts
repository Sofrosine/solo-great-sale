import API_URL from 'constants/API_URL';
import {useQuery} from 'react-query';
import {get} from 'utils/Service';

export default function useGetSlider() {
  return useQuery(
    ['sliders'],
    async ({signal}) => {
      const response = await get(API_URL.SLIDER, '', {signal});
      return response?.data || {};
    },
    {
      cacheTime: 0,
    },
  );
}
