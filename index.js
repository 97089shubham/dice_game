// "use strict";

let score = 0;
let random_dice;
let trail_num = 1;
let buttons = document.getElementsByTagName("button");
let result = document.getElementById("result");
let text_loading = document.getElementById("text_loading");
let timer = document.getElementById("timer");
let dice = document.getElementById("dice");
let guessed_number = 0;
let is_clicked = false;

const button_clicked = (e) => {
    guessed_number = (e.target.innerText);
    is_clicked = true;
    document.getElementById("guessed_number").innerHTML = guessed_number;
    document.getElementById("guessed_number").style.visibility="visible";

    for(let i = 0;i<buttons.length;i++){
        let button = buttons[i];
        button.disabled = true;
        button.classList.toggle("disabled");
    }
}

const show_result = () => {
    dice.src = `img/${random_dice}.png`;
    if (random_dice == guessed_number) {
        result.style.color = "#0fe1bb";
        result.innerHTML = "You guessed it right!";
        score++;
        document.getElementById("score").innerHTML = score;
    } 
    else {
        result.style.color = "#f44336";
        result.innerHTML = "Sorry, it was a wrong number!";
    }
    trail_num++;
}

function starting(){
    document.getElementById('dice_timer').style.visibility="hidden";  // dice wiil change in 0 seconds
    document.getElementById('trail_id').style.visibility="hidden";  // game number
    result.style.visibility="hidden";  // can you guess it
    result.style.color = "#efd7d7";
    document.getElementById("guessed_number").style.visibility="hidden";  // guessed variable

    for(let i = 0;i<buttons.length;i++){
        let button = buttons[i];
        button.addEventListener("click", button_clicked);
        button.disabled = false;
        button.classList.add("disabled");
    }

    setTimeout(() => {
        document.getElementById('dice_timer').style.visibility="visible";  // dice will change in 0 seconds
        document.getElementById('trail_id').style.visibility="visible";
    }, 8000);
}

function time_func(){
    let time_counter = 4;
    setInterval(() => {
        timer.innerHTML = time_counter;
        time_counter--;
        if (time_counter == 0) {

            if(is_clicked == true){
                show_result();
                is_clicked = false;
            }

            result.style.visibility="visible";
            text_loading.style.visibility="hidden";
            document.getElementById('dice_timer').style.visibility="hidden"; 
            time_counter = 8;
        }
        if(time_counter == 4){
            document.getElementById("trail_num").innerHTML = trail_num;
            result.style.color = "#efd7d7";
            result.innerHTML = "Guess the dice!";
            document.getElementById('dice_timer').style.visibility="visible"; 
        }
    }, 1000);
}

function random_generator (){
    setInterval(() => {
        random_dice = Math.floor(Math.random() * 6) + 1;
        // random_dice = 4;
        dice.src = `img/load.gif`;
        dice.style.width = "38%";
        document.getElementById("guessed_number").style.visibility="hidden";

        for(let i = 0;i<buttons.length;i++){
            let button = buttons[i];
            button.disabled = false;
            button.classList.remove("disabled");
        }
    }, 8000);
}

window.onload = () => {
    starting();
    time_func();
    random_generator();
}