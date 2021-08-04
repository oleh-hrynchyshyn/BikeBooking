import "../css/List.css";

import localForage from "localforage";

const List = (props) => {
  const { data, setData } = props;

  const ListElem = (elem) => {
    return (
      <div id={elem.id} className={elem.status}>
        <div className="list__top">
          <div className="list__name">
            <span className="list__nameBold">{elem.name} </span> -{elem.type}(
            {elem.color})
          </div>
          <span
            className="list__close"
            onClick={() => {
              removeElement(elem.id);
            }}
          >
            X
          </span>
        </div>
        <div className="list__id">ID: {elem.id}</div>
        <div className="list__bottom">
          <div>
            Status:
            <select
              value={elem.status}
              className="list__select"
              onChange={(event) => {
                changeClass(
                  event.currentTarget.value,
                  event.nativeEvent.path[3],
                  event.nativeEvent.path[3].id
                );
              }}
            >
              <option value="list__available">Available</option>
              <option value="list__busy">Busy</option>
              <option value="list__unavailable">Unavailable</option>
            </select>
          </div>
          <div className="list__price">
            {Number(elem.price).toFixed(2)} UAH/hr.
          </div>
        </div>
      </div>
    );
  };

  const removeElement = (id) => {
    const newdata = data.filter((elem) => elem.id != id);

    localForage.removeItem("data").catch((err) => {
      console.log(err);
    });
    localForage.setItem("data", newdata).catch((err) => {
      console.log(err);
    });
    setData(newdata);
  };

  const changeClass = (key, target, id) => {
    target.className = key;
    const newData = data.map((e) => {
      if (e.id == id) {
        console.log(key);
        e.status = key;
      }
      return e;
    });
    localForage.removeItem("data").catch((err) => {
      console.log(err);
    });
    localForage.setItem("data", newData).catch((err) => {
      console.log(err);
    });

    setData(newData);
  };
  const arrStatus = ["list__available", "list__busy", "list__unavailable"];
  return (
    <>
      <div className="main__list">
        {data
          .sort((a, b) => {
            return arrStatus.indexOf(a.status) - arrStatus.indexOf(b.status);
          })
          .map((elem) => {
            return <>{ListElem(elem)}</>;
          })}
      </div>
    </>
  );
};
export default List;
