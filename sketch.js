//GameState (ESTADOS DEL JUEGO)
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var gameOverSound ,knifeSwoosh;

function preload(){
  
  knifeImage = loadImage("catpawgrey.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadAnimation("raton verde3.png","raton verde2.png","raton verde3.png");
  fruit2 = loadAnimation("raton3.png", "raton3 2.png", "raton 3 3.png");
  fruit3 = loadAnimation("raton corre 1.png", "raton corre 2.png", "raton corre 3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("miau.mp3")
}



function setup() {
  createCanvas(600, 600);
  
  //crear cuchillo
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.2
  
  
  
  //establecer colisionador para el cuchillo
  knife.setCollider("rectangle",0,0,40,40);

  //variables de puntuación y grupos
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Llamar a las funciones fruits y Monster
    fruits();
    Monster();
    
    // Mover el cuchillo con el mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Aumentar la puntuación si el cuchillo toca la fruta
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      
      knifeSwooshSound.play();
      //knifeSwooshSound.play;
      //knifeSwooshSound();
      //knifeSwooshSoundplay();


      // score=score;
      // score=+2;
      // score=2;
      score=score+2;

    }
    else
    {
      // Cambiar al estado end si el cuchillo toca al enemigo
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        //sonido del fin del juego
        gameOverSound.play()
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Cambiar la animación del cuchillo en gameover y reiniciar su posición
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      }
    }
  }
  
  drawSprites();
  //Mostrar puntuación
  textSize(25);
  text("Puntuación : "+ score,250,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.x = 0    
  //Aumentar la velocidad de las frutas después de 4 puntos 

       fruit.velocityX= (7+(score/4));
      // fruit.velocityY= (7+(score));
      // fruit.velocity= (7+(score/4));
      // fruit.velocityX= (7);
     
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addAnimation("j", fruit1);
    } else if (r == 2) {
      fruit.addAnimation("j2", fruit2);
    } else if (r == 3) {
      fruit.addAnimation("j3",fruit3);
    } else {
      fruit.addAnimation("j4",fruit3);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}
