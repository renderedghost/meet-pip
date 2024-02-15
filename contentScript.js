console.log('Content script loaded.');

// Function to attempt PiP button injection
function checkAndInjectButton() {
    console.log('Checking for target container...');
    const targetContainer = document.querySelector('.Tmb7Fd');
    console.log('Target container:', targetContainer);

    // Proceed if target container is found and PiP button hasn't been added yet
    if (targetContainer && !document.querySelector('.pip-toggle-button')) {
        console.log('Creating and inserting PiP button.');

        // Create the PiP button
        const pipButton = document.createElement('button');
        pipButton.setAttribute('class', 'VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ tWDL4c uaILN JxICCe HNeRed Uulb3c pip-toggle-button');
        pipButton.setAttribute('aria-label', 'Toggle Picture-in-Picture');
        pipButton.setAttribute('role', 'button');
        pipButton.innerHTML = `
            <div class="VfPpkd-Bz112c-Jh9lGc"></div>
            <div class="VfPpkd-Bz112c-J1Ukfc-LhBDec"></div>
            <i class="google-material-icons" aria-hidden="true">picture_in_picture_alt</i>
        `;

        // Add click event listener for toggling PiP
        pipButton.addEventListener('click', togglePiP);

        // Insert the PiP button into the target container
        targetContainer.insertBefore(pipButton, targetContainer.firstChild);
        console.log('PiP button inserted.');
    } else {
        // Retry after a short delay if conditions aren't met
        setTimeout(checkAndInjectButton, 1000);
    }
}

// PiP toggle function
function togglePiP() {
    console.log('Toggling PiP.');
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture().catch(error => {
            console.error('Error exiting PiP:', error);
        });
    } else {
        const videoElement = document.querySelector('video');
        if (videoElement) {
            videoElement.requestPictureInPicture().catch(error => {
                console.error('Error entering PiP:', error);
            });
        } else {
            console.log('No video element found for PiP.');
        }
    }
}

// Initial check and injection attempt
checkAndInjectButton();

// Set up a MutationObserver to handle dynamic changes in the DOM
const observer = new MutationObserver(checkAndInjectButton);
observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
console.log('MutationObserver set up to observe body.');
