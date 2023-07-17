import React, { useState } from "react";
import Home from "./Home"; // 추가

const App = () => {
  const [item,setItem] = useState([]);

  useEffect(() => {
    call("/cart/testcart","GET",null)
    .then((response) => setItem(response.data));
  }, []);
  
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
