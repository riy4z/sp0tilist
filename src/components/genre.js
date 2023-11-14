// components/Main.js

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
import {
  EllipsisHorizontalIcon,
  ChevronDownIcon,
} from '@sparrowengg/twigs-react-icons';

// Function to capitalize each word in a string
const toTitleCase = (str) => {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
};

const Genre = ({navigateToCategory, surveyName}) => {
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const [shuffledGenres, setShuffledGenres] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  useEffect(() => {
    // Fetch available genres when the component mounts
    fetchGenres();
  }, []);

  const fetchGenres = () => {
    // Replace 'your-client-id' and 'your-client-secret' with your actual Spotify client ID and secret
    const clientId = 'client_id';
    const clientSecret = 'your_client_secret';

    // Request access token from Spotify API
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    })
      .then((response) => response.json())
      .then((tokenResponse) => {
        const accessToken = tokenResponse.access_token;

        // Use the obtained access token to fetch available genres from Spotify API
        fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((result) => {
            const shuffled = result.genres
              .sort(() => Math.random() - 0.5)
              .slice(0, 50);

            setShuffledGenres(shuffled);
          })
          .catch((error) => console.error('Error fetching genres from Spotify:', error));
      })
      .catch((error) => console.error('Error fetching access token from Spotify:', error));
  };

  const handleGenreButtonClick = (genre) => {
    const formattedGenre = toTitleCase(genre);

    // Toggle the genre in the selectedGenres list
    setFavoriteGenres((prevGenres) => {
      const isGenreSelected = prevGenres.some(
        (selectedGenre) => toTitleCase(selectedGenre) === formattedGenre
      );

      if (isGenreSelected) {
        // Remove the genre if already selected
        return prevGenres.filter(
          (selectedGenre) => toTitleCase(selectedGenre) !== formattedGenre
        );
      } else {
        // Add the genre if not selected
        return [...prevGenres, formattedGenre];
      }
    });
  };

  const handleNext = () => {
    if (favoriteGenres.length === 0) {
      alert('Please select at least one favorite genre before proceeding.');
      return;
    }

    console.log('Favorite Genres:', favoriteGenres);

    // Call the navigateToCategory function with the selected genres
    navigateToCategory(favoriteGenres);
  };
  
  return (
    <div
      style={{
        backgroundColor: '#121212',
        height: '100%',
        width: '100%',
        position: 'absolute',
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
          marginTop: '15%',
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
          Select Preffered Genre, {surveyName}
        </Heading>

        <Flex css={{ alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Remove the search input */}
        </Flex>
        <Flex css={{ alignItems: 'center', flexWrap: 'wrap', padding: '45px', justifyContent: 'center' }}>
          {shuffledGenres.map((genre, index) => {
            const formattedGenre = toTitleCase(genre);
            const isSelected = favoriteGenres.includes(formattedGenre);

            return (
              <Button
                key={index}
                css={{
                  margin: '5px',
                  background: isSelected ? '$primary' : '$primary200',
                  color: isSelected ? '$primary100' : '$white900',
                  borderRadius: '$pill',
                  padding: '$8',
                  '&:hover, &:focus, &:active': {
                    border: '0.1px solid #1ed760',
                    background: '$primary',
                    color: '$primary100',
                  },
                }}
                onClick={() => handleGenreButtonClick(genre)}
              >
                {formattedGenre}
              </Button>
            );
          })}
        </Flex>
        <Button
          css={{
            mt: '$22',
            background: '$primary',
            color: '$primary100',
            padding: '$10 $15',
            marginTop: '$10',
            '&:hover, &:focus, &:active': {
              color: '$white900',
              background: '$primary',
            },
          }}
          onClick={handleNext}
          size="lg"
        >
          Next
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

export default Genre;
