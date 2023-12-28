'use client';

import { useEffect } from 'react';

import { checkPermission } from '@/api/auth';
import Home from '@/app/page';
import { QUERY_PARAMS } from '@/constants/queryParams';
import useQueryParams from '@/hooks/useQueryParams';

export default function Page({ params }: { params: { leagueId: string } }) {
  const { leagueId } = params;
  const { setInParams } = useQueryParams();

  useEffect(() => {
    setInParams(QUERY_PARAMS.league, leagueId);
    checkPermission();
  });

  return (
    <>
      <div className="text-2xl font-medium">리그 내 매치 </div>
      <Home />
    </>
  );
}
