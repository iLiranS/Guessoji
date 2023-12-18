import { useEffect, useRef, useState } from "react"
import {GameState} from "../logic"
import  { Players } from "rune-games-sdk";
import Topbar from "./TopBar/Topbar";
import TimeSection from "./Fields/TimeSection";
import RoundLimit from "./RoundLimit";
import GuessingField from "./Fields/GuessingField";
import HinterField from "./Fields/HinterField";
import pointSound from '../assets/point_sound.wav';
import five_seconds_warning from '../assets/5_seconds.wav';
import fail_sound from '../assets/round_fail.wav'
import { playSound } from "../utils/functions";




function App() {
  const [game, setGame] = useState<GameState>();
  const [myPlayerId,setMyPlayerId] = useState<string|undefined>();
  const [currentScore,setCurrentScore] = useState(0);
  const [currentStartAt,setCurrentStartAt] = useState(0);
  const [players,setPlayers] = useState<Players>();
  const topSectionRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    import("../logic").then(() =>
      Rune.initClient({
        onChange: ({ game, players, yourPlayerId }) => {
          setGame(game as GameState)
          setPlayers(players)
          setMyPlayerId(yourPlayerId)
        },
      })
    )
  }, [setGame, setMyPlayerId, setPlayers])

  const skipHandler =()=>{
    Rune.actions.finishRound({success:false});
  }

  const hintSendHandler = (hint:string) =>{
    Rune.actions.unshiftHint({hint});
  }

  const onGuessHandler = (guess:string) =>{
    Rune.actions.guessWord({guess});
  }

  
  useEffect(()=>{
    if (!game) return;
    if (game.score > currentScore){
      setCurrentScore(game.score);
      setCurrentStartAt(game.roundStartAt);
      // play sound 
      playSound(pointSound,0.1);
    }
    else{
      if (game.roundStartAt !== currentStartAt){
        // failed round
        setCurrentStartAt(game.roundStartAt);
        playSound(fail_sound);

      }
    }
  },[game,currentScore])


  useEffect(()=>{
    if (!game) return;
    const audio = new Audio(five_seconds_warning);
    audio.volume=0.2;

    const timeout = setTimeout(()=>{
      audio.play();
      console.log('??')
    },game.roundLimit-5000)

    return()=>{clearTimeout(timeout);audio.pause();}
  },[game?.roundStartAt])



  if (!game) {
    return <div>Loading...</div>
  }


  return (
    <div className="grid grid-rows-[max-content,1fr] flex-col h-[100dvh] w-full gap-2">
      <div ref={topSectionRef} className="flex flex-col gap-2 relative z-20">
        <Topbar lastGuess={game.lastGuess} currentPlayerId={myPlayerId ?? ''}  players={players} turn={game.turnId}/>
        <TimeSection lastWord={game.lastWord} score={game.score} canSkip={Rune.gameTime()-game.roundStartAt>5000} onSkip={skipHandler} timeLeft={game.time} roundStartTime={game.roundStartAt} roundTimeLimit={game.roundLimit} currentTime={Rune.gameTime()}/>
        {topSectionRef.current && <RoundLimit roundLimit={game.roundLimit} currentTime={Rune.gameTime()} roundStartAt={game.roundStartAt} width={topSectionRef.current.clientWidth} height={topSectionRef.current.clientHeight}/>}
      </div>

    {players && 
    <div className="relative">
    {myPlayerId===game.turnId ? 
      <GuessingField correctWord={game.words[0]} onGuess={onGuessHandler} hints={game.hints}/> 
      : 
      <HinterField  currentWord={game.words[0]} onHintSend={hintSendHandler}/>}      


    </div> }
    <div className=" absolute h-full w-full top-0 -z-10 bgLoop"></div>

    </div>
  )
}

export default App
