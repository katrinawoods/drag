const correctOrder = ["The", "library", "opened", "in", "the", "year", "2018"];
let selectedItem = null;
let currentOrderIndex = 0; // Keep track of the current correct word index

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

// Keyboard navigation
document.querySelectorAll('.draggable').forEach((item) => {
    item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === 'Space') {
            if (selectedItem) {
                selectedItem.style.backgroundColor = ''; 
                selectedItem = null;
            } else if (item.textContent === correctOrder[currentOrderIndex]) { // Check if selected word is the next correct word
                selectedItem = item;
                selectedItem.style.backgroundColor = 'lightblue';
                
                // Find the next available dropzone and move the item there
                const availableDropzone = [...document.querySelectorAll('.dropzone')][currentOrderIndex];
                if (availableDropzone) {
                    availableDropzone.appendChild(selectedItem);
                    selectedItem.style.backgroundColor = ''; // Reset background color when placed
                    selectedItem = null; // Deselect the word
                    currentOrderIndex++; // Move to the next correct word
                }
            }
            e.preventDefault();
        }
    });
});

// Mouse drag-and-drop logic (remains unchanged from previous code)
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
    currentOrder.forEach((word, index) => {
        if (word === correctOrder[index]) {
            document.getElementById(`word${index + 1}`).style.backgroundColor = 'lightgreen';
        } else {
            document.getElementById(`word${index + 1}`).style.backgroundColor = 'lightcoral';
        }
    });
}

