// Create a new link element
const linkElement = document.createElement('link');

// Set its attributes
linkElement.rel = 'stylesheet';
linkElement.href = '/styles/global.css';

// Append the link element to the head of the document
document.head.appendChild(linkElement);