function removeFromArray(arr, elem){
	for (var i = arr.length - 1; i >= 0; i--){
		if(arr[i] == elem){
			arr.splice(i,1)
		}
	}
}

function heuristic(a,b){
	//var d = dist(a.i,a.j,b.i,b.j);
	var d = abs(a.i-b.i) + abs(a.j-b.j);
	return d;
}

let cols = 25;
let rows = 25;
let grid = new Array(cols);

var path = [];
var openSet = [];
var closedSet = [];
var w, h;
function Spot(i,j){
	this.i = i;
	this.j = j;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.neighbors = [];
	this.wall = false;
	if(random(1) < .2){
		this.wall = true;
	}
	this.show = function(color){
		fill(color);
		if(this.wall == true){
			fill(0);
		}
		noStroke();
		rect(this.i*w,this.j*h,w-1,h-1);
	}
	this.addNeighbors = function(grid){
		var i = this.i;
		var j = this.j;
		if(i < cols -1 ){
			this.neighbors.push(grid[i+1][j]);
		}
		if(i > 0){
			this.neighbors.push(grid[i-1][j]);
		}
		if(j < rows - 1){
			this.neighbors.push(grid[i][j+1]);
		}
		if(j > 0 ){
			this.neighbors.push(grid[i][j-1]);
		}
		
	}
}

function setup() {
  createCanvas(400,400);
  console.log("A*");

  w = width / cols;
  h = height / rows;

  for (var i = 0; i < cols; i++){
  	grid[i] = new Array(rows);
  }
  console.log(grid);

for(let i = 0; i < cols; i++){
	for(let j = 0; j < rows; j++){
		grid[i][j] = new Spot(i,j);
	}
}

for(let i = 0; i < cols; i++){
	for(let j = 0; j < rows; j++){
		grid[i][j].addNeighbors(grid);
	}
}

start = grid[0][0];
end = grid[rows -1][cols - 1];
openSet.push(start);
}


function draw() {
	background(0);
	if(openSet.length > 0){
		var winner = 0;
		for(var i = 0; i < openSet.length; i++){
			if(openSet[i].f < openSet[winner].f){
				winner = i;
			}
		}
	var current = openSet[winner];

	if(current === end){
		noLoop();
		
	}
	removeFromArray(openSet, current);
	closedSet.push(current);

	var neighbors = current.neighbors;
	for (var i = 0; i < neighbors.length; i ++){
		neighbor = neighbors[i];

		if(!closedSet.includes(neighbor) && !neighbor.wall){
			var tempG = current.g + 1;
			if(openSet.includes(neighbor)){
				if(tempG < neighbor.G){
					neighbor.g = tempG;
				}
			} else {
				neighbor.g = tempG;
				openSet.push(neighbor);
			}

			neighbor.h = heuristic(neighbor,end);
			neighbor.f = neighbor.g + neighbor.h;
			neighbor.previous = current;
		}

		
	}

	} else{
		//no solution
	}
	for(let i = 0; i < cols; i++){
	for(let j = 0; j < rows; j++){
		grid[i][j].show(color(255));
  	}
}



for(var i = 0; i < closedSet.length; i++){
	closedSet[i].show(color(255,0,0));
}

for(var i = 0; i < openSet.length; i++){
	openSet[i].show(color(0,255,0));
	}

		path = []
		var temp = current
		path.push(temp);
		while(temp.previous){
			path.push(temp.previous);
			temp = temp.previous;
		}

for(var i = 0; i < path.length; i++){
path[i].show(color(0,0,255));
  }
}


  // put drawing code here

