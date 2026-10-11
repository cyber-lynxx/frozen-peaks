let yes;

let no;

const yesButton = document.getElementById("yesbutton");
const noButton = document.getElementById("nobutton");

// Checking the user's answer
yesButton.addEventListener("click", () => {
  console.log("Yes EventListener triggered!");
  if (yes) {
    console.log("correct!");

    //window.location.href = "/game";
  } else {
    console.log("incorrect");

    //window.location.href = "/game";
  }
});

noButton.addEventListener("click", () => {
  console.log("No EventListener triggered!");
  if (no) {
    console.log("correct!");

    //window.location.href = "/game";
  } else {
    console.log("incorrect");

    //window.location.href = "/game";
  }
}, {once: true} );

let marker = "My number was";

async function loadEmail() {
  try {
    const response_str = await fetch("https://frozen-peaks-4a15.onrender.com/text");
    
    // Stops the program and throws an error if the server responds with any non success code
    if (!response_str.ok) throw new Error(`HTTP error: ${response_str.status}`);

    console.log("Successfully fetched string");
    
    const response_raw_text = await response_str.text();
    const response = JSON.parse(response_raw_text.replace(/'/g, '"'));

    console.log("String has been parsed")

    let text;

    if (Array.isArray(response)) {
      // Combine the strings in response, an array, into one block of text, separated by line breaks
      text = response.join("\n");
    } else {
      // If response is already a single value (ex. "Hi there", use it directly)
      text = response;
    }

    if (text.includes(marker)) {
      const number = parseInt(text.slice(text.indexOf(marker) + marker.length).trim(), 10);

      if (Number.isNaN(number)) {
        console.log("No number found");
      }

      if (number > 5) {
        yes = true;
        no = false;
      } else {
        no = true;
        yes = false;
      }
    }

    console.log(text);
    
    // Updating the DOM
    document.getElementById("output").textContent = text;
  } catch (err) {
    console.error("Failed to load email:", err);
    document.getElementById("output").textContent = "Could not load content.";
  }
}

loadEmail();
