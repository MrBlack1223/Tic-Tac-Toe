import { Board } from "./board.js";
import {EasyMode} from "./easy.js";
import { HardMode } from "./hard.js";
class Game {

    gameState;
    currentGameMode;
    activePlayer ;
    fieldsArray ;
    validateCounter ;
    firstPlayer;
    winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    constructor(){
        this.setDefaultSettings();
        this.board = new Board(this.fieldOnclick, this.setDefaultSettings, this.handleModChange, this.handleFisrstPlayer);     
    }

    fieldOnclick = e => {
        const {pos} = e.target.dataset; 
        this.gameState = "active";
        if(this.fieldsArray[pos] === ""){
            this.makeMove(pos);
            if(this.currentGameMode != null && this.gameState === "active")
            this.makeMove(this.currentGameMode.chooseMovePosition(this.fieldsArray, this.activePlayer));
        }
    }

    makeMove = position => { 
            this.board.getFieldFromPosition(position).classList.add(`playground__field--clicked--${this.activePlayer}`);
            this.fieldsArray[position] = this.activePlayer;
            this.activePlayerSwap();
            this.validateGame();         
    }

    validateGame = () => {
        let isDraw = true;
        let p = this.activePlayer === "X" ? "O" : "X";
        for(let i=0 ; i<=7 ;i++)
        {
            const [posA,posB,posC] = this.winConditions[i];
            const val1 = this.fieldsArray[posA];
            const val2 = this.fieldsArray[posB];
            const val3 = this.fieldsArray[posC];
            
            if(val1 === val2 && val1 === val3 && val1 != "")
            {
                this.board.displayMessage(`Player ${p} won!!!!`);
                this.board.increaseScore(p);
                this.board.resetGame();
            }  
        }
        for( let i = 0; i<9;i++)
        {
            if(this.fieldsArray[i] === "")isDraw = false;
        }
        if(isDraw)
        {
            this.board.displayMessage("Draw!!!!");
            this.board.increaseScore("Draw");
            this.board.resetGame();
        }

    };
    handleFisrstPlayer = (e) =>
    {
        this.firstPlayer = e.target.value;
        this.board.resetGame();
    }

    botMovesFirst = () =>
    {
        if(this.firstPlayer === "bot" && this.currentGameMode != null)
        {
            this.makeMove(this.currentGameMode.chooseMovePosition(this.fieldsArray, this.activePlayer));
        }
    }

    handleModChange = (e) =>
    {
        this.currentGameMode = this.gameModeChange(e.target.value);
        this.board.resetGame();
        this.board.resetScore();
        
    }
    gameModeChange = gameMode =>{
        if(gameMode === "easy")return new EasyMode();
        if(gameMode === "hard")return new HardMode();
        return null;

    }

    setDefaultSettings = ()=> {
        this.activePlayer = "X";
        this.fieldsArray = ["","","","","","","","",""];
        this.validateCounter = 0;
        this.gameState = "paused";
        this.botMovesFirst();
    };

    activePlayerSwap = () => {
        this.activePlayer = this.activePlayer === "X" ? "O" : "X";
    };
};
    const game = new Game();
