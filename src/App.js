import logo from './logo.svg';
import './App.css';
import * as DIFCClient from './client/index.js';

function App () {
  window.DIFCClient = DIFCClient;
  return (
    <div className="App">
      <header className="App-header">
        <body>
          <h1>Hello, please look at the console!</h1>
          <h3>Get ready for new research!</h3>
        </body>
      </header>
    </div>
  );
}

export default App;
