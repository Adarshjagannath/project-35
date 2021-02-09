//Create variables here

var dog, happyDog, database, foodS, foodStock;
var d1img,d2img;

function preload()
{
  //load images here
  d1img = loadImage("images/dogImg.png");
  d2img = loadImage("images/dogImg1.png");
}

function setup(){
  createCanvas(700,700);

  database = firebase.database();

  dog = createSprite(350,350,20,20);
  dog.addImage(d1img);
  dog.scale = 0.25;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
 background(46, 139, 87);

 fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed=data.val();
 });

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(d2img);
  }

  drawSprites();
  //add styles here

  textSize(20);
  fill("red");
  stroke(3);
  text("Food remaing : " + foodS,250,100);
  textSize(20);
  text("press UP_ARROW key to feed the dog",200,650);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  
  database.ref('/').update({
    Food:x
  });
}

function feedDog(){
  dog.addImage(happyDog);
  
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

