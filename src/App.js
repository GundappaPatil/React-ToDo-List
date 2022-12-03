import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import "./App.css";

// to get the data from localStorage
const getLocalItems = () => {
  let list = localStorage.getItem("lists");

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const App = () => {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem() {
    if (!inputText) {
      alert("plzz fill data");
    } else if (inputText && !toggleSubmit) {
      setItems(
        items.map((item) => {
          if (item.id === isEditItem) {
            return { ...item, name: inputText };
          }
          return item;
        })
      );
      setToggleSubmit(true);
      setInputText("");
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputText,
      };
      setItems([...items, allInputData]);
      setInputText("");
    }
  }

  const handleDelete = (index) => {
    setItems(
      items.filter((item) => {
        return index !== item.id;
      })
    );
  };

  const handleEdit = (id) => {
    let newEditItem = items.find((item) => {
      return item.id === id;
    });
    console.log(newEditItem);
    setToggleSubmit(false);
    setInputText(newEditItem.name);
    setIsEditItem(id);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <Header />
        </div>
        <div>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Enter a Todo......"
            className="task-input"
            value={inputText}
          />
          {toggleSubmit ? (
            <button onClick={addItem} className="button-add" type="submit">
              Add
            </button>
          ) : (
            <button
              onClick={addItem}
              className="button-edit task-button"
              type="submit"
            >
              <i className="fa fa-edit"></i>
            </button>
          )}
        </div>
        <div>
          <ul>
            {items.map((item) => (
              <li className="list-item" key={item.id}>
                <span className="list">{item.name}</span>
                <div>
                  <button className="button-complete task-button">
                    <i className="fa fa-check-circle"></i>
                  </button>
                  <button
                    className="button-edit task-button"
                    onClick={() => handleEdit(item.id)}
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                  <button
                    className="button-delete task-button"
                    onClick={() => handleDelete(item.id)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
