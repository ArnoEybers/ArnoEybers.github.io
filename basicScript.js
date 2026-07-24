/* Constant variables */

//Themes
const toggleButton = document.getElementById("theme-toggle");

//Intro
const intro = document.getElementById("intro");
const content = document.getElementById("content");

//Github
const githubUsername = "ArnoEybers";
const projectsContainer = document.getElementById("projects-container");

/* Theme toggles */
// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

// Toggle theme
toggleButton?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-mode") ? "dark" : "light"
    );
});

/* Intro animation */
if (intro && content) {
    if (sessionStorage.getItem("introPlayed")) {
        intro.remove();
        content.style.opacity = "1";
    } else {
        sessionStorage.setItem("introPlayed", "true");

        setTimeout(() => {
            intro.remove();
        }, 2600);
    }
}

/* Github projects section code */
if (projectsContainer) {
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`)
        .then(response => response.json())
        .then(repos => {
            projectsContainer.innerHTML = "";

            repos
                .filter(repo => !repo.fork)
                .forEach(repo => {
                    const card = document.createElement("div");
                    card.className = "project-card";

                    card.innerHTML = `
                        <div class="project-title">
                            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                                ${repo.name} ↗
                            </a>
                        </div>

                        <p class="project-desc">
                            ${repo.description || "No description provided."}
                        </p>

                        <div class="project-meta">
                            ${repo.language ? `<span><b>Language:</b> ${repo.language}</span>` : ""}
                        </div>
                    `;

                    projectsContainer.appendChild(card);
                });
        })
        .catch(error => {
            console.error("Error fetching GitHub repos:", error);

            projectsContainer.innerHTML =
                "<p>Unable to load GitHub projects at this time.</p>";
        });
}