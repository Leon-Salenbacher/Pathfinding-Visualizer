function load_board(LENGHT,WIDTH){ 
    //get div for board
    let board = document.getElementById("board");
    //create table
    let table = document.createElement("table");
    table.className = "feld center";
    table.setAttribute("onmousedown", "return false");
    
    for(i=0; i < WIDTH; i++){
        //create row
        let row = document.createElement("tr");
        row.id = "row" + i;
        row.className = "box";
        for(e=0; e < LENGHT; e++){
            //create box
            let box = document.createElement("td");
            box.id = i + "-" + e;
            box.className = "White_Box";
            //add mouse Events to box
            box.setAttribute("onmousedown", "BoxClick(this.id, true)");
            box.setAttribute("onmouseover", "BoxClick(this.id)");
            //add box to row
            row.appendChild(box);
        }
        //add row to table
        table.appendChild(row);
    }
    //add table to board
    board.append(table);
}