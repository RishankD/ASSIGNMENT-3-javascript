// Spotify API credentials
const clientId = '2bd8eaf7bd8044038057e2a485326f48';
const clientSecret = '623c98f984bd4e44aa42196b65534a1d';

// Function to get the access token
async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        },
        body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    return data.access_token;
}
