export class HardMode{

    conditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
    
    chooseMovePosition = (fields, activePlayer) => {
           
        let gameBoard = [...fields];
        
        let ai = activePlayer;

        let bestMove;

        let bestScore = -Infinity;
        for(let i=0;i<9;i++)
        {
            if(gameBoard[i] === "")
            {
                gameBoard[i] = activePlayer;
                let score = this.minimax(gameBoard, false, activePlayer, ai);
                gameBoard[i] = "";
                if( score > bestScore )
                {   
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        
        return bestMove;
    }


    minimax = (gameBoard,isMaxisizing,activePlayer,ai) =>
    {
        let aiPlayer = ai;
        let humanPlayer = ai === "X" ? "O":"X";

        if(this.winner(gameBoard) === aiPlayer)
        {
            return this.movesLeft(gameBoard) + 1;
        }
        else if(this.winner(gameBoard) === humanPlayer)
        {
            return -1 * (this.movesLeft(gameBoard) + 1)
        }
        else if(this.winner(gameBoard) === "draw")
        {
            return 0;
        }

        let player = activePlayer === "X" ? "O" : "X"; 

        if(isMaxisizing){
            let bestScore = -Infinity;
            for(let i=0 ;i<9 ;i++)
            {
                if(gameBoard[i] === "")
                {
                    gameBoard[i] = player;
                    let score = this.minimax(gameBoard, false, player, aiPlayer);
                    gameBoard[i] = "";
                    if( score > bestScore )
                    {   
                        bestScore = score;
                    }
                }
            }
            return bestScore;
        }
        if(!isMaxisizing){
            let bestScore = Infinity;
            for(let i=0 ;i<9 ;i++)
            {
                if(gameBoard[i] === "")
                {
                    gameBoard[i] = player;
                    let score = this.minimax(gameBoard, true, player, aiPlayer);
                    gameBoard[i] = "";
                    if( score < bestScore )
                    {   
                        bestScore = score;
                    }
                }
            }
            return bestScore;
        }   
    }

    winner = (fields) =>{

        let drawCheck = true;

        for(let i = 0 ; i<=7 ; i++){
            const [A,B,C] = this.conditions[i];
            let value1 = fields[A];
            let value2 = fields[B];
            let value3 = fields[C];
            if(value1 === value2 && value1 === value3 && value1 != '')
            {   
                return value1;
            }
        }
        for( let i = 0; i<9;i++)
        {
            if(fields[i] === "")drawCheck = false;
        }
        if(drawCheck) return "draw";
    }

    movesLeft = (fields) =>{
        let movesLeftNum = 0;
        for(let i = 0; i < 9 ; i++ ){
            if(fields[i] === "")
            {
                movesLeftNum ++;
            }
        }
        return movesLeftNum;
    }

}
