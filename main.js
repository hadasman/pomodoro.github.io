Notification.requestPermission();

var minutes = '25';
var seconds = '00';
var accumulated_time = 0;
var isPaused = false;

var beep = new Audio("beep.mp3");
var clapping = new Audio("short_clapping.mp3");
var forest = new Audio("forest_sound.mp3");
var water = new Audio("water_sound.mp3");
var noise = new Audio("white_noise_sound.mp3")
var ocean = new Audio("ocean_sound.mp3")
var forest_playing = 0;
var water_playing = 0;
var noise_playing = 0;
var ocean_playing = 0;

var color_scheme = 0;
var num_color_schemes = 4;

if (Notification.permission!=="granted"){
	Notification.requestPermission();
}

function template(){
	document.getElementById("minutes").innerHTML = minutes;
	document.getElementById("seconds").innerHTML = seconds;
}

function start(){
	if (document.getElementById("input_sound").checked){beep .play();}

	minutes = document.getElementById("input_minutes").value;

	accumulated_time = parseInt(accumulated_time) + parseInt(minutes);

	minutes = minutes - 1;
	if (seconds==0){seconds = 59}else{seconds = seconds - 1};
	document.getElementById("minutes").innerHTML = minutes;
	document.getElementById("seconds").innerHTML = seconds;

	// setInterval is a predefined function: executes a user-defined function every given time (in milli-seconds)
	var minutes_interval = setInterval(minutesTimer, 60000);
	var seconds_interval = setInterval(secondsTimer, 1000);

	function minutesTimer(){
		if (!isPaused){
			minutes = minutes - 1;

			if (minutes<0){minutes = 0;}
			document.getElementById("minutes").innerHTML = minutes;
		}
	}
	function secondsTimer(){
		if (!isPaused){
			seconds = seconds - 1;
			document.getElementById("seconds").innerHTML = seconds;

			if (seconds==0){
				
				if (minutes==0){
					minutes = 0;
					clearInterval(minutes_interval); 
					clearInterval(seconds_interval);

					// I need "done" to be an id in order to use getElementById, and I need show_message to be a class (and not use styling for the id "done") in order for it not to be shown in the beginning
					if (document.getElementById("input_sound").checked){clapping.play();}

					document.getElementById("done").innerHTML = "Session Completed";
					document.getElementById("done").classList.add("show_message");

					Notification.requestPermission().then(permission => {
    					if (permission==="granted"){
		    				console.log(permission);
		    				const notification = new Notification("Session completed", {body: `${(100*accumulated_time/(goal_time*60)).toFixed(2)} % completed!`, title:"..."})
    					}
    				}); 

					// if (Notification.permission==="granted"){
					// 	var noti = new Notification("Session completed", {body: `${(100*accumulated_time/(goal_time*60)).toFixed(2)} completed!`})
					// }

					var goal_time = document.getElementById("input_total").value;
					
					if (goal_time==0){
						document.getElementById("percent_total").innerHTML = `Total Completed: 100%`
					}else{
						document.getElementById("percent_total").innerHTML = `Total Completed: ${(100*accumulated_time/(goal_time*60)).toFixed(0)}%`
						document.querySelector("#progressbar").style.width = `${(100*accumulated_time/(goal_time*60)).toFixed(2)}%`
					};

					if ((100*accumulated_time/(goal_time*60))>=100){document.querySelector("#award").style.backgroundImage="url('award.png')"; document.querySelector("#award").style.backgroundSize='cover'}
				}
				seconds = 60;
			};
		}
	}
}

function scheme(){

	color_scheme = color_scheme + 1;
	if (color_scheme>num_color_schemes-1){color_scheme = 0};

	switch (color_scheme) {
		case 0:
			var background_color = "#1C2340"//"#dddddd";
			var font_color = "#F0DAC5"//"#3e978b";
			var border_color =  "#50223C"//"#d9adad";
			var button_color = "#AEF359"//"#89c9b8";		
			break;
		case 1:
			var background_color = "#FFFFFF";
			var font_color =  "#6593F6";
			var border_color = "#3FE0D0";
			var button_color = "#6593F6";
			break;
		case 2:
			var background_color = "#f5f1e4";
			var font_color = "#F87B7B";
			var border_color = "#B1D7D8";
			var button_color = "#f3a5a2";
			break;
		case 3:
			var background_color = "#000000"; //"#272343"
			var font_color = "#46CB18";//"#bae8e8";
			var border_color = "#fff";
			var button_color = "#46CB18";//"#e3f6f5";

			break;
	}

	document.querySelector("#body").style.background 	= background_color;
	document.querySelector("#heading").style.color 		= font_color;
	document.querySelector("#explanation").style.color 		= font_color;
	document.querySelector("#timer").style.color 		= font_color;
	document.querySelector(".timer").style.border 		= `5px solid ${border_color}`;

	var x = document.querySelectorAll(".small_text");
	var i;
	for (i = 0; i < x.length; i++) {
	  x[i].style.color = font_color;
	}

	// Buttons
	var x = document.querySelectorAll(".fas");
	var i;
	for (i = 0; i < x.length; i++) {
	  x[i].style.color = button_color;
	  $(x[i]).hover(function(){
					  	$(this).css("color", font_color); 
					  	$(this).css("border", "2px solid "+font_color);
	  			}, function(){
	  					$(this).css("color", button_color); 
	  					$(this).css("border", "0px solid "+font_color)});
	}
}

function change_isPaused(){
	isPaused = false*(isPaused==true) + true*(isPaused==false)
}

function play_sound(audio_obj, is_playing){
	if (is_playing==1){
		audio_obj.pause();
		is_playing = 0;
	}else{
		audio_obj.play();
		is_playing = 1;
	}

	return is_playing
}

function forest_sound(){
	forest_playing = play_sound(forest, forest_playing)
}
function water_sound(){
	water_playing = play_sound(water, water_playing)
}
function noise_sound(){
	noise_playing = play_sound(noise, noise_playing)
}
function ocean_sound(){
	ocean_playing = play_sound(ocean, ocean_playing)
}

// function noise_sound(){
// 	if (noise_playing==0){
// 		noise.play();
// 		noise_playing = 1;
// 	}else{
// 		noise.pause()
// 		noise_playing = 0;
// 	};
// }








