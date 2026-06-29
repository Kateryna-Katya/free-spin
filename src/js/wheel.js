const wheel = document.getElementById('wheel');
const button = document.getElementById('spinBtn');
const popup = document.getElementById('winPopup');

const sectorAngle = 360 / 6;

let spinCount = 0;
let currentRotation = 0;
let spinning = false;
let lastLogicalSector = null;

const pointerOffset = 90;

const sectorMap = {
    1: 3,
    4: 0,
    5: 1
};

button.addEventListener("click", () => {
    if (spinning) return;

    spinning = true;

    let logicalSector;

    if (spinCount % 2 === 0) {
        logicalSector = Math.random() < 0.5 ? 1 : 4;
    } else {
        logicalSector = 5;
    }

    lastLogicalSector = logicalSector;

    const targetIndex = sectorMap[logicalSector];

    const targetAngle =
        targetIndex * sectorAngle +
        sectorAngle / 2;

    const normalizedRotation =
        ((currentRotation % 360) + 360) % 360;

    const extraRotation =
        360 * 5 +
        ((pointerOffset - targetAngle - normalizedRotation + 360) % 360);

    currentRotation += extraRotation;

    wheel.style.transform =
        `rotate(${currentRotation}deg)`;

    spinCount++;
});

wheel.addEventListener("transitionend", () => {
    spinning = false;

    if (lastLogicalSector === 5) {
        setTimeout(() => {
            popup.classList.add('is-open');
        }, 400);
    }
});