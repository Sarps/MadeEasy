/**********************************************
* TABLE OF CONTENT
*
* 1) Canvas Utility Functions
* 2) Basic Geometry Operations
* 3) Coordinate System
* 4) Synthesis, Mechanisms and Analysis
*
***********************************************/


/*********************************************
*
* General Utility Functions
*
**********************************************/

var tracker = {};

function createWorld() {
	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(-5000, -5000);
	worldAABB.maxVertex.Set(5000, 5000);
	var gravity = new b2Vec2(0, 9.817);
	var doSleep = true;
	var world = new b2World(worldAABB, gravity, doSleep);
	return world;
}

function createBall(world, x, y) {
	var ballSd = new b2CircleDef();
	ballSd.density = 1.0;
	ballSd.radius = 20;
	ballSd.restitution = 1.0;
	ballSd.friction = 0;
	var ballBd = new b2BodyDef();
	ballBd.AddShape(ballSd);
	ballBd.position.Set(x,y);
	return world.CreateBody(ballBd);
}

function createBox(world, x, y, width, height, fixed) {
	if (typeof(fixed) == 'undefined') fixed = true;
	var boxSd = new b2BoxDef();
	if (!fixed) boxSd.density = 1.0;
	boxSd.extents.Set(width, height);
	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(x,y);
	return world.CreateBody(boxBd)
}

/**************************************************
*
* BASIC GEOMETRY OPERATIONS
*
**************************************************/

/* Basic Shape Types */
var me_line = 1110,
me_arc = 1111,
me_circle = 1112,
me_rectangle = 1113;

/* Coordinate Transformations */
function fromCan(coord) {
	return coord/10;
}

function toCan(coord) {
	return coord*10;
}

function angleToBox(theta){
	return  theta + Math.PI / 2;
}

function angleToCan(theta){
	return (theta  % (Math.PI * 2))- Math.PI / 2;
}

function toRad(theta) {
	return (theta / 180) * Math.PI;
}

function delay(milliseconds) {
  /* var start = new Date().getTime();
  while ((new Date().getTime() - start) < milliseconds) {} */
  //window.showmodaldialog("javascript:document.writeln ('<script>setTimeout(function() {close();}, " + milliseconds + "</script>')");
}

function animate_linear(start, end, func, time, wait) {
	wait = wait || false;
	for (index in start) {
		$(tracker).prop(index, start[index]);
	}
	$(tracker).animate(end , {
        duration: time,
        step: function () {
            func(tracker);
        }
    });
	if (wait) {
		delay(time);
	}
}


/**************************************************
*
*  COORDINATE SYSTEM
*
***************************************************/

function box_rotate(x, y, theta) {
	x1 = x*Math.cos(theta) + y*Math.sin(theta);
	y1 = y*Math.cos(theta) - x*Math.sin(theta);
	return {x: x1, y: y1};
}



/**************************************************
*
* SYNTHESIS, MECHANISMS AND ANALYSIS
*
***************************************************/

function getEdge(body) {
	var coord = body.GetOriginPosition();
	var angle = body.GetRotation();
	coord.x = coord.x + body.length * Math.sin(angle);
	coord.y = coord.y + body.length * Math.cos(angle);
	return coord;
}

function link(world, x, y, length, rot) {
	x = toCan(x);
	y = toCan(y);
	rot = toRad(rot || 0);
	var rigid_body = new b2BoxDef();
	rigid_body.extents.Set(5, length*5);
	rigid_body.density = 0.1;
	
	var link = new b2BodyDef();
	link.AddShape(rigid_body);
	link.rotation = rot;
	var coord = box_rotate(0, -length*5, rot);
	x-=coord.x;
	y+=coord.y;
	link.position.Set(x, y);
	
	var body = world.CreateBody(link);
	body.length = length;	
	var edge = getEdge(body);
	return body;
}

function revolute(body1, body2, l1, motion){
	
	motion = motion || false;
	var r = body1.GetRotation();
	l1 = (body1.length - l1 ) * 5;
	var coord = new b2Vec2(l1*Math.sin(r), l1*Math.cos(r));
	coord.Add(body1.GetOriginPosition());
	
	var rev = new b2RevoluteJointDef();
	rev.anchorPoint.Set(coord.x, coord.y);
	rev.body1 = body1;
	rev.body2 = body2;
	rev.motorSpeed = -1.0 * Math.PI;
	rev.motorTorque = 10000.0;
	rev.enableMotor = motion;
	
	return rev;
}

function sliding(body1, body2, motion){
	
	motion = motion || false;
	var coord = body1.GetOriginPosition();
	
	var prism = new b2PrismaticJointDef();
	prism.anchorPoint.Set(coord.x, coord.y);
	prism.body1 = body2;
	prism.body2 = body1;
	prism.axis.Set(0.0, 1.0);
	prism.motorSpeed = -1.0 * Math.PI; // joint friction
	prism.motorForce = 10000.0;
	prism.enableMotor = motion;
	
	return prism;
	
}


/***********************
*
* END OF UTILITIES
*
***********************/