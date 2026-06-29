const wheel = document.getElementById('wheel');
const button = document.getElementById('spinBtn');

const sectorAngle = 360 / 6;

let spinCount = 0;
let currentRotation = 0;
let spinning = false;

const pointerOffset = 90;

// мапа: номер сектора з ТЗ → фактичний сектор у SVG
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
});