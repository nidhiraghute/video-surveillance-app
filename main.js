video = "";
status = "";
objects = [];

function preload(){
    video = createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){

        objectDetector.detect(video, gotResult);
        for(i = 0; i < object.length; i++) {
         document.getElementById("status").innerHTML = "Status : Objects Detected";
         document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected : "+object.length;

         fill("#FF0000");
         stroke("#FF0000");
         noFill();
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + "" + percent +"%", objects[i].x, objects[i].y);
         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start(){
 objectDetector = ml5.objectDetector('cocossd', modalLoaded);
 document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modalLoaded(){
    console.log("Modal Loaded!");
    video.speed(1);
    video.sound(0);
    video.loop();
    status = true;

}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}