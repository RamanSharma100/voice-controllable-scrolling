const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

const scrollLocation = window.pageYOffset;
const maxScroll =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.onload = () => {
  recognition.start();
};

recognition.onresult = (event) => {
  const command = event.results[0][0].transcript;

  if (
    command == "scroll down" ||
    command == "scrolldown" ||
    command == "go down" ||
    command == "godown"
  ) {
    window.scrollBy(0, 100);
  } else if (
    command == "scroll up" ||
    command == "scrollup" ||
    command == "go up" ||
    command == "goup"
  ) {
    window.scrollBy(0, -100);
  } else if (
    command == "go to top" ||
    command == "go top" ||
    command == "scroll to top" ||
    command == "gotop" ||
    command == "scrolltotop" ||
    command == "gototop"
  ) {
    window.scrollTo(0, 0);
  } else if (
    command == "go to bottom" ||
    command == "go bottom" ||
    command == "scroll to bottom" ||
    command == "gobottom" ||
    command == "scrolltobottom" ||
    command == "gotobottom"
  ) {
    window.scrollTo(0, maxScroll);
  } else if (
    command == "go to half" ||
    command == "gotohalf" ||
    command == "go to half of the page" ||
    command == "scroll to half"
  ) {
    window.scrollTo(0, document.body.scrollHeight / 2);
  } else if (
    command.includes("scroll to") ||
    command.includes("move to") ||
    command.includes("scroll by") ||
    command.includes("move by") ||
    command.includes("scroll") ||
    command.includes("move")
  ) {
    let pert;
    if (
      command.includes("percentage") ||
      command.includes("percent") ||
      command.includes("%")
    ) {
      if (command.includes("percentage")) {
        pert = command.split("percentage");
      }
      if (command.includes("%")) {
        pert = command.split("%");
      }
      if (command.includes("percent")) {
        pert = command.split("percent");
      }
      const number = pert[0].trim().split(" ").reverse()[0];
      if (
        number !== "undefined" &&
        number !== null &&
        !/^[a-zA-Z].*/.test(number)
      ) {
        window.scrollTo(0, (parseInt(number) / 100) * maxScroll);
      }
    }
    if (
      command.includes("pixel") ||
      command.includes("pixels") ||
      command.includes("px")
    ) {
      if (command.includes("pixels")) {
        pert = command.split("pixels");
      }
      if (command.includes("pixel")) {
        pert = command.split("pixel");
      }
      if (command.includes("px")) {
        pert = command.split("px");
      }
      const number = pert[0].trim().split(" ").reverse()[0];
      if (
        number !== "undefined" &&
        number !== null &&
        !/^[a-zA-Z].*/.test(number)
      ) {
        if (command.includes("up") || command.includes("down")) {
          if (pert[1].trim() === "up") {
            window.scrollBy(0, -parseInt(number));
          }
          if (pert[1].trim() === "down") {
            window.scrollBy(0, parseInt(number));
          }
        } else {
          window.scrollTo(0, parseInt(number));
        }
      }
    }
  }
};

recognition.onend = () => {
  recognition.start();
};
