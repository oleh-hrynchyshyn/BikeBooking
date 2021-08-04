/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import List from "./Components/List";
import Form from "./Components/Form";
import Statistics from "./Components/Statistics";

import localForage from "localforage";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    localForage
      .getItem("data")
      .then((value) => {
        if (value.length !== 0) setData(value);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main">
        <List data={data} setData={setData} />
        <div className="main__form">
          <Form data={data} setData={setData} />
          <Statistics data={data} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
