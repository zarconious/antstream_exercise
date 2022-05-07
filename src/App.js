import "./App.css";
import Layout from "./components/Layout";
import Page from "./components/Page";
import Modal from "./components/Modal";
import Header from "./components/Header";
import {InputContextProvider} from "./components/InputContext";
import { useState } from "react";

function App() {
  const [modal, setModal] = useState(false);

  function handleOpenModal(){
    setModal(!modal);
  }

  return (
    <div>
      <Header />
      <InputContextProvider openModal={handleOpenModal}>
      {modal ? <Modal openModal={handleOpenModal}/> : <Page openModal={handleOpenModal}/>}
      </InputContextProvider>
    </div>
  );
}

export default App;
