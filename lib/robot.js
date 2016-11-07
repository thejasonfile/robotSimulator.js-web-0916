'use strict';

var directions = ['north', 'east', 'south', 'west'];

function Robot(bearing,coordinates) {
  this.bearing = bearing;
  this.coordinates = coordinates;
}

Robot.prototype.orient = function(orientation){
  if (directions.includes(orientation)){
  this.bearing = orientation;
  }
  else {
    throw new Error("Invalid Robot Bearing");
  }
};

Robot.prototype.turnRight = function(){
  var index = directions.indexOf(this.bearing) + 1;

  if (index === directions.length){
    index = 0;
  }
  this.bearing = directions[index];
};

Robot.prototype.turnLeft = function (){
  var index = directions.indexOf(this.bearing) - 1;

  if (index < 0){
    index = 3;
  }
  this.bearing = directions[index];
};

Robot.prototype.at = function (x, y){
  this.coordinates = [x,y];
  return this.coordinates;
};


Robot.prototype.advance = function (){
  if(this.bearing === 'north'){
    this.coordinates[1] += 1;
  }
  else if(this.bearing === 'south'){
    this.coordinates[1] -=1;
  }
  else if(this.bearing === 'east'){
    this.coordinates[0] +=1;
  }
  else if(this.bearing === 'west'){
    this.coordinates[0] -=1;
  }
};

Robot.prototype.instructions = function(instructionsString){
  var array = instructionsString.split('');
  var instructionArray = [];

  for (var i = 0; i < array.length; i++){
    if(array[i] === 'R' ){
      instructionArray.push("turnRight");
    }
    else if (array[i] === 'L') {
      instructionArray.push("turnLeft");
    }
    else if (array[i]==='A') {
      instructionArray.push("advance");
    }
  }
  return instructionArray;
};

Robot.prototype.place = function (object){
  this.coordinates = [];
  this.coordinates[0] = object["x"];
  this.coordinates[1] = object["y"];
  this.bearing = object["direction"];
}

Robot.prototype.evaluate = function (string){
  var array = string.split('');
  
  for (var i = 0; i < array.length; i++){
    if(array[i] === 'R' ){
      this.turnRight();
    }
    else if (array[i] === 'L') {
      this.turnLeft();
    }
    else if (array[i]==='A') {
      this.advance();
    }
  }
}
