'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';

import Button from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { useLeagueIdContext } from '@/hooks/useLeagueIdContext';
import useValidate from '@/hooks/useValidate';
import usePostTeamMutation from '@/queries/admin/team/usePostTeamMutation';
import { TeamType } from '@/types/admin/team';

export default function RegisterTeam({
  data,
  onNext,
}: {
  data: TeamType[] | string | undefined;
  onNext?: () => void;
}) {
  const { leagueId } = useLeagueIdContext();

  const router = useRouter();
  const { mutate } = usePostTeamMutation(leagueId);

  const inputRef = useRef<HTMLInputElement>(null);
  const [teamName, setTeamName] = useState<string>('');
  const [teamLogo, setTeamLogo] = useState<File | null>(null);

  const { isError: isNameEmpty } = useValidate(
    teamName,
    nameValue => !nameValue,
  );
  const { isError: isImageEmpty } = useValidate(
    teamLogo as File,
    file => !file,
  );
  const isAnyInvaild = isNameEmpty || isImageEmpty;

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'logo') {
      if (!files) return;

      setTeamLogo(files[0]);
    } else {
      setTeamName(value);
    }
  };

  const triggerUploadImage = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  const resetTeamData = () => {
    setTeamName('');
    setTeamLogo(null);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (teamName && teamLogo) {
      formData.append('name', teamName);
      formData.append('logo', teamLogo);

      mutate({ leagueId, body: formData });
      resetTeamData();
    }
  };

  const handleNextStep = () => {
    if (onNext) {
      onNext();
    } else {
      router.push('/admin/league');
    }
  };

  return (
    <>
      <div className="text-2xl font-medium">새 팀 등록</div>
      <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
        <label>
          <div className="flex items-center justify-between">
            <span>팀 이름</span>
            {isNameEmpty && (
              <span className="text-sm text-red-400">필수 항목입니다.</span>
            )}
          </div>
          <input
            name="name"
            type="text"
            value={teamName}
            onChange={handleInput}
            className="mt-2 block w-full rounded-lg border border-gray-3/70 bg-secondary/25 p-4"
            required
          />
        </label>
        <div>
          <div className="flex items-center justify-between">
            <span>팀 로고</span>
            {isImageEmpty && (
              <span className="text-sm text-red-400">필수 항목입니다.</span>
            )}
          </div>

          <Button
            className="mt-2 flex w-full flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-gray-3/70 bg-secondary/25 p-4 py-8 text-gray-4"
            type="button"
            onClick={triggerUploadImage}
          >
            <Icon iconName="image" width={36} height={36} />
            <span className="text-xl">파일을 업로드하세요.</span>
            <span>10MB이하의 PNG, JPG, Webp</span>
          </Button>
          <input
            name="logo"
            type="file"
            accept="image/png, jpg, webp"
            ref={inputRef}
            onChange={handleInput}
            className="hidden"
            required
          />
        </div>
        {!isAnyInvaild && (
          <>
            <div>등록될 팀</div>
            <div className="mt-2 grid grid-cols-6 items-center justify-between gap-4 rounded-lg border border-gray-3/70 bg-secondary/25 p-2 px-4 text-gray-4">
              <div className="col-span-2 flex items-center gap-4">
                <span className="text-sm">팀명:</span>
                <span>{teamName}</span>
              </div>
              <div className="col-span-3 col-start-3 flex items-center gap-4">
                <div className="w-min text-sm text-gray-4">로고: </div>
                <div className="flex w-full items-center gap-2 overflow-hidden">
                  <Icon
                    iconName="clip"
                    width={20}
                    height={20}
                    className="w-min"
                  />
                  <span className="w-full truncate">{teamLogo?.name}</span>
                </div>
              </div>
              <Button
                type="reset"
                onClick={resetTeamData}
                className="flex justify-center"
              >
                <Icon iconName="cross" />
              </Button>
            </div>
          </>
        )}
        <Button
          className=" rounded-lg bg-secondary p-4 hover:bg-[#303ECE] disabled:bg-gray-2 disabled:text-gray-4"
          disabled={isAnyInvaild}
          type="submit"
        >
          등록
        </Button>
      </form>

      <div className="border-t border-gray-3 pt-8 text-2xl font-medium">
        팀 목록
      </div>
      <div className="mx-2 flex flex-col gap-2">
        {data && typeof data !== 'string' ? (
          data.map(team => (
            <div
              className="grid grid-cols-6 items-center justify-between gap-4 rounded-lg border border-gray-3/70 bg-secondary/25 p-2 px-4 text-gray-4"
              key={team.id}
            >
              <div className="col-span-2 flex items-center gap-4">
                <span className="text-sm">팀명:</span>
                <span className="text-black">{team.name}</span>
              </div>
              <div className="col-span-3 col-start-3 flex items-center gap-4">
                <div className="text-sm text-gray-4">로고: </div>
                <div className="flex items-center gap-2 overflow-hidden text-black">
                  <Icon
                    iconName="clip"
                    width={20}
                    height={20}
                    className="w-min"
                  />
                  <span className="w-full truncate">
                    {team.logoImageUrl.split('/').slice(-1)[0]}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-4">아직 등록된 팀이 없습니다.</div>
        )}
      </div>

      <Button
        className="w-full rounded-lg bg-[#0718AE] p-4 text-xl text-white hover:bg-[#303ECE] disabled:bg-gray-2 disabled:text-gray-4"
        type="submit"
        onClick={handleNextStep}
      >
        {onNext ? '다음으로' : '등록 마치기'}
      </Button>
    </>
  );
}
