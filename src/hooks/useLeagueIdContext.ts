import { useContext } from 'react';

import { LeagueIdContext } from '@/components/admin/context/LeagueIdWrapper';

export const useLeagueIdContext = () => {
  const leagueIdContext = useContext(LeagueIdContext);

  if (!leagueIdContext) throw new Error('Context가 비었습니다.');

  return leagueIdContext;
};
