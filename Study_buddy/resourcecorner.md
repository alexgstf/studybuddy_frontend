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
            overflow: hidden;
            position: relative;
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
        .btn.edit {
            background: #ffa500;
            color: #fff;
        }
        .btn.edit:hover {
            background: #e69500;
        }
        .floating-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #ffd700;
            color: #000;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }
        .floating-btn:hover {
            background: #e6c000;
        }
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1001;
        }
        .modal-content {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 2rem;
            max-width: 400px;
            width: 100%;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            color: #fff;
        }
        .modal-content h2 {
            margin-top: 0;
        }
        .modal-content input,
        .modal-content textarea {
            width: 100%;
            padding: 0.8rem;
            margin-bottom: 1rem;
            border-radius: 10px;
            border: none;
            font-size: 1rem;
            outline: none;
        }
        .modal-content button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 25px;
            background: #ffd700;
            color: #000;
            cursor: pointer;
            font-weight: bold;
            transition: background 0.3s ease;
        }
        .modal-content button:hover {
            background: #e6c000;
        }
    </style>
</head>
<body>
    <header>
        <h1>Study Buddy Post Channel!</h1>
    </header>
    <main>
        <!-- Post List -->
        <div id="posts-container" class="post-container"></div>
        <!-- Floating Add Post Button -->
        <button id="add-post-button" class="floating-btn">+</button>
    </main>

    <!-- Add Post Modal -->
    <div id="add-post-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <h2>Add Post</h2>
            <input type="file" id="file-upload" />
            <textarea id="note-input" placeholder="Write your note here..."></textarea>
            <button id="submit-post-button">Submit</button>
        </div>
    </div>

    <!-- Edit Post Modal -->
    <div id="edit-post-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <h2>Edit Post</h2>
            <input type="file" id="edit-file-upload" />
            <textarea id="edit-note-input" placeholder="Edit your note here..."></textarea>
            <button id="save-edit-button">Save Changes</button>
        </div>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const postsContainer = document.getElementById("posts-container");
            const addPostButton = document.getElementById("add-post-button");
            const addPostModal = document.getElementById("add-post-modal");
            const submitPostButton = document.getElementById("submit-post-button");
            const editPostModal = document.getElementById("edit-post-modal");
            const saveEditButton = document.getElementById("save-edit-button");

            let posts = [];
            let currentEditIndex = null;

            function renderPosts() {
                postsContainer.innerHTML = "";
                posts.forEach((post, index) => {
                    const postCard = document.createElement("div");
                    postCard.className = "post-card";

                    const title = document.createElement("h3");
                    title.textContent = post.title || "Untitled Post";

                    const note = document.createElement("p");
                    note.textContent = post.note || "No note added.";

                    if (post.image) {
                        const image = document.createElement("img");
                        image.src = URL.createObjectURL(post.image);
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
                    deleteButton.onclick = () => {
                        posts.splice(index, 1);
                        renderPosts();
                    };

                    const editButton = document.createElement("button");
                    editButton.className = "btn edit";
                    editButton.textContent = "Edit";
                    editButton.onclick = () => {
                        currentEditIndex = index;
                        document.getElementById("edit-note-input").value = post.note || "";
                        document.getElementById("edit-file-upload").value = "";
                        editPostModal.style.display = "flex";
                    };

                    actions.appendChild(editButton);
                    actions.appendChild(deleteButton);
                    postCard.appendChild(title);
                    postCard.appendChild(note);
                    postCard.appendChild(actions);
                    postsContainer.appendChild(postCard);
                });
            }

            addPostButton.addEventListener("click", () => {
                addPostModal.style.display = "flex";
            });

            submitPostButton.addEventListener("click", () => {
                const fileInput = document.getElementById("file-upload");
                const noteInput = document.getElementById("note-input");

                const newPost = {
                    title: fileInput.files[0]?.name || "Note",
                    note: noteInput.value,
                    image: fileInput.files[0] || null,
                };

                posts.push(newPost);
                addPostModal.style.display = "none";
                noteInput.value = "";
                fileInput.value = "";
                renderPosts();
            });

            saveEditButton.addEventListener("click", () => {
                const fileInput = document.getElementById("edit-file-upload");
                const noteInput = document.getElementById("edit-note-input");

                const editedPost = posts[currentEditIndex];
                editedPost.note = noteInput.value;
                if (fileInput.files[0]) {
                    editedPost.image = fileInput.files[0];
                    editedPost.title = fileInput.files[0].name;
                }

                editPostModal.style.display = "none";
                renderPosts();
            });

            document.addEventListener("click", (event) => {
                if (event.target === addPostModal) {
                    addPostModal.style.display = "none";
                }
                if (event.target === editPostModal) {
                    editPostModal.style.display = "none";
                }
            });

            renderPosts();
        });
    </script>
</body>
</html>
