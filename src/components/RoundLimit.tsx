import React from "react";

type SVGProps={
    width:number,
    height:number,
    roundStartAt:number,
    roundLimit:number,
    currentTime:number,
}

const RoundLimit:React.FC<SVGProps> = ({width,height,roundStartAt,roundLimit,currentTime}) =>{
    const controlPointX = width / 2;
    const controlPointY = height +15;
    const remainingPercentage = (1- (currentTime- roundStartAt) / roundLimit) * 100;
    const pathOffset = width - width * remainingPercentage / 100;
    const remainingTimeStr:string = Math.round(roundLimit/1000 * remainingPercentage/100)+ 's';
    const textXoffset =20;

return (
    <svg className='absolute top-0 -z-10' xmlns="http://www.w3.org/2000/svg" version="1.1" width={'100%'} height={'100%'}>
        <defs>
        <linearGradient id="GradientColor">
            <stop offset="0%" stop-color="#c75454" />
            <stop offset="100%" stop-color="#fdc553" />
        </linearGradient>

        <linearGradient id="GradientBackground" x1="0%" y1="100%" x2="0%" y2='0%'>
            <stop offset="0%" stop-color="hsl(var(--top_backgroundStart))" />
            <stop offset="100%" stop-color="hsl(var(--top_backgroundFinish))" />
        </linearGradient>
        </defs>
        <ellipse className='outerEllipse' cx={'50%'} cy={'0%'} rx={'100%'} ry={'100%'} stroke-linecap="round"/> 
        <path
        d={`M 0 ${height-23} Q ${controlPointX} ${controlPointY} ${width} ${height - 23}`}
        stroke={`url(#GradientColor)`}
        strokeWidth={'10px'}
        fill="none"
        strokeLinecap='round'
        strokeDasharray={width}
        strokeDashoffset={pathOffset}
    >
        
    </path>
        <text opacity={0.3} x={width / 2} y={height} textAnchor="middle" dx={width/2-pathOffset+textXoffset} dy='5px' fill="#fff">
            <textPath href="#curve">
                {remainingTimeStr}
            </textPath>
        </text>
        <path id="curve" d={`M 0 ${height - 30} Q ${controlPointX} ${controlPointY} ${width} ${height - 30}`} fill="none"/>
    </svg>
)
}

export default RoundLimit