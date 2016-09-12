'use strict';

(function() {

  const IMG_PATH = 'client/assets/img/';
  let imageArray;

  /**
  * populates an array of images to populate into the photo gallery
  * @param  {[integer]} n    [number of images in gallery]
  * @param  {[string]} path [path to the images]
  * @return {[array]}      [array of image urls]
  */

  function createImageArray(n, path) {
    let imageArray = [];

    // Check for invalid inputs
    if (!path) {
      throw new Error('Must enter a file path for image');
    }
    if (isNaN(n)) {
      throw new Error('Must enter a number of available images');
    }

    // populate array of image urls
    for (let i=0; i < n; i++) {
      imageArray[i] = `${path}${i+1}.png`;
    }

    return imageArray;
  }

  /**
  * [addImagesToDOM - appends an img to the photo gallery]
  * @param {[array]} array [array of urls]
  */
  function addImagesToDOM(array) {
    const DOM_photoDiv = document.getElementById('gallery');

    if (!Array.isArray(array)) {
      throw new Error('Must input an array of image Urls');
    }

    // Create image div for each image in array and append onto the DOM
    array.forEach(imageUrl => {
      let DOM_imageDiv = document.createElement('div');
      let DOM_image = document.createElement('img');

      DOM_imageDiv.setAttribute('class', 'col-xs-12 col-sm-4 col-md-4 col-lg-3 photo');
      DOM_image.src = imageUrl;

      DOM_imageDiv.appendChild(DOM_image);
      DOM_photoDiv.appendChild(DOM_imageDiv);
    });
  }

  /**
   * [makeSortable - add drag and drop functionality to a node's children]
   * @param  {[DOM node]} rootEl           [root element node]
   * @param  {[function]} callbackOnChange [callback once an item is moved]
   */
  function makeSortable(rootEl, callbackOnChange) {
    let draggableEl;

    // Sets 'draggable' attribute of each child node to true
    Array.prototype.slice.call(rootEl.children).forEach(childEl => {
      childEl.draggable = true;
    });

    // Re-positions node
    function _onDragOver(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';

      let target = event.target.parentNode;

      if (target && target !== draggableEl.parentNode) {
        rootEl.insertBefore(draggableEl.parentNode, rootEl.children[0] !== target &&  target.nextSibling || target);
      }
    }

    // Removes event listeners and calls callback once drag is over
    function _onDragEnd(event) {
      event.preventDefault();

      draggableEl.classList.remove('ghost');
      rootEl.removeEventListener('dragover', _onDragOver, false);
      rootEl.removeEventListener('dragend', _onDragEnd, false);

      callbackOnChange(draggableEl.parentNode);

    }

    // Adds event listeners once drag has started
    rootEl.addEventListener('dragstart', event => {
      draggableEl = event.target;

      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('Text', draggableEl.textContent);

      rootEl.addEventListener('dragover', _onDragOver, false);
      rootEl.addEventListener('dragend', _onDragEnd, false);

    });
  }

  imageArray = createImageArray(12, IMG_PATH);  // Populate array of photo URLs
  addImagesToDOM(imageArray); // Insert photos to DOM
  makeSortable(document.getElementById('gallery'), photo => console.log(photo)); // Allow Drag and Drop user functionality

})();
