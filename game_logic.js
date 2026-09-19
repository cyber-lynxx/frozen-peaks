// Note: when the snowballs move, they are all using the same distance variables

let snowballs_hit = 0;

let throw_snowball = false;

let snowball_number = 1;

let function_run_amount = 0;

// throw_snowball will become true every second
const throw_snowball_timer = setInterval(() => {
    throw_snowball = true;

    if (function_run_amount > 0) {
        throw_snowball_function();
    };
}, 1000);

function lane_movement(lane_number, snowball_clone) {
    console.log(`lane_movement function initiated! Lane: ${lane_number}`);
    
    // Making the snowball actually TRAVEL because it is an obstinate couch potato :(
    
    console.log(`Lane ${lane_number}`);

    if (lane_number == 1) {
        snowball_clone.style.bottom = "18.8125dvh";
        let lane_1 = true;
    }
    if (lane_number == 2) {
        snowball_clone.style.bottom = "40dvh";
        let lane_2 = true;
    }
    if (lane_number == 3) {
        snowball_clone.style.bottom = "60dvh";
        let lane_3 = true;
    }
    if (lane_number == 4) {
        snowball_clone.style.bottom = "81dvh";
        let lane_4 = true;
    }

    console.log(`line 36`);

    // Animating the snwoball across the screen and checking for clicks
    const crossing_time_ms = 5000;
    const start_position = 100;
    const end_position = 0;

    const animation_start_time = performance.now();

    function move_snowball(current_time) {
        const time_elapsed = current_time - animation_start_time;
        const progress = Math.min(time_elapsed / crossing_time_ms, 1);
        const distance_from_right = start_position - progress * (start_position - end_position);

        snowball_clone.style.right = `${distance_from_right}dvw`;

        if (progress < 1) {
            requestAnimationFrame(move_snowball);
        } else {
            console.log("Snowball has made it to the end!");
            snowball_clone.remove();
        }

        if (progress > 0.5) {
            if (lane_1) 
        }
    }

    // Actually starting the animation
    snowball_clone.style.right = `${start_position}dvw`;
    requestAnimationFrame(move_snowball);
    
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
