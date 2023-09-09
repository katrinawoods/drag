const correctOrder = ["A. Burrows, ", "Chemistry³: introducing inorganic, organic and physical chemistry, ", "Oxford University Press, ", "Oxford, ", "3rd edn., ", "2017."];

let draggedItem = null;

document.addEventListener("DOMContentLoaded", function(event) {
    const shuffledOrder = shuffleArray([...correctOrder]);
    shuffledOrder.forEach((word, index) => {
        document.getElementById(`word${index + 1}`).textContent = word;
    });
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Mouse drag-and-drop controls
document.querySelectorAll('.draggable').forEach(draggable => {
    draggable.addEventListener('dragstart', e => {
        draggedItem = draggable;
        setTimeout(() => {
            draggable.style.display = 'none';
        }, 0);
    });

    draggable.addEventListener('dragend', () => {
        setTimeout(() => {
            draggedItem.style.display = '';
            draggedItem = null;
        }, 0);
    });
});

document.querySelectorAll('.dropzone').forEach(dropzone => {
    dropzone.addEventListener('dragover', e => {
        e.preventDefault();
    });

    dropzone.addEventListener('drop', e => {
        e.preventDefault();
        if (!dropzone.querySelector('.draggable') && draggedItem) {
            dropzone.appendChild(draggedItem);
        }
    });
});

document.getElementById("checkAnswerButton").addEventListener('click', () => {
    checkOrder();
});

function checkOrder() {
    const currentOrder = Array.from(document.querySelectorAll('.dropzone .draggable')).map(item => item.textContent);
    let isCorrect = true; // We assume the answer is correct initially

    currentOrder.forEach((word, index) => {
        const currentWordElement = document.getElementById(`word${index + 1}`);

        if (word === correctOrder[index]) {
            currentWordElement.style.backgroundColor = 'lightgreen';
        } else {
            currentWordElement.style.backgroundColor = 'lightcoral';
            isCorrect = false; // If any word is incorrect, we update our assumption
        }
    });

    const feedbackContainer = document.getElementById("feedback-container");
    if (isCorrect) {
        feedbackContainer.textContent = "Correct! Well done.";
        feedbackContainer.style.color = "green";
    } else {
        feedbackContainer.textContent = "Incorrect. Try again.";
        feedbackContainer.style.color = "red";
    }
}

