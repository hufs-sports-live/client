import * as Sentry from '@sentry/nextjs';
import { AxiosError } from 'axios';

import { LeagueType, SportsType } from '@/types/league';

import instance from '.';

export const getAllLeagues = async () => {
  try {
    const response = await instance.get<LeagueType[]>('/leagues');

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    Sentry.captureException(axiosError);

    if (axiosError.response) {
      throw new Error(axiosError.response.statusText);
    } else {
      throw new Error('리그 목록을 불러오는 데에 실패했습니다!');
    }
  }
};

export const getSportsListByLeagueId = async (leagueId: string) => {
  const { data } = await instance.get<SportsType[]>(
    `/leagues/${leagueId}/sports`,
  );

  return data;
};
