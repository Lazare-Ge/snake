var board = document.querySelector("#board");

//Game variables
const boardColor = "white";
const borderColor = "black";
const snakeColor = "yellow";
const rows = 10;
const columns = 10;
const startingPosX = 4;
const startingPosY = 4;
// snake is facing North(n), West(w), South(s) or East(e)
var queue = ["0"];
var facing = "0"
var snakeLocX = startingPosX;
var snakeLocY = startingPosY;
// <td> (DOM object) representing the head of the snake's current location
var currentLoc = null;

// Creating Board
function createBoard(){
  for (var i=0; i<rows; i++){
    var singleRow = document.createElement("tr");
    board.appendChild(singleRow);

    for (var j=0; j<columns; j++){
      var cell = document.createElement("td");
      cell.style.background = boardColor;
      cell.id ="" + i + "_" + j;
      // uncomment if you want to see indexes of cells.
      // cell.textContent = "(" + i +"," + j + ")";

      //creating border
      if(i == 0 || i == rows-1 || j == 0 || j == columns-1){
        cell.style.background = borderColor;
      }
      singleRow.appendChild(cell);
    }
  }
}

//Generates id for for querySelector based on snake's position
function idGenerator(snakeLocX,snakeLocY){
  var id = "#\\3" + snakeLocX +"_" + snakeLocY;
  return id;
}

//Creating snake
function createSnake(){
  currentLoc = document.querySelector(idGenerator(snakeLocX,snakeLocY));
  currentLoc.style.background = snakeColor;
}


//moving
function move(){
  //moving speed
  var i = setInterval(frame,100);
  //snake moves on next cell
  function frame(){
    //checking for direction the snake is facing
    if(queue[queue.length-1] == "e"){
      queue = ["e"]
      console.log(queue);
      snakeLocY++;
    }else if(queue[queue.length-1] == "w"){
      queue = ["w"]
      console.log(queue);
      snakeLocY--;
    }else if(queue[queue.length-1] == "n"){
      queue = ["n"]
      console.log(queue);
      snakeLocX--;
    }else if(queue[queue.length-1] == "s"){
      queue = ["s"]
      console.log(queue);
      snakeLocX++;
    }
    //stop if snake reaches board
    if (snakeLocY > columns-2 || snakeLocY < 1 || snakeLocX > rows-2 || snakeLocX < 1){
      clearInterval(i);
    }else{
      currentLoc.style.background = boardColor;
      currentLoc = document.querySelector(idGenerator(snakeLocX,snakeLocY));
      currentLoc.style.background = snakeColor;
    }
  }
}

//Checks for keypress and changes snake's facing direction
function checkKey(e) {

    e = e || window.event;
    var length = queue.length;
    if(length < 2){
      if (e.keyCode == '38') {
          if (queue[length-1] != "s"){
            queue.push("n");
          }
      }
      // DOWN
      else if (e.keyCode == '40') {
          if (queue[length-1] != "n"){
            queue.push("s");
          }
      }
      // RIGHT
      else if (e.keyCode == '37') {
          if (queue[length-1] != "e"){
            queue.push("w");
          }
      }
      // LEFT
      else if (e.keyCode == '39') {
          if (queue[length-1] != "w"){
            queue.push("e");
          }
      }
    }
}

createBoard();
createSnake();
document.onkeydown = checkKey;
move();
