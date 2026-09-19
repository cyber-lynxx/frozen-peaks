// Note: when the snowballs move, they are all using the same distance variables

let snowballs_hit = 0;

let throw_snowball = false;

let snowball_number = 1;

let function_run_amount = 0;

let snowball_distance_from_rightINT = 100;

let final_distance = 100;

// throw_snowball will become true every second
setInterval(() => {
    throw_snowball = true;

    if (function_run_amount > 0) {
        throw_snowball_function();
    };
}, 1000);

function lane_movement(lane_number, snowball_clone) {
    console.log(`lane_movement function initiated! Lane: ${lane_number}`);
    
    // Making the snowball actually TRAVEL because it is an obstinate couch potato :(
    
    console.log(`Lane ${lane_number}`);

    if (lane_number == 1) snowball_clone.style.bottom = "18.8125dvh";
    if (lane_number == 2) snowball_clone.style.bottom = "40dvh";
    if (lane_number == 3) snowball_clone.style.bottom = "60dvh";
    if (lane_number == 4) snowball_clone.style.bottom = "81dvh";

    console.log(`helloooo`);

    while (final_distance >= 0) {
        console.log("line 39");
        
        // Runs every hundreth of a second :D Increase snowball_distance_from_rightINT, which is a value over 100, and divide that by 100. This will give a smaller value, which will give the snowball a smoother movement across the screen. But because of this, you end up with a number way too different from the previous, which would make the snowball basically teleport across the screen, so we subtract this value from 100. Finally, we take that final value and update the DOM.
        setInterval(() => {
            console.log("line 43");
            snowball_distance_from_rightINT++;
    
            let snowball_distance_from_rightDEC = snowball_distance_from_rightINT / 100;
    
            final_distance = 100 - snowball_distance_from_rightDEC;
    
            snowball_clone.style.right = `${final_distance}dvw`;

        }, 10);   
        console.log("line 53");
    }
}

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

        // This will get a random number ranging from 1 to 4, inclusively, and each number corresponds to a lane for the snowball to travel along
        let lane_number = Math.floor(Math.random() * 4) + 1;

        lane_movement(lane_number, snowball_clone);
    }   

    function_run_amount++;
};

document.addEventListener("click", throw_snowball_function, {once: true});
