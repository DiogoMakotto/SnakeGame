let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x:8 * box,
    y:8 * box
}

let direction ="right";
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criandocobra(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function desenhoComida(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update) //quando um evento acontece, ele detecta e chama uma função

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
} //limitando a direção = definindo para cobra não retonar a direção oposta (dar meia volta diretamente), para não ter conflito.

function iniciarJogo(){
    
    if(snake[0].x > 15*box && direction == "right") snake[0].x =0;
    if(snake[0].x < 0 && direction == "left") snake[0].x =16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y =0;
    if(snake[0].y < 0 && direction == "up") snake[0].y =16 * box; //plano cartesiano, função para cobra aparecer no lado oposto do cenário (loop infinito)

    for(i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over XD');
        }
    }

    criarBG();
    criandocobra();
    desenhoComida();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //remove útimo elemento da lista
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    

    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //o unshift adiciona quadrado a cabeça da cobra

}

let jogo = setInterval(iniciarJogo, 100);