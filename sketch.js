let classifier;
let video;

let stepSize;
let x;
let y;
let redVal;
let greenVal;
let blueVal;
let alphaVal;
let index;

let modelURL = "./model/model.json";
let label;
let confidence;
let confLabel;

function preload(){
	classifier = ml5.imageClassifier(modelURL);
	label = "This model is..."
}

function setup() 
{
	createCanvas(windowWidth, 3*windowWidth/4);
	video = createCapture(VIDEO);
	video.size(windowWidth, 3*windowWidth/4);
	video.hide();
	textSize(32);
	textAlign(CENTER,CENTER);
	fill(255);

	classifyVideo()
}

function draw()
{
	background(0);
	//image(video, 0, 0, windowWidth, 3*windowWidth/4);
	//text(label, width/2, height-64);
	//text(confLabel, width/2, height-32)
	translate(video.width, 0);
  	scale(-1, 1);
	video.loadPixels();
	loadFilter(75, square);

	if (label == "Unicorn"){
		loadFilter(50, circle, rainbow)
	}

	if (label == "Shaker"){
	}

	if (label == "Digger"){
		loadFilter(50, line, primary)
	}
}

function classifyVideo() {
	classifier.classify(video, gotResult)
}

function gotResult(error, result) {

	if(error){
		console.error(error);
		return;
	}

	classifyVideo();
	label = result[0].label;
	confidence = result[0].confidence;
	confLabel = nf(result[0].confidence * 100, 0, 2) + "%";
}

function loadFilter(stepSize, shape, filter) {
for (x = 0; x < video.width; x += stepSize) {
  for (y = 0; y < video.height; y += stepSize) {
    index = ((y*video.width) + x) * 4;
    redVal = video.pixels[index];
    greenVal = video.pixels[index + 1];
    blueVal = video.pixels[index + 2];
    alphaVal = video.pixels[index + 3];

	if (filter == rainbow) {
		rainbow();}
	if (filter == primary) {
		primary();}

	strokeWeight(20);
    stroke(redVal, greenVal, blueVal);
    //noStroke();
    //noFill()
    fill(redVal, greenVal, blueVal, alphaVal);
    rectMode(CENTER);

	if (shape == circle){
		circle(x, y, stepSize);
	}
	else if (shape == square){
		rect(x, y, stepSize, stepSize);
	}  
	else if (shape == line){
		line(x, y, x+stepSize, y);
	} 
  }}}

  function primary() {
		if(blueVal > redVal && blueVal > greenVal) {
        redVal = 0;  
		greenVal = 0;
		blueVal = 255;
        }
	if(redVal > blueVal && redVal > greenVal) {
        redVal = 255;  
		greenVal = 0;
		blueVal = 0;
        }
	if(greenVal > blueVal && greenVal > redVal) {
        redVal = 0;  
		greenVal = 255;
		blueVal = 0;
        }
  }

    function rainbow() {
		if(blueVal > redVal && blueVal > greenVal) {
        redVal = redVal;  
		greenVal = greenVal*0.5;
		blueVal = blueVal*2;
		fill (redVal, greenVal, blueVal);
        }
	if(redVal > blueVal && redVal > greenVal) {
        redVal = redVal*2;  
		greenVal = greenVal*0.5;
		blueVal = blueVal;
		fill (redVal, greenVal, blueVal);
        }
	if(greenVal > blueVal && greenVal > redVal) {
        redVal = redVal;  
		greenVal = greenVal*0.5;
		blueVal = blueVal;
		fill (redVal, greenVal, blueVal);
        }
  }
  