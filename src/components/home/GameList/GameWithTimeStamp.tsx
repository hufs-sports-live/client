import Link from 'next/link';

import { Game } from '@/components/common/Game';
import { AllGamesResponse } from '@/types/game';

interface GameListProps {
  data: AllGamesResponse[];
}

export default function GameWithTimeStamp({ data }: GameListProps) {
  return (
    <ul className="space-y-4">
      {data.map(game => (
        <li key={game.id}>
          <Link
            href={`/detail/${game.id}`}
            className="flex flex-col gap-1 justify-center p-2 rounded-lg shadow-md bg-white"
          >
            <Game>
              <Game.Label>{game.name}</Game.Label>
              <Game.TeamWrapper gap={2}>
                <Game.TeamLogo
                  src={game.firstTeam.logoImageUrl}
                  alt={`${game.firstTeam.name} 로고`}
                />
                <Game.TeamName>{game.firstTeam.name}</Game.TeamName>
              </Game.TeamWrapper>
              <Game.Timer date={game.startTime} />
              <Game.TeamWrapper reverse gap={2}>
                <Game.TeamLogo
                  src={game.secondTeam.logoImageUrl}
                  alt={`${game.secondTeam.name} 로고`}
                />
                <Game.TeamName>{game.secondTeam.name}</Game.TeamName>
              </Game.TeamWrapper>
            </Game>
          </Link>
        </li>
      ))}
    </ul>
  );
}
