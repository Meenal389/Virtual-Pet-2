var dog,dogimg;
var doghappy;
var database;
var foodS;
 var foodStack;
var addFood,feedpet;
var fedTime,lastfed;
var foodObj;

function preload(){
dogimg=loadImage("images/dogImg.png")
doghappy=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database();
  dog=createSprite(300,350,50,50);
  dog.addImage(dogimg,'dog');
 //doghappy.addImage(doghappy,"dog")
  dog.scale=0.3;
  foodObj = new Food();
  addFood=createButton("Add Food")
  feedpet=createButton("Feed Pet")
  feedpet.position(750,100)
  feedpet.mousePressed(feedpet)
  addFood.position(380,100);
  addFood.mousePressed(addFood)
 
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
 background(46,139,47)
 foodObj.display()
 //dog.changeImage(dogimg)
  fill("white")
  textFont("Times New Roman")
  textSize(20)
  fill("black")
  textFont("Times New Roman")
  textSize(35)
  text("VIRTUAL PET",140,50)
  //Food.display()
  fedTime=database.ref('fedTime')
  fedTime.on("value",function(data){
    lastfed=data.val()
  })

  fill(" black")
  textFont("Times New Roman")
  textSize(25)
  if(lastfed>=12){
    text("Last Fed: "+lastfed%12+" PM" , 20,450)
  }
  else if(lastfed===0){
    text("Last Fed: 12:00 AM",20,450)
  }
  else{
    text("Last Fed: " + lastfed+"AM",20,450)
  }
  drawSprites();
}

function readStock(data){
 foodS=data.val();
 foodObj.updateFoodStock(foodS);
}



function feedpet(){
  dog.addImage(doghappy)
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    fedTime:hour()
  })
}

function addFood(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}
