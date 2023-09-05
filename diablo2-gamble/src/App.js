
import './App.css';
import {useState , useEffect } from 'react'
import Left from './Left';
import Right from './Right';

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
    <div className='App'>
    <div className={`main-container ${isVisible ? 'visible' : ''}`}>
     <Left />
     <Right />
  </div>
  </div>
  );
}

export default App;
