const toggleButton = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// Check for saved user preference on load
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

// Handle the button click
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Save the choice in local storage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
