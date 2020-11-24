import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition'

import Main from './Main'
import QRShow from './QRShow'

function App() {
  return (
    <BrowserRouter>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper d-flex justify-content-center">
          <Route path="/" exact>
            <Main/>
          </Route>
          <Route path="/show">
            <QRShow/>
          </Route>
      </AnimatedSwitch>
    </BrowserRouter>
  );
}

export default App;
