 
 $(function() {
	var div = $('#graph');
	canvas = document.createElement('canvas');
	canvas.id = 'canvas';
	canvas.width = div.width();
	canvas.height = div.height();
	div.append(canvas);
	context = canvas.getContext('2d');

	drawGrid(canvas, context);
	
	$(window).on('resize', function(){
		canvas.width = div.width();
		canvas.height = div.height();
		context.clearRect(0,0,canvas.width,canvas.height);
		drawGrid(canvas, context);
	});
	
	smoothScroll(20);
	printLine("Testing LinePrint", 15);
	//printLine("Testing LinePrint");
	//$('li:first-child').text("first-child");	
	
 });
 