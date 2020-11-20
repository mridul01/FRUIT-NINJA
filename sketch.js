var sword, swordImage;
var fruit, f1, f2, f3, f4;
var fruitGroup;
var monster, m1, m2;
var monsterGroup;
var score;
var knifeSword, gameOverSound;
var gameOver, gameOverImage;
var gameOverSound;
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {
  swordImage = loadImage("sword.png");
  f1 = loadImage("fruit1.png");
  f2 = loadImage("fruit2.png");
  f3 = loadImage("fruit3.png");
  f4 = loadImage("fruit4.png");


  m1 = loadImage("alien1.png");
  m2 = loadImage("alien2.png");

  knifeSword = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");

  gameOverImage = loadImage("gameover.png");
}

function setup() {
  createCanvas(600, 500);

  sword = createSprite(300, 300, 20, 20);
  sword.scale = 0.7;
  sword.addImage(swordImage);
  
 // fruit = createSprite(400,200,20,20);

  gameOver = createSprite(300, 250);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 1.5;

  fruitGroup = new Group();
  monsterGroup = new Group();

  score = 0;
}

function draw() {

  background("lightBlue");

  

  if (gameState === PLAY) {
    
    spawnFruit();
  spawnMonster();
    
    sword.y = mouseY;
  sword.x = mouseX;

    
   
    
    gameOver.visible = false;

    if (fruitGroup.isTouching(sword)) {
      knifeSword.play();
      fruitGroup.destroyEach();
      score = score + 2;
    }  
      else if (monsterGroup.isTouching(sword)) {
        gameOverSound.play();
        
        gameState = END 

          monsterGroup.destroyEach();
          sword.destroy();
          fruitGroup.destroyEach();
  
          gameOver.visible = true;
    }

  }
  

  drawSprites();

  fill("black");
  textSize(20);
  text("score:" + score, 500, 30);

}

function spawnFruit() {
  if (frameCount % 100 === 0) {
    fruit = createSprite(420, 200, 20, 20);
    fruit.scale = 0.2;
    
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        fruit.addImage(f1);
        break;

      case 2:
        fruit.addImage(f2);
        break;

      case 3:
        fruit.addImage(f3);
        break;

      case 4:
        fruit.addImage(f4);
        break;

      default:
        break;
    }
     
    fruit.velocityX = 4;
    
    
     var position = Math.round(random(1,2));
    
    if(position==1){
      fruit.x = 50;
      fruit.velocityX = (10+(score/8));
      
    }
    else{
      if(position==2){
        fruit.x = 450;
        fruit.velocityX = -(10+(score/8));
          }
             }
    fruitGroup.add(fruit);
    fruit.depth = sword.depth;
    sword.depth = sword.depth + 1;
               }
                 
   
  
   
  }

function spawnMonster() {
  if (frameCount % 150 === 0) {
    monster = createSprite(80, Math.round(random(30, 450)), 20, 20);
    monster.addAnimation("monster",m1, m2);
    monster.scale = 1;
    monster.velocityX = -(15+(score/12));

    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1:
        monster.addImage(m1);
        break;
      case 2:
        monster.addImage(m2);
        break;

      default:
        break;
    }
    monster.velocityX = 5;
    
    monster.depth = monster.depth;
    sword.depth = monster.depth + 1;
    monsterGroup.add(monster);
  }
}