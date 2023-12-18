
import React, { useEffect, useState } from 'react'
import EmojiPicker, { EmojiClickData , SuggestionMode } from 'emoji-picker-react';
import { IoBackspaceOutline,IoSendSharp } from "react-icons/io5";




type HinterFieldProps={
    onHintSend:(hint:string)=>void,
    currentWord:string,
}
const emojiRegex = /^[^\p{L}0-9\s]+$/u;

const HinterField:React.FC<HinterFieldProps> = ({onHintSend,currentWord}) => {
  const [error,setError] = useState<false | string>(false);
  const [hint,setHint] = useState<EmojiClickData[]>([]);
  const [inputHint,setInputHint] = useState<string>('');
  const [lastHint,setLastHint] = useState<string>('');
  const [canSendHint,setCanSendHint] = useState(true);
  const [isEmojiMenuOpen,setIsEmojiMenuOpen] = useState(false);

  const hintsMapped = hint.map((hint,index) => <li key={hint.emoji+index}>{hint.emoji}</li>)

  const onEmojiClickHandler = (emoji:EmojiClickData) =>{
    setHint(prev =>{ 
        if(prev.length < 6) return[...prev,emoji];
        return prev;
      });
  }

  useEffect(()=>{
    if (hint.length > 5 || [...new Intl.Segmenter().segment(inputHint)].length>5) setError('Maximum of 6 emoji.')
    else setError(false);
  },[hint,inputHint])

  const deleteHintHandler = () =>{
    setHint(prev => prev.toSpliced(-1,1));
  }

  const emojiMenuSendHandler = () =>{
    if (hint.length <1 || hint.length>6) {setError('Select at least 1 emoji'); return}
    const strHint = hint.map(hint => hint.emoji).join('')
    onHintSend(strHint);
    setLastHint(strHint);
  }

  const inputSendHandler = () =>{
    if (inputHint.length<1) {setError('Select at least 1 emoji'); return}
    onHintSend(inputHint);
    setLastHint(inputHint)
  }

  const sendHintHandler = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if (!canSendHint) {setError('Please wait...');return}

    if (isEmojiMenuOpen) emojiMenuSendHandler();
    else inputSendHandler();

    setHint([]);
    setInputHint('');
    setError(false);
    setCanSendHint(false);
  }

  const inputChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const inputValue = e.target.value;
    setInputHint(prev =>{
      if([...new Intl.Segmenter().segment(inputValue)].length>6) return prev;
      if (inputValue.length < prev.length) return inputValue // removed emoji
      if (emojiRegex.test(inputValue)) return inputValue; // check if addition is an emoji.
      return prev;
      
    });
 
  }

  useEffect(()=>{
    let timeout:null|ReturnType<typeof setTimeout> = null;
    if (!canSendHint){
      timeout = setTimeout(() => {
        setCanSendHint(true);
      }, 3000);
    }
    return ()=>{timeout && clearTimeout(timeout) };
  },[canSendHint])

  return (
    <div className='grid grid-rows-[max-content,1fr] px-2 h-full overflow-hidden gap-2'>
        
        <section className='flex flex-col w-full items-center '>
          <div className='flex flex-col gap-0 items-center'>
            <p className='text-xs opacity-70 text-start'>current word</p>
            <p className='text-xl font-semibold animate-scaleIn'><span className='opacity-70'>"</span>{currentWord}<span className='opacity-70'>"</span></p>
          </div>

          <section className='text-xs items-center h-4'>
            {error ? 
            <p className='bg-red-400 rounded-md px-1 animate-scaleInSoft'>{error}</p> 
            :
            <p className={`${lastHint.length<1 ? 'hidden' : 'block'}`}><span className='text-xs opacity-70'>Last hint</span> {lastHint}</p>
            }
          </section>

          <div className='flex flex-col gap-1 w-full'>
            <p className='text-xs opacity-70 ml-1'>Enter hint</p>
            <form onSubmit={sendHintHandler} className='w-full grid grid-cols-[1fr,max-content,max-content] px-1 gap-1'>
              <div className={`grid  ${isEmojiMenuOpen ?'grid-cols-[max-content,1fr]' : 'grid-cols-1'} p-1 h-8 rounded-md bg-white/20 hover:bg-white/30 justify-center w-full`}>
                {isEmojiMenuOpen &&<button onClick={(e)=>{e.preventDefault();deleteHintHandler();}} className={`${hint.length<1 ? 'opacity-0' : 'opacity-100'} btnStyle bg-transparent`}><IoBackspaceOutline/></button>}
                {isEmojiMenuOpen
                ?
                <ul className='w-full flex gap-1'>{hintsMapped}</ul>
                :
                <input  className='bg-transparent w-full border-none outline-none' value={inputHint} type='text' onChange={inputChangeHandler}/>
              }
              </div>
              <section onClick={(e)=>{e.preventDefault();setIsEmojiMenuOpen(prev=>!prev)}} className={`btnStyle bg-white/20 grid place-items-center ${isEmojiMenuOpen ? 'opacity-100 bg-white/20' : 'opacity-70 grayscale'}`}>😜</section>
              {isEmojiMenuOpen ?
              <button  className={`btnStyle bg-white/20 grid place-items-center ${!canSendHint && 'opacity-50 cursor-not-allowed'} ${hint.length<1 && 'opacity-50 cursor-not-allowed' }`}><IoSendSharp/></button>
              :
              <button className={`btnStyle bg-white/20 grid place-items-center ${!canSendHint && 'opacity-50 cursor-not-allowed'} ${inputHint.length<1 && 'opacity-50 cursor-not-allowed' }`}><IoSendSharp/></button>
              }
            </form>
          </div>
        </section>
        <p></p>

        <div className='h-full relative w-full flex justify-center'>
          {isEmojiMenuOpen &&
          <EmojiPicker onEmojiClick={onEmojiClickHandler} suggestedEmojisMode={SuggestionMode.RECENT} previewConfig={{showPreview:false}} skinTonesDisabled height={'90vw'} width={'90vw'}/> 
          }
          </div>

    </div>
  )
}




export default HinterField


/*
   if (emojiRegex.test(inputValue)) {
      setInputHint(prev =>{ 
        if([...new Intl.Segmenter().segment(inputValue)].length<6) return inputValue;
        return prev;
      });
    }

*/