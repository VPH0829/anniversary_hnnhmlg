const cat =
    document.querySelector(".cat img");

const catContainer =
    document.querySelector(".cat");

const message =
    document.getElementById("message");

const heart =
    document.querySelector(".heart");

const envelopeScene =
    document.getElementById("envelope-scene");

const letter =
    document.getElementById("letter");

const letterPaper =
    document.querySelector(".letter-paper");

const montage =
    document.getElementById("montage");

const montageHint =
    document.getElementById("montage-hint");

const endingMessage =
    document.getElementById("ending-message");

const polaroids =
    document.querySelectorAll(".polaroid");

const letterMusic =
    document.getElementById("letter-music");

const popSound =
    document.getElementById("pop-sound");

const paperSound =
    document.getElementById("paper-sound");


let catScene = 0;
let envelopeStage = 0;
let photoIndex = 0;
let montageStarted = false;


/* ========================= */
/* Sound playback            */
/* ========================= */

function playSound(sound) {
    sound.pause();
    sound.currentTime = 0;

    sound.play().catch(function (error) {
        console.log(
            "The sound could not play:",
            error
        );
    });
}


/* ========================= */
/* Cat animation             */
/* ========================= */

function animateCat() {
    cat.classList.remove("wake");

    void cat.offsetWidth;

    cat.classList.add("wake");

    setTimeout(function () {
        cat.classList.remove("wake");
    }, 400);
}


/* ========================= */
/* Cat sequence              */
/* ========================= */

cat.addEventListener("click", function () {
    playSound(popSound);

    catScene++;

    if (catScene === 1) {
        cat.src =
            "assets/images/cat_awake.png";

        cat.classList.remove("sleeping");

        message.innerHTML =
            "Oh hi! You must be Hannah!";

        animateCat();
    }

    else if (catScene === 2) {
        cat.src =
            "assets/images/cat_anxious.png";

        message.innerHTML =
            "Please don't tell Vinnie I was slacking off,<br>" +
            "he asked me to give you an important message.";

        animateCat();
    }

    else if (catScene === 3) {
        cat.src =
            "assets/images/cat_happy.png";

        message.innerHTML =
            "Anyways, here's the message for you &lt;3";

        animateCat();
    }

    else if (catScene === 4) {
        catContainer.style.display = "none";
        heart.style.display = "none";

        envelopeScene.classList.add("show");

        message.innerHTML =
            "Tap the envelope";
    }
});


/* ========================= */
/* Envelope sequence         */
/* ========================= */

envelopeScene.addEventListener("click", function () {
    if (envelopeStage >= 2) {
        return;
    }

    playSound(paperSound);

    envelopeStage++;

    if (envelopeStage === 1) {
        envelopeScene.classList.add("peek");

        message.innerHTML =
            "There's something inside...<br>" +
            "Tap it again.";
    }

    else if (envelopeStage === 2) {
        envelopeScene.style.display = "none";
        message.style.display = "none";

        letter.classList.add("show");

        letterMusic.volume = 0.3;

        letterMusic.play().catch(function (error) {
            console.log(
                "The music could not start:",
                error
            );
        });
    }
});


/* ========================= */
/* Reveal Polaroids          */
/* ========================= */

function revealNextPhoto() {
    if (photoIndex >= polaroids.length) {
        return;
    }

    const currentPolaroid =
        polaroids[photoIndex];

    currentPolaroid.style.zIndex =
        String(photoIndex + 1);

    currentPolaroid.classList.add("show");

    photoIndex++;

    if (photoIndex === polaroids.length) {
        montageHint.classList.add("finished");

        setTimeout(function () {
            endingMessage.classList.add("show");
        }, 900);
    }
}


/* ========================= */
/* Start montage             */
/* ========================= */

function startMontage() {
    if (montageStarted) {
        return;
    }

    montageStarted = true;

    letter.classList.remove("show");
    letter.style.display = "none";

    montage.classList.add("show");

    setTimeout(function () {
        revealNextPhoto();
    }, 350);
}


/*
The montage only opens when the letter has
been scrolled close to the bottom.
*/

letterPaper.addEventListener("click", function () {
    const distanceFromBottom =
        letterPaper.scrollHeight -
        letterPaper.scrollTop -
        letterPaper.clientHeight;

    if (distanceFromBottom <= 40) {
        startMontage();
    }
});


/*
Every tap reveals another Polaroid.
*/

montage.addEventListener("click", function () {
    revealNextPhoto();
});