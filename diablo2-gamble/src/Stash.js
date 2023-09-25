import React from 'react';
import './Stash.css';
import { useEffect , useState } from 'react';
import {db} from './firebase-config'
import {addDoc, collection, getDocs} from 'firebase/firestore'

function Stash() {

    const [newItem, setNewItem] = useState('');
    const [newDescription, setNewDescription] = useState('')    
    const [newQuantity, setNewQuantity] = useState(0)  


    const [items , setItems] = useState([]);
    const itemsCollectionRef = collection(db, 'items')
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {

      const getItems = async () => {
        const data = await getDocs(itemsCollectionRef)
        setItems(data.docs.map(((doc) => ({...doc.data()}))));
        console.log(items.name)
      }
      getItems()
    }, [])
  
    const createItem = async() => {
      await addDoc(itemsCollectionRef, {name: newItem, description: newDescription, quantity: newQuantity})
    }

    useEffect(() => {
      // Set isVisible to true after a delay
      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, 700); // Adjust the delay time (in milliseconds) as needed
  
      // Clear the timeout to prevent memory leaks
      return () => clearTimeout(timeout);
    }, []);


    


  return (
    <div className={`stash ${isVisible ? 'visible' : ''}`}>
     <div className='stash-container'>
     <h2 className='stashH2'>IM STAASHED INVETORY</h2>
     <div className='content'>
        <div className='searchbar'>
            <div className='inputs'>
            <div className='add-content'>
            <input className='addItem' type='text' placeholder='Add item...' onChange={(event) => {setNewItem(event.target.value)}}></input>
            <input className='description' type='text' placeholder='Add item...' onChange={(event) => {setNewDescription(event.target.value)}}></input>
            <input className='quantity' type='text' placeholder='Qty'onChange={(event) => {setNewQuantity(event.target.value)}}></input>
            <button className="submit-button" onClick={createItem}>Submit</button>
            </div>
            <div className='search'>
            <input className='search-input' type='text' placeholder='Search...'></input>
            </div>
          
            </div>
         </div>
          <div className='table-container'>
            <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
     </div>
    </div>
    </div>
  );
}

export default Stash;