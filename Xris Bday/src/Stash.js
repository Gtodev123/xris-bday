import React, { useEffect, useState } from 'react';
import { db } from './firebase-config';
import { addDoc, query, collection, onSnapshot, deleteDoc, doc, setDoc } from 'firebase/firestore';

function Stash() {
  const [newItem, setNewItem] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newQuantityKids , setNewQuantityKids] = useState('')
  const [items, setItems] = useState([]);
  const itemsCollectionRef = collection(db, 'items');
  const [isEdit, setIsEdit] = useState(false);
  const [tempid, setTempId] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const q = query(itemsCollectionRef);
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
    setNewItem('');
    setNewDescription('');
    setNewQuantity('');
    setNewQuantityKids('');
    setIsEdit(false);
  };

  const createItem = async (e) => {
    e.preventDefault();
    let newItemCapital = newItem.charAt(0).toUpperCase() + newItem.slice(1);
    await addDoc(itemsCollectionRef, { name: newItemCapital, description: newDescription, quantity: newQuantity , quantityKids: newQuantityKids });
    clearForm();
  };

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, 'items', id));
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  const handleUpdate = (item) => {
    setIsEdit(true);
    setTempId(item.id);
    setNewItem(item.name);
    setNewDescription(item.description);
    setNewQuantity(item.quantity);
  };

  const updateItem = async () => {
    const docRef = doc(db, 'items', tempid);
    const payload = { name: newItem, description: newDescription, quantity: newQuantity };
    setDoc(docRef, payload);
    clearForm();
  };

  return (
    <div className="stash-container">
      <div className="center">
        <h2>Потвърдете вашето присъствие</h2>
      </div>
      <div className="content">
        <div className="searchbar">
          <div className="inputs">
            <form onSubmit={createItem} className="add-content">
              <input className="addItem" required type="text" style={{textTransform: "capitalize"}} placeholder="Име и Фамилия" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
              <input className="quantity" type="number" placeholder="Брой Гости Деца" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} />
              <input className="quantityKids" type="number" placeholder="Брой Гости Възрастни" value={newQuantityKids} onChange={(e) => setNewQuantityKids(e.target.value)} />
              {isEdit ? (
                <>
                  <button className="submit-button" onClick={updateItem}>Edit</button>
                  <button className="x-button" onClick={clearForm}>X</button>
                </>
              ) : (
                <button className="submit-button" type="submit">Запис</button>
              )}
            </form>
          </div>
        </div>
      {/*  <div className="table-container">
  <table>
    <thead>
      <tr>
        <th>Име</th>
        <th>Описание</th>
        <th>Гости Възрастни</th>
        <th>Гости Деца</th> 
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      {items
        .filter((item) =>
          search.toLowerCase() === '' ? true : item.name.toLowerCase().includes(search)
        )
        .map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.quantity}</td>
            <td>{item.quantityKids}</td>
            <td className="actions">
              <div className="button-div">
                <button className="myButton" onClick={() => handleUpdate(item)}>Edit</button>
                <button className="myButtonDelete" onClick={() => deleteItem(item.id)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
</div>*/}
      </div>
    </div>
  );
}

export default Stash;