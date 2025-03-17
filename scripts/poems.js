document.addEventListener("DOMContentLoaded", function () {
    const poemsData = {
        "Stand by My Side": `Time passes, but I'll remain the same<br>
        If you stand by my side.<br><br>

        No matter the situation,<br>
        I will be your supporting pillar<br>
        If you stand by my side.<br><br>

        My memory will flutter through your mind,<br>
        And your day will pass with a smile<br>
        If you stand by my side.<br><br>

        In the crowd of false faces,<br>
        You'll be proud of my steadfast dignity<br>
        If you stand by my side.<br><br>

        Through the strain of my efforts<br>
        To bring you happiness,<br>
        I'll be as constant<br>
        If you stand by my side.<br><br>

        With every glance of your smile,<br>
        My love for you will only grow<br>
        If you stand by my side.<br>`,

        "Remember!": `I remember you and yours.<br><br>

        I still remember the day we met.<br>
        I remember your voice, your laugh.<br><br>

        I remember your efforts for me,<br>
        as it has still effect on me.<br><br>

        Still my heart skips a beat when I hear your name.<br>
        And friends still talk of you the same.<br><br>

        But hey! Today tables are turned.<br>
        I hope you remember me and mine.<br><br>

        You remember the tough days but I didn't give up anyhow.<br>
        You remember the efforts just to make you smile.<br><br>

        And you remember me somehow,<br>
        I feel alive, here and now.<br>`,

        "I am Iron Man!": `TONY wants you to take breaks<br>
        THOR wants you to be proud of yourself<br>
        STEVE wants you to drink up your past<br>
        BRUCE wants you to take deep breaths<br>
        CLINT wants you to have faith<br>
        PETER wants you to spend time with your loved one<br>
        NATASHA wants you to sacrifice<br>
        CAROL wants you to accept your past<br>
        WANDA wants you to care about humanity<br>
        VISION wants you to be curious<br>
        SAM wants you to reach out to your friends<br>
        BUCK wants you to forgive yourself<br>
        LOKI wants you to accept yourself<br>
        T'CHALLA wants you to never give up<br>
        STEPHEN wants you to admire your good time<br>
        SCOTT wants you to smile<br>
        MARIA wants you to be strong<br>
        GROOT wants you to be groot<br>
        FURY wants you to be fearless and fight<br>`,

        "The Chaos of Heart": `I look down and around,<br>
        nobody's around<br><br>

        And I hear no sound,<br>
        It's you or your clairvoyance?<br>`,

        "At a Journey": `A journey from the knower<br>
        to feeler<br>
        to embroider<br><br>

        From misery<br>
        to pureness<br>
        to calmness<br><br>

        From long life<br>
        to big life<br>
        to liberation<br><br>

        From excellent<br>
        to alchemist<br>
        to divinity<br><br>

        From chasing a dream<br>
        to being relevant for humankind<br>
        to experiencing God's glory<br>`,

        "I MUST": `I HAVEN'T SEEN THOSE BEFORE,<br>
        THOSE HALF SMILES<br>
        SMILES HOLDING MYSTERY WITHIN ITSELF<br><br>

        THE MYSTERY I MUST EXPLORE, I MUST<br><br>

        AND GET PULLED A THOUSAND TIMES STARING YOUR :)<br>`,

        "Who cares?": `Bold and alone<br>
        Who cares?<br><br>

        No one with me despite I am cool<br>
        Who cares?<br><br>

        Why these should be remembered?<br>
        All my feelings are recovering<br>
        Though, who cares?<br><br>

        Who cares?<br>
        My love towards you all<br>
        Who cares?<br><br>

        For you, the times I fall<br>
        Who cares?<br><br>

        During my tenure, I crawl<br>
        Who cares?<br><br>

        Why should you care about?<br>
        Why do these feel but is true?<br><br>

        Though no one cares about me<br>
        I am being loved by myself<br>
        Called by myself<br><br>

        Wherever you are?<br>
        I will be caring for you.<br><br>

        But who cares?<br>`
    };

    function expandPoem(button) {
        const poemContainer = button.closest(".poem-item");
        const poemTitle = poemContainer.querySelector("h3").textContent.trim();
        const poemPreview = poemContainer.querySelector(".poem-preview");

        if (button.textContent === "Read More") {
            poemPreview.dataset.preview = poemPreview.innerHTML; // Store preview text
            poemPreview.innerHTML = poemsData[poemTitle] || "Full poem not found.";
            button.textContent = "Show Less";
        } else {
            poemPreview.innerHTML = poemPreview.dataset.preview;
            button.textContent = "Read More";
        }
    }

    function likePoem(button) {
        let likeCount = button.querySelector(".like-count");
        let count = parseInt(likeCount.textContent);
        count++;
        likeCount.textContent = count;
        button.style.color = "#ff4d4d";
    }

    function toggleComments(button) {
        const poemContainer = button.closest(".poem-item");
        const commentSection = poemContainer.querySelector(".comments-section");

        // 🔹 **Fix: Properly toggle the `hidden` class**
        if (commentSection.style.display === "none" || commentSection.style.display === "") {
            commentSection.style.display = "block"; // Show comment section
        } else {
            commentSection.style.display = "none"; // Hide comment section
        }
    }

    function postComment(button) {
        let commentInput = button.previousElementSibling;
        let commentText = commentInput.value.trim();
        if (commentText === "") return;

        let poemContainer = button.closest(".poem-item");
        let poemTitle = poemContainer.querySelector("h3").textContent.trim();
        let commentsList = poemContainer.querySelector(".comments-list");

        // Create and add comment
        let commentElement = document.createElement("p");
        commentElement.textContent = `💬 ${commentText}`;
        commentsList.appendChild(commentElement);

        // Save to localStorage
        let storedComments = JSON.parse(localStorage.getItem(poemTitle)) || [];
        storedComments.push(commentText);
        localStorage.setItem(poemTitle, JSON.stringify(storedComments));

        // Clear input & hide comment section
        commentInput.value = "";
        commentSection.style.display = "none";
    }

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

    // Attach event listeners using Event Delegation
    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains("expand-btn")) {
            expandPoem(event.target);
        } else if (event.target.classList.contains("like-btn")) {
            likePoem(event.target);
        } else if (event.target.classList.contains("comment-btn")) {
            toggleComments(event.target);
        } else if (event.target.classList.contains("post-comment")) {
            postComment(event.target);
        }
    });

    // Load comments from localStorage when page loads
    loadComments();
});
