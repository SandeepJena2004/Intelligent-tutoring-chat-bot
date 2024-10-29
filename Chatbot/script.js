document.getElementById('sendBtn').addEventListener('click', function() {
    const userInput = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const userText = userInput.value.trim();

    if (userText) {
        appendMessage('You: ' + userText);
        checkFAQs(userText) || fetchWikipediaSummary(userText);
        userInput.value = '';
    }
});

function appendMessage(message) {
    const chatBox = document.getElementById('chatBox');
    
    const messageElement = document.createElement('p');
    messageElement.textContent = message;

    if (message.startsWith('You:')) {
        messageElement.classList.add('user');
    } else if (message.startsWith('Bot:')) {
        messageElement.classList.add('bot');
    }

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}


function checkFAQs(query) {
    const faqs = {
        "what is intelligent tutoring system": "An Intelligent Tutoring System is a computer system that provides immediate and personalized feedback to learners, often using artificial intelligence.",
        "what subjects can i learn": "You can learn various subjects including math, science, history, and more!",
        "how does this chatbot work": "This chatbot fetches information from Wikipedia to help answer your questions."
    };

    const response = faqs[query.toLowerCase()];
    if (response) {
        appendMessage(`Bot: ${response}`);
        return true; // FAQ found
    }
    return false; // No FAQ found
}

async function fetchWikipediaSummary(query) {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        if (data.title) {
            appendMessage(`Bot: ${data.extract}`);
        } else {
            appendMessage('Bot: Sorry, I couldn\'t find any information on that topic. Could you try asking something else?');
        }
    } catch (error) {
        appendMessage('Bot: An error occurred while fetching the data. Please try again later.');
    }
}
