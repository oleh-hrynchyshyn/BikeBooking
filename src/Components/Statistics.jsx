import "../css/Statistics.css";

const Statistics = (props) => {
  const { data, setData } = props;

  const availableBikesCount = data.filter(
    (el) => el.status === "list__available"
  ).length;

  const bookedBikesCount = data.filter(
    (el) => el.status === "list__busy"
  ).length;

  const avgPrice =
    data.reduce((accum, curr) => {
      return accum + Number(curr.price);
    }, 0) ||
    0 / data.length ||
    0;

  return (
    <>
      <div className="statistics">
        <div className="statistics__header">
          <span className="statistics__value">STATISTICS</span>
        </div>
        <div className="statistics__total">
          Total Bikes: <span className="statistics__value"> {data.length}</span>
        </div>
        <div className="statistics__booked">
          Available Bikes:{" "}
          <span className="statistics__value"> {availableBikesCount}</span>
        </div>
        <div className="statistics__booked">
          Booked Bikes:{" "}
          <span className="statistics__value"> {bookedBikesCount}</span>
        </div>
        <div className="statistics__averageCost">
          Average bike cost:{" "}
          <span className="statistics__value">
            {avgPrice ? avgPrice.toFixed(2) : "0.00"}
          </span>{" "}UAH/hr.
        </div>
      </div>
    </>
  );
};
export default Statistics;
