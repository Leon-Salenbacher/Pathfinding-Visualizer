function is_visit(id, grid){
    let y_pos = parseInt(id.split("-")[0]);
    let x_pos = parseInt(id.split("-")[1]);
    let state = grid[y_pos][x_pos].split("-")[2];

    if(state == "visit" || state == "marked"){
        return true;
    }
    return false;
}

function wait(ms){
    return new Promise( resolve =>{
        setTimeout(() => {resolve('')},ms);
    })
}

//save grid in Array
function get_grid(LENGTH,WIDTH){
    grid = [];
    var start = null;
    var end = null;
    for(let i = 0; i < WIDTH; i++){
        row = [];
        for(let e = 0; e < LENGTH; e++){
            let pos = (i + "-" + e);
            let state = document.getElementById(pos).className;
            row.push(pos + "-" + state);
            if(state == "end_point"){ 
                end = pos;
            }else if(state == "start_point"){
                start = pos;
            }
        }
        grid.push(row);
    }
    //return grid;
    return [grid, start, end];
}

function get_neighbors(id, grid){
    let y = parseInt(id.split("-")[0]);
    let x = parseInt(id.split("-")[1]);

    //Top -> left -> down -> right
    let top_pos =  (y-1) + "-" + (x);
    let left_pos =  (y) + "-" + (x-1);
    let down_pos =  (y+1) + "-" + (x);
    let right_pos =  (y) + "-" + (x+1);
    
    let neighbors = [];
    if(is_free(top_pos, grid)){
        neighbors.push(top_pos);
    }
    if(is_free(left_pos, grid)){
        neighbors.push(left_pos);
    }
    if(is_free(down_pos, grid)){
        neighbors.push(down_pos);
    }
    if(is_free(right_pos, grid)){
        neighbors.push(right_pos);
    }
    return neighbors;
}

function is_free(id, grid){
    try{
        let y = parseInt(id.split("-")[0]);
        let x = parseInt(id.split("-")[1]);
        let state = grid[y][x].split("-")[2];
        
        if(state == "White_Box" || state == "end_point" || state == "start_point"){            
            return true;
        }
    }catch(err){
        return false;
    }
    return false;
}

function shortest_path(input, start, end){
    let path = String(input).split(",");
    let short_path = [end];
    let pos = end;
    let i = 0;

    while(true){
        if(pos == start){
            short_path.reverse();
            return short_path;
        }
        for(w in path){
            let cord = path[w];
            let last_cord = cord.split(";")[0];
            let current_cord = cord.split(";")[1];
            if(last_cord == pos){
                short_path.push(current_cord);
                pos = current_cord;
            }
        }       
        i++;
    }
}


//============ Dropdown ======================

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function Dropdown(id){
    //let dropdown = document.getElementById(id).
    //console.log("Dropdown" + dropdown);
    document.getElementById(id).classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  } 