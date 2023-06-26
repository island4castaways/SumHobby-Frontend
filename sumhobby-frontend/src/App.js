import React, { useState } from "react";
import Home from "./Home"; // 추가

const App = () => {
  const [item,setItem] = useState([]);

  
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
