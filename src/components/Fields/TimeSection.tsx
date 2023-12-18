import { secondsToTimeFormat } from '../../utils/functions';

type TimeSectionProps={
    timeLeft:number;
    roundStartTime:number;
    roundTimeLimit:number;
    currentTime:number;
    score:number;
    onSkip:()=>void;
    canSkip:boolean;
    lastWord:string;
}

const TimeSection:React.FC<TimeSectionProps> = ({timeLeft,roundTimeLimit,roundStartTime,currentTime,score,onSkip,canSkip,lastWord}) => {
    const timePassedInRound = currentTime - roundStartTime;
    const isFiveSecondsOrBelow = roundTimeLimit - timePassedInRound < 6000;

    const onSkipHandler = () =>{
        if (!canSkip) return;
        onSkip();
    }

return (
    <div className='relative flex flex-col gap-1 justify-center px-2 pb-4'>

        <section className='w-full grid grid-cols-[1fr,1fr,1fr] items-center'>

            <div className='items-center flex gap-1 px-1  w-fit mx-auto justify-center'>
                <p className='text-xs opacity-70'>score:</p>
                <p key={score} className='font-semibold animate-scaleIn'>{score}</p>
            </div>

            <div className='text-3xl w-[136x] mx-auto justify-center flex  bg-white/10 p-1 rounded-md font-bold items-center'>
                <p>{secondsToTimeFormat(timeLeft)}</p>
                <p className={`grayscale origin-bottom ${isFiveSecondsOrBelow ? 'animate-shake' : ''}`}>⏱️</p>
            </div>

            <div className='flex justify-center'>
                <button className={`${canSkip ? 'opacity-100' : 'opacity-30 cursor-not-allowed'} btnStyle z-20`} onClick={onSkipHandler}>Skip</button>
            </div>

        </section>

        <div className='flex flex-col gap-1'>
            <div className='flex gap-1 overflow-hidden w-full justify-center items-center h-8'>
                <p className='text-xs opacity-70'>Last word</p>
                <p key={lastWord} className='text-sm font-semibold animate-scaleInSoft truncate opacity-80'>{lastWord}</p>
            </div>

            {/* <div className='w-fit mx-auto justify-center items-center overflow-hidden relative flex gap-1 '>
                    <p className='text-xs opacity-70 text-center'>Round</p>
                    <section className='p-1 rounded-md font-bold bg-white/10 animate-scaleIn grid place-items-center aspect-square w-9'>{remainingTimeStr}</section>
            </div> */}

        </div>





    </div>
)
}  
export default TimeSection
