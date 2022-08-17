//Box Click Event
var mouseDown = null;
var set_state = null;


function set_mouseDown(){
    mouseDown = true;
}

function set_mouseUp(){
    mouseDown = false;
    set_state = null;
}

function addEvent(obj, evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    }
    else if (obj.attachEvent) {
        obj.attachEvent("on" + evt, fn);
    }
}
addEvent(window,"load",function(e) {
    addEvent(document, "mouseout", function(e) {
        e = e ? e : window.event;
        var from = e.relatedTarget || e.toElement;
        if (!from || from.nodeName == "HTML") {
            mouseDown = false;
        }
    });
});

function BoxClick(id, mouse_click){
    if(mouseDown == true || mouse_click == true){
        state = document.getElementById(id).className;
        //set_state is delete/place 
        if((state != "White_Box" && set_state != "place") || set_state == "delete"){ //delete
            if(state == "start_point"){
                Is_start = false;
            }else if(state == "end_point"){
                Is_end = false;
            }
            make_white(id);
            set_state = "delete";
        }else if(Is_start == false){
            make_start(id);
            Is_start = true;
        }else if(Is_end == false){
            make_end(id);
            Is_end = true;
        }else if(state != "start_point" && state != "end_point"){ //place
            make_Wall(id);
            set_state = "place";
        }
    }
}

//change states ======================================================
function make_Wall(id){
    document.getElementById(id).className = "Wall";
}

function make_start(id){
    document.getElementById(id).className = "start_point";
}

function make_end(id){
    document.getElementById(id).className = "end_point";
}

function make_white(id){
    document.getElementById(id).className = "White_Box";
}

function make_visit(id){
    let state = document.getElementById(id).className;
    if(state == "White_Box"){
        document.getElementById(id).className = "visit";
    }
}

function make_marked(id){
    let state = document.getElementById(id).className;
    if(state == "visit"){
        document.getElementById(id).className = "marked";
    }
}

function make_path(id){
    let state = document.getElementById(id).className;

    if(state != "start_point" && state != "end_point"){
        document.getElementById(id).className = "path";
    }
}

function change_text(id, text){
    document.getElementById(id).innerHTML = text;
}

function make_mazePath(id){
    let state = document.getElementById(id).className;
    if(state == "Wall"){
        document.getElementById(id).className = "White_Box";
    }
}