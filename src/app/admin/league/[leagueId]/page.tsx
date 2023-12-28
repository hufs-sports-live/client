'use client';

import { Suspense, useEffect } from 'react';

import LeagueDetail from '@/components/admin/league/detail';
import { useLeagueIdContext } from '@/hooks/useLeagueIdContext';
import LeagueRegisterFetcher from '@/queries/admin/league/useLeagueRegister/Fetcher';
import useSportsListByLeagueId from '@/queries/useSportsListByLeagueId/query';

export default function Page({ params }: { params: { leagueId: string } }) {
  const { leagueId } = params;
  const { setLeagueId } = useLeagueIdContext();
  const { sportsList: leagueSportsData } = useSportsListByLeagueId(leagueId);

  useEffect(() => {
    setLeagueId(leagueId);
  }, []);

  return (
    <Suspense fallback={<div>리그 정보 로딩중...</div>}>
      <LeagueRegisterFetcher>
        {data => (
          <LeagueDetail
            data={{ ...data, leagueSportsData }}
            leagueId={leagueId}
          />
        )}
      </LeagueRegisterFetcher>
    </Suspense>
  );
}
