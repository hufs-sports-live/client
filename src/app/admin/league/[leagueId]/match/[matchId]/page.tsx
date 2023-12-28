'use client';

import MatchInfoDetail from '@/components/admin/match/detail/Info';
import AsyncBoundary from '@/components/common/AsyncBoundary';
import AuthMatchInfoFetcher from '@/queries/admin/match/useMatchInfoByIdWithAuth/Fetcher';

export default function Page({
  params,
}: {
  params: { matchId: string; leagueId: string };
}) {
  const { matchId } = params;

  return (
    <section>
      <AsyncBoundary
        errorFallback={props => <MatchInfoDetail.ErrorFallback {...props} />}
        loadingFallback={<div>로딩 중입니다...</div>}
      >
        <AuthMatchInfoFetcher matchId={matchId}>
          {data => {
            return <MatchInfoDetail {...{ ...data, params }} />;
          }}
        </AuthMatchInfoFetcher>
      </AsyncBoundary>
    </section>
  );
}
