async function proveraPodataka() {
    const username = document.querySelector('.username').value;
    const password = document.querySelector('.password').value;
    
    if (!password || !username) {
        alert('Please enter both username and password');
        return;
    }

    // Convert password to Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    try {
        // Generate hash
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);

        // Convert ArrayBuffer to hex string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        console.log("HASHOVAN PASS", hashHex)

        // Get user data from JSON
        const jsonData = await getUser();

        if (!jsonData) {
            alert('Error fetching user data');
            return;
        }

        // Find user and check password
        const user = jsonData.data.find(user => user.username === username);

        if (user) {
            if (user.password === hashHex) {
                // Redirect to success page
                window.location.href = '../pages/home.html';
            } else {
                alert('Incorrect password');
            }
        } else {
            alert('Username not found');
        }
    } catch (error) {
        console.error('Error during validation:', error);
    }
}

// Asynchronous function to get user data from JSON file
async function getUser() {
    try {
        const response = await fetch('../users/podaci.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error loading JSON:', error);
        return null;
    }
}
