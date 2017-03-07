var subId = 0, initId = 0;
var world = createWorld();
var synthesis = {};
synthesis.topics = [];

function setupWorld(init, did) {
	if (did == undefined ) {
		did = 0;
		world = createWorld();
		synthesis.topics[initId].initWorld(world);
		topic(synthesis.topics[initId].title);
	}
	else {
		initId += init;
		subId += did;
		if ( subId >= synthesis.topics[initId].subs.length ) {
			subId = 0;
			initId ++;
			if (initId >=  synthesis.topics.length) initId = synthesis.topics.length-1;
			setupWorld(initId);
		}
		else if (subId < 0) {
			subId = 0;
			initId--;
			if (initId < 0 ) initId = 0;
			setupWorld(initId);
		}
		else {
			synthesis.topics[initId].subs[subId](world);
			topic(synthesis.topics[initId].title);
		}
	}
}

function setupNextWorld() { setupWorld(1); }

function setupPrevWorld() { setupWorld(-1); }

function next() { setupWorld(0, 1); }

function previous() { setupWorld(0, -1); }

function step(cnt) {
	var stepping = false;
	var timeStep = 1.0/25;
	var iteration = 1;
	world.Step(timeStep, iteration);
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawWorld(world, canvas, context);
	setTimeout('step(' + (cnt || 0) + ')', 10);
}

$(function() {
	setupWorld(0);
		
	$(window)
	.click(function(e) {
		if (e.preventDefault) e.preventDefault();
		alert("What are u trying to click");
		//setupNextWorld();
		/* if (Math.random() < 0.5) 
			demos.top.createBall(world, Event.pointerX(e) - canvasLeft, Event.pointerY(e) - canvasTop);
		else 
			createBox(world, Event.pointerX(e) - canvasLeft, Event.pointerY(e) - canvasTop, 10, 10, false); */
	})
	.contextmenu(function(e) {
		if (e.preventDefault) e.preventDefault();
		alert("Why do u want to right-click");
	});
	step();
});
