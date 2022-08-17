//Set variablen
var al_started = false;
var WIDTH = 35;
var LENGTH = 70;
var ms = 30;

var Is_start = false;
var Is_end = false;
var al_started = false;

var al = 0;
var speed = 0;

//on window load
window.onload = function start(){
    //create board
    load_board(LENGTH,WIDTH);
}

// Select and start Algorithm + Speed ======================================
function set_al(Algorithm){
    let id = "visualize_btn";
    let text = "Visualize ";
    if(Algorithm == 1){ //DFS
        al = 1;
        change_text(id, text + "DFS");
    }else if(Algorithm == 2){ //BFS
        al = 2;
        change_text(id, text + "BFS");
    }
}

function set_speed(speed){
    let id = "speed_btn";
    let text = "Speed: ";
    if(speed == 1){         //Slow 1
        ms = 50;
        change_text(id, text + "Slow");
    }else if(speed == 2){   //Medium 2
        ms = 30;
        change_text(id, text + "Medium");
    }else if(speed == 3){   //Fast 3
        ms = 10;
        change_text(id, text + "Fast");
    }else if(speed == 4){   //instand
        ms = 0;
        change_text(id, text + "Instand");
    }
}

function build_maze(maze){
    if(al_started == false){
        Clear_all();
        if(maze == 1){
            randomized_dfs(LENGTH, WIDTH, ms);
        }else if(maze == 2){
            /* console.log("Recursive Division");
            Recursive_Division(LENGTH-1, WIDTH-1, ms); */
        }else if(maze == 3){
            console.log("Build Maze 3");
        }
    }   
}

async function visualize(){
    let path = null;
    let visualizer = document.getElementById('visualize_btn');
    Clear_path();
    if(al_started == false){
        al_started = true;
        visualizer.className = "visualizer-red";
        if(al == 1){ //DFS
            path = await DFS(LENGTH, WIDTH, ms);
        }else if(al == 2){ //BFS 
            path = await BFS(LENGTH, WIDTH, ms);
        }
        for(p in path){
            make_path(path[p]);
            if(ms > 0){
                await wait(ms);
            }
        }
        al_started = false;
        visualizer.className = "visualizer";
    }
}

function Clear_all(){
    if(al_started == false){
        for(let i=0; i < WIDTH; i++){
            for(let e=0; e < LENGTH; e++){
                let pos = (i + "-" + e);
                document.getElementById(pos).className = "White_Box";
            }        
        }
        Is_start = false;
        Is_end = false;
    }
}

function Clear_Walls(){
    if(al_started == false){
        for(let i=0; i < WIDTH; i++){
            for(let e=0; e < LENGTH; e++){
                let pos = (i + "-" + e);
                let el = document.getElementById(pos).className;
                if(el == "Wall"){
                    document.getElementById(pos).className = "White_Box";
                }
            }        
        }
    }
}

function Clear_path(){
    if(al_started == false){
        for(let i=0; i < WIDTH; i++){
            for(let e=0; e < LENGTH; e++){
                let pos = (i + "-" + e);
                let el = document.getElementById(pos).className;
                if(el == "path" || el == "marked" || el == "visit"){
                    document.getElementById(pos).className = "White_Box";
                }
            }        
        }
    }
}