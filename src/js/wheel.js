const wheel = document.getElementById('wheel');
const button = document.getElementById('spinBtn');

const sectors = [
    "¡Inténtalo<br>de nuevo!", // 1
    "425%",                    // 2
    "100% +<br>125 FS",        // 3
    "¡Inténtalo<br>de nuevo!", // 4
    "250 FS",                  // 5
    "100%"                     // 6
];

const colors = [
    "#ff5b00",
    "#ffc107",
    "#ff5b00",
    "#ffc107",
    "#ff5b00",
    "#ffc107"
];

const sectorAngle = 360 / sectors.length;

let spinCount = 0;
let currentRotation = 0;
let spinning = false;

createWheel();

function createWheel() {
    let gradient = "";

    sectors.forEach((_, index) => {
        const start = index * sectorAngle;
        const end = (index + 1) * sectorAngle;

        gradient += `${colors[index]} ${start}deg ${end}deg,`;
    });

    wheel.style.background = `conic-gradient(${gradient.slice(0, -1)})`;

    sectors.forEach((text, index) => {
        const label = document.createElement("div");

        label.className = "sector-text";

        const angle = index * sectorAngle + sectorAngle / 2;

        label.style.transform = `
            translate(-50%, -50%)
            rotate(${angle}deg)
            translateY(-115px)
            rotate(-${angle}deg)
        `;

        label.innerHTML = text;

        wheel.appendChild(label);
    });

    const center = document.createElement("div");
    center.className = "wheel-center";
    wheel.appendChild(center);
}

button.addEventListener("click", () => {
    if (spinning) return;

    spinning = true;

    let targetIndex;

    // 1, 3, 5... спін — сектор 1 або 4
    if (spinCount % 2 === 0) {
        targetIndex = Math.random() < 0.5 ? 0 : 3;
    }

    // 2, 4, 6... спін — сектор 5
    else {
        targetIndex = 4;
    }

    const targetAngle =
        targetIndex * sectorAngle +
        sectorAngle / 2;

    const normalizedRotation =
        currentRotation % 360;

    const extraRotation =
        360 * 5 +
        ((360 - targetAngle - normalizedRotation + 360) % 360);

    currentRotation += extraRotation;

    wheel.style.transform =
        `rotate(${currentRotation}deg)`;

    spinCount++;
});

wheel.addEventListener("transitionend", () => {
    spinning = false;
});