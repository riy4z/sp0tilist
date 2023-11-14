import React, { useState, useEffect } from 'react';
import {
  Flex,
  Button,
  Heading,
  Input,
  Drawer,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
} from '@sparrowengg/twigs-react';

const Playlist = ({favoriteCategories, favoriteArtists}) => {
  console.log(favoriteArtists,favoriteCategories)
  const [spotifyData, setSpotifyData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientId = 'client_id';
        const clientSecret = 'your_client_secret';

        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
        });

        const tokenData = await tokenResponse.json();

        // Extract names from favoriteArtists
        const artistNames = favoriteArtists.map((artist) => artist.name).join('+');

        // Construct the search query based on artist names and favoriteCategories
        const searchQuery = `${artistNames}+${favoriteCategories.join('+')}`;

        const playlistResponse = await fetch(
          `https://api.spotify.com/v1/search?q=${searchQuery}&type=playlist&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
            },
          }
        );

        const playlistData = await playlistResponse.json();
        setSpotifyData(playlistData);
      } catch (error) {
        console.error('Error fetching data from Spotify API:', error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchData();
  }, [favoriteCategories, favoriteArtists]);

  return (
    <div style={{ backgroundColor: '#121212', height: '100%', width: '100%', position: 'absolute' }}>
      <Flex
        css={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          marginTop: '10%',
        }}
      >
        <Heading
          css={{
            color: '$white900',
            textTransform: 'sentence-case',
            textAlign: 'center',
            letterSpacing: '0.2px',
            borderBottom: '1px solid black',
            display: 'inline',
            padding: '$20',
            fontSize: '$4xl',
          }}
          weight="bold"
        >
          Playlists Recommended for you
        </Heading>

        {/* Render Spotify data or appropriate UI based on the fetched data */}
        {spotifyData && (
  <div>
    {/* Display the Spotify data here */}
    {/* You can map over playlists, tracks, etc. from the Spotify API response */}
    <Flex css={{ justifyContent: 'center', flexWrap: 'wrap' }}>
      {spotifyData.playlists.items.map((playlist) => (
        <div
          key={playlist.id}
          style={{
            margin: '10px',
            textAlign: 'center',
            border: `2px solid transparent`, // You may customize the border color as needed
            padding: '10px',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
          onClick={() => {
            // Open the Spotify playlist in a new window when the playlist is clicked
            window.open(playlist.external_urls.spotify, '_blank');
          }}
        >
          {/* Display playlist image */}
          <img
            src={playlist.images[0]?.url || 'default_playlist_image_url'}
            alt={playlist.name}
            style={{ width: '200px', height: '200px' }}
          />
          <p style={{color:"#fff", marginTop:"5px", fontWeight:"bold",}}>{playlist.name}</p>
        </div>
      ))}
    </Flex>
  </div>
)}

        
      </Flex>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      ></div>
    </div>
  );
};

export default Playlist;
