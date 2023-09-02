const correctOrder = ["The", "library", "opened", "in", "the", "year", "2018"];
let draggedItem = null;

// Shuffle function for initial load
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Shuffle the words on initial load
const shuffledOrder = shuffleArray([...correctOrder]);
shuffledOrder.forEach((word, index) => {
    document.getElementById(`word${index + 1}`).textContent = word;
});

// Drag and Drop logic
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

    document.getElementById('container').addEventListener('dragover', e => {
        e.preventDefault();
    });

    document.getElementById('container').addEventListener('drop', e => {
        e.preventDefault();
        if (e.target.className === 'draggable') {
            let referenceNode = (e.target.nextElementSibling !== draggedItem) ? e.target.nextElementSibling : e.target;
            e.target.parentNode.insertBefore(draggedItem, referenceNode);
        }
    });
});

// Check the order of words
function checkOrder() {
    let currentOrder = Array.from(document.querySelectorAll('.draggable')).map(item => item.textContent);
    currentOrder.forEach((word, index) => {
        if (word === correctOrder[index]) {
            document.getElementById(`word${index + 1}`).style.backgroundColor = 'lightgreen';
        } else {
            document.getElementById(`word${index + 1}`).style.backgroundColor = 'lightcoral';
        }
    });
}

// Keyboard navigation
document.querySelectorAll('.draggable').forEach((item, idx, array) => {
    item.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' && array[idx + 1]) {
            array[idx + 1].focus();
        } else if (e.key === 'ArrowLeft' && array[idx - 1]) {
            array[idx - 1].focus();
        }
    });
});

// Check answer button event listener
document.getElementById('checkAnswerButton').addEventListener('click', checkOrder);
