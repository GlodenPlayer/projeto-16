//Estados de Jogo
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3, monsterImage, gameOverImage;
var gameOverSound ,knifeSwoosh;
var background, backgroundImage;

function preload(){
  
  knifeImage = loadImage("sword.png");
  monsterImage = loadAnimation("fireball.png");
  fruit1 = loadImage("maça.png");
  fruit2 = loadImage("banana.png");
  fruit3 = loadImage("pera.png");
  
  gameOverImage = loadImage("fimdeJogo.png");
  
  gameOverSound = loadSound("gameover.mp3");
  knifeSwooshSound = loadSound("knifeSwoosh.mp3");
  backgroundImage = loadImage("cenario1.png");
}



function setup() {
  createCanvas(400, 400);
  
  background = createSprite(200, 200);
  background.addImage(backgroundImage);
  background.scale = 5.3;

  //criando espada
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=2.0;

  //definir colisor para espada
  knife.setCollider("rectangle",0,0,40,40);

  //Variáveis de pontuação e Grupos
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();

  
}

function draw() {
  
  
  if(gameState===PLAY){
    
    //Chamar função de frutas e função de monstro
    fruits();
    Monster();
    
    //mover espada com o mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    //Aumenta a pontuação se a espada tocar na fruta
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      
       knifeSwooshSound.play();

       score = score+2;
    }
    else
    {
      //Vá para o estado final se a espada tocar o inimigo
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        //som de fim de jogo/gameover
        gameOverSound.play()
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        //Mude a animação da espada para fim de jogo e redefina sua posição
        knife.addImage(gameOverImage);
        knife.scale = 1.0;
        knife.x=200;
        knife.y=200;
      }
    }
  }
  
  drawSprites();
  //exibir pontuação
  textSize(25);
  fill("black");
  text("Pontuação: "+ score,200,50);
  
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    monster.scale = 1.5;
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.x = 0;
    
  //aumentar a velocidade das frutas após a pontuação 4 

       fruit.velocityX= (7+(score/4));
      
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
      
    } 
    fruit.y=Math.round(random(50,350));
   
    
    fruit.setLifetime=500;
    
    fruitGroup.add(fruit);
    fruit.scale = 0.5;
  }
}
