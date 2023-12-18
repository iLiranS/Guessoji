// game logic
import { RuneClient } from "rune-games-sdk";
import { stringSimilarity } from "string-similarity-js";
import { shuffleArray } from "./utils/functions";
import words_list from "./utils/data";


export interface GameState{
        score: number;
        time: number;
        turnId: string;
        players: string[];
        words:string[];
        roundStartAt: number;
        hints:string[];
        roundLimit:number;
        lastWord:string;
        lastGuess:string;
}
type GameActions = {
    finishRound: (params: { success: boolean }) => void,
    unshiftHint:(params:{hint:string})=>void,
    guessWord:(params:{guess:string})=>void,
}


declare global {
    const Rune: RuneClient<GameState, GameActions>
}

Rune.initLogic({
    minPlayers:1,
    maxPlayers:2,

    setup: (allPlayersId:string[]) =>{

        const game:GameState = {
            score:0, // alreadyDone.length doesn't represent score, skip also adds up to already arr.
            time:240, // sec
            turnId:allPlayersId[0],
            players:[allPlayersId[0],allPlayersId[1]], // untouched
            words:shuffleArray(words_list),
            roundStartAt:Rune.gameTime(),
            hints:[],
            lastWord:'',
            roundLimit:45000, // ms
            lastGuess:''
        }
        return game;
    },
    actions:{
        // swaps roles and sets new word.
        finishRound: ({ success }, { game}) => {
            // in case players hit skip on the same time or latency difference.
            if (Rune.gameTime() - game.roundStartAt < 5000) return;

            if (success){
                game.score++;
            }
            // next word
            game.lastWord = game.words.shift() || '';
            // change player roles
            game.turnId = game.turnId === game.players[0] ? game.players[1] : game.players[0];
            game.roundStartAt = Rune.gameTime();
            game.hints = [];
            game.lastGuess=''
        },
        unshiftHint: ({hint}, {game})=>{
            game.hints.unshift(hint);
        },
        guessWord:({guess},{game})=>{
            const similarityStrength = stringSimilarity(game.words[0],guess);
            if (similarityStrength>=0.82){
                game.score++;
                game.lastWord = game.words.shift() || '';
                // change player roles
                game.turnId = game.turnId === game.players[0] ? game.players[1] : game.players[0];
                game.roundStartAt = Rune.gameTime();
                game.hints = [];
                game.lastGuess=''
            }
            else{
                game.lastGuess=guess;
            }
        }
    },
    update:({game})=>{
        game.time -=1
        // max time per round.
        if (Rune.gameTime() - game.roundStartAt >game.roundLimit) Rune.actions.finishRound({success:false});
        if (game.time <=0) Rune.gameOver({
            players:{
                [game.players[0]]:game.score,
                [game.players[1]]:game.score
            },
        });
    },
    
})