document.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
});

document.addEventListener('dragover', function(event) {
    event.preventDefault();
});

document.addEventListener('drop', function(event) {
    event.preventDefault();

    if (event.target.classList.contains('draggable')) {
        const from = document.getElementById(event.dataTransfer.getData('text/plain'));
        const to = event.target;

        const fromClone = from.cloneNode(true);
        const toClone = to.cloneNode(true);

        from.parentNode.replaceChild(toClone, from);
        to.parentNode.replaceChild(fromClone, to);

        checkOrder();
    }
});

function checkOrder() {
    const container = document.getElementById('container');
    const words = Array.from(container.children).map(child => child.textContent);

    const correctOrder = ["The", "library", "opened", "in", "the", "year", "2018"];
    const feedback = document.getElementById('feedback');

    if (JSON.stringify(words) === JSON.stringify(correctOrder)) {
        feedback.textContent = 'Correct! The sentence is in the right order.';
        feedback.style.color = 'green';
    } else {
        feedback.textContent = 'The sentence is not in the right order. Try again.';
        feedback.style.color = 'red';
    }
}
