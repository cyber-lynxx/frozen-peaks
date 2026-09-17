let snowballs_hit = 0;

throw_snowball = false;

snowball_number = 1

// throw_snowball will become true every second
setInterval(() => {
    throw_snowball = true;

    throw_snowball_function();
}, 1000);

function throw_snowball_function() {
    console.log("function run!");

    let click_message = document.getElementById("click_message");
    click_message.style.display = "none";
    
    if (throw_snowball) {
        console.log("throw_snowball is true!");
        
        // Creating another snowball image
        let snowball = document.getElementById("snowball");
        let snowball_clone = snowball.cloneNode(true);
    
        // Giving it a unique ID
        let snowball_cloneID = `snowball${snowball_number}`;
        snowball_clone.id = snowball_cloneID;

        // Making it visible, because the image it is being cloned from has been hidden
        snowball_clone.style.display = "block";
    
        // Actually putting it in the HTML
        document.body.appendChild(snowball_clone);
    
        // Adding 1 to snowball_number and resetting the throw_snowball variable
        snowball_number++;
        throw_snowball = false;
    }   
};

document.addEventListener("click", throw_snowball_function, {once: true});
