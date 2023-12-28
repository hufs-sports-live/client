import { useSuspenseQuery } from '@tanstack/react-query';

import { getMatchInfoByIdWithAuth } from '@/api/admin/match';
import { ADMIN_QUERY_KEY } from '@/constants/admin/queryKey';

export default function useMatchInfoByIdWithAuth(matchId: string) {
  const { data, error } = useSuspenseQuery({
    queryKey: [ADMIN_QUERY_KEY.MATCH_INFO, matchId],
    queryFn: () => getMatchInfoByIdWithAuth(matchId),
  });

  return {
    matchInfo: data,
    error,
  };
}
