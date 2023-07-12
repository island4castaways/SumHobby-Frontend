import React, { useEffect, useState } from 'react';
import { call } from './service/ApiService';
import Home from './Home';

function App() {
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    call('/class/top-rated', 'GET', null)
      .then((response) => {
        if (response && response.data) {
          setClassData(response.data);
        }
      })
      .catch((error) => console.log('Error:', error));
  }, []);

  return (
    <div className="App">
      <Home classData={classData} />
    </div>
  );
}

export default App;
