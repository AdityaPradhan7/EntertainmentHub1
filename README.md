# Entertainment Hub 🎬🎵📚

Entertainment Hub is a React JS-based website that allows users to explore and discover movies, music, and books. The platform is divided into three main sections: Movies Hub, Music Hub, and Books Hub. Each section provides a seamless experience for users to search, sort, and filter content based on their preferences.

## 🌐 Live Website Link

[Entertainment Hub Live Website](https://entertainment-hub1-dusky.vercel.app/)

## 📦 Syncloop Package Link

[Syncloop Package](https://github.com/AdityaPradhan7/EntertainmentHub1/blob/main/Syncloop%20Package.zip)

## ✨ Features

### 🎬 Movies Hub
- **Default View**: Displays the most popular movies.
- **Search**: Search for any movie by title.
- **Sort**: Sort movies by popularity, rating, or release date.
- **Filter**: Filter movies by available genres.
- **Movie Description**: Read a short description about each movie.
- **API**: TMDB API with endpoints `/discover`, `/genre`, and `/search`.

### 🎵 Music Hub
- **Default View**: Displays the most popular songs.
- **Search**: Search for any song, artist, or album.
- **Preview**: Listen to a 30-second preview of the song.
- **External Links**: 
  - Song name redirects to Apple Music for more details.
  - Artist name redirects to Apple Music for more details.
  - Album name redirects to Apple Music for more details.
- **API**: iTunes API with endpoints `/topsongs` and `/search`.

### 📚 Books Hub
- **Default View**: Displays the most popular books.
- **Search**: Search for any book or author.
- **Filter**: Filter books by available genres.
- **External Links**:
  - Book name redirects to Open Library for more details.
  - Author name redirects to Open Library for more details.
- **API**: Open Library API with endpoints `/trending`, `/subjects`, and `/search`.

## 🛠️ Technologies Used

- **Frontend**: React JS
  - **Routing**: React Router
  - **State Management**: `useState` Hook, `useEffect` Hook
- **Dynamic Background**: Particles.js
- **API Management**: Syncloop Platform
- **APIs**: TMDB API, iTunes API, Open Library API
- **Styling**: CSS
- **HTTP Client**: Axios
