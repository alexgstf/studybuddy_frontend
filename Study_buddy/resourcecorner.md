---
layout: base
title: Resource Corner
permalink: /resource_corner
---



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
    <div class="post-container" id="posts-container"></div>
</main>
<div class="post-form" id="post-form">
    <button class="close-btn" id="close-post-form">×</button>
    <textarea id="note-input" placeholder="Write your note here..."></textarea>
    <input type="file" id="image-input" accept="image/*">
    <button id="save-post-button">Save Post</button>
</div>
<button class="new-post-btn" id="new-post-btn">+</button>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: 'Poppins', sans-serif;
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
    .post-card {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 15px;
        padding: 1rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        position: relative;
    }
    .post-card img {
        width: 100%;
        border-radius: 10px;
    }
    .post-card p {
        margin: 1rem 0;
    }
    .post-card .actions {
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
    .post-card .edit-btn,
    .post-card .delete-btn {
        background: #ffd700;
        color: #000;
        padding: 0.5rem;
        border-radius: 25px;
        cursor: pointer;
    }
    .post-card .edit-btn:hover,
    .post-card .delete-btn:hover {
        background: #e6c000;
    }
    .post-form {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.9);
        border-radius: 15px;
        padding: 4rem 2rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        display: none;
        width: 500px;
        height: 400px;
    }
    .post-form textarea,
    .post-form input[type="file"] {
        width: 100%;
        margin: 1rem 0;
        padding: 0.8rem;
        font-size: 1rem;
        border-radius: 10px;
        border: none;
    }
    .post-form .close-btn {
        position: absolute;
        top: 5px;
        right: 5px;
        background: #ff5555;
        color: #fff;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: transform 0.2s ease-in-out, background 0.3s;
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
        transform: scale(1.1);
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
    }
    .new-post-btn:hover {
        background: #e6c000;
    }
</style>

<script>
    document.addEventListener("DOMContentLoaded", () => {
        const postsContainer = document.getElementById("posts-container");
        const postForm = document.getElementById("post-form");
        const noteInput = document.getElementById("note-input");
        const imageInput = document.getElementById("image-input");
        const savePostButton = document.getElementById("save-post-button");
        const newPostBtn = document.getElementById("new-post-btn");
        const closePostForm = document.getElementById("close-post-form");

        const API_URL = "http://localhost:8887/api/posts"; // Replace with your API endpoint

        async function getAuthToken() {
            return localStorage.getItem("jwtToken"); // Retrieve token from localStorage
        }

        async function fetchPosts() {
            try {
                const token = await getAuthToken(); // Get the token from localStorage
                const response = await fetch(API_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch posts. Please check your authentication.");
                }

                posts = await response.json();
                renderPosts();
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }

        async function savePost() {
            const postData = {
                title: "Post Title", // Replace with your actual title
                content: "This is the content of the post" // Replace with your actual content
            };

            fetch("http://localhost:8887/api/posts", {
                method: "POST",
                headers: {
             "Content-Type": "application/json" // Tell the server you're sending JSON
        },
        body: JSON.stringify(postData) // Convert the object to JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to save post");
        }
        return response.json();
    })
    .then(data => console.log("Post saved successfully:", data))
    .catch(error => console.error("Error saving post:", error));
}


        async function deletePost(postId) {
            try {
                const token = await getAuthToken(); // Get the token from localStorage
                const response = await fetch(`${API_URL}/${postId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error("Failed to delete post");

                fetchPosts(); // Refresh the posts
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }

        async function getAuthToken() {
            return localStorage.getItem("jwtToken"); // Retrieve token from localStorage
        }

        // Open and close post form
        function openPostForm() {
            postForm.style.display = "block";
        }

        function closeForm() {
            postForm.style.display = "none";
            noteInput.value = "";
            imageInput.value = "";
        }

        newPostBtn.addEventListener("click", openPostForm);
        closePostForm.addEventListener("click", closeForm);
        savePostButton.addEventListener("click", savePost);

        // Fetch posts on page load
        fetchPosts();
    });
</script>
