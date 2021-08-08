class Food{

    constructor(){
        this.foodStock=0;
        this.lastFed;
        this.image=loadImage('Images/Milk.png');
        this.bedroomImg=loadImage("Images/BedRoom.png");
       this.washroomImg=loadImage("Images/WashRoom.png");
      this.gardenImg=loadImage("Images/Garden.png");
    }

    getFoodStock(){
        

        var foodStockRef=database.ref('Food');
        foodStockRef.on("value",(data)=>{
        this.foodStock=data.val();  
        });
        
        return this.foodStock;
        
        }

    updateFoodStock(foodStock){
        this.foodStock=foodStock;

    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
           }
           database.ref("/").update({
            Food:this.foodStock
        })

    }
    display(){
        background(46,139,87);

        fill(255,255,254);
        textSize(15);
        if(lastFed>=12){
            text("Last Feed : "+ lastFed%12 + " PM", 50,30);
        }else if(lastFed==0){
            text("Last Feed : 12 AM",50,30);
        }else{
            text("Last Feed : "+ lastFed + " AM", 50,30);
        }
        var x=70,y=100; 
        imageMode(CENTER);
        
        if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10==0){
            x=70;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
    }

    bedroom(){
        
       // background(bedroom);  
       image(this.bedroomImg,250,250,500,500)
    }
      
    garden(){
        //background(garden);  
        image(this.gardenImg,250,250,500,500)
    } 

    washroom(){
        //background(washroom); 
        image(this.washroomImg,250,250,500,500);
    }
}