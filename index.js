const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

const scrollLocation = window.pageYOffset;
const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.onload = ()=>{
	recognition.start();
};

recognition.onresult = (event)=>{
	const command = event.results[0][0].transcript;
	console.log(command);

	if(command == "scroll down" || command == "scrolldown" || command == "go down" || command == "godown"){
		window.scrollBy(0,100);
	}
	else if(command == "scroll up" || command == "scrollup" || command == "go up" || command == "goup"){
		window.scrollBy(0,-100);
	}
	else if(command == "go to top" || command == "go top" || command == "scroll to top" || command == 'gotop' || command == "scrolltotop" || command == "gototop"){
		window.scrollTo(0,0);
	}
	else if(command == "go to bottom" || command == "go bottom" || command == "scroll to bottom" || command == 'gobottom' || command == "scrolltobottom" || command == "gotobottom"){
		window.scrollTo(0,maxScroll);
	}
	else if(command == "go to half" || command == "gotohalf" || command == "go to half of the page"){
		window.scrollTo(0, document.body.scrollHeight / 2);
	}
};

recognition.onend = ()=>{
	recognition.start();
};