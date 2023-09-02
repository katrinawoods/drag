const correctOrder = ["The", "library", "opened", "in", "the", "year", "2018"];
let selectedItem = null;

document.addEventListener("DOMContentLoaded", function(event) {
    // Shuffle the words on initial load
    const shuffledOrder = shuffleArray([...correctOrder]);
    shuffledOrder.forEach((word, index) => {
        document.getElementById(`word${index + 1}`).textContent = word;
    });
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Keyboard navigation
document.querySelectorAll('.draggable').forEach((item, idx, array) => {
    item.addEventListener('keydown', e => {
        if (selectedItem && e.key === 'ArrowDown' && !selectedItem.parentElement.classList.contains('dropzone')) {
            const dropzone = document.querySelectorAll('.dropzone')[idx];
            if (!dropzone.querySelector('.draggable')) {
                dropzone.appendChild(selectedItem);
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

// Drag and Drop logic
let draggedItem = null;

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

    document.querySelectorAll('.dropzone').forEach(dropzone => {
        dropzone.addEventListener('dragover', e => {
            e.preventDefault();
        });

        dropzone.addEventListener('drop', e => {
            e.preventDefault();
            if (!dropzone.querySelector('.draggable')) {
                dropzone.append(draggedItem);
            }
        });
    });
});

document.getElementById("checkAnswerButton").addEventListener('click', () => {
    checkOrder();
});

function checkOrder() {
    let currentOrder = Array.from(document.querySelectorAll('.dropzone .draggable')).map(item => item.textContent);
    currentOrder.forEach((word, index) => {
        if (word === correctOrder[index]) {
            document.getElementById(`word${index + 1}`).style.backgroundColor = 'lightgreen';
        } else {
            document.getElementById(`word${index + 1}`).style.backgroundColor = 'lightcoral';
        }
    });
}
