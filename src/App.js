import "./styles/App.css";
import Main from "./Components/main";
require('dotenv').config()

function App() {
  return (
    <div className="App">
      <header>
        <Main></Main>
      </header>
    </div>
  );
}

export default App;
