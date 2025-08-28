
window.addEventListener('load', addAIHelpButton);

function addAIHelpButton() {
    // // Create the container div
    const aiHelpContainer = document.createElement('div');
    aiHelpContainer.id = 'ai-help-container';
    aiHelpContainer.style.display = 'inline-flex';
    aiHelpContainer.style.alignItems = 'center';
    aiHelpContainer.style.marginLeft = '8px';
    
    // Create the button
    const aiHelpButton = document.createElement('button');
    aiHelpButton.id = 'ai-help-button';
    aiHelpButton.innerHTML = '🧠 AI HELP';
    aiHelpButton.style.height = '30px';
    aiHelpButton.style.width = 'auto';
    aiHelpButton.style.padding = '4px 8px 4px';
    aiHelpButton.style.fontSize = '12px';
    aiHelpButton.style.border = '1px solid #ccc';
    aiHelpButton.style.borderRadius = '6px';
    aiHelpButton.style.backgroundColor = 'black';
    aiHelpButton.style.cursor = 'pointer';
    
    // Create the container div
    const verticalContainer = document.createElement('div');
    verticalContainer.style.display = 'flex';
    verticalContainer.style.flexDirection = 'column';
    verticalContainer.style.alignItems = 'flex-start';
    verticalContainer.style.width = '100%';

    // Add button inside the div
    verticalContainer.appendChild(aiHelpButton);
    
    // Find the target element and insert the div container
    const difficultyButton = document.querySelector('[class*="text-difficulty"]');
    
    difficultyButton.parentNode.insertAdjacentElement('afterend', aiHelpContainer );
    aiHelpContainer.appendChild(verticalContainer);

    // Add click event listener to the button
    aiHelpButton.addEventListener('click', addNewAIHandler);
}

function addNewAIHandler() {
    const aiHelpButton = document.getElementById('ai-help-button');
    const existingChatBox = document.getElementById('ai-chat-box');
    
    // If the chat box already exists, toggle its visibility
    if (existingChatBox) {
        existingChatBox.style.display = existingChatBox.style.display === 'none' ? 'block' : 'none';
        // Chat box exists → remove it and reset button
        existingChatBox.remove();
        aiHelpButton.innerHTML = '🧠 AI HELP';
        aiHelpButton.style.height = '30px';
        aiHelpButton.style.width = 'auto';
        aiHelpButton.style.padding = '4px 8px 4px';
        aiHelpButton.style.fontSize = '12px';
        aiHelpButton.style.border = '1px solid #ccc';
        aiHelpButton.style.borderRadius = '6px';
        aiHelpButton.style.backgroundColor = 'black';
        aiHelpButton.style.cursor = 'pointer';
        
        return;
    }

    // Change button to a close icon
    aiHelpButton.innerHTML = '❌';
    aiHelpButton.style.width = '30px';
    aiHelpButton.style.height = '24px';
    aiHelpButton.style.padding = '0px 2px';
    aiHelpButton.style.fontSize = '12px';
    aiHelpButton.style.textAlign = 'center';
    aiHelpButton.style.backgroundColor = '#1e1e1e';

    // Create chat box container
    const chatBox = document.createElement('div');
    chatBox.id = 'ai-chat-box';
    chatBox.style.justifyContent = 'flex-end';
    chatBox.style.width = '100%';
    chatBox.style.height = '300px';
    chatBox.style.maxHeight = '300px';         // optional, can scroll when messages overflow
    chatBox.style.display = 'flex';
    chatBox.style.flexDirection = 'column';
    chatBox.style.marginTop = '4px';
    chatBox.style.border = '1px solid #ccc';
    chatBox.style.borderRadius = '6px';
    chatBox.style.padding = '8px';
    chatBox.style.backgroundColor = '#f9f9f9';
    chatBox.style.boxShadow = '0px 2px 6px rgba(0,0,0,0.2)';
    chatBox.style.overflowY = 'auto';
    chatBox.style.backgroundColor = '#1e1e1e';
    chatBox.style.color = '#ffffff';           // All text in white

    // message container

    const messagesContainer = document.createElement('div');
    messagesContainer.id = 'ai-messages-container';
    messagesContainer.style.flex = '1';         // grows to fill remaining space
    messagesContainer.style.overflowY = 'auto'; // scrollable
    messagesContainer.style.display = 'flex';
    messagesContainer.style.flexDirection = 'column';
    messagesContainer.style.alignItems = 'flex-end'; // top-right alignment
    messagesContainer.style.marginBottom = '8px';     // spacing above input
    chatBox.appendChild(messagesContainer);

    // Add a default message from AI
    const defaultMsgBubble = document.createElement('div');
    defaultMsgBubble.textContent = "🤖: Hello! How can I ASSIST you today?";
    defaultMsgBubble.style.width = '100%';
    defaultMsgBubble.style.alignSelf = 'flex-start';
    defaultMsgBubble.style.backgroundColor = '#444';
    defaultMsgBubble.style.color = '#fff';
    defaultMsgBubble.style.padding = '6px 10px';
    defaultMsgBubble.style.borderRadius = '12px';
    defaultMsgBubble.style.marginBottom = '4px';
    defaultMsgBubble.style.fontSize = '12px';
    messagesContainer.appendChild(defaultMsgBubble);

    
    // Append chat box below AI HELP button
    const verticalContainer = aiHelpButton.parentNode; // get container
    verticalContainer.appendChild(chatBox);

    // Create input container
    const inputContainer = document.createElement('div');
    inputContainer.style.display = 'flex';
    //inputContainer.style.marginTop = '8px';

    // Create input box
    const userInput = document.createElement('textarea');
    userInput.type = 'text';
    userInput.placeholder = 'Are you stuck? Press Enter to send...';
    userInput.style.outline = 'none';
    inputContainer.style.marginTop = 'auto';
    userInput.style.resize = 'none';                 // disable manual resize
    userInput.style.overflowY = 'auto';             // scroll inside input
    userInput.style.minHeight = '24px';
    userInput.style.maxHeight = '80px';             // 4 lines approx
    userInput.style.lineHeight = '20px';            // calculate height for 4 lines
    userInput.style.width = '100%';
    userInput.style.flex = '1';
    userInput.style.padding = '2px 2px';
    userInput.style.borderRadius = '4px';
    userInput.style.border = '1px solid #ccc';
    userInput.style.backgroundColor = '#2e2e2e'; // dark background
    userInput.style.color = '#ffffff';           // white text

    // Append input box to input container
    inputContainer.appendChild(userInput);

    // Append input container to chat box
    chatBox.appendChild(inputContainer);

    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) { // Enter without Shift
            event.preventDefault(); // prevent newline
            const text = userInput.value.trim();
            if (text === '') return;
            userInput.style.height = 'auto';          // reset height
            userInput.style.height = Math.min(userInput.scrollHeight, 80) + 'px'; // grow up to 4 lines (~80px)

            // Get the problem Title
            const problemTitle = document.querySelector('[class*="text-title"]').innerText;
            // Get the problem description
            const description = document.querySelector('div[data-track-load="description_content"]').textContent;
            // My code to send message to background script
            // Correct selector for a div with both classes
            const currentCode = document.querySelector('div.view-lines.monaco-mouse-cursor-text').textContent;


            // Create message bubble
            const msgBubble = document.createElement('div');
            msgBubble.textContent = text;
            msgBubble.style.backgroundColor = '#333';
            msgBubble.style.color = '#fff';
            msgBubble.style.padding = '6px 10px';
            msgBubble.style.borderRadius = '12px';
            msgBubble.style.maxWidth = '50%';
            msgBubble.style.wordWrap = 'break-word';
            msgBubble.style.marginBottom = '4px';
            msgBubble.style.alignSelf = 'flex-end'; // top-right alignment

            // Get AI response from using fetch

            

            // Append to messages container
            const messagesContainer = document.getElementById('ai-messages-container'); // reuse
            messagesContainer.appendChild(msgBubble);

            // ai chat thinking bubble
            const thinkingBubble = document.createElement('div');
            thinkingBubble.textContent = "🤖 is thinking...";
            thinkingBubble.style.width = '100%';
            thinkingBubble.style.alignSelf = 'flex-start'; 
            thinkingBubble.style.backgroundColor = '#444';
            thinkingBubble.style.color = '#bbb';
            thinkingBubble.style.padding = '6px 10px';
            thinkingBubble.style.borderRadius = '12px';
            thinkingBubble.style.marginBottom = '4px';
            thinkingBubble.style.fontSize = '12px';
            thinkingBubble.style.fontStyle = 'italic';

            messagesContainer.appendChild(thinkingBubble);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            chrome.runtime.sendMessage(
                { action: "solveProblem", problem: `${text} \n\n + ${description} + ${problemTitle} + ${currentCode}` },
                (response) => {
                    if (chrome.runtime.lastError || !response) {
                        thinkingBubble.textContent = "⚠️ Error: No response from background script.";
                    } else if (response.success) {
                        thinkingBubble.textContent = `🤖: ${response.text}`;
                        thinkingBubble.style.fontStyle = 'normal'; // reset style
                        thinkingBubble.style.color = '#fff';
                    } else {
                        thinkingBubble.textContent = `⚠️ Error: ${response.error}`;
                    }
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }
            );
    
            // Clear input
            userInput.value = '';
            userInput.style.height = 'auto'; // reset input height if auto-growing
        }
    });
}
