
import './App.css';
import {useState , useEffect } from 'react'
import Home from './Home'
import {
  BrowserRouter as Router,
  Routes,
  Route, Link,
} from "react-router-dom";
import Stash from './Stash';
function App() {

  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Set isVisible to true after a delay
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Adjust the delay time (in milliseconds) as needed

    // Clear the timeout to prevent memory leaks
    return () => clearTimeout(timeout);
  }, []);


  return (
<Router>
    <div className='App'>
      <div className='navbar'>
      <Link className='link' to='/'>Home</Link>
      <Link className='link' to='/stash'>Stash</Link>
      </div>
      
    <div className={`main-container ${isVisible ? 'visible' : ''}`}>

    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/stash' element={<Stash />}></Route>
    </Routes>
  </div>
  </div>
  </Router>
  );
}

export default App;
