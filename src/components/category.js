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
} from '@sparrowengg/twigs-react-icons';

const Category = ({navigateToArtist}) => {
  const [favoriteCategories, setFavoriteCategories] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
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
    
        // Use the obtained access token to fetch categories from Spotify API
        const response = await fetch("https://api.spotify.com/v1/browse/categories?country=IN", {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
    
        const data = await response.json();
        setCategories(data.categories.items);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchInput(input);
  };

  const handleToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleNext = () => {
    if (favoriteCategories.length === 0) {
      alert('Please select at least one category before proceeding.');
      return;
    }

    console.log('Favorite Categories:', favoriteCategories);
    navigateToArtist(favoriteCategories);
  };

  const toggleFavorite = (categoryId) => {
    if (favoriteCategories.includes(categoryId)) {
      setFavoriteCategories(favoriteCategories.filter((id) => id !== categoryId));
    } else {
      setFavoriteCategories([...favoriteCategories, categoryId]);
    }
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
            fontSize: '$4xl',
          }}
          weight="bold"
        >
          Explore Categories
        </Heading>

        <div
          style={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '$primary200',
            borderRadius: '$3xl',
          }}
        >
        <Flex css={{ flexWrap: 'wrap', justifyContent: "center" }}>
          {categories.map((category) => (
            <div
              key={category.name}
              style={{
                margin: '10px',
                padding: '10px',
                cursor: "pointer",
                backgroundColor: favoriteCategories.includes(category.name) ? '#242424' : '#121212',
                borderRadius: '$3xl',
                textAlign: 'center',
                width: '150px', // Adjust the width as needed
                border: favoriteCategories.includes(category.name) ? '2px solid #1ed760' : 'none',
                borderRadius:"1rem",
                transition: 'background-color 0.3s, border 0.3s',
                '&:hover': {
                  backgroundColor: favoriteCategories.includes(category.name) ? '#242424' : '#121212',
                  border: '2px solid $primary100',
                },
              }}
              onClick={() => toggleFavorite(category.name)}
            >
              <img
                src={category.icons[0].url}
                alt={category.name}
                style={{ width: '100%', borderRadius: '8px', marginBottom: '8px' }}
              />
              <p style={{ color: favoriteCategories.includes(category.name) ? '#1ed760' : '#fff' }}>{category.name}</p>
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

export default Category;
