import "./App.css";
import { AuthContextProvider } from "./context/authContext";

import Routing from "./components/router";



function App() {
 

  return (
    <AuthContextProvider>
      <Routing />
    </AuthContextProvider>
  );
}

export default App;
