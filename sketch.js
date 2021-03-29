  
var playerImg;
var obstacleImg,obstacle2Img,obstacle3Img,obstacle4Img;
var platformImg;
var groundImg;
var gameOverImg;
var restartImg;
var life,lifeImg;
var obstacleGroup,platformGroup;
var bool=false;
// var boolPlatform=false;
var platform;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var playerLife = 2;
var check=0;
function preload(){
  playerImg = loadImage("sprites/Player.png");
  obstacleImg = loadImage("sprites/Obstacle.png");
  platformImg = loadImage("sprites/Platform.png");
  gameOverImg = loadImage("sprites/GameOver.png");
  restartImg = loadImage("sprites/Restart.png");
  obstacle2Img = loadImage("sprites/Obstacle2.png");
  obstacle3Img = loadImage("sprites/Obstacle3.png");
  obstacle4Img = loadImage("sprites/Obstacle4.png");
  lifeImg = loadImage("sprites/Life.png");
  groundImg = loadImage("sprites/Ground.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ground = createSprite(width/2, height, width, 10);
  ground.addImage(groundImg);
  ground.scale = 2;
  

  player = createSprite(200, height-80, 40, 40);
  player.addImage(playerImg);
 // player.debug=true
  player.scale = 0.1;
  gameOver = createSprite(width/2, height/2-100, width/2, 50);
  gameOver.addImage(gameOverImg);
  restart = createSprite(width/2, height/2+100, 100, 50);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  obstacleGroup = createGroup();
  platformGroup = createGroup();
}

function draw() {
  background("blue");  

  if(gameState === PLAY){

    edges = createEdgeSprites();
    player.collide(edges[0]);
    player.x=200;
    player.visible = true;
    gameOver.visible = false;
    restart.visible = false;

    // console.log(player.y);

    player.collide(ground);

    // player.velocityX = 9;
    ground.velocityX = -10;
  
    if(ground.x < 600){
      ground.x = ground.width/2;
    }
    // console.log(player.y,height)
    // (touches.length > 0 || keyDown("SPACE"))
    if((touches.length > 0 || keyDown("SPACE"))&& player.y >= height-150){
      player.velocityY = -13 ;
      touches = [];

    }
      player.velocityY = player.velocityY + 0.8;
    
  
    if(player.x > 600){
      player.velocityX = 0;
    }
    
    if(obstacleGroup.isTouching(player)){
      if(playerLife === 0){
        gameState = END;
      }else{
        playerLife -= 1;
        player.velocityY = -16 ;
      }
    }

    spawnObstacles();
    if(bool){
      if(player.isTouching(life)){
        console.log("touching")
        life.destroy();
        playerLife++;
      }
    }
   
      
      if(platformGroup.isTouching(player)){
        for(var i=0; i<platformGroup.length; i++){
          // collision on top
          if(platform.y>player.y){
            player.bounceOff(platformGroup);
          }
          // collision from left
          else if(platform.x>player.x ){
            gameState = END;
          }
        }
        
      }
          

  }else if (gameState === END){
    player.collide(obstacleGroup);
    player.visible = false;
    gameOver.visible = true;
    restart.visible = true;
    player.velocityY=0;
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
  }else if(gameState === "over"){
    stroke("black");
    textSize(90);
    fill("black");
    text("YOU WON", width/2-200, height/2);
    player.velocityY=0;
    player.visible = false;
    obstacleGroup.destroyEach();
    platformGroup.destroyEach();

  }

  if(mousePressedOver(restart)){
    reset();
  }

  stroke("red");
  textSize(30);
  text("Life - " + playerLife, width-300, 30);
 
  
  drawSprites();
}

//platform.y-player.y === platform.height/2+player.height/2


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    check++;
    var obstacle = createSprite(width,height-112,10,40);
    obstacle.velocityX = -(10);
    //obstacle.debug=true
    //generate random obstacles
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.1;    
    obstacle.lifetime = width/10;
    obstacleGroup.add(obstacle);
    // spawnPlatform();
    if(check>=15){
      gameState="over"
    } 
     //checkpoint 3
      else if(check>=12){
      obstacle.addImage(obstacle4Img);
      obstacle.scale = 0.2;
       spawnPlatform();
    } 
    // check point 2
    else if(check>=7){
      obstacle.addImage(obstacle3Img);
      if(check === 10){
        spawnLife();
      }
    }
    //  check point 1
    else if(check >= 3){
      obstacle.addImage(obstacle2Img);
      if(check === 5){
        spawnLife();
      }
     }
    
  }
}

function reset(){
  check=0;
  count = 0;
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  player.visible = true;
  playerLife = 2;
  obstacleGroup.destroyEach();
}

function spawnLife(){
  bool=true;
  life = createSprite(width,height-220,40,40);
  life.velocityX = -10;
   life.addImage(lifeImg);
   //life.debug=true
  //  life.setCollider("rectangle",0,0,100,100);
  life.scale = 0.1;
  life.lifetime = width/10;
}

function spawnPlatform(){
  // boolPlatform=true;
   platform = createSprite(width,height-150,100,100);
    platform.velocityX = -10;
    platform.debug=true
     platform.setCollider("rectangle",0,0,300,300);
    //generate random obstacles
    platform.addImage(platformImg);
    platform.scale = 0.1; 
    platform.lifetime = width/10;
    platformGroup.add(platform);
}
