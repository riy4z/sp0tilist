// components/Main.js

import React, { useState, useEffect } from 'react';
import {
  Flex,
  Avatar,
  Button,
  Heading,
  Input,
  Drawer,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
} from '@sparrowengg/twigs-react';
import {
  EllipsisHorizontalIcon,
} from '@sparrowengg/twigs-react-icons';

const Artist = ({favoriteCategories, navigateToOAuth}) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [allArtists, setAllArtists] = useState([]);
  // const favoriteCategories = ["Tamil", "Rap"]
  const [selectedArtists, setSelectedArtists] = useState([]);

  const handleArtistClick = (artist) => {
    const isArtistSelected = selectedArtists.some((selectedArtist) => selectedArtist.id === artist.id);
  
    if (isArtistSelected) {
      // If artist is already selected, remove from favorites
      const updatedSelectedArtists = selectedArtists.filter((selectedArtist) => selectedArtist.id !== artist.id);
      setSelectedArtists(updatedSelectedArtists);
    } else {
      // If artist is not selected, add to favorites
      const updatedSelectedArtists = [...selectedArtists, artist];
      setSelectedArtists(updatedSelectedArtists);
    }
  };

  
  const fetchArtists = async () => {
    try {
      // Replace 'your-client-id' and 'your-client-secret' with your actual Spotify client ID and secret
      const clientId = 'client_id';
      const clientSecret = 'your_client_secret';
  
      // Request access token from Spotify API
      const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
      });
  
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;
  
      const allArtists = [];
      const searchKeywords = ["Hits", "Popular", "Top", ""];
  
      for (const category of favoriteCategories) {
        const categoryResults = {};
  
        for (const keyword of searchKeywords) {
          const query = encodeURIComponent(`${category} ${keyword}`);
          const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });
  
          const data = await response.json();
  
          if (data.artists && data.artists.items) {
            for (const artist of data.artists.items) {
              if (!categoryResults[artist.id]) {
                categoryResults[artist.id] = artist;
              }
            }
          }
        }
  
        const sortedCategoryArtists = Object.values(categoryResults)
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 3);
  
        allArtists.push(...sortedCategoryArtists);
      }
  
      setAllArtists(allArtists);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

useEffect(() => {
    fetchArtists();
  }, []);

  const handleInputChange = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchInput(input);
  };

  const handleToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleNext = () => {
    if (allArtists.length === 0) {
      alert('Please select at least one artist before proceeding.');
      return;
    }

    console.log('Favorite Artist:', selectedArtists);
    navigateToOAuth(selectedArtists);
  };

  
  return (
    <div
      style={{
        backgroundColor: '#121212',
        height: '100%',
        width: '100%',
        position: 'fixed',
        overflow:"auto"
      }}
    >
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <DrawerHeader>
          <Heading size="h4">Edit Profile</Heading>
        </DrawerHeader>
        <DrawerBody>Drawer content</DrawerBody>
        <DrawerFooter>Drawer Footer</DrawerFooter>
      </Drawer>
      <div
        style={{
          margin: '10px',
          position: 'absolute',
          cursor: 'pointer',
        }}
      >
        <EllipsisHorizontalIcon
          size={60}
          color="white"
          onClick={() => setIsDrawerOpen(true)}
        />
      </div>
      <Flex
        css={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          marginTop: '3%',
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
            fontSize: '$5xl',
          }}
          weight="bold"
        >
          Select Your Artists
        </Heading>

        <Flex css={{ alignItems: 'center', flexWrap: 'wrap' }}>

          <Input
            css={{
              width: '550px',
              height: '40px',
              ml: '$5',
              '&:hover, &:focus, &:active': {
                background: '$primary200',
                color: '$white900',
              },
              backgroundColor: '$primary200',
              borderRadius: '$3xl',
              padding: '$10',
              fontSize: '$lg',
            }}
            id="InputForGenre"
            placeholder="Search for Artists"
            onChange={handleInputChange}
          />
        </Flex>

        <div
          style={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '$primary200',
            borderRadius: '$3xl',
          }}
        >
                <Flex css={{ justifyContent: 'center', flexWrap: 'wrap' }}>
        {allArtists.map((artist) => (
          <div
            key={artist.id}
            style={{
              margin: '10px',
              textAlign: 'center',
              border: `2px solid ${
                selectedArtists.some((selectedArtist) => selectedArtist.id === artist.id) ? '#1ed760' : 'transparent'
              }`,
              padding: '10px',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
            onClick={() => handleArtistClick(artist)} // Call the handleArtistClick function on click
          >
                <Avatar
                  src={artist.images[0]?.url || 'default_image_url'}
                  name={artist.name}
                  rounded={"full"}
                  style={{ width: '100px', height: '100px' }}
                />
                <p style={{ color: '#fff', marginTop: '5px' }}>{artist.name}</p>
              </div>
            ))}
          </Flex>
        </div>

        <Button
          css={{
            mt: '$22',
            background: '$primary',
            color: '$primary100',
            padding: '$10 $15',

            '&:hover, &:focus, &:active': {
              color: '$white900',
              background: '$primary',
            },
          }}
          onClick={handleNext}
          size="lg"
        >
          Generate Playlist
        </Button>
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

export default Artist;
