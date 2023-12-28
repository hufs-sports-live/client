import { Dispatch, SetStateAction } from 'react';

export type LeagueIdContextType<T> = {
  leagueId: T;
  setLeagueId: Dispatch<SetStateAction<T>>;
};
