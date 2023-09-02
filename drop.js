function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var wordId = event.dataTransfer.getData("text");
  var wordElement = document.getElementById(wordId);
  var dropZone = event.target;

  if (wordElement.dataset.word === dropZone.dataset.correct) {
    dropZone.appendChild(wordElement);
    dropZone.style.backgroundColor = 'lightgreen';  // Correct feedback
  } else {
    dropZone.style.backgroundColor = 'red';  // Incorrect feedback
  }
}
