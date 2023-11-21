function showImage(selectedOption) {
    // Hide all menu images
    var menuImages = document.querySelectorAll('.menu-image');
    menuImages.forEach(function(image) {
        image.style.display = 'none';
    });

    // Show the selected menu image
    var selectedImage = document.getElementById('image-' + selectedOption);
    if (selectedImage) {
        selectedImage.style.display = 'block';

        // Show the pop-up with the selected image
        showPopup(selectedImage.children[0].src);
    }
}

function showPopup(imageSrc) {
    var popup = document.getElementById('popup');
    var popupImage = document.getElementById('popup-image');

    // Set the image source in the pop-up
    popupImage.src = imageSrc;

    // Show the pop-up
    popup.style.display = 'block';
}

function closePopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'none';
}

function searchKeyPress(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}