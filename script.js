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

// Function to search for an artist
async function searchArtist(artistName) {
    const token = await getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json();
    displayArtists(data.artists.items);
}

// Function to display artist information
function displayArtists(artists) {
    const output = document.getElementById('output');
    output.innerHTML = ''; // Clear previous results

    if (artists.length === 0) {
        output.innerHTML = '<p>No artists found.</p>';
        return;
    }

    artists.forEach(artist => {
        const artistDiv = document.createElement('div');
        artistDiv.classList.add('artist-card');
        artistDiv.innerHTML = `
            <h2>${artist.name}</h2>
            <p>Followers: ${artist.followers.total.toLocaleString()}</p>
            <p>Genres: ${artist.genres.join(', ') || 'N/A'}</p>
            <img src="${artist.images[0]?.url || 'https://via.placeholder.com/150'}" alt="${artist.name}" width="200">
        `;
        output.appendChild(artistDiv);
    });
}

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', () => {
    const artistName = document.getElementById('search').value.trim();
    if (artistName) {
        searchArtist(artistName);
    }
});
