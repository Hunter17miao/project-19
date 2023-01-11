var PLAY = 1;
var END = 0;
var gameState = PLAY;

var superman;
var invisibleGround;
var pipeGroups, pipe;
var score = 0;
var gameover,restart;


function preload(){
 superman = loadAnamation("superman.png");
 pipe = loadAnamation("pipe.png");
 restart = loadAnamation("restart.png");
 gameover = loadAnamation("gameover.png");

}

function setup() {
 createCanvas(800,800);
 
 superman = createSprite(400,200,20,50);
 superman.scale = 0.7;

 gameover = createSprite(400,400);
 gameover.addImage(gameoverImg)

 restart = createSprite(400,200)
 restart.addImage(restartImg)

 gameover.scale = 0.9
 restart.scale = 0.9

 gameover.visible = false;
 restart.visible = false;

 invisibleGround = createSprite(200,190,40,10);
 invisibleGround.visible = false;
 invisibleGround.velocityX = invisibleGround.width /2;
 invisibleGround.velocityX = -(6 + 3*score/100);

 score = 0;
 
}

function draw() {
    background(400);
    text("Score "+ score,250,750);

    if (gameState===PLAY){
        score = score + Math.round(getFrameRate()/60)
        invisibleGround.velocityX = -(6 + 3*score/100);
    

     if(keyDown("space")) {
        superman.velocityX = -10;
     }

     if(keyDown("space")){
        spawnObstacles();
     }


     superman.velocityY = superman.velocityY + 0.8


     if(invisibleGround.isTouching(superman)){
        gameState = END;
     }


     if (pipeGroups.isTouching(superman)){
        gameState = END;




     }


    }

    else if (gameState === END) {
        gameover.visible = true;
        restart.visible = true;

        invisibleGround.velocityX = 0;
        superman.velocityX = 0;
        pipeGroups.setEachvelocityX(0);

        pipeGroups.setLifetimeEach(-1);

        if (mousePressedOver(restart)) {
            reset(); 
        }
    

    }
    drawSprites();
}

function spawnObstacles(){
    if (frameCount % 60 === 0){
        var pipe = createSprite(200,120,10,40);
        pipe.y = Math.round(random(20,100));

       pipe.scale = 0.5
       pipe.lifetime = 400
    
    }
    
}


function reset(){
    gameState = PLAY
    gameover.visible = false
    restart.visible = false

    pipeGroups.destroyEach();


    score = 0;
}