const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var umbrella, boyImg;
var rand;
var thunder1, thunder2, thunder3, thunder4, thunder;
var drops = [];
var maxDrops = 100;
var thunderCreatedFrame = 0;
var heru;

function preload()
{
    boyImg = loadAnimation("images/Walking Frame/walking_8.png", "images/Walking Frame/walking_7.png",
        "images/Walking Frame/walking_6.png", "images/Walking Frame/walking_5.png", "images/Walking Frame/walking_4.png",
        "images/Walking Frame/walking_3.png", "images/Walking Frame/walking_2.png", "images/Walking Frame/walking_1.png");
    thunder1 = loadImage("images/thunderbolt/1.png");
    thunder2 = loadImage("images/thunderbolt/2.png");
    thunder3 = loadImage("images/thunderbolt/3.png");
    thunder4 = loadImage("images/thunderbolt/4.png");
    thunder_sound = loadSound("thunder.mp3")
}

function setup()
{
    createCanvas(400, 600);

    engine = Engine.create();
    world = engine.world;
    
    umbrella = new Umbrella(200, 450);
    


    if(frameCount % 150 === 0)
    {
        for(var i = 0; i < maxDrops; i++)
        {
            drops.push(new Drop(random(0,400), random(0,400), 5));
        }
    }
}

function draw()
{
    background("black");  
    Engine.update(engine);
    thunder_sound.play();
    umbrella.display();
    

    rand = Math.round(random(1, 4));
    if(frameCount % 80 === 0 && frameCount >= 1)
    {
        thunderCreatedFrame = frameCount;
        thunder = createSprite(random(30, 370),random(10, 30),10,10);
        switch (rand) {
            case 1:
                thunder.addImage(thunder1);
                break;
            case 2:
                thunder.addImage(thunder2);
                break;
            case 3:
                thunder.addImage(thunder3);
                break;
            case 4:
                thunder.addImage(thunder4);
                break;
            default:break;
        }
        thunder.scale = random(0.3, 0.6);
    }

    if(thunderCreatedFrame + 10 === frameCount && thunder)
    {
        thunder.destroy();
    }

    for(var i = 0; i < maxDrops; i++)
    {
        drops[i].display();
        drops[i].updateY();
    }
}