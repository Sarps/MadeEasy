 var sheet_line = 0;

function drawWorld(world, canvas, context) {
	drawGrid(canvas, context);
	for (var j = world.m_jointList; j; j = j.m_next) {
		drawJoint(j, context);
	}
	for (var b = world.m_bodyList; b; b = b.m_next) {
		for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
			drawShape(s, context);
		}
	}
}

function drawJoint(joint, context) {
	var b1 = joint.m_body1;
	var b2 = joint.m_body2;
	var x1 = b1.m_position;
	var x2 = b2.m_position;
	var p1 = joint.GetAnchor1();
	var p2 = joint.GetAnchor2();
	context.strokeStyle = '#ff0000';
	context.beginPath();
	switch (joint.m_type) {
	case b2Joint.e_distanceJoint:
		context.moveTo(p1.x, p1.y);
		context.lineTo(p2.x, p2.y);
		break;

	case b2Joint.e_pulleyJoint:
		// TODO
		break;
	
	case b2Joint.e_revoluteJoint:
		if (b1 == world.m_groundBody) {
			context.arc(p1.x, p1.y, b2.length*10, -Math.PI/2, angleToCan(b1.GetRotation()));
		}
		else if (b2 == world.m_groundBody) {
			context.arc(p2.x, p2.y, b1.length*10, -Math.PI/2, angleToCan(b1.GetRotation()));
		}
		break;
		
	default:
		if (b1 == world.m_groundBody) {
			context.moveTo(p1.x, p1.y);
			context.lineTo(x2.x, x2.y);
		}
		else if (b2 == world.m_groundBody) {
			context.moveTo(p1.x, p1.y);
			context.lineTo(x1.x, x1.y);
		}
		else {
			context.moveTo(x1.x, x1.y);
			context.lineTo(p1.x, p1.y);
			context.lineTo(x2.x, x2.y);
			context.lineTo(p2.x, p2.y);
		}
		break;
	}
	context.stroke();
}

function drawShape(shape, context) {
	context.fillStyle = '#666666';
	context.beginPath();
	switch (shape.m_type) {
	case b2Shape.e_circleShape:
		{
			var circle = shape;
			var pos = circle.m_position;
			var r = circle.m_radius;
			var segments = 16.0;
			var theta = 0.0;
			var dtheta = 2.0 * Math.PI / segments;
			// draw circle
			context.moveTo(pos.x + r, pos.y);
			for (var i = 0; i < segments; i++) {
				var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
				var v = b2Math.AddVV(pos, d);
				context.lineTo(v.x, v.y);
				theta += dtheta;
			}
			context.lineTo(pos.x + r, pos.y);
	
			// draw radius
			context.moveTo(pos.x, pos.y);
			var ax = circle.m_R.col1;
			var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
			context.lineTo(pos2.x, pos2.y);
		}
		break;
	case b2Shape.e_polyShape:
		{
			var poly = shape;
			var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
			context.moveTo(tV.x, tV.y);
			for (var i = 0; i < poly.m_vertexCount; i++) {
				var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
				context.lineTo(v.x, v.y);
			}
			context.lineTo(tV.x, tV.y);
		}
		break;
	}
	context.fill();
}

function drawGrid(canvas, context) {
	context.save();
	for ( var y = 0; y < canvas.height; y+=10 ) {
		context.beginPath();
		context.strokeStyle  ="#00bb00";
		context.lineWidth = 0.5 ;
		if (!(y%50) ) {
			context.strokeStyle = "#009900";
			context.lineWidth = 2;
			context.fillText(fromCan(y),0,y);
		}
		context.moveTo(0,y);
		context.lineTo( canvas.width, y);
		context.stroke();
	}
	for ( var x = 0; x < canvas.width; x+=10 ) {
		context.beginPath();
		context.strokeStyle  ="#00bb00";
		context.lineWidth = 0.5 ;
		if (!(x%50) ) {
			context.strokeStyle = "#009900";
			context.lineWidth = 2;
			context.fillText(fromCan(x),x,8);
		}
		context.moveTo(x,0);
		context.lineTo( x, canvas.height);
		context.stroke();
	}
	context.restore();
}

function drawConstruction(canvas, context){
	
}

function draw_line() {
	
}

function focus(li){
	$('li').removeClass('hover');
	$('li:nth-child('+li+')').addClass('hover');
}

 function smoothScroll(li) {
	 $('.sheet').animate({
		scrollTop: $('li:nth-child('+li+')').offset().top
	}, 300);
 }
 
 function printLine(text, li) {
	li = li  ? sheet_line = li  : ++sheet_line;
	var item = $('li:nth-child('+li+')');
	if (!item.length) {
		var no_lines = $("li").length;
		for (var i=no_lines; i<li; i++){
			$("#lines").append("<li></li>");
		}
		 item = $('li:last-child');
	}
	item.text(text);
	focus(li);
 }
 
 function bulkPrint(obj, array) {
	 line = obj.line;
	 wait = obj.wait;
	 interval = obj.interval;
	 if (line) printLine(array.shift(), line);
	 else printLine(array.shift());
	 while(wait && interval) {
		delay(interval);
		printLine(array.shift());
		if (!array.length) return;
	 }
	 if (interval && !array.length) {
		 setTimeout(function(){
			bulkPrint(array, {wait, interval});
		}, interval);
	 }
	 else {
		for (text of array) {
			printLine(text);
		}
	 }
 }
 
 function clearSheet() {
	 $('li').each(function(){
		 $(this).text("");
	 });
	 sheet_line = 0;
 }
 
 function topic(text) {
	 $('#topic').text(text);
 }


