'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import LeagueContent from '@/components/common/Card/league/Content';
import { DELETE_DESCRIPTION } from '@/constants/admin/description';
import { useScrollLock } from '@/hooks/useScrollLock';
import useDeleteLeagueMutation from '@/queries/admin/league/useDeleteLeagueMutation';
import { LeagueType } from '@/types/admin/league';

export default function LeagueList({ data }: { data: LeagueType[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeagueId, setSelectedLeagueId] = useState<number | null>(null);
  const { disableScroll, enableScroll } = useScrollLock();

  const { mutate } = useDeleteLeagueMutation();

  const toggleModal = (leagueId: number) => {
    setIsModalOpen(!isModalOpen);
    setSelectedLeagueId(leagueId);
  };

  const deleteLeague = async (leagueId: number) => {
    mutate({ leagueId });
    setIsModalOpen(false);
  };

  useEffect(() => {
    isModalOpen && disableScroll();
    return () => enableScroll();
  }, [isModalOpen]);

  return (
    <ul className="space-y-8">
      {data.map(league => (
        <li key={league.leagueId}>
          <Card>
            <LeagueContent {...league} />
            <div className="flex w-full gap-4">
              <Button
                type="button"
                className="w-full rounded-lg bg-secondary p-3 text-gray-5 hover:bg-[#9AB0D3] hover:text-white"
              >
                <Link
                  href={`/admin/league/${league.leagueId}`}
                  className="w-full"
                >
                  조회하기
                </Link>
              </Button>
              <Button
                type="button"
                className="w-full rounded-lg bg-red-300 p-3 text-red-800 hover:bg-red-600 hover:text-red-300"
                onClick={() => toggleModal(league.leagueId)}
              >
                삭제하기
              </Button>
            </div>
          </Card>
          {isModalOpen && selectedLeagueId === league.leagueId && (
            <div>
              <div className="fixed inset-0 bg-black/50" />
              <Card className="fixed left-1/2 top-1/2 w-96 max-w-md -translate-x-1/2 -translate-y-1/2">
                <div className="m-2 my-4 flex flex-col space-y-4">
                  <span className="text-3xl">리그 삭제</span>
                  <span className="text-2xl font-bold">{league.name}</span>
                  <span className="text-gray-4">{DELETE_DESCRIPTION}</span>
                </div>
                <div className="flex w-full gap-4">
                  <Button
                    type="button"
                    className="w-full rounded-lg bg-secondary p-3 text-gray-5 hover:bg-[#9AB0D3] hover:text-white"
                    onClick={() => setIsModalOpen(false)}
                  >
                    돌아가기
                  </Button>
                  <Button
                    type="button"
                    className="w-full rounded-lg bg-red-500 p-3 text-white"
                    onClick={() => deleteLeague(league.leagueId)}
                  >
                    삭제
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
