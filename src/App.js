import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const date = new Date().toLocaleDateString();

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
  };

  const deleteNote = () => {
    setNoteText("");
    let myDiv = document.getElementsByClassName("kapsayiciNotDivi");
    myDiv[0].classList.add("noshowcss");
    localStorage.clear();
    let myTextarea = document.getElementById("notearea");
    myTextarea.value = "";
    
  }


  //textarea'ya bir şeyler yazıldığında bunu yakala
  const handleInput = (e) => {
    setNoteText(e.target.value);
    localStorage.setItem("myNotes", e.target.value);
  };

  useEffect(() => {
    if(localStorage.myNotes && localStorage.myNotes !== ""){
      setNoteText(localStorage.myNotes)
    }
  }, [])

  return (
    <div className="App">
      <p>
        React Notes App - Hakan{" "}
        <button onClick={() => addNewElement()}>Not Ekle</button>
      </p>
      <div
        className={`kapsayiciNotDivi ${
          !showState ? "noshowcss" : "kapsayiciNotDivi"
        }`}
      >
        <div className="tarihparagrafi">
          <p>{date}</p>
          <div>
            <button>Edit</button>
            <button onClick={()=>deleteNote()}>Delete</button>
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
