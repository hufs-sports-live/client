import { useSuspenseQuery } from '@tanstack/react-query';

import { getSportsQuarterByIdWithAuth } from '@/api/admin/match';
import { ADMIN_QUERY_KEY } from '@/constants/admin/queryKey';

export default function useSportsQuarterById(sportsId: number) {
  const { data, error } = useSuspenseQuery({
    queryKey: [ADMIN_QUERY_KEY.SPORTS_QUARTER, sportsId],
    queryFn: () => getSportsQuarterByIdWithAuth(sportsId),
  });

  return {
    sportsQuarter: data,
    error,
  };
}
