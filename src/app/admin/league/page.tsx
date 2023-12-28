'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense } from 'react';

import Button from '@/components/common/Button';

const LeagueListFetcher = dynamic(
  () => import('@/queries/admin/league/useLeagueList/Fetcher'),
  { ssr: false },
);
const LeagueList = dynamic(() => import('@/components/admin/league/list'));

export default function Page() {
  return (
    <>
      <div className="text-2xl font-medium">전체 리그</div>
      <Suspense fallback={<div>리그 로딩중...</div>}>
        <LeagueListFetcher>
          {data => <LeagueList data={data} />}
        </LeagueListFetcher>
      </Suspense>
      <Button className="w-full rounded-lg bg-primary p-3 text-white hover:bg-[#303ECE]">
        <Link href="/admin/register" className="w-full">
          새 리그 등록
        </Link>
      </Button>
    </>
  );
}
