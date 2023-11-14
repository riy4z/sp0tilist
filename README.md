# Spotilist - Playlist Recommendation App

Spotilist is a React application that enables users to customize their music preferences and receive personalized playlists based on their favorite genres and artists. The app integrates with the Spotify API to fetch music-related data.

## Components

### 1. Main Component

#### Description

The Main component serves as the main entry point for the Spotilist app. It consists of several sub-components, each catering to specific functionalities.

#### Sub-Components

- **Genre Component**: Displays a list of music genres retrieved from the Spotify API. Users can select their favorite genres, and it provides visual feedback for the selected genres.

- **Category Component**: Fetches music categories from the Spotify API and allows users to select their preferences. It provides a visually appealing interface for users to choose their preferred music categories.

- **Artist Component**: Fetches and displays a list of artists based on user preferences. Users can select their favorite artists, and the component provides visual feedback for the selected artists.

- **OAuthPage Component**: Handles the Spotify OAuth authentication process, allowing users to log in to their Spotify account.

- **Playlist Component**: Fetches playlists recommended for the user based on their selected genres and artists. Displays the recommended playlists with clickable links to open them in Spotify.

#### Navigation Flow

1. User starts with the Main Component, gets user name and navigates to Genre Component.
2. After selecting favorite genres, they navigate to the Category Component.
3. In the Category Component, users choose their preferred music categories and proceed to the Artist Component.
4. The Artist Component allows users to select their favorite artists and navigate to the OAuthPage Component for Spotify authorization.
5. Once authorized, users are directed to the Playlist Component, which displays personalized playlists.

## Usage

To run the Spotilist app locally:

1. Install SSDK and Get Domain & API Token from SurveySparrow to test your development, Know how to [setup](https://sdk.surveysparrow.dev/)
2. `ssdk create` in the terminal
3. Select `your_first_react_app` in the terminal
4. Clone the repository and replace the files in the template
5. Enter `npm i` to install required packages
6. `ssdk run` to run the spotilist web application
7. Navigate to `localhost:30001/custom_configs` to install your SurveySparrow API key for your custom app.
8. Navigate to `https://yourdomain.surveysparrow.com/settings/marketplace-apps?dev=true` to test your app.

NOTE: Make sure you get your client ID and client secret and replace the CLIENT_ID and CLIENT_SECRET in the js files orelse spotify API won't work

## Spotify API Integration

The app integrates with the Spotify API for fetching music-related data. Ensure that you have a Spotify Developer account, and obtain the client ID and client secret for authentication.

## SurveySparrow SDK (SSDK) Integration

Spotilist leverages the SurveySparrow Software Development Kit (SSDK) for React local development. The SSDK incorporates Webpack 5, offering native support for React applications. This tutorial provides a comprehensive guide for implementing React applications using the SSDK.

## Dependencies

- **React**: The main JavaScript library for building user interfaces.
- **@sparrowengg/twigs-react**: UI components for styling and layout.
- **@sparrowengg/twigs-react-icons**: Icons for visual elements.
- **Spotify API**: Used for accessing music genres, categories, artists, and playlists.

## Screenshots

1. Main
<img width="1280" alt="image" src="https://github.com/riy4z/sp0tilist/assets/56198819/3ea7c419-896c-4d51-9124-1dde7d5bb2fe">
<br>
<div>
</div>
2. Genre
<img width="1280" alt="image" src="https://github.com/riy4z/sp0tilist/assets/56198819/9b9c55ff-c2ae-4b6e-857b-ce245c8af04a">

3. Category
<img width="1280" alt="image" src="https://github.com/riy4z/sp0tilist/assets/56198819/57a8d935-05dd-4118-8c48-d844829fcc06">

4. Artists
<img width="1280" alt="image" src="https://github.com/riy4z/sp0tilist/assets/56198819/6e731669-ec21-417b-85a7-ff5ac0539b2a">

5. OAuth
<img width="1280" alt="image" src="https://github.com/riy4z/sp0tilist/assets/56198819/e5491674-221b-4b8c-b128-b8bf62ee7d87">
<img width="703" alt="image" src="https://github.com/riy4z/sp0tilist/assets/56198819/7f772ab0-111e-4af3-b7ed-71ef42924807">

6. Playlist
<img width="1280" alt="image" src="https://github.com/riy4z/sp0tilist/assets/56198819/eb270a2c-220b-4f76-ba30-5f417cca5c9b">

## Authors

- [riy4z](https://github.com/riy4z)

## License

This project is licensed under the [MIT License](LICENSE).
