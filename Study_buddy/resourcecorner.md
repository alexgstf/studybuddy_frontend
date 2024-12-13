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
        .moderation-rules {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 1rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }
        .moderation-rules h2 {
            margin-top: 0;
            font-size: 1.5rem;
            color: #ffd700;
        }
        .moderation-rules p {
            font-size: 1rem;
            line-height: 1.6;
            margin: 0;
        }
        .post-container {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        .post-form {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            padding: 1.5rem;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
            display: none;
            width: 300px;
        }
        .post-form textarea {
            width: 100%;
            height: 80px;
            margin-bottom: 1rem;
            padding: 0.8rem;
            font-size: 1rem;
            border-radius: 10px;
            border: none;
        }
        .post-form input[type="file"] {
            width: 100%;
            margin-bottom: 1rem;
            padding: 0.8rem;
            font-size: 1rem;
            border-radius: 10px;
            border: none;
        }
        .post-form .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #ff5555;
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            font-size: 1.2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }
        .post-form button {
            background: #ffd700;
            color: #000;
            padding: 0.8rem 1.5rem;
            font-size: 1rem;
            border-radius: 25px;
            border: none;
            cursor: pointer;
            display: block;
            margin: 0 auto;
        }
        .post-form button:hover {
            background: #e6c000;
        }
        .new-post-btn {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: #ffd700;
            color: #000;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            transition: background 0.3s ease-in-out;
        }
        .new-post-btn:hover {
            background: #e6c000;
        }
    </style>
</head>
<body>
    <header>
        <h1>Study Buddy</h1>
    </header>
    <main>
        <section class="moderation-rules">
            <h2>Community Guidelines</h2>
            <p>
                Please adhere to the following rules to maintain a positive and respectful community:
                <br><br>
                - Be respectful to others and avoid offensive language.<br>
                - Do not share inappropriate, harmful, or hateful content.<br>
                - Posts should be relevant and constructive to the study community.<br>
                - Report any violations or issues to the moderation team.<br><br>
                Failure to follow these guidelines may result in post removal or account suspension.
            </p>
        </section>
        <div class="post-container" id="posts-container">
            <!-- Dynamic posts will be inserted here -->
        </div>
    </main>
    <div class="post-form" id="post-form">
        <button class="close-btn" id="close-post-form">×</button>
        <textarea id="note-input" placeholder="Write your note here..."></textarea>
        <input type="file" id="image-input" accept="image/*">
        <button id="save-post-button">Save Post</button>
    </div>
    <button class="new-post-btn" id="new-post-btn">+</button>
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const postsContainer = document.getElementById("posts-container");
            const postForm = document.getElementById("post-form");
            const noteInput = document.getElementById("note-input");
            const imageInput = document.getElementById("image-input");
            const savePostButton = document.getElementById("save-post-button");
            const newPostBtn = document.getElementById("new-post-btn");
            const closePostForm = document.getElementById("close-post-form");

            let posts = [];

            function renderPosts() {
                postsContainer.innerHTML = "";
                posts.forEach((post) => {
                    const postCard = document.createElement("div");
                    postCard.className = "post-card";

                    const note = document.createElement("p");
                    note.textContent = post.text;

                    if (post.image) {
                        const img = document.createElement("img");
                        img.src = post.image;
                        img.alt = "Post Image";
                        img.style.width = "100%";
                        img.style.borderRadius = "10px";
                        postCard.appendChild(img);
                    }

                    postCard.appendChild(note);
                    postsContainer.appendChild(postCard);
                });
            }

            function openPostForm() {
                postForm.style.display = "block";
            }

            function closeForm() {
                postForm.style.display = "none";
                noteInput.value = "";
                imageInput.value = "";
            }

            function savePost() {
                const noteText = noteInput.value.trim();
                const imageFile = imageInput.files[0];
                let newPost = { text: noteText, image: null };

                if (imageFile) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        newPost.image = e.target.result;
                        posts.push(newPost);
                        closeForm();
                        renderPosts();
                    };
                    reader.readAsDataURL(imageFile);
                } else {
                    if (noteText) {
                        posts.push(newPost);
                        closeForm();
                        renderPosts();
                    }
                }
            }

            newPostBtn.addEventListener("click", openPostForm);
            closePostForm.addEventListener("click", closeForm);
            savePostButton.addEventListener("click", savePost);

            renderPosts();
        });
    </script>
</body>
</html>
