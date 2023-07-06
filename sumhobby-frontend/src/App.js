import './App.css';
import Cart from './Cart';
import {call} from "./service/ApiService"
import { useEffect, useState } from 'react';

function App() {

  const [item, setItem] = useState([]);

  useEffect(() => {
    call("/cart/testcart","GET",null)
    .then((response) => setItem(response.data));
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          {item}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          
        </a>
      </header>
    </div>
  );
};

export default App;
