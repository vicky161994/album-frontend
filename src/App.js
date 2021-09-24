import './App.css';
import {BrowserRouter, Route} from "react-router-dom"
import Home from './pages/Home';
import Header from './component/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  return (
    <BrowserRouter>
    <Header />
    <main>
    <Route path="/" component={Home} exact />
    <Route path="/login" component={Login} exact />
    <Route path="/signup" component={Signup} exact />
    </main>
    </BrowserRouter>

  );
}

export default App;
