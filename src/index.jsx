import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import { MainView } from './components/main-view/main-view';
import { store } from "./redux/store";
import { Provider } from "react-redux";

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
function YMDBApplication() {
  return (
    <Provider store={store}>
      <Container fluid className='everything-container p-0'>
        <MainView />
      </Container>
    </Provider>
  );
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(YMDBApplication), container);