const correctOrder = ["The", "library", "opened", "in", "the", "year", "2018"];
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
});

document.querySelectorAll('.dropzone').forEach(dropzone => {
    dropzone.addEventListener('dragover', e => {
        e.preventDefault();
    });

    dropzone.addEventListener('drop', e => {
        e.preventDefault();
        if (draggedItem) {
            dropzone.appendChild(draggedItem);
            draggedItem.style.display = '';
            draggedItem = null;
        }
    });
});

document.getElementById('checkAnswerButton').addEventListener('click', checkOrder);

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
