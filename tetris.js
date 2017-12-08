let fps = 2;

window.onload = function(){
    canv = document.getElementById("canv");
    context = canv.getContext("2d");

    
    context.scale(20, 20);
    setInterval(game,1000/fps);
}

const cw = canv.width;
const ch = canv.height;

const matrix = [
        [0,0,0],
        [1,1,1],
        [0,1,0],
];

function collide(arena, player){
    const [m, o] = [player.matrix, player.pos];
    for(let y = 0; y < m.length; ++y){
        for(let x = 0; x < m[y].length; ++x){
            if(m[y][x] !==0 && (arena[y+o.y] && arena[y + o.y][x + o.x]) !==0){
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h){
    const matrix = [];
    while(h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}


function drawMatrix(matrix, offset) {
    matrix.forEach((row,y) =>{
        row.forEach((value, x) =>{
            if(value != 0) {
                context.fillStyle = 'red';
                context.fillRect(x + offset.x ,y + offset.y ,1 ,1);
            }
        });
    });
}

const arena = createMatrix(12, 20);

const player = {
    pos: {x:5, y:5},
    matrix: matrix,
}

function playerDrop(){
    player.pos.y++;
    if(collide(arena, player)){
        player.pos.y--;
        merge(arena, player);
        player.pos.y = 0;  
    }
}

function game() {
    context.fillStyle = "black";
    context.fillRect(0, 0, cw, ch);
    drawMatrix(arena, {x:0, y:0});
    drawMatrix(player.matrix, player.pos);
    playerDrop();
    
}


function merge(arena, player){
    player.matrix.forEach((row,y) => {
        row.forEach((value, x) => {
            if(value !==0){
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}


document.addEventListener("keydown", ev =>{
    if(ev.keyCode === 37) {
        player.pos.x--;
        if(collide(arena, player)){
            player.pos.x++;
        }
    }else if(ev.keyCode === 39) {
        player.pos.x++;
        if(collide(arena, player)){
            player.pos.x--
            }
    }else if(ev.keyCode === 40) {
            player.pos.y++;
            playerDrop();
    }
});

