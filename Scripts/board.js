
export class Board {

    fields = document.querySelectorAll(".playground__field");
    resetGameButton = document.querySelector(".resetbutton");
    resetScoreButton = document.querySelector(".resetScoreButton");
    pannel = document.querySelector(".pannel");
    selectGameMode = document.querySelector("#selectGameMode");
    selsctFirstPlayer = document.querySelector("#selectFirstPlayer")
    
   constructor(fieldOnclick,setDefaultSettings,handleModChange,handleFirstPlayerChange) 
   {   
       this.defaultSettings = setDefaultSettings;
       this.fields.forEach(field => {
           field.addEventListener("click",fieldOnclick);
       });
       this.resetGameButton.addEventListener('click',this.resetGame);
       this.resetScoreButton.addEventListener('click',this.resetScore);
       this.selectGameMode.addEventListener('change',handleModChange);
       this.selsctFirstPlayer.addEventListener('change',handleFirstPlayerChange)
   }

   removeFieldsClass = () =>{
       this.fields.forEach(area => {
               area.classList.remove(`playground__field--clicked--X`,`playground__field--clicked--O`);
       });
   };
   
   resetGame = () =>{ 
       this.removeFieldsClass();
       this.defaultSettings();
   };
   
   displayMessage = (message) => {
       this.pannel.innerHTML = message;
       this.pannel.style.display = "block";
       this.pannel.addEventListener('click',()=>{
       this.pannel.style.display = "none";
   });
   };

   getFieldFromPosition = (position) =>
   {
       return this.fields[position];
   }

   increaseScore = (result) =>{ 
       const scoreField = document.querySelector(`#${result}`);
       let score = parseInt(scoreField.innerHTML,10);
       score++;
       scoreField.innerHTML = score;
   };


   resetScore = () =>{
       const scoreArr = document.querySelectorAll(".scoreField");
       scoreArr.forEach(score=>{
       score.innerHTML = "0";
   });
   };
}