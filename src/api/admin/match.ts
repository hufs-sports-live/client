import {
  MatchInfoType,
  PutMatchInfoPayload,
  SportsQuarterType,
} from '@/types/admin/match';

import { adminInstance } from '..';

export const getMatchInfoByIdWithAuth = async (matchId: string) => {
  const { data } = await adminInstance.get<MatchInfoType>(
    `/game/info/${matchId}/`,
  );

  return data;
};

export const putMatchInfoWithAuth = async (payload: {
  matchId: string;
  data: PutMatchInfoPayload;
}) => {
  await adminInstance.put(`/game/change/${payload.matchId}/`, payload.data);

  return payload.matchId;
};

export const getSportsQuarterByIdWithAuth = async (sportId: number) => {
  const { data } = await adminInstance.get<SportsQuarterType[]>(
    `/sport/${sportId}/quarter/`,
  );

  return data;
};
