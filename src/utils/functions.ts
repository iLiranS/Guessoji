export const secondsToTimeFormat = (seconds:number):string =>{
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    // Use template literals to format the output
    const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    return formattedTime;
}

export const shuffleArray = (array: string[]) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 


  
  export const playSound = (sound:string,volume=0.25): void => {
    const audio = new Audio(sound);
    audio.volume = volume;
    audio.play();
  };