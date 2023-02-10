var modalDiv = document.createElement('div');
modalDiv.classList.add('modal');
modalDiv.innerHTML = '<span id="close">&times;</span><div id="modal-container"><img id="modal-image" /><span id="caption"></span></div>'
document.body.appendChild(modalDiv);
var modalImg = document.getElementById("modal-image");
var captionText = document.getElementById("caption");
Array.from(document.getElementsByClassName("image")).forEach(function (elem, index, array) {
  elem.onclick = function () {
    modalDiv.style.display = "block";
    modalImg.src = this.src;
    modalImg.alt = this.alt;
    // Retrieve content from figcaption
    var next = this.nextElementSibling;
    if (next)
      captionText.innerHTML = next.innerHTML;
  }
})
// Close model when clicking the close button
document.getElementById("close").onclick = function() { 
  closeAndResetModal();
}
// Close model when the user clicks outside the image or caption text
modalDiv.onclick = function (event) { 
  if (event.target != modalImg && event.target != captionText) {
    closeAndResetModal();
  }
}
function closeAndResetModal() {
  modalDiv.style.display = "none";
  modalImg.src = "";
  modalImg.alt = "";
  captionText.innerHTML = "";
}