import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './components/main';
import Genre from './components/genre';
import Category from './components/category';
import Artist from './components/artist';
import OAuthPage from './components/oauth';
import Playlist from './components/playlist';
import { ThemeProvider } from '@sparrowengg/twigs-react';

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [child, setChild] = useState(<h3 style={{"textAlign":"center","marginTop":"100px"}}>App is loading...</h3>);
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const [favoriteCategories, setFavoriteCategories] = useState([]);
  const [favoriteArtists, setFavoriteArtists] = useState([]);
  const [surveyNames, setSurveyNames] = useState([]);
  const [currentStep, setCurrentStep] = useState('main');
  const [currentSurveyName, setCurrentSurveyName] = useState('');

  const handleAuthSuccess = () => {
    setCurrentStep('playlist');
  };

  const handleSurveyName = (name) => {
    setSurveyNames([...surveyNames, name]);
    setCurrentSurveyName(name);
    setCurrentStep('genre');
  };
  
  const navigateToCategory = (selectedGenres) => {
    setFavoriteGenres(selectedGenres); // Corrected function name
    setCurrentStep('category');
  };
  const navigateToArtist = (selectedCategories) => {
    setFavoriteCategories(selectedCategories);
    setCurrentStep('artist');
  };
  const navigateToOAuth = (selectedArtist) => {
    setFavoriteArtists(selectedArtist);
    setCurrentStep('oauthPage');
  };


  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
  
    switch (currentStep) {
      default:
        setChild(<Main onSurveyName={handleSurveyName} />);
        break;
      case 'genre':
          setChild(<Genre surveyName={currentSurveyName} navigateToCategory={navigateToCategory} />);
          break;
      case 'category':
          setChild(<Category favoriteGenres={favoriteGenres} navigateToArtist={navigateToArtist} />);
          break;
      case 'artist':
        setChild(<Artist favoriteCategories={favoriteCategories} navigateToOAuth={navigateToOAuth}/>);
        break;  
      case 'oauthPage':
        setChild(<OAuthPage surveyName={currentSurveyName} onAuthSuccess={handleAuthSuccess} />);
        break;
      case 'playlist':
        setChild(<Playlist favoriteCategories={favoriteCategories} favoriteArtists={favoriteArtists} />);
        break;

    }
  }, [currentStep, loaded]);
  return (
    <ThemeProvider theme={{
      "colors": {
        "primary": '#1ed760',
        "secondary": "#363A43",
        "accent50": "#F3F3FF",
        "accent100": "#EAE9FE",
        "accent200": "#D7D6FE",
        "accent300": "#B9B5FD",
        "accent400": "#978CF9",
        "accent500": "#7158F5",
        "accent600": "#623BEC",
        "accent700": "#5329D8",
        "accent800": "#4622B5",
        "accent900": "#3B1E94",
        "primary50": "#F3F9FA",
        "primary100": '#121212',
        "primary200": '#242424',
        "primary300": "#9CCFD6",
        "primary400": "#56B0BB",
        "primary500": "#4A9CA6",
        "primary600": "#448E97",
        "primary700": "#3B8088",
        "primary800": "#36737A",
        "primary900": "#2E666D",
        "warning50": "#FFF6EF",
        "warning100": "#FEEAC7",
        "warning200": "#FDD28A",
        "warning300": "#FCBD4F",
        "warning400": "#FBAB24",
        "warning500": "#F59E0B",
        "warning600": "#DB8D06",
        "warning700": "#B47409",
        "warning800": "#92610E",
        "warning900": "#78510F",
        "highlight50": "#FFFCDA",
        "highlight100": "#FFF7AD",
        "highlight200": "#FFF27D",
        "highlight300": "#FFED4B",
        "highlight400": "#FFE81A",
        "highlight500": "#E6CF00",
        "highlight600": "#B3A100",
        "highlight700": "#807300",
        "highlight800": "#786B03",
        "highlight900": "#6A5F00",
        "positive50": "#F4FAF1",
        "positive100": "#E8F4E3",
        "positive200": "#D4E8CA",
        "positive300": "#A8D291",
        "positive400": "#67B034",
        "positive500": "#5EA130",
        "positive600": "#55932A",
        "positive700": "#4C8425",
        "positive800": "#437720",
        "positive900": "#3C691C",
        "secondary50": "#F4F6F7",
        "secondary100": "#E2E6EB",
        "secondary200": "#C9CFD8",
        "secondary300": "#A3AEBD",
        "secondary400": "#76859A",
        "secondary500": "#64748B",
        "secondary600": "#4E596C",
        "secondary700": "#444B5A",
        "secondary800": "#3D424D",
        "secondary900": "#363A43",
        "negative50": "#FFF6F3",
        "negative100": "#FDEDE8",
        "negative200": "#FFDAD0",
        "negative300": "#FFB4A1",
        "negative400": "#FA7659",
        "negative500": "#F65633",
        "negative600": "#E75030",
        "negative700": "#D14729",
        "negative800": "#BC4024",
        "negative900": "#A9371E",
        "neutral50": "#F8F8F8",
        "neutral100": "#F1F1F1",
        "neutral200": "#E2E2E2",
        "neutral300": "#C6C6C6",
        "neutral400": "#9E9E9E",
        "neutral500": "#919191",
        "neutral600": "#848484",
        "neutral700": "#767676",
        "neutral800": "#6A6A6A",
        "neutral900": "#2B2B2B",
        "black50": "#0000000A",
        "black100": "#00000014",
        "black200": "#0000001A",
        "black300": "#00000026",
        "black400": "#00000033",
        "black500": "#0000004D",
        "black600": "#00000080",
        "black700": "#000000B2",
        "black800": "#000000CC",
        "black900": "#000000",
        "white50": "#FFFFFF0D",
        "white100": "#FFFFFF14",
        "white200": "#FFFFFF1A",
        "white300": "#FFFFFF26",
        "white400": "#FFFFFF33",
        "white500": "#FFFFFF4D",
        "white600": "#FFFFFF80",
        "white700": "#FFFFFFB2",
        "white800": "#FFFFFFCC",
        "white900": "#FFFFFF"
      },
      "space": {
        "1": "0.125rem",
        "2": "0.25rem",
        "3": "0.375rem",
        "4": "0.5rem",
        "5": "0.625rem",
        "6": "0.75rem",
        "7": "0.875rem",
        "8": "1rem",
        "9": "1.125rem",
        "10": "1.25rem",
        "11": "1.375rem",
        "12": "1.5rem",
        "13": "1.625rem",
        "14": "1.75rem",
        "15": "1.875rem",
        "16": "2rem",
        "17": "2.125rem",
        "18": "2.25rem",
        "19": "2.375rem",
        "20": "2.5rem",
        "21": "2.625rem",
        "22": "2.75rem",
        "23": "2.875rem",
        "24": "3rem",
        "25": "3.125rem",
        "26": "3.25rem",
        "27": "3.375rem",
        "28": "3.5rem",
        "29": "3.625rem",
        "30": "3.75rem",
        "31": "3.875rem",
        "32": "4rem",
        "33": "4.125rem",
        "34": "4.25rem",
        "35": "4.375rem",
        "36": "4.5rem",
        "37": "4.625rem",
        "38": "4.75rem",
        "39": "4.875rem",
        "40": "5rem",
        "41": "5.125rem",
        "42": "5.25rem",
        "43": "5.375rem",
        "44": "5.5rem",
        "45": "5.625rem",
        "46": "5.75rem",
        "47": "5.875rem",
        "48": "6rem",
        "49": "6.125rem",
        "50": "6.25rem"
      },
      "fontSizes": {
        "xxs": "0.579rem",
        "xs": "0.694rem",
        "sm": "0.833rem",
        "md": "1rem",
        "lg": "1.2rem",
        "xl": "1.44rem",
        "2xl": "1.728rem",
        "3xl": "2.074rem",
        "4xl": "2.488rem",
        "5xl": "4.986rem"
      },
      "fonts": {
        "body": "system-ui",
        "heading": "sans-serif"
      },
      "fontWeights": {
        "1": "100",
        "2": "200",
        "3": "300",
        "4": "400",
        "5": "500",
        "6": "600",
        "7": "700",
        "8": "800",
        "9": "900"
      },
      "lineHeights": {
        "xxs": "0.75rem",
        "xs": "1rem",
        "sm": "1.25rem",
        "md": "1.5rem",
        "lg": "1.75rem",
        "xl": "2rem",
        "2xl": "2.5rem",
        "3xl": "3rem",
        "4xl": "4rem"
      },
      "letterSpacings": {},
      "sizes": {
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "7": "28px",
        "8": "32px",
        "9": "36px",
        "10": "40px",
        "11": "44px",
        "12": "48px",
        "13": "52px",
        "14": "56px",
        "15": "60px",
        "16": "64px",
        "17": "68px",
        "18": "72px",
        "19": "76px",
        "20": "80px",
        "21": "84px",
        "22": "88px",
        "23": "92px",
        "24": "96px",
        "25": "100px",
        "26": "104px",
        "27": "108px",
        "28": "112px",
        "29": "116px",
        "30": "120px",
        "31": "124px",
        "32": "128px",
        "33": "132px",
        "34": "136px"
      },
      "borderWidths": {
        "xs": "1px",
        "sm": "2px",
        "md": "3px",
        "lg": "4px",
        "xl": "5px"
      },
      "borderStyles": {},
      "radii": {
        "none": "0px",
        "xs": "0.125rem",
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.25rem",
        "4xl": "1.5rem",
        "round": "50%",
        "pill": "9999px"
      },
      "shadows": {
        "sm": "0px 5px 15px rgba(0, 0, 0, 0.04)"
      },
      "zIndices": {},
      "transitions": {
        "1": "0.1s",
        "2": "0.2s",
        "3": "0.3s"
      }
    }}>
    {child}
    </ThemeProvider>
  )
}

export default App;
