import { Player } from "rune-games-sdk"

type PlayerProps={
    isGuessing:boolean,
    player: Player,
    currentPlayerId:string,
    first?:boolean
}

const PlayerStatus:React.FC<PlayerProps> = ({player,currentPlayerId,first}) =>{
    return(
        <div dir={first ? 'ltr' : 'rtl'} className="grid grid-cols-[max-content,1fr] w-full h-full relative justify-start gap-1">
            <img className="aspect-square rounded-full w-8" alt={player.displayName} src={player.avatarUrl}/>
            <section className="flex flex-col h-full w-full justify-start overflow-hidden">
                <p dir="ltr" className={`truncate text-white text-sm font-bold  ${!first && 'text-right'} ${currentPlayerId === player.playerId ? '' :''}`}>{player.displayName}</p>
            </section>
        </div>
    )
}
export default PlayerStatus;

/*

        <div dir={first ? 'rtl' : 'ltr'} className={`h-full gap-1 grid grid-cols-[2fr,1fr] items-center ${isGuessing ? 'opacity-100' : 'opacity-50'}`}>
            <p dir="ltr" className={`truncate ${first ? 'text-start' : 'text-end '} ${currentPlayerId === player.playerId && 'underline underline-offset-2'}`}>{player.displayName ?? 'Guest'}</p>
            <img alt={player.displayName} src={player.avatarUrl ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}/>
        </div>

*/