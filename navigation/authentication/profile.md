---
layout: post
permalink: /profile
title: My Profile
search_exclude: true
show_reading_time: false
---
<div class="profile-container">
    <div class="card">
        <form>
            <div class="form-container">
                <div>
                    <label for="newUid">Username:</label>
                    <span id="displayUid">None</span>
                    <input type="text" id="newUid" placeholder="New Username" style="display: none;">
                    <i class="fas fa-pencil-alt edit-icon" id="editUid"></i>
                </div>
                <div>
                    <label for="newName">Name:</label>
                    <span id="displayName">None</span>
                    <input type="text" id="newName" placeholder="New Name" style="display: none;">
                    <i class="fas fa-pencil-alt edit-icon" id="editName"></i>
                </div>
                <div>
                    <label for="newPassword">Password:</label>
                    <span id="displayPassword">(Hidden)</span>
                    <input type="text" id="newPassword" placeholder="New Password" style="display: none;">
                    <i class="fas fa-pencil-alt edit-icon" id="editPassword"></i>
                </div>
                <div>
                    <label for="newEmail">Email:</label>
                    <span id="displayEmail">None</span>
                    <input type="text" id="newEmail" placeholder="New Email" style="display: none;">
                    <i class="fas fa-pencil-alt edit-icon" id="editEmail"></i>
                </div>
                <div>
                    <label for="newDob">Date of Birth:</label>
                    <span id="displayDob">None</span>
                    <input type="text" id="newDob" placeholder="Date of Birth" style="display: none;">
                    <i class="fas fa-pencil-alt edit-icon" id="editDob"></i>
                </div>
                <div>
                    <label for="newCity">City:</label>
                    <span id="displayCity">None</span>
                    <input type="text" id="newCity" placeholder="City" style="display: none;">
                    <i class="fas fa-pencil-alt edit-icon" id="editCity"></i>
                </div>
            </div>
            <br>
            <br>
            <input type="file" id="profilePicture" accept="image/*" style="display: none;" onchange="saveProfilePicture()">
            <div class="image-container" id="profileImageBox" onclick="document.getElementById('profilePicture').click()">
                <!-- Profile picture will be displayed here -->
            </div>
            <p id="profile-message" style="color: red;"></p>
        </form>
    </div>
</div>

<style>
    .profile-container {
        margin: 2rem auto;
        max-width: 700px;
        padding: 2rem;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        color: #fff;
        font-family: 'Poppins', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

    .profile-container .card {
        background: rgba(0, 0, 0, 0.9);
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
    }

    .profile-container .form-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(3, auto);
        gap: 1rem;
        flex: 2 1 300px;
    }

    .profile-container label {
        font-weight: 600;
        margin-top: 1rem;
        display: block;
        color: #ffd700;
    }

    .profile-container input[type="text"],
    .profile-container input[type="file"] {
        width: 100%;
        padding: 0.8rem;
        margin: 0.5rem 0;
        border: 1px solid #fff;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
    }

    .profile-container .file-icon {
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
        text-align: center;
    }

    .profile-container .file-icon:hover {
        background: #ffc700;
    }

    .profile-container .image-container {
        margin-top: 1rem;
        text-align: center;
        flex: 1 1 150px;
        max-width: 100%;
        cursor: pointer;
    }

    .profile-container .image-container img {
        max-width: 100%;
        border-radius: 10px;
        width: 100%;
        height: auto;
    }

    .profile-container #profile-message {
        color: #ff3b3b;
        font-size: 1.1rem;
        text-align: center;
        margin-top: 1rem;
    }
</style>

<script type="module">
// Import fetchOptions from config.js
import {pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
// Import functions from config.js
import { putUpdate, postUpdate, deleteData, logoutUser } from "{{site.baseurl}}/assets/js/api/profile.js";
import { getCredentials } from '{{site.baseurl}}/assets/js/api/login.js';

// Function to update table with fetched data
function updateTableWithData(data) {
   const tableBody = document.getElementById('profileResult');
   tableBody.innerHTML = '';

   data.sections.forEach((section, index) => {
       const tr = document.createElement('tr');
       const themeCell = document.createElement('td');
       const nameCell = document.createElement('td');

       themeCell.textContent = section.theme;
       nameCell.textContent = section.name;

       const trashIcon = document.createElement('i');
       trashIcon.className = 'fas fa-trash-alt trash-icon';
       trashIcon.style.marginLeft = '10px';
       themeCell.appendChild(trashIcon);

       trashIcon.addEventListener('click', async function (event) {
           event.preventDefault();
           const URL = pythonURI + "/api/user/section";
           // Remove the row from the table
           tr.remove();

           const options = {
               URL,
               body: { sections: [section.theme] },
               message: 'profile-message',
           };

           try {
               await deleteData(options);
           } catch (error) {
               console.error('Error deleting section:', error.message);
               document.getElementById('profile-message').textContent = 'Error deleting section: ' + error.message;
           }
       });

      yearCell.classList.add('editable'); // Make year cell editable
      yearCell.innerHTML = `${section.year} <i class="fas fa-pencil-alt edit-icon" style="margin-left: 10px;"></i>`;

       // Make the year cell editable
       yearCell.addEventListener('click', function () {
           const input = document.createElement('input');
           input.type = 'text';
           input.value = section.year;
           input.className = 'edit-input';
           yearCell.innerHTML = '';
           yearCell.appendChild(input);

           input.focus();

           input.addEventListener('blur', async function () {
               const newYear = input.value;
               const URL = pythonURI + "/api/user/section";
               const options = {
                   URL,
                   body: { section: { theme: section.theme, year: newYear } },
                   message: 'profile-message',
               };

               try {
                   await putUpdate(options);
               } catch (error) {
                   console.error('Error updating year:', error.message);
                   document.getElementById('profile-message').textContent = 'Error updating year: ' + error.message;
               }

               yearCell.textContent = newYear;
           });

           input.addEventListener('keydown', function (event) {
               if (event.key === 'Enter') {
                   input.blur();
               }
           });
       });
       tr.appendChild(themeCell);
       tr.appendChild(nameCell);

       tableBody.appendChild(tr);
   });

}

// Function to update UI with fetched user profile data
function updateProfileUI(profileData) {
    document.getElementById('displayUid').textContent = profileData.uid || 'None';
    document.getElementById('displayName').textContent = profileData.name || 'None';
    document.getElementById('displayEmail').textContent = profileData.email || 'None';
    document.getElementById('displayDob').textContent = profileData.dob || 'None';
    document.getElementById('displayCity').textContent = profileData.city || 'None';
    // Assuming password is not fetched for security reasons, so no update for displayPassword
}

// Function to fetch user profile data and update UI
async function fetchUserProfile() {
    const baseurl = document.querySelector('.trigger').getAttribute('data-baseurl');

    try {
        const profileData = await getCredentials(baseurl);
        if (!profileData) {
            throw new Error('Failed to fetch user profile');
        }

        const profilePicture = await fetchProfilePicture();
        profileData.pfp = profilePicture;

        displayUserProfile(profileData);
        updateProfileUI(profileData); // Update UI with fetched data
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        // Handle error display or fallback mechanism
    }
}

// Function to fetch profile picture
async function fetchProfilePicture() {
    const URL = pythonURI + "/api/id/pfp"; // Endpoint to fetch user profile data

    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch user profile: ${response.status}`);
        }

        const profileData = await response.json();
        return profileData.pfp; // Return the base64 image data
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        return null;
    }
}

// Function to display user profile data
function displayUserProfile(profileData) {
    const profileImageBox = document.getElementById('profileImageBox');
    if (profileData.pfp) {
        const img = document.createElement('img');
        img.src = `data:image/jpeg;base64,${profileData.pfp}`;
        img.alt = 'Profile Picture';
        profileImageBox.innerHTML = ''; // Clear existing content
        profileImageBox.appendChild(img); // Append new image element
    } else {
        const img = document.createElement('img');
        img.src = '{{site.baseurl}}/images/default-profile.jpg';
        img.alt = 'Default Profile Picture';
        profileImageBox.innerHTML = ''; // Clear existing content
        profileImageBox.appendChild(img); // Append default image element
    }

    // Display other profile information as needed
    // Example: Update HTML elements with profileData.username, profileData.email
}

// Function to save profile picture
window.saveProfilePicture = async function () {
    const fileInput = document.getElementById('profilePicture');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            const profileImageBox = document.getElementById('profileImageBox');
            profileImageBox.innerHTML = `<img src="${reader.result}" alt="Profile Picture">`;
        };
        reader.readAsDataURL(file);
    }

    if (!file) return;

    try {
        const base64String = await convertToBase64(file);
        await sendProfilePicture(base64String);
        console.log('Profile picture uploaded successfully!');
    } catch (error) {
        console.error('Error uploading profile picture:', error.message);
        // Handle error display or fallback mechanism
    }
}

// Function to convert file to base64
async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]); // Remove the prefix part of the result
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

// Function to send profile picture to server
async function sendProfilePicture(base64String) {
    const URL = pythonURI + "/api/id/pfp"; // Adjust endpoint as needed

    // Create options object for PUT request
    const options = {
        URL,
        body: { pfp: base64String },
        message: 'profile-message', // Adjust the message area as needed
        callback: () => {
            console.log('Profile picture uploaded successfully!');
            // Handle success response as needed
        }
    };

    try {
        await putUpdate(options);
    } catch (error) {
        console.error('Error uploading profile picture:', error.message);
        document.getElementById('profile-message').textContent = 'Error uploading profile picture: ' + error.message;
    }
}

// Function to update UI with new UID and change placeholder
window.updateUidField = function(newUid) {
  const uidInput = document.getElementById('newUid');
  uidInput.value = newUid;
  uidInput.placeholder = newUid;
}

// Function to update UI with new Name and change placeholder
window.updateNameField = function(newName) {
  const nameInput = document.getElementById('newName');
  nameInput.value = newName;
  nameInput.placeholder = newName;
}

// Function to update UI with new Email and change placeholder
window.updateEmailField = function(newEmail) {
    const emailInput = document.getElementById('newEmail');
    emailInput.value = newEmail;
    emailInput.placeholder = newEmail;
}

// Function to update UI with new Date of Birth and change placeholder
window.updateDobField = function(newDob) {
    const dobInput = document.getElementById('newDob');
    dobInput.value = newDob;
    dobInput.placeholder = newDob;
}

// Function to update UI with new City and change placeholder
window.updateCityField = function(newCity) {
    const cityInput = document.getElementById('newCity');
    cityInput.value = newCity;
    cityInput.placeholder = newCity;
}

// Function to change UID
window.changeUid = async function(uid) {
   if (uid) {
       const URL = pythonURI + "/api/user"; // Adjusted endpoint

       const options = {
           URL,
           body: { uid },
           message: 'uid-message', // Adjust the message area as needed
           callback: async () => {
               alert("You updated your Github ID, so you will automatically be logged out. Be sure to remember your new github id to log in!");
               console.log('UID updated successfully!');
               window.updateUidField(uid);
               await fetchUserProfile(); // Fetch and update profile data after change
               window.location.href = '/portfolio_2025/login'
           }
       };

       try {
           await putUpdate(options);
       } catch (error) {
           console.error('Error updating UID:', error.message);
           document.getElementById('uid-message').textContent = 'Error updating UID: ' + error.message;
       }
   }
}

window.changePassword = async function(password) {
   if (password) {
       const URL = pythonURI + "/api/user"; // Adjusted endpoint

       const options = {
           URL,
           body: { password },
           message: 'password-message', // Adjust the message area as needed
           callback: () => {
               console.log('Password updated successfully!');
               window.location.href = '/portfolio_2025/login'

           }
       };

       try {
            alert("You updated your password, so you will automatically be logged out. Be sure to remember your password!");
           await putUpdate(options);
           await logoutUser();
       } catch (error) {
           console.error('Error updating password:', error.message);
           document.getElementById('password-message').textContent = 'Error updating password: ' + error.message;
       }
   }
}

// Function to change Name
window.changeName = async function(name) {
   if (name) {
       const URL = pythonURI + "/api/user";
       const options = {
           URL,
           body: { name },
           message: 'name-message',
           callback: async () => {
               console.log('Name updated successfully!');
               window.updateNameField(name);
               await fetchUserProfile(); // Fetch and update profile data after change
           }
       };
       try {
           await putUpdate(options);
       } catch (error) {
           console.error('Error updating Name:', error.message);
           document.getElementById('name-message').textContent = 'Error updating Name: ' + error.message;
       }
   }
}

// Function to change Email
window.changeEmail = async function(email) {
    if (email) {
        const URL = pythonURI + "/api/user"; // Adjusted endpoint

        const options = {
            URL,
            body: { email },
            message: 'email-message', // Adjust the message area as needed
            callback: async () => {
                console.log('Email updated successfully!');
                window.updateEmailField(email);
                await fetchUserProfile(); // Fetch and update profile data after change
            }
        };

        try {
            await putUpdate(options);
        } catch (error) {
            console.error('Error updating Email:', error.message);
            document.getElementById('email-message').textContent = 'Error updating Email: ' + error.message;
        }
    }
}

// Function to change Date of Birth
window.changeDob = async function(dob) {
    if (dob) {
        const URL = pythonURI + "/api/user"; // Adjusted endpoint

        const options = {
            URL,
            body: { dob },
            message: 'dob-message', // Adjust the message area as needed
            callback: async () => {
                console.log('Date of Birth updated successfully!');
                window.updateDobField(dob);
                await fetchUserProfile(); // Fetch and update profile data after change
            }
        };

        try {
            await putUpdate(options);
        } catch (error) {
            console.error('Error updating Date of Birth:', error.message);
            document.getElementById('dob-message').textContent = 'Error updating Date of Birth: ' + error.message;
        }
    }
}

// Function to change City
window.changeCity = async function(city) {
    if (city) {
        const URL = pythonURI + "/api/user"; // Adjusted endpoint

        const options = {
            URL,
            body: { city },
            message: 'city-message', // Adjust the message area as needed
            callback: async () => {
                console.log('City updated successfully!');
                window.updateCityField(city);
                await fetchUserProfile(); // Fetch and update profile data after change
            }
        };

        try {
            await putUpdate(options);
        } catch (error) {
            console.error('Error updating City:', error.message);
            document.getElementById('city-message').textContent = 'Error updating City: ' + error.message;
        }
    }
}

// Event listener to trigger updateUid function when UID field is changed
document.getElementById('newUid').addEventListener('change', function() {
    const uid = this.value;
    window.changeUid(uid);

});

// Event listener to trigger updateName function when Name field is changed
document.getElementById('newName').addEventListener('change', function() {
    const name = this.value;
    window.changeName(name);

});

document.getElementById('newPassword').addEventListener('change', function() {
    const password = this.value;
    window.changePassword(password);

});

// Event listeners to trigger change functions when fields are changed
document.getElementById('newEmail').addEventListener('change', function() {
    const email = this.value;
    window.changeEmail(email);
});

document.getElementById('newDob').addEventListener('change', function() {
    const dob = this.value;
    window.changeDob(dob);
});

document.getElementById('newCity').addEventListener('change', function() {
    const city = this.value;
    window.changeCity(city);
});

// Function to fetch Name from backend
window.fetchName = async function() {
    const URL = pythonURI + "/api/user"; // Adjusted endpoint

    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch Name: ${response.status}`);
        }

        const data = await response.json();
        return data.name;
    } catch (error) {
        console.error('Error fetching Name:', error.message);
        return null;
    }
};

// Function to fetch Email from backend
window.fetchEmail = async function() {
    const URL = pythonURI + "/api/user"; // Adjusted endpoint

    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch Email: ${response.status}`);
        }

        const data = await response.json();
        return data.email;
    } catch (error) {
        console.error('Error fetching Email:', error.message);
        return null;
    }
}

// Function to fetch Date of Birth from backend
window.fetchDob = async function() {
    const URL = pythonURI + "/api/user"; // Adjusted endpoint

    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch Date of Birth: ${response.status}`);
        }

        const data = await response.json();
        return data.dob;
    } catch (error) {
        console.error('Error fetching Date of Birth:', error.message);
        return null;
    }
}

// Function to fetch City from backend
window.fetchCity = async function() {
    const URL = pythonURI + "/api/user"; // Adjusted endpoint

    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch City: ${response.status}`);
        }

        const data = await response.json();
        return data.city;
    } catch (error) {
        console.error('Error fetching City:', error.message);
        return null;
    }
}

// Function to set placeholders for UID and Name
window.setPlaceholders = async function() {
    const uidInput = document.getElementById('newUid');
    const nameInput = document.getElementById('newName');
    const emailInput = document.getElementById('newEmail');
    const dobInput = document.getElementById('newDob');
    const cityInput = document.getElementById('newCity');

    try {
        const uid = await window.fetchUid();
        const name = await window.fetchName();
        const email = await window.fetchEmail();
        const dob = await window.fetchDob();
        const city = await window.fetchCity();

        if (uid !== null) {
            uidInput.placeholder = uid;
        }
        if (name !== null) {
            nameInput.placeholder = name;
        }
        if (email !== null) {
            emailInput.placeholder = email;
        }
        if (dob !== null) {
            dobInput.placeholder = dob;
        }
        if (city !== null) {
            cityInput.placeholder = city;
        }
    } catch (error) {
        console.error('Error setting placeholders:', error.message);
    }
};

// Function to toggle input fields and display attributes
function toggleInputField(displayElementId, inputElementId, editIconId) {
    const displayElement = document.getElementById(displayElementId);
    const inputElement = document.getElementById(inputElementId);
    const editIcon = document.getElementById(editIconId);

    displayElement.style.display = 'none';
    inputElement.style.display = 'inline';
    editIcon.style.display = 'none';

    inputElement.focus();

    inputElement.addEventListener('blur', function () {
        displayElement.textContent = inputElement.value || 'None';
        displayElement.style.display = 'inline';
        inputElement.style.display = 'none';
        editIcon.style.display = 'inline';
    });

    inputElement.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            inputElement.blur();
        }
    });
}

// Event listeners for edit icons
document.getElementById('editUid').addEventListener('click', function () {
    toggleInputField('displayUid', 'newUid', 'editUid');
});

document.getElementById('editName').addEventListener('click', function () {
    toggleInputField('displayName', 'newName', 'editName');
});

document.getElementById('editEmail').addEventListener('click', function () {
    toggleInputField('displayEmail', 'newEmail', 'editEmail');
});

document.getElementById('editDob').addEventListener('click', function () {
    toggleInputField('displayDob', 'newDob', 'editDob');
});

document.getElementById('editCity').addEventListener('click', function () {
    toggleInputField('displayCity', 'newCity', 'editCity');
});

document.getElementById('editPassword').addEventListener('click', function () {
    toggleInputField('displayPassword', 'newPassword', 'editPassword');
});

// Call and initializeProfileSetup when DOM content is loaded
document.addEventListener('DOMContentLoaded', async function () {
    try {
        await fetchUserProfile(); // Fetch user profile data
        await setPlaceholders(); // Set placeholders with fetched data
    } catch (error) {
        console.error('Initialization error:', error.message);
        // Handle initialization error gracefully
    }
});

</script>
