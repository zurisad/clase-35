var balloon,balloonImage1,balloonImage2;
var datebase;
var globoPosition;

// crea aquí la base de datos y la variable de posición 

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Función para configurar el entorno inicial
function setup() {
  database=firebase.database();
  createCanvas(1500,700);


  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  globoPosition = database.ref('ballon/height');
  globoPosition.on("value",readPosition);

  textSize(20); 
}

// función para mostrar la Interfaz del Usuario (UI por sus siglas en inglés)
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
   writePosition(-5,0); 
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(5,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(0,-9);
    balloon.scale = balloon.scale-0.01
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(0,9);
    balloon.scale = balloon.scale +0.01
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**¡Utiliza las teclas de flecha para mover el globo aerostático!",40,40);
}
function writePosition(x,y){
  database.ref('ballon/height').set({
    x: balloon.x+x,
    y: balloon.y+y
  })
}
function readPosition(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}