const correctOrder = ["The", "library", "opened", "in", "the", "year", "2018"];
let draggedItem = null;
let pickedUpItem = null;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}

const shuffledOrder = shuffleArray([...correctOrder]);
shuffledOrder.forEach((word, index) => {
    document.getElementById(`word${index + 1}`).textContent = word;
});

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

document.querySelectorAll('.draggable').forEach((item, idx, array) => {
    item.addEventListener('keydown', e => {
        if (e.key === 'Space' && !pickedUpItem) {
            pickedUpItem = item;
            item.style.backgroundColor = 'lightblue'; 
            e.preventDefault();
        } else if (e.key === 'Space' && pickedUpItem) {
            if (pickedUpItem.parentNode.className === 'dropzone') {
                if (e.target.parentNode.nextElementSibling) {
                    e.target.parentNode.nextElementSibling.append(pickedUpItem);
                } else if (e.target.parentNode.previousElementSibling) {
                    e.target.parentNode.previousElementSibling.append(pickedUpItem);
                }
            }
            pickedUpItem.style.backgroundColor = ''; 
            pickedUpItem = null;
            e.preventDefault();
        } else if (e.key === 'ArrowRight' && !pickedUpItem && array[idx + 1]) {
            array[idx + 1].focus();
        } else if (e.key === 'ArrowLeft' && !pickedUpItem && array[idx - 1]) {
            array[idx - 1].focus();
        }
    });
});
