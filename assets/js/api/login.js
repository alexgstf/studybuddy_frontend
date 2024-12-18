import { pythonURI, fetchOptions } from './config.js';

console.log("login.js loaded");

document.addEventListener('DOMContentLoaded', function() {
    const baseurl = document.querySelector('.trigger').getAttribute('data-baseurl');
    console.log("Base URL:", baseurl); // Debugging line
    getCredentials(baseurl) // Call the function to get credentials
        .then(data => {
            console.log("Credentials data:", data); // Debugging line
            const loginArea = document.getElementById('loginArea');
            if (data) { // Check if data is not null
                //loginArea.innerHTML = `<a href="${baseurl}/login">${data.name}</a>`;
                localStorage.setItem('authenticated', 'true'); // Set authenticated status in local storage
                localStorage.setItem('username', data.name); // Store the username in localStorage
                console.log('Username stored in localStorage:', data.name); // Debugging line
            } else {
                // User is not authenticated, then "Login" link is shown
                loginArea.innerHTML = `<a href="${baseurl}/login">Login</a>`;
                localStorage.setItem('authenticated', 'false'); // Set authenticated status in local storage
                console.log('No data, authentication failed.'); // Debugging line
            }
        })
        .catch(err => { // General error handler
            console.error("Error fetching credentials: ", err);
            // Handle any errors that occurred during getCredentials
            localStorage.setItem('authenticated', 'false'); // Set authenticated status in local storage
        });
});

function getCredentials(baseurl) {
    const URL = pythonURI + '/api/id'; // This URL fetches the user credentials
    return fetch(URL, fetchOptions)
        .then(response => { // API response handler
            if (response.status !== 200) {
                console.error("HTTP status code: " + response.status);
                return null; // Return null if the request failed
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => { // Data handler from the previous promise
            if (data === null) return null; // If data is null, stop the chain
            console.log("Fetched data:", data); // Log the data (it should contain 'name', 'id', etc.)
            return data; // Return the data
        })
        .catch(err => { // General error handler for fetch
            console.error("Fetch error: ", err);
            return null; // Return null if an error occurs
        });
}
