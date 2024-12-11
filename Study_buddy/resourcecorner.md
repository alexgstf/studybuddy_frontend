---
layout: base
title: Resource Corner
permalink: /resource_corner
---



<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Study Buddy</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #6a11cb, #2575fc);
            color: #fff;
            overflow-x: hidden;
        }
        header {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 1000;
        }
        header h1 {
            margin: 0;
            font-size: 2rem;
        }
        main {
            max-width: 800px;
            margin: 2rem auto;
            padding: 1rem;
        }
        .post-container {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        .post-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 1rem;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }
        .post-card h3 {
            margin-top: 0;
            font-size: 1.2rem;
            color: #ffd700;
        }
        .post-card p {
            font-size: 1rem;
            line-height: 1.6;
            margin: 0.5rem 0;
        }
        .post-card .actions {
            margin-top: 1rem;
            display: flex;
            justify-content: flex-end;
            gap: 0.5rem;
        }
        .btn {
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 25px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: background 0.3s ease;
        }
        .btn.delete {
            background: #ff5555;
            color: #fff;
        }
        .btn.delete:hover {
            background: #e44a4a;
        }
        .add-post-button {
            position: fixed;
            right: 20px;
            bottom: 20px;
            background: #ffd700;
            color: #000;
            padding: 1rem 1.5rem;
            font-size: 1.2rem;
            font-weight: bold;
            border: none;
            border-radius: 50px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            cursor: pointer;
            transition: background 0.3s ease;
        }
        .add-post-button:hover {
            background: #e6c000;
        }
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            visibility: hidden;
            opacity: 0;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .modal.active {
            visibility: visible;
            opacity: 1;
        }
        .modal-content {
            background: #fff;
            color: #000;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            width: 90%;
            max-width: 400px;
        }
        .modal-content h2 {
            margin-top: 0;
        }
        .modal-content .resource-input {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .modal-content button {
            background: #2575fc;
            color: #fff;
            border: none;
            padding: 0.8rem;
            border-radius: 10px;
            cursor: pointer;
            font-size: 1rem;
            transition: background 0.3s ease;
        }
        .modal-content button:hover {
            background: #1e63d6;
        }
        .close-modal {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 1.5rem;
            font-weight: bold;
            cursor: pointer;
            color: #fff;
        }
    </style>
</head>
<body>
    <div id="resource-corner-container">
        <header>
            <h1>Study Buddy</h1>
        </header>
        <button class="add-post-button" id="open-modal">+</button>
    </div> 
    <div class="modal" id="post-modal">
        <div class="modal-content">
            <h2>Add a New Post</h2>
            <div class="resource-input">
                <input type="file" id="file-upload" />
                <textarea id="note-input" placeholder="Write your note here..."></textarea>
                <button id="add-resource-button">Add Post</button>
            </div>
        </div>
    </div>
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const fileUpload = document.getElementById("file-upload");
            const noteInput = document.getElementById("note-input");
            const addResourceButton = document.getElementById("add-resource-button");
            const postsContainer = document.getElementById("posts-container");
            const openModalButton = document.getElementById("open-modal");
            const postModal = document.getElementById("post-modal");

            let posts = []; // Array to hold posts

            // Render posts on the page
            function renderPosts() {
                postsContainer.innerHTML = ""; // Clear current posts
                if (posts.length === 0) {
                    const emptyMessage = document.createElement("p");
                    emptyMessage.textContent = "No posts available.";
                    postsContainer.appendChild(emptyMessage);
                } else {
                    posts.forEach((post, index) => {
                        const postCard = document.createElement("div");
                        postCard.className = "post-card";

                        const title = document.createElement("h3");
                        title.textContent = post.title || "Untitled Post";

                        const note = document.createElement("p");
                        note.textContent = post.comment || "No note added.";

                        if (post.image_url) {
                            const image = document.createElement("img");
                            image.src = post.image_url;
                            image.alt = post.title || "Uploaded Image";
                            image.style.maxWidth = "100%";
                            image.style.borderRadius = "10px";
                            postCard.appendChild(image);
                        }

                        const actions = document.createElement("div");
                        actions.className = "actions";

                        const deleteButton = document.createElement("button");
                        deleteButton.className = "btn delete";
                        deleteButton.textContent = "Delete";
                        deleteButton.onclick = () => deletePost(index);

                        actions.appendChild(deleteButton);
                        postCard.appendChild(title);
                        postCard.appendChild(note);
                        postCard.appendChild(actions);

                        postsContainer.appendChild(postCard);
                    });
                }
            }

            // Add new post
            addResourceButton.addEventListener("click", () => {
                const file = fileUpload.files[0];
                const noteText = noteInput.value.trim();

                if (!file && !noteText) {
                    alert("Please upload a file or write a note!");
                    return;
                }

                const newPost = {
                    title: file ? file.name : "Note",
                    comment: noteText,
                    image_url: file ? URL.createObjectURL(file) : null,
                };

                posts.push(newPost);
                renderPosts();

                // Clear inputs
                fileUpload.value = "";
                noteInput.value = "";

                // Close modal
                postModal.classList.remove("active");
            });

            // Delete post
            function deletePost(index) {
                posts.splice(index, 1);
                renderPosts();
            }

            // Open modal
            openModalButton.addEventListener("click", () => {
                postModal.classList.add("active");
            });

            // Close modal when clicking outside
            postModal.addEventListener("click", (e) => {
                if (e.target === postModal) {
                    postModal.classList.remove("active");
                }
            });

            renderPosts(); // Initial render
        });
    </script>
</body>
</html>
