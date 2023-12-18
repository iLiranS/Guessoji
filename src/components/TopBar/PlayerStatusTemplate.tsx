import React from 'react'

const PlayerStatusTemplate = () => {
  return (
    <div className={`h-full grid grid-cols-[2fr,1fr] items-center animate-pulse`}>
    <p>Waiting...</p>
    <img className='' alt={'anonymous'} src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'/>
</div>
  )
}

export default PlayerStatusTemplate