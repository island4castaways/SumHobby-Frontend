import './App.css';
import { call } from "./service/ApiService"
import { useEffect, useState } from 'react';

function App() {
  const [item, setItem] = useState([]);

  useEffect(() => {
    call("/cart/testcart", "GET", null)
    .then((response) => setItem(response.data));
  }, []);
  
  const addItem = (item) => {
    call("/update","POST", item)
    .then((Response)=> setItem(Response.data))
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {item}
        </p>
      </header>
    </div>
  );
};

export default App;