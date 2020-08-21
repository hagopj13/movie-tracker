# Movie Tracker

Demo: https://movie-tracker-react.netlify.app

> This project is a front-end React application that I created just for fun. You can use it to discover the latest movies and get more information on them. If you have a [TMDb](https://www.themoviedb.org/) account, you can login with that account in this app to rate movies, add them to your favorites list, and view your profile overview.

![Screenshot](images/screenshot.png?raw=true)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It uses:

- **React**: as the main UI library
- **Redux**: for state management (also using redux-saga and reselect)
- **React Router**: for routing
- **Material UI**: for React components that implement Material Design
- **Axios**: for making API requests to TMDb
- **Jest**: for testing
- **Flow**: for type checking
- ...many more

## Installation

**Clone the repo:**

```bash
git clone https://github.com/hagopj13/movie-tracker.git
cd movie-tracker
```

**Install the dependencies:**

```bash
npm install
```

**Set the environment variables:**

Create a `.env.development.local` file which includes all your secret environment variables. (Also `.env.production.local` for production builds and `.env.test.local` for testing).

This project needs the following environment variables:

```bash
REACT_APP_TMDB_API_KEY=<INSERT TMDB API KEY HERE>
```

To get a TMDb API key, visit https://www.themoviedb.org/documentation/api

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Attribution

This product uses the TMDb API but is not endorsed or certified by TMDb.
