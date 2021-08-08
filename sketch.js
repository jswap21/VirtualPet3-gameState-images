var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
var gameState,readState;
var bedroom,garden,washroom;


function preload(){
   dogImg=loadImage("Images/Dog.png");
   happyDog=loadImage("Images/happydog.png");
   
   milkbottleImg=loadImage("Images/Milk.png");
   garden=loadImage("Images/Garden.png");
   bedroom=loadImage("Images/BedRoom.png");
   washroom=loadImage("Images/WashRoom.png");


  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);
  
  foodObj=new Food();
  foodObj.getFoodStock();

  feed=createButton("Feed the dog");
  feed.position(650,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(780,95);
  addFood.mousePressed(addFoods);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  //read game state from database
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
  //console.log(gameState);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  //foodStock=database.ref('Food');
 // foodStock.on("value",readStock);

  
  

}

// function to display UI
function draw() {
  background(46,139,87);
 foodObj.display();
 console.log(gameState);
 /*
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }
*/

currentTime=hour();

if(gameState!="Hungry"){
  feed.hide();
  addFood.hide();
  dog.visible=false;
  
  //dog.remove();
}else{
 feed.show();
 addFood.show();
 dog.visible=true;
 foodObj.display();
 
}


if(currentTime==(lastFed+1)){
  update("Playing");
  foodObj.garden();
}else if(currentTime==(lastFed+2)){
update("Sleeping");
  foodObj.bedroom();
}else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
update("Bathing");
  foodObj.washroom();
}
else{
update("Hungry")
foodObj.display();
}

  drawSprites();
 /* fill(255,255,254);
  stroke("black");
 text("Food remaining : "+foodS,170,200);
  textSize(13);

  //text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20); */
}
/*
//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}*/

function addFoods(){
  foodObj.foodStock+=1;
  
  database.ref('/').update({
    Food:foodObj.foodStock
  })

}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  foodObj.deductFood();
  foodObj.updateFoodStock(foodObj.foodStock);

  //foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  //database.ref('/').update({
    //Food:foodObj.getFoodStock(),
    //FeedTime:hour(),
    //gameState:"Hungry"
  //})

  
}

//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}