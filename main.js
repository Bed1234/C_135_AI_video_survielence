status = "";
objects = [];

function preload(){
    video = createVideo('video.mp4');

}
function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video.hide();
}
function draw() {
    image (video,0,0,480,380);

    if (status != "") {
        objectDetector.detect(video, gotResults);

        for( i= 0 ; i < objects.length ; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects detected are:" + objects.length;

            fill ("#FF0000");

            percent = floor(objects[i].confidence * 100);
            text ( objects[i].label + " " + percent +  "%",objects[i].x , objects[i].y );
            noFill();
            stroke ("#FF0000");
            rect (objects[i].x - 15 , objects[i].y - 15 , objects[i].width , objects[i].height);

        }
    } 

}

function gotResults(error,results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: Detecting object";

}
function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
