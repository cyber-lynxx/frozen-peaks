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

    let snowball_id = "snowball" + snowball_number

}
