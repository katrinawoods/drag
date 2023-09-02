const correctOrder = ["The", "library", "opened", "in", "the", "year", "2018"];
let selectedItem = null;

// ... [Shuffle function remains the same]

// ... [Shuffling logic remains the same]

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

// Existing drag and drop logic remains unchanged.
