/* =====================================================
   MOUSE PARALLAX 3D
===================================================== */

const love = document.querySelector(".love-3d");
const orbit = document.querySelector(".orbit-system");

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;


document.addEventListener("mousemove", (event) => {

    mouseX =
        (event.clientX / window.innerWidth - 0.5) * 2;

    mouseY =
        (event.clientY / window.innerHeight - 0.5) * 2;

});


function animate3D() {

    currentX +=
        (mouseX - currentX) * 0.04;

    currentY +=
        (mouseY - currentY) * 0.04;


    if (love) {

        love.style.marginLeft =
            `${currentX * 25}px`;

        love.style.marginTop =
            `${currentY * 25}px`;

    }


    if (orbit) {

        orbit.style.transform = `
            translate(-50%, -50%)
            rotateX(${65 + currentY * 8}deg)
            rotateZ(${currentX * 5}deg)
        `;

    }


    requestAnimationFrame(animate3D);

}

animate3D();


/* =====================================================
   CLICK LOVE EXPLOSION
===================================================== */

document.addEventListener("click", (event) => {

    for (let i = 0; i < 8; i++) {

        createClickHeart(
            event.clientX,
            event.clientY
        );

    }

});


function createClickHeart(x, y) {

    const heart =
        document.createElement("div");

    heart.innerHTML =
        Math.random() > .5
        ? "❤"
        : "♡";


    heart.style.position =
        "fixed";

    heart.style.left =
        `${x}px`;

    heart.style.top =
        `${y}px`;

    heart.style.zIndex =
        "9999";

    heart.style.pointerEvents =
        "none";

    heart.style.color =
        Math.random() > .5
        ? "#ff2f70"
        : "#ff9dbb";

    heart.style.fontSize =
        `${15 + Math.random() * 25}px`;

    heart.style.textShadow =
        "0 0 15px #ff0055";


    document.body.appendChild(heart);


    const randomX =
        (Math.random() - .5) * 250;

    const randomY =
        -100 -
        Math.random() * 150;


    const randomRotate =
        Math.random() * 360;


    heart.animate(

        [

            {
                transform:
                    "translate(-50%, -50%) scale(.3) rotate(0deg)",

                opacity: 1

            },

            {

                transform:
                    `translate(
                        calc(-50% + ${randomX}px),
                        ${randomY}px
                    )
                    scale(1.5)
                    rotate(${randomRotate}deg)`,

                opacity: 0

            }

        ],

        {

            duration:
                1000 +
                Math.random() * 600,

            easing:
                "cubic-bezier(.2,.8,.2,1)"

        }

    );


    setTimeout(() => {

        heart.remove();

    }, 1800);

}


/* =====================================================
   PARTICLES
===================================================== */

const particleContainer =
    document.getElementById("particles");


function createParticle() {

    if (!particleContainer) return;


    const particle =
        document.createElement("span");


    particle.style.position =
        "fixed";

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.bottom =
        "-10px";

    particle.style.width =
        Math.random() * 4 + 2 + "px";

    particle.style.height =
        particle.style.width;

    particle.style.borderRadius =
        "50%";

    particle.style.background =
        "rgba(255,150,190,.8)";

    particle.style.boxShadow =
        "0 0 10px rgba(255,0,100,.8)";

    particle.style.pointerEvents =
        "none";

    particle.style.zIndex =
        "0";


    particleContainer.appendChild(
        particle
    );


    const duration =
        5000 +
        Math.random() * 7000;


    const movement =
        (Math.random() - .5) * 250;


    particle.animate(

        [

            {
                transform:
                    "translateY(0) scale(.5)",

                opacity: 0

            },

            {

                transform:
                    `translate(
                        ${movement}px,
                        -110vh
                    )
                    scale(1)`,

                opacity: .8

            },

            {

                transform:
                    `translate(
                        ${movement * -1}px,
                        -120vh
                    )
                    scale(.2)`,

                opacity: 0

            }

        ],

        {

            duration,
            easing: "linear"

        }

    );


    setTimeout(() => {

        particle.remove();

    }, duration);

}


setInterval(
    createParticle,
    250
);


/* =====================================================
   FOTO 3D
===================================================== */

const cards =
    document.querySelectorAll(".photo-card");


cards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) /
                    centerY) * -10;


            const rotateY =
                ((x - centerX) /
                    centerX) * 10;


            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-15px)
                scale(1.04)
            `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =====================================================
   MUSIC
===================================================== */

const music =
    document.getElementById("music");

const musicButton =
    document.getElementById(
        "musicButton"
    );


let isPlaying = false;


musicButton.addEventListener(
    "click",
    () => {

        if (!isPlaying) {

            music.play()
                .then(() => {

                    musicButton.innerHTML =
                        "🔊";

                    isPlaying = true;

                })
                .catch(() => {

                    alert(
                        "Tambahkan file music.mp3 terlebih dahulu."
                    );

                });

        } else {

            music.pause();

            musicButton.innerHTML =
                "🎵";

            isPlaying = false;

        }

    }
);


/* =====================================================
   SCROLL EFFECT
===================================================== */

window.addEventListener(
    "scroll",
    () => {

        const scrollY =
            window.scrollY;


        if (love) {

            const scale =
                Math.max(
                    .75,
                    1 -
                    scrollY / 2500
                );


            love.style.scale =
                scale;

        }

    }
);


/* =====================================================
   TOUCH EFFECT HP
===================================================== */

document.addEventListener(
    "touchmove",
    (event) => {

        if (
            !event.touches ||
            !event.touches[0]
        ) return;


        const touch =
            event.touches[0];


        mouseX =
            (touch.clientX /
                window.innerWidth - .5)
            * 2;


        mouseY =
            (touch.clientY /
                window.innerHeight - .5)
            * 2;

    }
);