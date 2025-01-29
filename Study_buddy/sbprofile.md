---
layout: base
title: Profile
permalink: /sbprofile
---

<style>
    /* Profile Card Container */
    #profile-card {
        margin: 2rem auto;
        max-width: 700px;
        padding: 2rem;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        color: #fff;
        font-family: 'Poppins', sans-serif;
    }

    /* Profile Card Heading */
    #profile-card h2 {
        text-align: center;
        margin-bottom: 1.5rem;
        font-size: 1.8rem;
        font-weight: 600;
        color: #ffd700;
    }

    /* Profile Card Content */
    .card-content p {
        margin: 0.8rem 0;
        font-size: 1rem;
        font-weight: 400;
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding-bottom: 0.5rem;
    }

    .card-content strong {
        font-weight: 600;
        color: #ffd700;
    }

    .card-content span {
        font-size: 1rem;
        color: #fff;
        opacity: 0.9;
    }

    /* Buttons */
    button {
        display: block;
        width: 100%;
        padding: 1rem;
        background: #ffd700;
        color: #000;
        border: none;
        border-radius: 8px;
        font-size: 1.2rem;
        font-weight: 600;
        font-family: 'Poppins', sans-serif;
        cursor: pointer;
        transition: background 0.3s ease;
        margin-top: 1.5rem;
    }

    button:hover {
        background: #ffc700;
    }

    /* Error Message */
    #error-message {
        color: #ff3b3b;
        font-size: 1.1rem;
        text-align: center;
        margin-top: 1rem;
    }

    /* Shared styling for popups */
    #popup-card, #popup-delete, #popup-add-info {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 2rem;
        background: rgba(0, 0, 0, 0.9);
        color: #fff;
        border-radius: 15px;
        width: 90%;
        max-width: 400px;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        display: none;
    }

    #popup-card h2, #popup-delete h2, #popup-add-info h2 {
        text-align: center;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        color: #ffd700;
    }

    #popup-card label, #popup-delete label, #popup-add-info label {
        font-weight: 600;
        margin-top: 1rem;
        display: block;
    }

    #popup-card input, #popup-delete input, #popup-add-info input {
        width: 100%;
        padding: 0.8rem;
        margin: 0.5rem 0;
        border: 1px solid #fff;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
    }

    #popup-card button, #popup-delete button, #popup-add-info button {
        width: 100%;
        padding: 0.8rem;
        margin: 0.5rem 0;
        border: none;
        border-radius: 8px;
        background: #ffd700;
        color: #000;
        font-size: 1rem;
        cursor: pointer;
    }

    #popup-card button:hover, #popup-delete button:hover, #popup-add-info button:hover {
        background: #ffc700;
    }

    /* Styling for profile card */
    .profile-card {
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 8px;
        max-width: 300px;
        margin: 20px auto;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        background-color: #f9f9f9;
    }

    .profile-card h2 {
        text-align: center;
        margin-bottom: 20px;
    }

    .profile-card .card-content p {
        margin: 10px 0;
        font-size: 16px;
    }

    .profile-card .card-content span {
        font-weight: bold;
    }
</style>

<div id="profile-card">
    <h2>Profile Card</h2>
    <div class="card-content">
        <p><strong>Name:</strong> <span id="profile-name">None</span></p>
        <p><strong>Email:</strong> <span id="profile-email">None</span></p>
        <p><strong>Date of Birth:</strong> <span id="profile-dob">None</span></p>
        <p><strong>City:</strong> <span id="profile-city">None</span></p>
    </div>
    <button id="edit-button" style="display: none;">Edit Profile</button>
    <button id="delete-button" style="display: none;">Delete Profile</button>
    <button id="add-info-button" style="display: none;">Add Info</button>
</div>

<!-- Popup for Editing -->
<div id="popup-card">
    <h2>Edit Profile</h2>
    <label for="edit-name">Name:</label>
    <input type="text" id="edit-name">
    <label for="edit-email">Email:</label>
    <input type="text" id="edit-email">
    <label for="edit-dob">Date of Birth:</label>
    <input type="text" id="edit-dob">
    <label for="edit-city">City:</label>
    <input type="text" id="edit-city">
    <button id="submit-edit">Submit</button>
    <button id="close-popup">Cancel</button>
</div>

<!-- Popup for Deleting -->
<div id="popup-delete">
    <h2>Delete Profile</h2>
    <button id="submit-delete">Delete</button>
    <button id="close-delete">Cancel</button>
</div>

<!-- Popup for Adding Info -->
<div id="popup-add-info">
    <h2>Add Info</h2>
    <label for="add-email">Email:</label>
    <input type="text" id="add-email">
    <label for="add-dob">Date of Birth:</label>
    <input type="text" id="add-dob">
    <label for="add-city">City:</label>
    <input type="text" id="add-city">
    <button id="submit-add-info">Submit</button>
    <button id="close-add-info">Cancel</button>
</div>

<script>
    document.addEventListener("DOMContentLoaded", () => {
        const storedName = localStorage.getItem("username");
        const profileName = document.getElementById("profile-name");
        const profileEmail = document.getElementById("profile-email");
        const profileDob = document.getElementById("profile-dob");
        const profileCity = document.getElementById("profile-city");
        const editButton = document.getElementById("edit-button");
        const deleteButton = document.getElementById("delete-button");
        const addInfoButton = document.getElementById("add-info-button");

        const popupEdit = document.getElementById("popup-card");
        const popupDelete = document.getElementById("popup-delete");
        const popupAddInfo = document.getElementById("popup-add-info");

        const fetchData = async () => {
            try {
                const storedName = localStorage.getItem("username");
                const response = await fetch("http://127.0.0.1:8887/api/sbuser");
                const data = await response.json();
                const user = data.find((user) => user.name === storedName);

                if (user) {
                    localStorage.setItem("userId", user.id);  // Store the user ID in localStorage
                    profileName.textContent = user.name;
                    profileEmail.textContent = user.email;
                    profileDob.textContent = user.date_of_birth;
                    profileCity.textContent = user.city;
                    editButton.style.display = "block";
                    deleteButton.style.display = "block";
                    addInfoButton.style.display = "none"; // Hide "Add Info" if profile is already loaded
                } else {
                    profileName.textContent = "None";
                    profileEmail.textContent = "None";
                    profileDob.textContent = "None";
                    profileCity.textContent = "None";
                    editButton.style.display = "none";
                    deleteButton.style.display = "none";
                    addInfoButton.style.display = "block"; // Show "Add Info" if no profile is loaded
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Event handlers for popups
        const closePopups = () => {
            popupEdit.style.display = "none";
            popupDelete.style.display = "none";
            popupAddInfo.style.display = "none";
        };

        editButton.addEventListener("click", () => {
            closePopups();
            popupEdit.style.display = "block";
        });

        deleteButton.addEventListener("click", () => {
            closePopups();
            popupDelete.style.display = "block";
        });

        addInfoButton.addEventListener("click", () => {
            closePopups();
            popupAddInfo.style.display = "block";
        });

        document.getElementById("close-popup").addEventListener("click", closePopups);
        document.getElementById("close-delete").addEventListener("click", closePopups);
        document.getElementById("close-add-info").addEventListener("click", closePopups);

        // Submit the form to add info
        document.getElementById("submit-add-info").addEventListener("click", async () => {
            const email = document.getElementById("add-email").value;
            const dob = document.getElementById("add-dob").value;
            const city = document.getElementById("add-city").value;

            try {
                await fetch("http://127.0.0.1:8887/api/sbuser", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: storedName, email, date_of_birth: dob, city }),
                });
                closePopups();
                fetchData(); // Fetch data again after adding
            } catch (error) {
                console.error("Error adding data:", error);
            }
        });

        // Submit the form to update profile
        document.getElementById("submit-edit").addEventListener("click", async () => {
            const userId = localStorage.getItem("userId");
            const name = document.getElementById("edit-name").value;
            const email = document.getElementById("edit-email").value;
            const dob = document.getElementById("edit-dob").value;
            const city = document.getElementById("edit-city").value;

            try {
                const response = await fetch(`http://127.0.0.1:8887/api/sbuser/${userId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, date_of_birth: dob, city }),
                });

                if (response.ok) {
                    // Update localStorage with the new name
                    localStorage.setItem("username", name);

                    // Fetch updated user data and refresh the profile info
                    fetchData(); // Fetch data again after updating
                    closePopups();
                } else {
                    console.error('Error updating profile');
                }
            } catch (error) {
                console.error("Error updating data:", error);
            }
        });

        // Submit the form to delete profile
        document.getElementById("submit-delete").addEventListener("click", async () => {
            const userId = localStorage.getItem("userId");

            try {
                const response = await fetch(`http://127.0.0.1:8887/api/sbuser/${userId}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    // Clear localStorage and refresh the profile info
                    localStorage.removeItem("username");
                    localStorage.removeItem("userId");
                    fetchData(); // Fetch data again after deleting
                    closePopups();
                } else {
                    console.error("Error deleting profile");
                }
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        });

        // Fetch initial data when the page loads
        fetchData();
    });
</script>
