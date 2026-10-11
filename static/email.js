let lives_left = Number(sessionStorage.getItem("lives_left")) || 3;

let yes;

let no;

const checkmark_img = document.getElementById("checkmark");
const cross_mark_img = document.getElementById("cross_mark");

const overlay = document.getElementById("overlay");

const yesButton = document.getElementById("yesbutton");
const noButton = document.getElementById("nobutton");

function change_bg_color(bg_color) {
  yesButton.disabled = true;
  noButton.disabled = true;
  
  overlay.style.backgroundColor = bg_color;

  setTimeout(() => {
    overlay.style.backgroundColor = "rgba(204, 51, 51, 0)";

    cross_mark_img.style.display = "none";
    checkmark_img.style.display = "none";
  }, 3000);

  setTimeout(() => {
    window.location.href = "/game";
  }, 3500);
}

// Checking the user's answer
yesButton.addEventListener("click", () => {
  console.log("Yes EventListener triggered!");
  if (yes) {
    console.log("correct!");

    checkmark_img.style.display = "block";

    change_bg_color("rgba(51, 153, 51, 0.3)");
    
  } else {
    console.log("incorrect");
    
    cross_mark_img.style.display = "block";

    lives_left -= 1;

    if (lives_left === 0) {
      sessionStorage.setItem("lives_left_isZero", true);
    } else {
      sessionStorage.setItem("lives_left", lives_left);
    }
    
    change_bg_color("rgba(255, 51, 51, 0.3)");
  }
});

noButton.addEventListener("click", () => {
  console.log("No EventListener triggered!");
  if (no) {
    console.log("correct!");
    
    checkmark_img.style.display = "block";

    change_bg_color("rgba(51, 153, 51, 0.3)")
    
    
  } else {
    console.log("incorrect");

    cross_mark_img.style.display = "block";

    lives_left -= 1;

    if (lives_left === 0) {
      sessionStorage.setItem("lives_left_isZero", true);
    } else {
      sessionStorage.setItem("lives_left", lives_left);
    }
    
    change_bg_color("rgba(255, 51, 51, 0.3)");
    
  }
});

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
        return;
      }

      if (number > 5) {
        yes = true;
        no = false;
      } else {
        no = true;
        yes = false;
      }
    }

    yesButton.disabled = false;
    noButton.disabled = false;
    
    console.log(text);
    
    // Updating the DOM
    document.getElementById("output").textContent = text;
  } catch (err) {
    console.error("Failed to load email:", err);
    document.getElementById("output").textContent = "Could not load content.";
  }
}

loadEmail();
