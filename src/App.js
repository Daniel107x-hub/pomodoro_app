import React, { useLayoutEffect } from "react";

function App() {
  useLayoutEffect(() => {
    document.body.className = "bg-red-300";
  }, []);
  return <div>Hello</div>;
}

export default App;
