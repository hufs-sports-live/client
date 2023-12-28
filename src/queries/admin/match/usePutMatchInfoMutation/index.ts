import { useMutation, useQueryClient } from '@tanstack/react-query';

import { putMatchInfoWithAuth } from '@/api/admin/match';
import { ADMIN_MUTATION_KEY } from '@/constants/admin/mutationKey';
import { ADMIN_QUERY_KEY } from '@/constants/admin/queryKey';

export default function usePutMatchInfoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [ADMIN_MUTATION_KEY.PUT_MATCH_INFO],
    mutationFn: putMatchInfoWithAuth,
    onSuccess: matchId => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEY.MATCH_INFO, matchId],
      });
    },
  });
}
