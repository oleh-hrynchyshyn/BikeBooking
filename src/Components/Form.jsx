import "../css/Form.css";
import "../Components/List";

import localForage from "localforage";
import { useState } from "react";

const Form = (props) => {
  const { data, setData } = props;

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [wheelSize, setWheelSize] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");

  const status = "list__available";

  const checkFirstSymbol = (value) => {
    if (/^\d|\s/g.test(value[0])) {
      alert("The first symbol cannot be a number or gap");
      return false;
    }
    return true;
  };

  const checkSign = (value) => {
    if (Number(value) <= 0) {
      alert("Zero or negative price is not allowed");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    let access = true;
    if (
      !(
        checkFirstSymbol(name) &&
        checkFirstSymbol(type) &&
        checkFirstSymbol(color) &&
        checkSign(wheelSize) &&
        checkSign(price)
      )
    ) {
      access = false;
    }

    event.preventDefault();
    data.map((elem) => {
      if (elem.id === id) {
        access = false;
        alert("should have a unique id");
      }

      return null;
    });
    if (access) {
      const newData = [
        ...data,
        {
          name: name,
          type: type,
          color: color,
          wheelSize: wheelSize,
          price: price,
          id: id,
          description: description,
          status: status,
        },
      ];
      setData(newData);
      localForage.removeItem("data").catch((err) => {
        console.log(err);
      });
      localForage.setItem("data", newData).catch((err) => {
        console.log(err);
      });
      handleClear();
    }
    access = true;
  };

  const handleClear = () => {
    setName("");
    setType("");
    setColor("");
    setWheelSize("");
    setId("");
    setDescription("");
    setPrice("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form" onReset={handleClear}>
        <input
          minLength={5}
          value={name}
          type="text"
          required
          placeholder="Name"
          className="form__name input"
          onChange={(event) => {
            setName(event.currentTarget.value);
          }}
        />
        <input
          value={type}
          required
          minLength={5}
          type="text"
          placeholder="Type"
          className="form__type input"
          onChange={(event) => {
            setType(event.currentTarget.value);
          }}
        />

        <input
          minLength={5}
          value={color}
          type="text"
          required
          placeholder="Color"
          className="form__color input"
          onChange={(event) => {
            setColor(event.currentTarget.value);
          }}
        />
        <input
          minLength={5}
          value={wheelSize}
          required
          type="number"
          placeholder="Wheel size"
          className="form__size input"
          onChange={(event) => {
            setWheelSize(event.currentTarget.value);
          }}
        />

        <input
          minLength={5}
          value={price}
          type="number"
          required
          placeholder="Price"
          className="form__price input"
          onChange={(event) => {
            setPrice(event.currentTarget.value);
          }}
        />

        <input
          value={id}
          required
          minLength={16}
          maxLength={16}
          placeholder="ID (slug) : XXXXXXXXXXXXXXXX"
          className="form__id input"
          onChange={(event) => {
            setId(event.currentTarget.value);
          }}
        />

        <textarea
          value={description}
          minLength={5}
          required
          placeholder="Description"
          className="form__description description"
          onChange={(event) => {
            setDescription(event.currentTarget.value);
          }}
        />

        <button type="submit" className="form__button">
          SAVE
        </button>
        <button type="reset" className="form__button">
          RESET
        </button>
      </form>
    </>
  );
};
export default Form;
