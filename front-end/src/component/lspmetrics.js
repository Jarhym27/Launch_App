import { useEffect, useState, useContext } from "react";
import { RocketInfo } from "../App";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

const Metrics = () => {
  const { userLogin } = useContext(RocketInfo);
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
  );

  const [myRequests, setMyRequests] = useState([]);
  const [myFinishedRequests, setMyFinishedRequests] = useState([]);
  const [myPads, setPads] = useState([]);
  const [myVehiceles, setMyVehiceles] = useState([]);
  const [myUsers, setMyUsers] = useState([]);
  const [dataSet, setDataSet] = useState([]); //0 - Customer Spent, 1 - Orbit Popularity, 2 - Launch Vehicles, 3 - KGs Launched

  //TODO:
  //CHART FOR LAUNCH VEHICLES
  //CHART FOR ORBIT POPULARITY
  //KGS OF PAYLOADS LAUNCHED

  useEffect(() => {
    if (userLogin) {
      fetch("http://localhost:8080/join/launch_requests")
        .then((res) => res.json())
        .then((data) =>
          data.filter(
            (e) =>
              e.lsp_user_id == userLogin.id &&
              e.request_status !== "Denied" &&
              e.request_status !== "Pending"
          )
        )
        .then((filtered) => {
          setMyRequests(filtered.sort((a, b) => a.id - b.id));
          setMyFinishedRequests(
            filtered
              .filter((e) => e.request_status === "Launched")
              .sort((a, b) => a.id - b.id)
          );
          return filtered;
        })
        .then((requests) => {
          fetch("http://localhost:8080/table/users")
            .then((res) => res.json())
            .then((data) =>
              data.filter((e) =>
                requests.map((e) => e.payload_user_id).includes(e.id)
              )
            )
            .then((filtered) => {
              let users = filtered.sort((a, b) => a.id - b.id);
              setMyUsers(users);
              return users;
            })
            .then((users) => {
              let data0 = {
                labels: users.map((e) => e.organization),
                datasets: [
                  {
                    label: "$ Spent in Millions",
                    data: users.map((user) => {
                      let spent = 0;
                      requests.forEach((e) =>
                        e.payload_user_id == user.id
                          ? (spent += e.cost)
                          : (spent += 0)
                      );
                      return spent;
                    }),
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }
							console.log(requests)
							let yearsKgs = []
							requests.forEach((req) => {
								if(yearsKgs.map(e => e.year).includes(req.launch_date.slice(0, 4))){
									yearsKgs[yearsKgs.map(e => e.year).indexOf(req.launch_date.slice(0, 4))].weight += req.weight
								}
								else{
									yearsKgs.push({
										year: req.launch_date.slice(0, 4),
										weight: req.weight
									})
								}
								yearsKgs = yearsKgs.sort((a,b) => a.year - b.year)
							})
							let data3 = {
								labels: yearsKgs.map(e => e.year),
								datasets: [
									{
										label: 'Weight in Kilograms',
										data: yearsKgs.map(e => e.weight),
										borderColor: 'rgb(61, 13, 25)',
										backgroundColor: 'rgba(255, 99, 132, 0.5)',
									},
								],
							};
							console.log(data3)
              let copy = dataSet;
              copy[0] = data0;
							copy[3] = data3;
              setDataSet(copy);
            });
        });
    }
  }, [userLogin]);

  return (
    <>
      <h1 className="text-center">Metrics for: {userLogin.organization}</h1>
      <div className="row">
        <div className="col">
          {dataSet[0] ? (
            <>
              <h2 className="text-center">Customer Sales Data</h2>
              <Doughnut data={dataSet[0]} />
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="col">
          {dataSet[0] ? (
            <>
              <h2 className="text-center">Weight Launched / Launching</h2>
              <Line data={dataSet[3]} />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col">c</div>
        <div className="col">d</div>
      </div>
    </>
  );
};

export default Metrics;
