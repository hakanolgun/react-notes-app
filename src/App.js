import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const dateN = new Date().toLocaleDateString();
  const timeN = new Date().toLocaleTimeString();

  const [date, setDate] = useState(dateN);
  const [time, setTime] = useState(timeN);

  // setTime({
  //   time = new Date().toLocaleTimeString()
  // });

  //Websayfası ilk açıldığında, Not yazma kısmı, eğer local storagede varsa gösterilsin yoksa gösterilmesin
  const [showState, setShowState] = useState(() => {
    if (localStorage.showState) {
      return true;
    } else {
      return false;
    }
  });

  //Notun içindeki yazıları varsa local storage'den çek yoksa boş bırak
  const [notetext, setNoteText] = useState("");

  //yeni not ekleme fonksiyonu
  const addNewElement = () => {
    setShowState(true);
    localStorage.setItem("showState", true);

    let myDiv = document.getElementsByClassName("kapsayiciNotDivi");
    myDiv[0].classList.remove("noshowcss");

    localStorage.setItem("myNotes", notetext);

    setDate(new Date().toLocaleDateString());
    setTime(new Date().toLocaleTimeString())
  };

  const deleteNote = () => {
    setNoteText("");
    let myDiv = document.getElementsByClassName("kapsayiciNotDivi");
    myDiv[0].classList.add("noshowcss");
    localStorage.clear();
    let myTextarea = document.getElementById("notearea");
    myTextarea.value = "";
    setDate(new Date().toLocaleDateString());
    setTime(new Date().toLocaleTimeString())
  };

  //textarea'ya bir şeyler yazıldığında bunu yakala
  const handleInput = (e) => {
    setNoteText(e.target.value);
    localStorage.setItem("myNotes", e.target.value);
    setDate(new Date().toLocaleDateString());
    setTime(new Date().toLocaleTimeString())
  };

  useEffect(() => {
    if (localStorage.myNotes && localStorage.myNotes !== "") {
      setNoteText(localStorage.myNotes);
    }
  }, []);

  return (
    <div className="App">
      <div className="titleP">
        <h1>React Notes App</h1>
        <Button className="btn btn-primary" onClick={() => addNewElement()}>
          Not Ekle
        </Button>
      </div>
      <div
        className={`kapsayiciNotDivi ${
          !showState ? "noshowcss" : "kapsayiciNotDivi"
        }`}
      >
        <div className="tarihparagrafi">
          <div>
            <p>{date} {time}</p>
          </div>
          <div>
            <Button className="btn btn-danger" onClick={() => deleteNote()}>
              Delete
            </Button>
          </div>
        </div>
        <textarea
          name="notearea"
          id="notearea"
          cols="30"
          rows="10"
          placeholder="Buraya notunuzu yazınız..."
          onChange={handleInput}
          value={localStorage.myNotes === "" ? notetext : localStorage.myNotes}
        ></textarea>
      </div>
    </div>
  );
}

export default App;
