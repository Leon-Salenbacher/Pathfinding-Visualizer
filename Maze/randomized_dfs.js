async function randomized_dfs(LENGTH, WIDTH, ms){
    let grid = get_wall(LENGTH, WIDTH);
    let start = "1-1";

    let stack = [start];
    while(stack.length > 0){
        let pos = stack.pop();
        if(can_marked(pos, grid) == true){
            //mark pos
            make_mazePath(pos);
            grid[pos.split("-")[0]][pos.split("-")[1]] = pos + "-White_Box";
            //wait if ms > 0
            if(ms > 0){
                await wait(ms);
            }
            //get all neighbors die markiert werden können. 
            let neighbors = all_neighbors(pos);
            for(w in neighbors){
                //prüfe jeden nachbarn ob er in stack aufgenommen werden soll
                if(proof_stack(LENGTH, WIDTH, grid, neighbors[w]) == true ){
                    stack.push(neighbors[w]);
                }
            }
        }
    }
}