// Selecting all draggable objects and container boxes
const objects = document.querySelectorAll('.object');
const boxes = document.querySelectorAll('.container-box');

// Adding dragstart event listeners to draggable objects
objects.forEach(object => {
    object.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });
});

// Adding drag and drop functionality to container boxes
boxes.forEach(box => {
    box.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    box.addEventListener('drop', async (e) => {
        e.preventDefault();
        const objectId = e.dataTransfer.getData('text/plain');
        const draggedObject = document.getElementById(objectId);
        const textElement = box.querySelector('.container-text');

        if (box.id === `box${objectId.charAt(objectId.length - 1)}`) {
            box.appendChild(draggedObject);
            if (textElement) {
                textElement.remove(); 
            }
            checkGameCompletion();
        }
        else { 
            let soundError = new Audio('media/wrong.mp3');
            soundError.play();
            await new Promise((resolve) => {
                setTimeout(resolve, 500); // Задержка в 0,5 секунд перед alert()
            });
            alert('ANSWER IS WRONG');
        }
    });
});

// Function to check if the game is complete
async function checkGameCompletion() {
    const objectsInBoxes = Array.from(boxes).map(box => box.children[0]);
    const isGameComplete = objectsInBoxes.every(object => object !== null);
    let soundCorrect = new Audio('media/correct.mp3');

    if (isGameComplete) {
        soundCorrect.play();
        await new Promise((resolve) => {
            setTimeout(resolve, 500); // Задержка в 0,5 секунд перед alert()
        });
        alert('YOUR ANSWER IS CORRECT!');
    }
}
