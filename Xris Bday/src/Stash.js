import React from 'react';
import './Stash.css';
import { useEffect , useState } from 'react';
import {db} from './firebase-config'
import {addDoc, query ,collection, onSnapshot, deleteDoc , doc , setDoc} from 'firebase/firestore'

function Stash() {

    const [newItem, setNewItem] = useState('');
    const [newDescription, setNewDescription] = useState('')    
    const [newQuantity, setNewQuantity] = useState('') 
    const [items , setItems] = useState([]);
    const itemsCollectionRef = collection(db, 'items')
    const [isVisible, setIsVisible] = useState(false);
    const [isEdit , setIsEdit] = useState(false);
    const [tempid, setTempId] = useState('');
    const [search , setSearch] = useState('')

    useEffect(() => {
      const q = query(itemsCollectionRef); // Fix: Use itemsCollectionRef here
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let itemsArr = [];
        QuerySnapshot.forEach((doc) => {
          itemsArr.push({ ...doc.data(), id: doc.id });
        });
        setItems(itemsArr);
      });
      return () => unsubscribe();
    }, []);
  

    const clearForm = () => {
      setNewItem('')
      setNewDescription('')
      setNewQuantity('')
      setIsEdit(false)
    }

    const createItem = async(e) => {
      e.preventDefault()
     let  newItemCapital = newItem.charAt(0).toUpperCase() + newItem.slice(1)
      await addDoc(itemsCollectionRef, {name: newItemCapital, description: newDescription, quantity: newQuantity})
        clearForm()
    }
    
    const deleteItem = async (id) => {
      try {
        await deleteDoc(doc(db, 'items', id));
        console.log('Item deleted successfully!');
      } catch (error) {
        console.error('Error deleting item: ', error);
      }
    };

    const handleUpdate = async (item) => {
        setIsEdit(true)
        setTempId(item.id)
        setNewItem(item.name)
        setNewDescription(item.description)
        setNewQuantity(item.quantity)
    }
    const updateItem = async (id) => {

        const docRef = doc(db, 'items', tempid );
        const payload = {name: newItem, description: newDescription ,quantity: newQuantity}
        setDoc(docRef,payload)
        setIsEdit(false)
        setNewItem('')
        setNewDescription('')
        setNewQuantity('')
    }

    useEffect(() => {
      // Set isVisible to true after a delay
      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, 1000); // Adjust the delay time (in milliseconds) as needed
  
      // Clear the timeout to prevent memory leaks
      return () => clearTimeout(timeout);
    }, []);


    


  return (
    <div className={`stash ${isVisible ? 'visible' : ''}`}>
     <div className='stash-container'>
      <div className='center'>
        <h2 >Diablo II inventory ladder 2023</h2>
      </div>
     <div className='content'>
        <div className='searchbar'>
            <div className='inputs'>
            <form onSubmit={createItem} className='add-content'>
            <input className='addItem' required type='text' placeholder='Add item...' value={newItem} onChange={(event) => {setNewItem(event.target.value)}}></input>
            <input className='description' required type='text' placeholder='Add description...' value={newDescription} onChange={(event) => {setNewDescription(event.target.value)}}></input>
            <input className='quantity' type='number' placeholder='Qty' value={newQuantity} onChange={(event) => {setNewQuantity(event.target.value)}}></input>
            {isEdit ? (
            <><button className="submit-button" onClick={updateItem} >Edit</button>
              <button className="x-button" onClick={clearForm} >X</button>
            </> )
            
            : (<button className="submit-button" type='submit'>Submit</button>)}
            </form>
            <div className='search'>
            <input className='search-input' type='text' placeholder='Search...' onChange={(event) => {setSearch(event.target.value)}}></input>
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
                    <th children='buttons'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.filter((item) => {
                    return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
                  }).map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.quantity}</td>
                      <td className='actions'>
                        <div className='button-div'>
                        <button className='myButton' onClick={() => {handleUpdate(item)}}>Edit</button>
                        <button className='myButtonDelete' onClick={() => deleteItem(item.id)}>Delete</button>
                        </div>
                      </td>
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