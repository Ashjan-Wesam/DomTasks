document.addEventListener("DOMContentLoaded", () => {
    const commentInput = document.getElementById("commentInput");
    const sendBtn = document.getElementById("sendBtn");
    const commentSection = document.getElementById("commentSection");
  
    // Create a placeholder for real-time typing feedback
    const typingPreview = document.createElement("div");
    typingPreview.style.color = "gray"; // Make it visually distinct
    typingPreview.textContent = " ";
    commentSection.appendChild(typingPreview);
  
    // Load comments from local storage
    const loadComments = () => {
      const comments = JSON.parse(localStorage.getItem("comments")) || [];
      commentSection.innerHTML = ""; // Clear previous comments
      commentSection.appendChild(typingPreview); // Re-add typing preview
      comments.forEach((comment) => {
        const commentDiv = document.createElement("div");
        commentDiv.textContent = comment;
        commentSection.appendChild(commentDiv);
      });
    };
  
    // Save a new comment
    const saveComment = (comment) => {
      const comments = JSON.parse(localStorage.getItem("comments")) || [];
      comments.push(comment);
      localStorage.setItem("comments", JSON.stringify(comments));
    };
  
    // Add real-time typing effect
    commentInput.addEventListener("input", () => {
      const liveText = commentInput.value.trim();
      if (liveText) {
        typingPreview.textContent = `${liveText}`;
      } else {
        typingPreview.textContent = ""; // Default message
      }
    });
  
    // Add event listener to the button
    sendBtn.addEventListener("click", () => {
      const comment = commentInput.value.trim();
      if (comment) {
        saveComment(comment);
        commentInput.value = ""; // Clear input field
        typingPreview.textContent = ""; // Reset real-time preview
        loadComments(); // Reload comments
      }
    });
  
    // Load existing comments on page load
    loadComments();
  });
  