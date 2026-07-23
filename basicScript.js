const toggleButton = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') 
{
    document.body.classList.add('dark-mode');
}

if (toggleButton) 
{
    toggleButton.addEventListener('click', () => 
	{
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) 
		{
            localStorage.setItem('theme', 'dark');
        } 
		else 
		{
            localStorage.setItem('theme', 'light');
        }
    });
}

// Fetch Public Repos from GitHub API
const githubUsername = 'ArnoEybers';
const projectsContainer = document.getElementById('projects-container');

if (projectsContainer) {
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`)
        .then(response => response.json())
        .then(repos => {
            projectsContainer.innerHTML = ''; // Clear loading placeholder
            
            // Filter out forks if you only want original projects
            const originalRepos = repos.filter(repo => !repo.fork);

            originalRepos.forEach(repo => {
                const card = document.createElement('div');
                card.classList.add('project-card');

                card.innerHTML = `
                    <div class="project-title">
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                            ${repo.name} ↗
                        </a>
                    </div>
                    <p class="project-desc">${repo.description || 'No description provided.'}</p>
                    <div class="project-meta">
                        ${repo.language ? `<span><b>Language:</b> ${repo.language}</span>` : ''}
                    </div>
                `;
                projectsContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching GitHub repos:', error);
            projectsContainer.innerHTML = '<p>Unable to load GitHub projects at this time.</p>';
        });
}