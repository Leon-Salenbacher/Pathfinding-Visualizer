function get_wall(LENGTH, WIDTH) {
    let grid = [];

    for(let i = 0; i < WIDTH; i++){
        let row = [];
        for(let e = 0; e < LENGTH; e++){
            let pos = (i + "-" + e);
            row.push(pos + "-Wall" );
            document.getElementById(pos).className = "Wall";
        }
        grid.push(row);
    }
    return grid;
}

function make_border(LENGTH, WIDTH){
    let max_width = parseInt(WIDTH) - 1;
    let max_length = parseInt(LENGTH) - 1;
    for(let i = 0; i < LENGTH; i++){
        make_Wall("0-" + i);
        make_Wall(max_width + "-" + i);
    }
    for(let e = 0; e < WIDTH; e++){
        make_Wall(e + "-0");
        make_Wall(e + "-" + max_length);
    }    
}

function proof_wall(pos, grid){
    try{
        let y = pos.split("-")[0];
        let x = pos.split("-")[1];
        let state = grid[y][x].split("-")[2];
        if(state == "Wall"){
            return true;
        }
    }catch(err){
        return false;
    }
    return false;
}

function can_marked(pos, grid){
    let y = parseInt(pos.split("-")[0]);
    let x = parseInt(pos.split("-")[1]);

    //get all pos of neighbors
    let top = (y-1) + "-" + (x);            //TOP
    let top_right = (y-1) + "-" + (x+1);    //TOP-RIGHT
    let right = (y) + "-" + (x+1);          //RIGHT
    let down_right = (y+1) + "-" + (x+1);   //DOWN-RIGHT
    let down = (y+1) + "-" + (x);           //DOWN
    let down_left = (y+1) + "-" + (x-1);    //DOWN-LEFT
    let left = (y) + "-" + (x-1);           //LEFT
    let top_left = (y-1) + "-" + (x-1);     //TOP-LEFT

    //prüfe ob mehr als 1 direkter nachbar (TOP,RIGHT,DOWN,LEFT) keine wall ist.
    //Speichere zusätzlich die daneben liegenden pos 
    let counter = 0;
    let neighbor1 = 0;
    let neighbor2 = 0;
    if(proof_wall(top, grid) == false){
        counter++;
        //Save top-right und top-left als variable
        neighbor1 = top_left;
        neighbor2 = top_right;
    }
    if(proof_wall(right, grid) == false){
        counter++;
        neighbor1 = top_right;
        neighbor2 = down_right;
    }
    if(proof_wall(down, grid) == false){
        counter++;
        neighbor1 = down_right;
        neighbor2 = down_left;
    }
    if(proof_wall(left, grid) == false){
        counter++;
        neighbor1 = down_left;
        neighbor2 = top_left;
    }
    //Wenn counter gleich oder kleiner 1 ist
    if(counter <= 1){
        let counter2 = 0;
        if(proof_wall(top_left, grid) == false && top_left != neighbor1 && top_left != neighbor2){
            counter2++;
        }   
        if(proof_wall(top_right, grid) == false && top_right != neighbor1 && top_right != neighbor2){
            counter2++;
        }
        if(proof_wall(down_right, grid) == false && down_right != neighbor1 && down_right != neighbor2){
            counter2++;
        }
        if(proof_wall(down_left, grid) == false && down_left != neighbor1 && down_left != neighbor2){
            counter2++;
        }        
        if(counter2 == 0){
            return true;
        }
    }
    return false;
}

function shuffleArray(inputArray){
    return(inputArray.sort(()=> Math.random() - 0.5));
}

function all_neighbors(pos){ //return all pos of neighbors and randomize them
    let y = parseInt(pos.split("-")[0]);
    let x = parseInt(pos.split("-")[1]);
    let top_pos =  (y-1) + "-" + (x);   //Top
    let left_pos =  (y) + "-" + (x-1);  //LEFT
    let down_pos =  (y+1) + "-" + (x);  //DOWN
    let right_pos =  (y) + "-" + (x+1); //RIGHT
    let neighbors = [top_pos, left_pos, down_pos, right_pos];
    return shuffleArray(neighbors);
}

function proof_stack(LENGTH, WIDTH, grid, pos){
    let y = parseInt(pos.split("-")[0]);
    let x = parseInt(pos.split("-")[1]);
    if((x <= LENGTH-2 && x >= 1) && (y <= WIDTH-2 && y >= 1)){
        //pos in field
        if(proof_wall(pos, grid) == true){
            return true;
        }
    }
    return false;
}