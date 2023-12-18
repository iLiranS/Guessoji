import React, {  useEffect, useState } from 'react'
import { IoSendSharp } from "react-icons/io5";
import { stringSimilarity } from "string-similarity-js";
import { playSound } from '../../utils/functions';
import closeGuessSound from '../../assets/close_guess.wav'

type GuessingFieldProps={
  hints:string[],
  onGuess:(guess:string)=>void,
  correctWord:string,
}

const GuessingField:React.FC<GuessingFieldProps> = ({hints,onGuess,correctWord}) => {
  const [guessText,setGuessText] = useState('');
  const [canGuess,setCanGuess] = useState(true);
  const [closeAlert,setCloseAlert] = useState(false);

  const guessHandler = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if (!canGuess) return;
    const similarityPercentage = stringSimilarity(correctWord,guessText);
    if (similarityPercentage>0.5 && similarityPercentage <0.84){
      playSound(closeGuessSound,0.5);
      setCloseAlert(true);
    }
    setGuessText('');
    onGuess(guessText);
    setCanGuess(false);
  }


  const mappedHints = hints.map((hint,index)=> 
  <li className={`w-full grid grid-cols-[1fr,2fr] gap-1 bg-white/10 odd:bg-black/10 rounded-md ${index===0 && 'animate-scaleInSoft'}`} key={hint+index}>
    <p className='text-end opacity-80'>{index===0 && <span className='opacity-70 text-sm mr-2'>(latest)</span>}{index+1}.</p>
    <p>{hint}</p>
  </li>)

useEffect(()=>{
  let timeout:null|ReturnType<typeof setTimeout> = null;
  if (!canGuess){
    timeout = setTimeout(() => {
      setCanGuess(true);
      setCloseAlert(false);
    }, 1500);
  }
  return ()=>{timeout && clearTimeout(timeout) };
},[canGuess])



  return (
    <div className='grid grid-rows-[max-content,1fr] h-full'>
      <section className=''>
        <p className='text-center font-semibold mb-1'>Hints</p>
        <ul className='flex flex-col gap-1 px-2 text-xl max-h-[40dvh] overflow-auto'>
          {mappedHints.length>0 ? mappedHints : <li className='opacity-80 text-center animate-pulse'>Waiting for hints...</li>}
        </ul>
      </section>

      <div className='flex flex-col gap-1 w-full self-end px-2 py-8'>
      <p className='text-xs opacity-70'>Enter guess</p>
      <form onSubmit={(guessHandler)} className='grid grid-cols-[1fr,max-content] h-fit  gap-1  relative'>
        <input type='text' maxLength={25} value={guessText} onChange={(e)=>{setGuessText(e.target.value)}} className='btnStyle bg-white/20 selection:bg-transparent border-none outline-none'></input>
        <button className={`btnStyle bg-white/20 grid place-items-center ${!canGuess && 'opacity-50 cursor-not-allowed'} ${guessText.length<2 && 'opacity-50 cursor-not-allowed'}`}><IoSendSharp/></button>
        <p className={`animate-fadeOutUp left-[40%] ${!closeAlert ? 'hidden' : 'absolute'}  top-0 text-orange-100`}>getting closer!</p>
      </form>
      </div>


    </div>
  )
}

export default GuessingField