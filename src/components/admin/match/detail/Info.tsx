'use client';

import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';

import Button from '@/components/common/Button';
import { FallbackProps } from '@/components/common/ErrorBoundary';
import { Icon } from '@/components/common/Icon';
import Select from '@/components/common/Select';
import useValidate from '@/hooks/useValidate';
import usePutMatchInfoMutation from '@/queries/admin/match/usePutMatchInfoMutation';
import useSportsQuarterById from '@/queries/admin/match/useSportsQuarterById/query';
import useSportsListByLeagueId from '@/queries/useSportsListByLeagueId/query';
import { gameState, MatchInfoType } from '@/types/admin/match';
import { parseTimeString } from '@/utils/time';

interface MatchInfoDetailProps extends MatchInfoType {
  params: {
    matchId: string;
    leagueId: string;
  };
}

export default function MatchInfoDetail({
  params,
  ...props
}: MatchInfoDetailProps) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const [sportsName, setSportsName] = useState<string>(props.sports.sportsName);
  const [startTime, setStartTime] = useState<MatchInfoType['startTime']>(
    props.startTime,
  );
  const [gameName, setGameName] = useState<MatchInfoType['gameName']>(
    props.gameName,
  );
  const [state, setState] = useState<MatchInfoType['state']>(props.state);
  const [videoId, setVideoId] = useState<MatchInfoType['videoId']>(
    props.videoId,
  );
  const [gameQuarter, setgameQuarter] = useState<MatchInfoType['gameQuarter']>(
    props.gameQuarter,
  );

  const { matchId, leagueId } = params;
  const { sportsList } = useSportsListByLeagueId(leagueId);
  const { sportsQuarter } = useSportsQuarterById(props.sports.sportsId);

  const { mutate } = usePutMatchInfoMutation();

  const { month, date } = parseTimeString(new Date().toString());

  const { isError: isStartTimeEmpty } = useValidate(
    startTime,
    dateValue => !dateValue,
  );

  const { isError: isGameNameEmpty } = useValidate(
    gameName,
    nameValue => !nameValue,
  );
  const { isError: isGameQuarterEmpty } = useValidate(
    gameQuarter,
    length => !length,
  );
  const isAnyInvalid =
    isGameNameEmpty || isStartTimeEmpty || isGameQuarterEmpty;

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    e.preventDefault();

    const { name, value } = e.target;

    if (name === 'startTime') setStartTime(value);
    else if (name === 'gameName') setGameName(value);
    else if (name === 'videoId') setVideoId(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sportsDic: { [key: string]: number } = {};
    sportsList.map(({ name, sportId }) => (sportsDic[name] = sportId));

    const data = {
      sportsId: sportsDic[sportsName],
      startTime,
      gameName,
      videoId,
      gameQuarter,
      state,
    };

    mutate({ matchId, data });

    setIsEditMode(prev => !prev);
  };

  return (
    <section className="space-y-4">
      <div></div>
      <form
        className="flex flex-col rounded-lg border border-gray-3/70"
        onSubmit={onSubmit}
      >
        <div className="flex items-center justify-between border-b p-4">
          <div className="py-1 text-2xl font-medium">
            {!isEditMode ? '게임 정보' : '게임 정보 수정'}
          </div>
          {!isEditMode && (
            <Button
              className="rounded-lg border border-gray-2 p-2"
              type="button"
              onClick={() => setIsEditMode(true)}
              disabled={isAnyInvalid}
            >
              <Icon iconName="pencil" width={20} height={20} />
            </Button>
          )}
        </div>
        <div className="divide-y px-4">
          <div className="flex items-center gap-2">
            <div className="w-[30%] shrink-0 p-4 text-black">종목이름</div>
            <Select
              disabled={!isEditMode}
              name="sportsId"
              value={sportsName}
              onValueChange={setSportsName}
            >
              <Select.Trigger
                iconName="caretDown"
                className="flex w-full items-center justify-between rounded-lg border border-gray-3/70 bg-secondary/25 p-4 leading-none text-black focus:ring-inset disabled:border-none disabled:bg-white disabled:text-gray-4"
              />
              <Select.Content className="max-h-[--radix-select-content-available-height]overflow-auto z-10 w-[--radix-select-trigger-width] rounded-md bg-white p-1 shadow-md ring-1 ring-gray-2 focus:outline-none">
                {sportsList.map(({ sportId, name }) => (
                  <Select.Item key={sportId} value={name}>
                    {name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[30%] shrink-0 p-4 text-black">경기이름</div>
            <div className="w-full">
              <input
                name="gameName"
                type="text"
                value={gameName || ''}
                onChange={handleInput}
                disabled={!isEditMode}
                required
                className="w-full rounded-lg  border border-gray-3/70 bg-secondary/25 p-4 text-black disabled:border-none disabled:bg-white disabled:text-gray-4"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[30%] shrink-0 p-4 text-black">진행상황</div>
            <Select
              disabled={!isEditMode}
              name="gameQuarter"
              value={gameQuarter}
              onValueChange={setgameQuarter}
            >
              <Select.Trigger
                defaultValue={gameQuarter}
                iconName="caretDown"
                className="flex w-full items-center justify-between rounded-lg border border-gray-3/70 bg-secondary/25 p-4 leading-none text-black focus:ring-inset disabled:border-none disabled:bg-white disabled:text-gray-4"
              />
              <Select.Content className="max-h-[--radix-select-content-available-height]overflow-auto z-10 w-[--radix-select-trigger-width] rounded-md bg-white p-1 shadow-md ring-1 ring-gray-2 focus:outline-none">
                {sportsQuarter.map(({ name }) => (
                  <Select.Item key={name} value={name}>
                    {name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[30%] shrink-0 p-4 text-black">시작시간</div>
            <div className="w-full">
              <input
                name="startTime"
                type="datetime-local"
                value={startTime}
                onChange={handleInput}
                min={`2023-${month}-${date.toString().padStart(2, '0')}`}
                max={'2024-03-20'}
                disabled={!isEditMode}
                required
                className="w-full rounded-lg border border-gray-3/70 bg-secondary/25 p-4 text-sm text-black disabled:border-none disabled:bg-white disabled:text-gray-4"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[30%] shrink-0 p-4 text-black">시작여부</div>
            <Select
              disabled={!isEditMode}
              name="state"
              value={state}
              onValueChange={setState as Dispatch<SetStateAction<string>>}
            >
              <Select.Trigger
                iconName="caretDown"
                className="flex w-full items-center justify-between rounded-lg border border-gray-3/70 bg-secondary/25 p-4 leading-none text-black focus:ring-inset disabled:border-none disabled:bg-white disabled:text-gray-4"
              />
              <Select.Content className="max-h-[--radix-select-content-available-height]overflow-auto z-10 w-[--radix-select-trigger-width] rounded-md bg-white p-1 shadow-md ring-1 ring-gray-2 focus:outline-none">
                {Object.entries(gameState).map(([key, value]) => (
                  <Select.Item key={key} value={key}>
                    {value}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[30%] shrink-0 p-4 text-black">영상</div>
            <div className="w-full">
              <input
                name="videoId"
                type="text"
                value={videoId || ''}
                onChange={handleInput}
                disabled={!isEditMode}
                className="w-full rounded-lg border border-gray-3/70 bg-secondary/25 p-4 text-sm text-black disabled:border-none disabled:bg-white disabled:text-gray-4"
              />
            </div>
          </div>
        </div>

        {isEditMode && (
          <Button
            className="m-4 rounded-lg bg-primary p-4 text-white hover:bg-[#303ECE] disabled:bg-gray-2 disabled:text-gray-4"
            type="submit"
          >
            수정하기
            <Icon iconName="pencil" width={20} height={20} className="ml-2" />
          </Button>
        )}
      </form>
    </section>
  );
}

MatchInfoDetail.ErrorFallback = function ErrorFallback({
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className="relative my-5 flex h-full min-h-[200px] w-full flex-col items-center justify-center gap-5 rounded-xl border p-2">
      <div className="flex flex-wrap justify-center gap-x-1">
        <span>매치 정보를 불러오는데 실패했습니다.</span>
        <span>잠시 후 다시 시도해주세요!</span>
      </div>
      <button onClick={resetErrorBoundary} className="text-primary">
        새로고침
      </button>
    </div>
  );
};
