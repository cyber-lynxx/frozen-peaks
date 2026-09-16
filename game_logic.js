let snowballs_hit = 0;

throw_snowball = false;

snowball_number = 1

// throw_snowball will become true every second
setInterval(() => {
    throw_snowball = true;
}, 1000);

if (throw_snowball) {
    // Creating another snowball image
    let snowball = document.getElementById("snowball");
    let snowball_clone = snowball.cloneNode(true);

    // Giving it a unique ID
    let snowball_cloneID = `snowball${snowball_number}`;
    snowball_clone.id = snowball_cloneID;

    // Actually putting it in the HTML
    document.body.appendChild(snowball_clone);

};
