const dataContainer = document.getElementById("data-container");
    const detailsModal = document.getElementById("details-modal");
    const detailsTitle = document.getElementById("details-title");
    const detailsBody = document.getElementById("details-body");
    const commentList = document.getElementById("comment-list");

    fetch("https://api.potterdb.com/v1/movies")
        .then(response => response.json())
        .then(data => {
            // Display data
            data.data.forEach(item => {
                const itemElement = document.createElement("div");
                itemElement.innerText = item.attributes.title;

                // Create a button for loading comments
                const commentsButton = document.createElement("button");
                commentsButton.innerText = "Load";

                // Add click event to load comments
                commentsButton.addEventListener("click", () => loadComments(item.attributes.slug));

                itemElement.appendChild(commentsButton);
                dataContainer.appendChild(itemElement);
            });
        });

        function loadComments(item) {
    // Clear previous details and comments
    detailsTitle.innerText = "";
    commentList.innerHTML = "";

    // Hide the details modal
    detailsModal.style.display = "none";

    fetch(`https://api.potterdb.com/v1/movies/${item}`)
        .then(response => response.json())
        .then(comment => {
            detailsTitle.innerText = comment.data.attributes.title;
            const commentItem = document.createElement("li");
            commentItem.innerText = comment.data.attributes.summary;
            commentList.appendChild(commentItem);
            
            // Show the details modal after loading new information
            detailsModal.style.display = "block";
        });
}