const aiHelpURL = chrome.runtime.getURL('assets/bookmark.png');

window.addEventListener('load', addAIHelpButton);

function addAIHelpButton() {
    // Create the container div
    const aiHelpContainer = document.createElement('div');
    aiHelpContainer.id = 'ai-help-container';
    aiHelpContainer.style.display = 'inline-flex';
    aiHelpContainer.style.alignItems = 'center';
    aiHelpContainer.style.marginLeft = '8px';
    
    // Create the button
    const aiHelpButton = document.createElement('button');
    aiHelpButton.id = 'ai-help-button';
    aiHelpButton.innerHTML = '🧠 AI HELP';
    aiHelpButton.style.height = 'auto';
    aiHelpButton.style.padding = '4px 8px';
    aiHelpButton.style.fontSize = '12px';
    aiHelpButton.style.border = '1px solid #ccc';
    aiHelpButton.style.borderRadius = '6px';
    aiHelpButton.style.backgroundColor = 'black';
    aiHelpButton.style.cursor = 'pointer';
    
    // Add button inside the div
    aiHelpContainer.appendChild(aiHelpButton);
    
    // Find the target element and insert the div container
    const difficultyButton = document.querySelector('[class*="text-difficulty"]');
    
    difficultyButton.parentNode.insertAdjacentElement('afterend', aiHelpContainer);

    // Add click event listener to the button
    aiHelpButton.addEventListener('click', addNewAIHandler);
}

function addNewAIHandler() {
    
}