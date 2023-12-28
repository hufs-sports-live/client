'use client';

import { createContext, ReactNode, useState } from 'react';

import { LeagueIdContextType } from './wrapper.type';

type RegisterProps = {
  children: ReactNode;
  className?: string;
};

export const LeagueIdContext = createContext<LeagueIdContextType<string>>(
  {} as LeagueIdContextType<string>,
);

export default function LeagueIdWrapper({ children }: RegisterProps) {
  const [leagueId, setLeagueId] = useState<string>('');

  return (
    <LeagueIdContext.Provider value={{ leagueId, setLeagueId }}>
      {children}
    </LeagueIdContext.Provider>
  );
}
