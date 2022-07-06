import "./App.css";
import { useState, useEffect } from "react";
import Item from "./Item";
import uniqid from "uniqid";

function App() {
  const [newItem, setNewItem] = useState({
    quantity: 1,
    item: "",
    notes: "",
    id: "",
  });

  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewItem((prevState) => {
      return {
        ...prevState,
        [name]: value,
        id: uniqid(),
      };
    });
  };

  const removeItem = (id) =>
    setItems((prevState) => prevState.filter((item) => item.id !== id));

  const editItem = (id, value) => {
    const newArray = [...items];
    newArray[newArray.findIndex((item) => item.id === id)] = value;
    setItems(newArray);
  };

  useEffect(
    () => localStorage.setItem("items", JSON.stringify(items)),
    [items]
  );

  return (
    <div className="App">
      <input
        type="number"
        value={newItem.quantity}
        onChange={handleChange}
        id="quantity"
        name="quantity"
        min="1"
      />
      <input
        type="text"
        placeholder="Item"
        value={newItem.item}
        onChange={handleChange}
        id="item"
        name="item"
      />
      <input
        type="text"
        placeholder="Notes"
        value={newItem.notes}
        onChange={handleChange}
        id="notes"
        name="notes"
      />
      <button
        onClick={() => {
          setItems((prevState) => [newItem, ...prevState]);
          setNewItem({
            quantity: 1,
            item: "",
            notes: "",
          });
        }}
      >
        Add Item
      </button>
      <br />
      <br />
      <table>
        <thead>
          <tr
            style={{
              fontSize: "20px",
              color: "red",
              backgroundColor: "yellow",
            }}
          >
            <th style={{ width: "30px" }}></th>
            <th style={{ width: "100px" }}>Quantity</th>
            <th style={{ width: "150px" }}>Item</th>
            <th style={{ width: "200px" }}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <Item {...item} key={item.id} remove={removeItem} edit={editItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
