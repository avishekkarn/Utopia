document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Script Loaded Successfully!");

    /** 🔆 Dark Mode Toggle **/
    const darkModeToggle = document.querySelector(".dark-mode-toggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
        });

        // Load Dark Mode Preference
        if (localStorage.getItem("darkMode") === "true") {
            document.body.classList.add("dark-mode");
        }
    }

    /** ❤️ Like Button Functionality **/
    document.querySelectorAll(".like-btn").forEach(button => {
        button.addEventListener("click", function () {
            let likeCount = this.querySelector(".like-count");
            let count = parseInt(likeCount.textContent);
            count++;
            likeCount.textContent = count;
            this.style.color = "#ff4d4d"; // Highlight when liked
        });
    });

    /** 📖 Expand Poem (Read More / Show Less) **/
    const poemsData = {
        "Stand by My Side": `Time passes, but I'll remain the same...<br><br>If you stand by my side...`,
        "Remember!": `I remember you and yours...<br><br>Still my heart skips a beat when I hear your name...`,
        "I am Iron Man!": `TONY wants you to take breaks...<br>THOR wants you to be proud of yourself...`
        // ✅ Add all your poems here for expansion functionality
    };

    document.querySelectorAll(".expand-btn").forEach(button => {
        button.addEventListener("click", function () {
            const poemContainer = this.closest(".poem-item");
            const poemTitle = poemContainer.querySelector("h3").textContent.trim();
            const poemPreview = poemContainer.querySelector(".poem-preview");

            if (this.textContent === "Read More") {
                poemPreview.dataset.preview = poemPreview.innerHTML; // Store the original preview
                poemPreview.innerHTML = poemsData[poemTitle] || "Full poem not found.";
                this.textContent = "Show Less";
            } else {
                poemPreview.innerHTML = poemPreview.dataset.preview;
                this.textContent = "Read More";
            }
        });
    });

    /** 💬 Toggle Comment Box **/
    document.querySelectorAll(".comment-btn").forEach(button => {
        button.addEventListener("click", function () {
            const poemContainer = this.closest(".poem-item");
            const commentSection = poemContainer.querySelector(".comments-section");
            commentSection.classList.toggle("hidden");
        });
    });

    /** ✍️ Post Comment and Save to Local Storage **/
    document.querySelectorAll(".post-comment").forEach(button => {
        button.addEventListener("click", function () {
            let commentInput = this.previousElementSibling;
            let commentText = commentInput.value.trim();
            if (commentText === "") return;

            let poemContainer = this.closest(".poem-item");
            let poemTitle = poemContainer.querySelector("h3").textContent.trim();
            let commentsList = poemContainer.querySelector(".comments-list");

            let commentElement = document.createElement("p");
            commentElement.textContent = `💬 ${commentText}`;
            commentsList.appendChild(commentElement);

            // ✅ Save comments to localStorage
            let storedComments = JSON.parse(localStorage.getItem(poemTitle)) || [];
            storedComments.push(commentText);
            localStorage.setItem(poemTitle, JSON.stringify(storedComments));

            // Clear input field & hide comment box
            commentInput.value = "";
            poemContainer.querySelector(".comments-section").classList.add("hidden");
        });
    });

    /** 🔄 Load Stored Comments **/
    function loadComments() {
        document.querySelectorAll(".poem-item").forEach(poemContainer => {
            let poemTitle = poemContainer.querySelector("h3").textContent.trim();
            let commentsList = poemContainer.querySelector(".comments-list");
            let storedComments = JSON.parse(localStorage.getItem(poemTitle)) || [];

            storedComments.forEach(commentText => {
                let commentElement = document.createElement("p");
                commentElement.textContent = `💬 ${commentText}`;
                commentsList.appendChild(commentElement);
            });
        });
    }
    loadComments();
});
