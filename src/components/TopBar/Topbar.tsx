import React from 'react'
import PlayerStatus from './PlayerStatus';
import { Players } from 'rune-games-sdk';
import PlayerStatusTemplate from './PlayerStatusTemplate';

interface TopBarProps{
    players:Players | undefined;
    turn:string
    currentPlayerId:string;
    lastGuess:string
}

const Topbar:React.FC<TopBarProps> = ({players,turn,currentPlayerId,lastGuess}) => {
  const isCurrentTurnFirstPlayer = players ? Object.keys(players)[0]===turn : true

  return (
    <header className='w-full max-w-full overflow-hidden p-2 pb-1 items-center grid grid-cols-[1fr,max-content,1fr] gap-2 relative'>

        {players && Object.keys(players).length > 0 ? (
            <PlayerStatus first currentPlayerId={currentPlayerId} player={players[Object.keys(players)[0]]} isGuessing={turn === Object.keys(players)[0]} />
        ) : (<PlayerStatusTemplate />)}

          <p className='w-fit h-full opacity-70 text-sm'>|</p>
        {players && Object.keys(players).length > 1 ? (
            <PlayerStatus currentPlayerId={currentPlayerId} player={players[Object.keys(players)[1]]} isGuessing={turn === Object.keys(players)[1]} />
            ) : (<PlayerStatusTemplate />)}

        <p className={`bg-card_background text-card_foreground px-1 rounded-md text-xs absolute bottom-0 ${isCurrentTurnFirstPlayer ? 'translate-x-11' : 'translate-x-[calc(100vw-6.25rem)]'} transition-all duration-300 ease-in-out `}>Guessing</p>

          {/* last guess showing for hinter */}
          {currentPlayerId!==turn && 
          <div className={`fixed top-4 left-4 ${isCurrentTurnFirstPlayer ? 'translate-x-11' : 'translate-x-[calc(100vw-8.25rem)]'}`}>
            <p key={lastGuess} className='animate-fadeOutDown z-10 text-card_background'>{lastGuess}</p>
          </div> 
          }

    </header>
  )
}



export default Topbar