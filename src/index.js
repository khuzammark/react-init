import ReactDOM from 'react-dom';
import { themeProvider } from 'dpcomponents';

import App from './App';

import './constants/reset.scss';
import './constants/styles.scss';

ReactDOM.render(themeProvider(App), document.getElementById('root'));
