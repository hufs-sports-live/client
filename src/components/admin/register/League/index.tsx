'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import CheckboxItem from '@/components/common/Checkbox/Item';
import useValidate from '@/hooks/useValidate';
import usePostNewLeagueMutation from '@/queries/admin/league/usePostNewLeagueMutation';
import usePutLeagueMutation from '@/queries/admin/league/usePutLeagueMutation';
import { LeagueDataType, LeagueRegisterDataType } from '@/types/admin/league';
import { updateSet } from '@/utils/set';
import { parseTimeString } from '@/utils/time';

export default function RegisterLeague({
  data,
  leagueId,
  onNext,
}: {
  data: LeagueRegisterDataType;
  leagueId?: number;
  onNext?: () => void;
}) {
  const [newLeagueData, setNewLeagueData] = useState<LeagueDataType>(
    {} as LeagueDataType,
  );
  const [newSportsData, setNewSportsData] = useState<Set<number>>(new Set());

  const { leagueData, sportsListData } = data;
  const currentLeague = leagueData.find(e => e.leagueId === Number(leagueId));

  const router = useRouter();

  const { mutate: postLeague } = usePostNewLeagueMutation();
  const { mutate: putLeague } = usePutLeagueMutation();

  useEffect(() => {
    if (currentLeague) {
      const parseDate = (dateString: string) => dateString.split('T')[0];

      setNewLeagueData({
        name: currentLeague.name,
        startAt: parseDate(currentLeague.startAt),
        endAt: parseDate(currentLeague.endAt),
      });
    }
  }, []);

  const { month, date } = parseTimeString(new Date().toString());

  const isDateError =
    new Date(newLeagueData.endAt) < new Date(newLeagueData.startAt);
  const { isError: isStartAtEmpty } = useValidate(
    newLeagueData.startAt,
    dateValue => !dateValue,
  );
  const { isError: isEndAtEmpty } = useValidate(
    newLeagueData.endAt,
    dateValue => !dateValue,
  );
  const { isError: isNameEmpty } = useValidate(
    newLeagueData.name,
    nameValue => String(nameValue).length < 1,
  );
  const { isError: isSportsEmpty } = useValidate(
    Array.from(newSportsData).length,
    length => length === 0,
  );
  const isAnyInvalid =
    isNameEmpty ||
    isDateError ||
    isSportsEmpty ||
    isStartAtEmpty ||
    isEndAtEmpty;

  const updateCheckbox = (id: number) => {
    setNewSportsData(prevSet => updateSet<number>(prevSet, id));
  };

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setNewLeagueData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      leagueData: newLeagueData,
      sportData: Array.from(newSportsData),
    };

    if (leagueId) {
      putLeague({
        leagueId,
        ...payload,
      });
    } else {
      postLeague(payload);
    }

    if (onNext) {
      onNext();
    } else {
      router.push('/admin/league/');
    }
  };

  return (
    <>
      <div className="text-2xl font-medium">
        {currentLeague ? '리그 수정' : '새 리그 등록'}
      </div>
      <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
        <label>
          <div className="flex items-center justify-between">
            <span>리그 이름</span>
            {isNameEmpty && (
              <span className="text-sm text-red-400">필수 항목입니다.</span>
            )}
          </div>
          <input
            name="name"
            type="text"
            value={newLeagueData.name}
            onChange={handleInput}
            className="mt-2 block w-full rounded-lg border border-gray-3/70 bg-secondary/25 p-4"
            required
          />
        </label>
        <label>
          <div className="flex items-center justify-between">
            <span>리그 시작/종료일</span>
            {isStartAtEmpty || isEndAtEmpty ? (
              <span className="text-sm text-red-400">날짜를 선택해주세요.</span>
            ) : (
              isDateError && (
                <span className="text-sm text-red-400">
                  종료일은 시작일보다 이후로 설정해주세요!
                </span>
              )
            )}
          </div>
          <input
            name="startAt"
            type="date"
            value={newLeagueData.startAt}
            onChange={handleInput}
            className="mt-2 block w-full rounded-lg border border-gray-3/70 bg-secondary/25 p-4"
            min={`2023-${month}-${date.toString().padStart(2, '0')}`}
            max={'2023-12-3'}
            required
          />
          <input
            name="endAt"
            type="date"
            value={newLeagueData.endAt}
            onChange={handleInput}
            className="mt-2 block w-full rounded-lg border border-gray-3/70 bg-secondary/25 p-4"
            min={`2023-${month}-${date.toString().padStart(2, '0')}`}
            max={'2023-12-3'}
            required
          />
        </label>
        <label>
          <div className="flex items-center justify-between">
            <span>리그 종목</span>
            {isSportsEmpty && (
              <span className="text-sm text-red-400">
                적어도 한 종목은 선택해주세요.
              </span>
            )}
          </div>
          {sportsListData.map(({ name, sportId }) => (
            <CheckboxItem
              key={sportId}
              id={String(sportId)}
              name="sportData"
              value={sportId}
              checked={newSportsData.has(+sportId)}
              onChange={() => updateCheckbox(+sportId)}
            >
              {name}
            </CheckboxItem>
          ))}
        </label>
        <Button
          className="w-full rounded-lg bg-[#0718AE] p-4 text-xl text-white hover:bg-[#303ECE] disabled:bg-gray-2 disabled:text-gray-4"
          disabled={isAnyInvalid}
          type="submit"
        >
          {currentLeague ? '수정하기' : '다음으로'}
        </Button>
      </form>
    </>
  );
}
