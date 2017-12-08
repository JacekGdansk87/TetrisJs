window.onload = function(){
    canv = document.getElementById("canv");
    context = canv.getContext("2d");
    
    context.scale(20, 20);
    
    setInterval(game,1000/8);
}

var cw = canv.width;
var ch = canv.height;

const matrix = [
        [0,0,0],
        [1,1,1],
        [0,1,0],
];

const player = {
    pos: {x:5, y:5},
    matrix: matrix,
}

function game() {
    context.fillStyle = "black";
    context.fillRect(0, 0, cw, ch);
    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row,y) =>{
        row.forEach((value,x) =>{
            if(value != 0) {
                context.fillStyle = 'red';
                context.fillRect(x + offset.x ,y + offset.y ,1 ,1);
            }
        });
    });
}


