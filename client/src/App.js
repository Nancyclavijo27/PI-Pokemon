import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom" //para cetiar las rutas
import LandingPage from "./components/LandingPage"
import Home from "./components/Home"
import creationPoke from "./components/CreationPoke"
import Detail from "./components/Detail"


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Switch>
         <Route  path="/pokemons/:id" component={Detail}/>
         <Route  exact path = "/home" component= {Home}/>
         <Route  path="/pokemon" component={creationPoke}/>
         <Route exact path = "/" component= {LandingPage}/>
      </Switch>
      </BrowserRouter>
      </div>
  
    
  );
}

export default App;
