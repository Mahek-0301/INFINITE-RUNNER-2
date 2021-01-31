var background, backgroundImage;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground;
var score;
var count;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage = loadImage("jungle.jpg");
 
}



function setup() {
  createCanvas(600,600);

  score = 0;
  count = 0;

  ground = createSprite(90,390,10000,20);
  ground.velocityX = -4;
  
  background = createSprite(0,0,600,600);
  background.addImage(backgroundImage);
  background.scale = 2.5;
  background.velocityX=-3;
  
  monkey = createSprite(90,30,40,40);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  monkey.velocityX = 2;
  
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw(){
  
 
  
  if(gameState === PLAY){
    
    camera.position.x=monkey.x;
    camera.position.y=displayHeight/2;
    Food();
    Obstacles();
    
    if(keyDown("space")){
      monkey.velocityY = -12
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      score = score + 2;
    }

    switch(score) {
      case 10: monkey.scale = 0.12;
      break;
      
      case 20 : monkey.scale = 0.14;
      break;
      
      case 30 : monkey.scale = 0.16
      break;
      
      case 40 : monkey.scale = 0.18
      break;
      
      default: break;
    }
    
    
    monkey.collide(ground);
    
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(background.x < 0){
       background.x = background.width/4;
       }
    
    if(monkey.isTouching(obstacleGroup)){
      monkey.scale = 0.09;
      count = count +1;
    }
    
    if(count > 2){
      gameState = END;
    }
    
    drawSprites();
  }
    
  else if(gameState === END){
    fill("black");
    textSize(30);
    text("GAME OVER !!",200,200);
    
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityEach(0);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    ground.velocityX = 0;
    monkey.velocityY= 0;
    background.velocityX = 0;
  
    
  }
  
  
   
  stroke("white");
  textSize(20);
   fill("white");
  text("Score:"+ score,monkey.x,50);  
}

function Food(){
   if(frameCount % 120 === 0){
  banana = createSprite(monkey.x+200,350,40,10);
  banana.addImage(bananaImage);
  banana.y = Math.round(random(200,200));
  banana.scale = 0.1
  banana.lifetime = 200;

   FoodGroup.add(banana);
  }
}
  
function Obstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(monkey.x+200,370,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.lifetime = 200;
    obstacle.scale = 0.1;
    
    obstacleGroup.add(obstacle);
  }
}