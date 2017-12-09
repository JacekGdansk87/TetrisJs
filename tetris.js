let fps = 2;

window.onload = function(){
    canv = document.getElementById("canv");
    context = canv.getContext("2d");

    
    context.scale(20, 20);
    setInterval(game,1000/fps);
}

const cw = canv.width;
const ch = canv.height;


function collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
                (arena[y + o.y] &&
                 arena[y + o.y][x + o.x]) !== 0) {
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

function createBlock(type){
    if(type === 'T'){
        return[
            [0,0,0],
            [1,1,1],
            [0,1,0],
    ];
}else if(type === 'X'){
        return[
            [0,1,0],
            [1,1,1],
            [0,1,0],
    ];
}else if(type === 'O'){
        return[
            [1,1,1],
            [1,0,1],
            [1,1,1],
    ];
}else if(type === 'I'){
        return[
            [0,1,0],
            [0,1,0],
            [0,1,0],
    ];
}else if(type === 'K'){
        return[
            [1,1],
            [1,1],
    ];
}
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

function playerDrop(){
    player.pos.y++;
    if(collide(arena, player)){
        player.pos.y--;
        merge(arena, player);
        playerReset();
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

function playerReset(){
    const blocks = 'TXOIK';
    player.matrix = createBlock(blocks[blocks.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0)-
                    (player.matrix[0].length / 2 | 0);
    
}

function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while(collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if(offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
        
    }
}

function rotate(matrix, dir){
    for(let y = 0; y < matrix.length; ++y){
        for(let x = 0; x < y; ++x){
            [
                matrix[x][y],
                matrix[y][x],
            ]=[
                matrix[y][x],
                matrix[x][y], 
                ];
        }
    }
    
    if (dir > 0){
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
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
            playerDrop();
        //rotate on 'q' and w
    }else if(ev.keyCode === 81) {
            playerRotate(-1);
    }else if(ev.keyCode === 87) {
            playerRotate(1);
    }
});

const arena = createMatrix(12, 20);

const player = {
    pos: {x: 0, y: 0},
    matrix : createBlock('T'),
};
