import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import './index.css'


if (document.getElementById('root').hasChildNodes()) {
  ReactDOM.hydrate(<Routes />, document.getElementById('root'));
} else {
  ReactDOM.render(<Routes />, document.getElementById('root'));
}
