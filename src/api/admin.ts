import { CreateGameRequest, GameScoreRequest } from '@/types/admin';
import { adminInstance } from './instance';
import { AxiosError } from 'axios';
import * as Sentry from '@sentry/nextjs';

export const createGame = (body: CreateGameRequest) => {
  try {
    return adminInstance.post('/manage/game/register/', body);
  } catch (error) {
    const axiosError = error as AxiosError;

    Sentry.captureException(axiosError);

    if (axiosError.response) {
      throw new Error(axiosError.response.statusText);
    } else {
      throw new Error('경기를 생성하는 데에 실패했습니다!');
    }
  }
};

export const postGameScore = (id: number, body: GameScoreRequest) => {
  try {
    return adminInstance.post(`/manage/game/score/${id}/`, body);
  } catch (error) {
    const axiosError = error as AxiosError;

    Sentry.captureException(axiosError);

    if (axiosError.response) {
      throw new Error(axiosError.response.statusText);
    } else {
      throw new Error('경기 점수를 변경하는 데에 실패했습니다!');
    }
  }
};

export const postBlockComment = (id: number) => {
  return adminInstance.post(`/manage/comments/block/${id}/`);
};
