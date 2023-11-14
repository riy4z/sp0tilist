// components/Main.js

import React, { useState } from 'react';
import {Flex,Button,Heading,Input,Drawer,DrawerHeader,DrawerFooter,DrawerBody} from '@sparrowengg/twigs-react';
import {UserIcon,EllipsisHorizontalIcon,ChevronDownIcon,} from '@sparrowengg/twigs-react-icons';

const Main = ({ onSurveyName }) => {
  const [surveyName, setSurveyName] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (e) => {
    setSurveyName(e.target.value);
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNext = () => {
    if (!surveyName) {
      alert('Please enter a survey name before proceeding.');
      return;
    }

    // Call the onSurveyName callback with the entered surveyName
    onSurveyName(surveyName);
  };

  return (
    <div style={{ backgroundColor: '#121212', height: '100%', width: '100%', position: 'absolute' }}>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <DrawerHeader>
          <Heading size="h4">Edit Profile</Heading>
        </DrawerHeader>
        <DrawerBody>Drawer content</DrawerBody>
        <DrawerFooter>Drawer Footer</DrawerFooter>
      </Drawer>
      <div style={{ margin: '10px', position: 'absolute', cursor: 'pointer' }}>
        <EllipsisHorizontalIcon size={60} color="white" onClick={() => setIsDrawerOpen(true)} />
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
            fontSize: '$5xl',
          }}
          weight="bold"
        >
          Spotilist
        </Heading>

        <Flex css={{ alignItems: 'center' }}>
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
            id="InputForSurvey"
            onChange={handleInputChange}
            leftIcon={<UserIcon />}
            placeholder="Enter your Name"
            value={surveyName}
          />
        </Flex>

        <Button
          css={{
            mt: '$22',
            background: '$primary',
            color: '$white900',
            padding: '$10 $15',
            marginTop: '$10',
            '&:hover, &:focus, &:active': {
              background: '#19B885',
              color: '$white900',
            },
          }}
          onClick={handleNext}
          size="lg"
          variant="default"
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
      >
        <Flex
          css={{
            height: isExpanded ? 'auto' : '57px',
            width: '500px',
            color: '$white900',
            border: '0.1px solid #363636',
            borderRadius: '$2xl',
            backgroundColor: '#1b1a1a',
            flexDirection: 'column',
            textAlign: 'left',
            marginTop: '$20',
            transition: 'height 0.2s ease-in-out, opacity 0.3s ease-in-out',
          }}
        >
          <div
            style={{
              background: '#101010',
              border: '0px solid #101010',
              paddingBottom: '$1',
              borderRadius: isExpanded ? '1rem 1rem 0rem 0rem' : '1rem 1rem 1rem 1rem',
            }}
          >
            <Heading
              css={{
                color: '$white900',
                textAlign: 'left',
                marginLeft: '15px',
                fontSize: '$lg',
                lineHeight: 1,
                marginBottom: '15px',
                cursor: 'pointer',
                transition: 'transform 0.3s ease-in-out',
              }}
              onClick={handleToggle}
            >
              What does Spotilist do?
              <ChevronDownIcon
                size={39}
                style={{
                  marginLeft: '47%',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </Heading>
          </div>
          <p style={{ padding: '15px', lineHeight: 1.3, opacity: isExpanded ? 1 : 0 }}>
            "Spotilist, powered by SurveySparrow Software Development Kit (SSDK), seamlessly combines the art of surveying with the magic of music, and recommending playlists based on individuals' preferences to elevate their auditory experience."
          </p>
        </Flex>
      </div>
    </div>
  );
};

export default Main;
