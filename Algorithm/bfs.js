//https://www.youtube.com/watch?v=T_m27bhVQQQ
async function BFS(LENGHT,WIDTH, ms){
    let out = get_grid(LENGHT,WIDTH);
    let grid = out[0];
    let start = out[1];
    let end = out[2]; 

    let path = [];
    let last_pos = "-";

    if(end && start != null){ 
        let queue = [start];
        while(queue.length > 0){            
            let pos_out = queue.shift();
            let pos = pos_out.split(";")[0];

            let y_pos = parseInt(pos.split("-")[0]);
            let x_pos = parseInt(pos.split("-")[1]);
            let state = grid[y_pos][x_pos].split("-")[2];
            if(state == "end_point"){           
                path.push(pos_out);
                return shortest_path(path, start, end);
            }    
            if(is_free(pos, grid)){
                //visit
                make_visit(pos);
                grid[y_pos][x_pos] = y_pos + "-" + x_pos + "-visit";

                //save pos und last pos in array path
                path.push(pos_out); //to,from
                //path.push(pos_out);
                //wait
                if(ms > 0){
                    await wait(ms);
                }
                let neighbors = get_neighbors(pos,grid);
                for(w in neighbors){
                    if(is_visit(neighbors[w], grid) == false){
                        //queue.push(neighbors[w]);
                        queue.push(neighbors[w] + ";" + pos); //to from
                    } 
                }
            }  
            //make marked
            make_marked(pos);
            grid[y_pos][x_pos] = y_pos + "-" + x_pos + "-marked";

            //save pos um beim nächsten from punkt mit zugeben
            last_pos = pos;
        }
    }
}