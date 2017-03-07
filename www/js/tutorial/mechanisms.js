
var onetopic = {
	title : "Slider Crank Mechanism",
	initWorld : function(world) {
		// Define links
		var  ground = world.m_groundBody;
			crank = link(world, 23, 25,5), 
			coupler = link(world, 23, 20,10), 
			slider = link(world, 23, 10,2);
			
		//clearSheet();	
		//printLine("Hello Guys");
		/* bulkPrint(
		{line: 3, interval: 1000, wait:true}, 
		[
			"Good Evaning Guys",
			"Hope We All are cool",
			"The Spirit of the LORD is upon me",
			"His empowerment, show His ability,",
			"The Word of the Lord is within Me, to perpertuate",
			"",
			"Being seated in Heavenly places,",
			"Feels like Heaven, Feels like Heaven on earth"
		]
		); */
	
		//Draw Mechanisms
		world.CreateJoint(revolute(crank, ground, 0, true));
		world.CreateJoint(revolute(coupler, crank, 0));
		world.CreateJoint(revolute(slider, coupler, 0));
		world.CreateJoint(sliding(slider, ground));
		
		//delay(3000);
		//printLine("Delay Test");
	},
	subs : [
		function(world){
			printLine("Hello Guys", 1);
		},
		
		function(world){
			
		},
		
		function(world){
			
		},
		
		function(world){
			
		}
		
	]
};

synthesis.topics.push(onetopic);
