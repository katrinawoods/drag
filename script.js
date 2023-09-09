//RSC referencing. drag and drop activity. 2023.
const correctOrder = ["A. Burrows, ", "Chemistry³: introducing inorganic, organic and physical chemistry, ", "Oxford University Press, ", "Oxford, ", "3rd edn., ", "2017."];

let draggedItem = null;
let selectedItem = null;

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

document.getElementById("checkAnswerButton").addEventListener('click', () => {
    checkOrder();
});


document.getElementById("resetButton").addEventListener('click', function() {
    location.reload();  // This will refresh the current page
});



//keyboard controls
document.querySelectorAll('.draggable').forEach((item, idx, array) => {
    item.addEventListener('keydown', e => {
        if (selectedItem && e.key === 'ArrowDown' && !selectedItem.parentElement.classList.contains('dropzone')) {
            const availableDropzone = [...document.querySelectorAll('.dropzone')].find(dropzone => !dropzone.querySelector('.draggable'));
            if (availableDropzone) {
                availableDropzone.appendChild(selectedItem);
            }
        } else if (selectedItem && e.key === 'ArrowUp' && selectedItem.parentElement.classList.contains('dropzone')) {
            const container = document.getElementById('container');
            container.insertBefore(selectedItem, array[idx]);
        } else if (selectedItem && e.key === 'ArrowRight' && selectedItem.parentElement.classList.contains('dropzone') && idx + 1 < array.length) {
            const nextDropzone = document.querySelectorAll('.dropzone')[idx + 1];
            if (!nextDropzone.querySelector('.draggable')) {
                nextDropzone.appendChild(selectedItem);
            }
        } else if (selectedItem && e.key === 'ArrowLeft' && selectedItem.parentElement.classList.contains('dropzone') && idx - 1 >= 0) {
            const prevDropzone = document.querySelectorAll('.dropzone')[idx - 1];
            if (!prevDropzone.querySelector('.draggable')) {
                prevDropzone.appendChild(selectedItem);
            }
        } else if (e.key === 'Enter' || e.key === 'Space') {
            if (selectedItem) {
                selectedItem.style.backgroundColor = ''; // Reset background color when dropped
                selectedItem = null; // Deselect the word
            } else {
                selectedItem = item;
                selectedItem.style.backgroundColor = 'lightblue'; // Highlight background when selected
            }
            e.preventDefault(); // Prevent the default action (scrolling)
        }
    });
});
//end of keyboard controls

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

//mobile
document.querySelectorAll('.draggable').forEach(draggable => {
    draggable.addEventListener('touchstart', e => {
        e.preventDefault();
        if (draggedItem) {
            // If there's already a selected item, we deselect it (or put it down)
            draggedItem.style.opacity = '1';
        }
        draggedItem = draggable;
        draggable.style.opacity = '0.5'; // Give an indication that item is being picked up
    });
});

document.querySelectorAll('.dropzone').forEach(dropzone => {
    dropzone.addEventListener('touchstart', e => {
        e.preventDefault();
        if (draggedItem && !dropzone.querySelector('.draggable')) {
            dropzone.appendChild(draggedItem);
            draggedItem.style.opacity = '1'; // Restore full opacity
            draggedItem = null; // Reset the dragged item
        }
    });
});


//end mobile

function checkOrder() {
    const currentOrder = Array.from(document.querySelectorAll('.dropzone .draggable')).map(item => item.textContent);
    let isCorrect = true;

    currentOrder.forEach((word, index) => {
        const currentDropzone = document.getElementById(`drop${index + 1}`);
        const draggableItem = currentDropzone.querySelector('.draggable');

        if (draggableItem) {
            if (word === correctOrder[index]) {
                draggableItem.style.backgroundColor = 'lightgreen';
            } else {
                draggableItem.style.backgroundColor = 'lightcoral';
                isCorrect = false;
            }
        }
    });

    const feedbackMessage = document.getElementById("feedback-message");

if (isCorrect) {
    feedbackMessage.textContent = "Correct! Well done.";
    feedbackMessage.style.color = "green";
} else {
    feedbackMessage.textContent = "That is not correct. Please try again.";
    feedbackMessage.style.color = "red";
}
    
}


