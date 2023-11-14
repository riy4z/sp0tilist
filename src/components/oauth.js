import React, { useEffect, useState } from 'react';
import {
  Flex,
  Button,
  Heading,
  Drawer,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
} from '@sparrowengg/twigs-react';

const CLIENT_ID = "client_id";  // Replace with your Spotify Client ID
const REDIRECT_URI = "https://open.spotify.com";  // Replace with your Redirect URI
const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user-read-private%20user-read-email&response_type=code&state=randomState&code_challenge_method=S256`;

const OAuthPage = ({surveyName, onAuthSuccess }) => {
  const [authCode, setAuthCode] = useState('');
  const [isAccessTokenReceived, setIsAccessTokenReceived] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  useEffect(() => {
    // Extract the authorization code from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      setAuthCode(code);
      exchangeCodeForAccessToken(code);

      // Clear the URL parameters after processing the code
      window.history.replaceState({}, document.title, '/next-page');
    }
  }, []);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'auth') {
        const accessToken = event.data.accessToken;
        // Do something with the access token (e.g., store it in local storage)
        localStorage.setItem('access_token', accessToken);
        // Trigger any further actions or state updates as needed
        onAuthSuccess();
      }
    };

    window.addEventListener('message', handleMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onAuthSuccess]);

  const exchangeCodeForAccessToken = async (code) => {
    console.log("Hi");
    try {
      const codeVerifier = localStorage.getItem('code_verifier');

      if (!codeVerifier) {
        throw new Error('Code verifier not found in localStorage');
      }

      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI,
          code_verifier: codeVerifier,
        }),
      };

      const response = await fetch('https://accounts.spotify.com/api/token', payload);

      if (!response.ok) {
        throw new Error(`Token exchange failed with status ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);

      // Log the access token
      console.log('Access Token:', data.access_token);

      // Set the state to indicate that the access token has been received
      setIsAccessTokenReceived(true);

      // Trigger the onAuthSuccess callback
      onAuthSuccess();
    } catch (error) {
      console.error('Error exchanging code for access token:', error);
      // Display or log the error message in the UI as needed
    }
  };

  const handleCreate = () =>{
    onAuthSuccess()
  }
  const handleOAuth = () => {
    const authWindow = window.open(SPOTIFY_AUTH_URL, '_blank', 'width=600,height=600');
  
    const checkForCode = () => {
      try {
        const code = getAuthorizationCode(authWindow);
        if (code) {
          setAuthCode(code);
          exchangeCodeForAccessToken(code);
          authWindow.removeEventListener('load', checkForCode);
        //   authWindow.close();

        } else {
          console.error('Authorizatione code not found');
        //   authWindow.close();
        }
      } catch (error) {
        console.error('Error in checkForCode:', error);
        authWindow.close();
      }
    };
  
    authWindow.addEventListener('unload', checkForCode, true);
  };
  
  const getAuthorizationCode = (authWindow) => {
    console.log(authWindow.location.href);

    const urlParams = new URLSearchParams(authWindow.location.search);
    console.log(urlParams)
    return urlParams.get('code');
  };
  return (
    <div
      style={{
        backgroundColor: '#121212',
        height: '100%',
        width: '100%',
        position: 'fixed',
        overflow: 'auto',
      }}
    >
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <DrawerHeader>
          <Heading size="h4">Edit Profile</Heading>
        </DrawerHeader>
        <DrawerBody>Drawer content</DrawerBody>
        <DrawerFooter>Drawer Footer</DrawerFooter>
      </Drawer>

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
            fontSize: '$5xl',
          }}
          weight="bold"
        >
          Login with your Spotify Account, {surveyName}
        </Heading>

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
          onClick={handleOAuth}
          size="lg"
        >
          Authorize with Spotify
        </Button>
        <br></br>
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
          onClick={handleCreate}
          size="lg"
        >
          Create
        </Button>

        {authCode && isAccessTokenReceived && (
        <div
          css={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '$primary200',
            borderRadius: '$3xl',
          }}
        >
          <Heading size="h4">Authorization Code Received</Heading>
          <p>Authorization Code: {authCode}</p>
          {/* You can display additional information or initiate token exchange here */}
        </div>
      )}
        
      </Flex>
    </div>
  );
};

export default OAuthPage;
