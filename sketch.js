var mermaid, mermaidImg, mermaidFlippedImg
var bgImg, scoreImg, lifeImg, gameoverImg
var gameover
var gem, gems
var gem1Img, gem2Img, gem3Img, gem4Img;
var obstacle, obstacles
var fish1Img, fish2Img, shellImg;
var score = 0, lives = 3
var life, gamestate = "play"

function preload(){
mermaidImg = loadImage("./Images/Mermaid.png");
mermaidFlippedImg = loadImage("./Images/Mermaid Flipped.png");
bgImg = loadImage("./Images/Ocean Background.jpg");
gem1Img = loadImage("./Images/Gem 1.png");
gem2Img = loadImage("./Images/Gem 2.png");
gem3Img = loadImage("./Images/Gem 3.png");
gem4Img = loadImage("./Images/Gem 4.png");
fish1Img = loadImage("./Images/Fish 1.png");
fish2Img = loadImage("./Images/Fish 2.png");
shellImg = loadImage("./Images/Seashell.png");
scoreImg = loadImage("./Images/Score.png");
lifeImg = loadImage("./Images/Lives.png");
gameoverImg = loadImage("./Images/Game Over Sign.png");
}

function setup(){
createCanvas(1000,500)

mermaid = createSprite(70, 430, 100, 100);
mermaid.addImage("mermaid", mermaidImg)
mermaid.addImage("mermaidFlip", mermaidFlippedImg)
mermaid.scale = 0.25

gems = createGroup()
obstacles = createGroup()

trophy = createSprite(45, 40, 70, 70);
trophy.addImage(scoreImg);
trophy.scale = 0.1

life = createSprite(845, 40, 65, 65);
life.addImage(lifeImg);
life.scale = 0.1

gameover = createSprite(500,250, 100, 100);
gameover.addImage(gameoverImg);
gameover.visible = false
}

function draw(){
  background(bgImg)

  if(gamestate==="play"){
    if(keyDown("RIGHT")){
      mermaid.x = mermaid.x+5
      mermaid.changeImage("mermaid")
    }
  
    if(keyDown("LEFT")){
      mermaid.x = mermaid.x-5
      mermaid.changeImage("mermaidFlip")
    }

    if(gems.isTouching(mermaid)){
      score= score+1
      gems.destroyEach()
    }
  
    if(obstacles.isTouching(mermaid)){
      lives=lives-1
      obstacles.destroyEach()
    }

    if(lives<=0){
      gamestate="end"
      obstacles.destroyEach()
      gems.destroyEach()
      mermaid.destroy()
    }

    gemGenerator()
    obstacleGenerator()
  }

  if(gamestate==="end"){
    gameover.visible = true
  }

  textSize(25)
  fill("black")
  text(": "+score, 80, 50)
  text(": "+lives, 875, 50)

  
  drawSprites()
}

function gemGenerator(){
if (frameCount % 80 == 0){
  gem = createSprite(950, 10, 100, 100);
  gem.velocityY = 2;
  gem.scale = 0.1
  gem.x = Math.round(random(100, 900))
  var rand = Math.round(random(1,4))
  switch(rand){
    case 1: gem.addImage(gem1Img)
    break;

    case 2: gem.addImage(gem2Img)
    break;

    case 3: gem.addImage(gem3Img)
    break;

    case 4: gem.addImage(gem4Img)
    break;

  }
  gems.add(gem)
  }
}

function obstacleGenerator(){
  if (frameCount % 120 == 0){
    obstacle = createSprite(90, 10, 100, 100);
    obstacle.velocityY = 3
    obstacle.scale = 0.1
    obstacle.x = Math.round(random(100,900))
    var rand1 = Math.round(random(1,3))
    switch(rand1){
      case 1: obstacle.addImage(fish1Img)
      break;

      case 2: obstacle.addImage(fish2Img)
      break;

      case 3: obstacle.addImage(shellImg)
      break;
    }
    obstacles.add(obstacle)
  }
}