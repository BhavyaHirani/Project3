var PLAY = 1;
var END = 0;
var gameState = PLAY;

var spaceImg;
var rocket, rocketImg;

var obstacleGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacle;
var bonusGroup, bonusImg, bonus;

var gameOverImg, restartImg;
var distance=0;
var star=0;

function preload(){
    spaceImg = loadImage("space.png");
    rocketImg = loadImage("rocket.png");

    obstacle1 = loadImage("asteroid.png");
    obstacle2 = loadImage("comet.png");
    obstacle3 = loadImage("earth.png");
    obstacle4 = loadImage("jupiter.png");
    obstacle5 = loadImage("mars.png");
    obstacle6 = loadImage("saturn.png");

    bonusImg = loadImage("star.png");

    gameOverImg = loadImage("GameOver.png");
    restartImg = loadImage("restart.png");

}

function setup() {
    createCanvas(600,600);

    rocket = createSprite(300,500);
    rocket.addImage("rocket",rocketImg);
    rocket.scale = 0.15;

    gameOver = createSprite(300,200);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(300,240);
    restart.addImage(restartImg);

    gameOver.scale = 0.5;
    restart.scale = 0.5;

    obstaclesGroup = createGroup();
    bonusGroup = createGroup();

    rocket.setCollider("rectangle",0,0); 
    //rocket.debug = true;
}

function draw() {
    background(0);
    image(spaceImg,0,0,width,height)
    spaceImg.velocityY = 4;

    textSize(20);
    fill("red")
    text("Stars: "+ star,50,50)
    text("Distance: "+ distance,50,70);

    if(gameState === PLAY){
    
        gameOver.visible = false;
        restart.visible = false;
        
        distance = distance + Math.round(getFrameRate()/50);
        
        if (spaceImg.y > 400){
          spaceImg.y = space.width/2;
        }
        
        if(keyDown("RIGHT_ARROW")) {
            rocket.x = rocket.x +10
        }
        if(keyDown("LEFT_ARROW")) {
            rocket.x = rocket.x -10;
        }

        spawnBonus();
        spawnObstacles();
        
        if(obstaclesGroup.isTouching(rocket)){
            obstacle.destroy();
            bonus.destroy();        
            gameState = END
        }
        if(bonusGroup.isTouching(rocket)){
            bonus.destroy();
            star = star +1;
        }
        if(rocket.x <= 40){
            rocket.x = 40;
        }
        if(rocket.x >= 560){
            rocket.x = 560;
        }

      } 
    else if (gameState === END) {

        gameOver.visible = true;
        restart.visible = true;
              
        spaceImg.velocityY = 0;
        rocket.velocityX = 0;
        
        obstaclesGroup.setLifetimeEach(-1);
        bonusGroup.setLifetimeEach(-1);
            
        obstaclesGroup.setVelocityYEach(0);
        bonusGroup.setVelocityYEach(0); 
            
        if(mousePressedOver(restart)) {
        reset();
        }
    }
    drawSprites();
}

function spawnObstacles(){
    if (frameCount % 100 === 0){
    obstacle = createSprite(random(50,550),0,10,40);
    obstacle.velocityY = (4 + 3* distance/100);
    if(obstacle.velocityY >= 30){
        obstacle.velocityY = 30
    }
        
    var rand = Math.round(random(1,6));
    switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;
        case 4: obstacle.addImage(obstacle4);
                break;
        case 5: obstacle.addImage(obstacle5);
                break;
        case 6: obstacle.addImage(obstacle6);
                break;
        default: break;
    }
                    
    obstacle.scale = 0.15;
    obstacle.lifetime = 200;
        
    obstaclesGroup.add(obstacle);
    }
}

function spawnBonus(){
    if(frameCount % 170 === 0){
        bonus = createSprite(random(50,550),0,10,40);
        bonus.velocityY = (4 + 3* distance/100);
        bonus.addImage("bonus",bonusImg);
        if(bonus.velocityY >= 30){
            bonus.velocityY = 30
        }

        bonus.scale = 0.15;
        bonus.lifetime = 200;
            
        bonusGroup.add(bonus);
    }
}

function reset(){
    gameState = PLAY;

    distance = 0;
    star = 0;
  
    gameOver.visible = false;
    restart.visible = false;
  
    bonusGroup.destroyEach();
    obstaclesGroup.destroyEach();

    rocket.changeImage("rocket",rocketImg);

    rocket.x = 300;
    rocket.y = 500;

    spaceImg.velocityY = 4;  
  }