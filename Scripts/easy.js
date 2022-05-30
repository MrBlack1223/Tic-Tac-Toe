export class EasyMode {

    chooseMovePosition = (fields, activePlayer) =>{
        let position;

        do{

            position = Math.floor(Math.random() * 9);

        }while(fields[position] !== "")
        
        return position;
    }

}