async function loadEmail() {
  try {
    const response_str = await fetch("https://anti-phishing-test.onrender.com/text");
    
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

    console.log(text);
    
    // Updating the DOM
    document.getElementById("output").textContent = text;
  } catch (err) {
    console.error("Failed to load email:", err);
    document.getElementById("output").textContent = "Could not load content.";
  }
}

loadEmail();

function checkAnswer() {
  console.log("Function checkAnswer has been run");
  // Checking the user's answer
  const yesButton = document.getElementById("yesbutton");
  yesButton.addEventListener("click", () => {
    const result = yesButton.value === excerpt3.trim() ? "correct" : "incorrect";

    sessionStorage.setItem("explanation", excerpt2);
    sessionStorage.setItem("user_answer", yesButton.value);
  
    window.location.href = `results?answer=${result}`;
  });

  const noButton = document.getElementById("nobutton");
  noButton.addEventListener("click", () => {
    const result = noButton.value === excerpt3.trim() ? "correct" : "incorrect";

    sessionStorage.setItem("explanation", excerpt2);
    sessionStorage.setItem("user_answer", noButton.value);
  
    window.location.href = `results?answer=${result}`;
  });

}
