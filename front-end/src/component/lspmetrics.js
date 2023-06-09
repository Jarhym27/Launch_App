import { useEffect, useState, useContext } from "react";
import { RocketInfo } from "../App";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Doughnut, Line, Pie, Bar, Canvas } from "react-chartjs-2";
import "../css/metrics.css";

const Metrics = () => {
  const { userLogin } = useContext(RocketInfo);
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
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
              //Customer Sales Data
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
                      "rgba(96, 80, 220, 0.4)",
                      "rgba(255, 107, 69, 0.4)",
                      "rgba(255, 46, 126, 0.4)",
                      "rgba(75, 192, 192, 0.8)",
                      "rgba(153, 102, 255, 0.8)",
                      "rgba(255, 159, 64, 0.8)",
                    ],
                    borderColor: [
                      "rgba(96, 80, 220, 1)",
                      "rgba(255, 107, 69, 1)",
                      "rgba(255, 46, 126, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              };

              //KGS Launched Data
              let yearsKgs = [];
              requests.forEach((req) => {
                if (
                  yearsKgs
                    .map((e) => e.year)
                    .includes(req.launch_date.slice(0, 4))
                ) {
                  yearsKgs[
                    yearsKgs
                      .map((e) => e.year)
                      .indexOf(req.launch_date.slice(0, 4))
                  ].weight += req.weight;
                } else {
                  yearsKgs.push({
                    year: req.launch_date.slice(0, 4),
                    weight: req.weight,
                  });
                }
                yearsKgs = yearsKgs.sort((a, b) => a.year - b.year);
              });
              let data3 = {
                labels: yearsKgs.map((e) => e.year),
                datasets: [
                  {
                    label: "Weight in Kilograms",
                    data: yearsKgs.map((e) => e.weight),
                    borderColor: "rgb(61, 13, 25)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                  },
                ],
              };

              //Orbit Popularity Data
              let orbitData = [];
              requests.forEach((req) => {
                if (
                  orbitData.map((e) => e.type).includes(req.orbital_requirement)
                ) {
                  orbitData[
                    orbitData
                      .map((e) => e.type)
                      .indexOf(req.orbital_requirement)
                  ].count++;
                } else {
                  orbitData.push({
                    type: req.orbital_requirement,
                    count: 1,
                  });
                }
              });
              let data1 = {
                labels: orbitData.map((e) => e.type), //orbitData.map((e) => e.type)
                datasets: [
                  {
                    label: "# Payloads Launched",
                    data: orbitData.map((e) => e.count), //orbitData.map(e => e.count)
                    backgroundColor: [
                      "rgba(16, 29, 66, 0.8)",
                      "rgba(68, 91, 156, 0.8)",
                      "rgba(102, 137, 237, 0.8)",
                      "rgba(163, 185, 247, 0.8)",
                      "rgba(215, 224, 250, 0.8)",
                      "rgba(255, 159, 64, 0.8)",
                    ],
                    borderColor: [
                      "rgba(16, 29, 66, 1)",
                      "rgba(23, 31, 120, 1)",
                      "rgba(102, 137, 237, 1)",
                      "rgba(163, 185, 247, 1)",
                      "rgba(215, 224, 250, 1)",
                      "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              };
              console.log(requests);
              //Launch Vehicle Data
              let lvData = [];
              requests.forEach((req) => {
                if (lvData.map((e) => e.rocket).includes(req.launch_vehicle)) {
                  lvData[
                    lvData.map((e) => e.rocket).indexOf(req.launch_vehicle)
                  ].count++;
                } else {
                  lvData.push({
                    rocket: req.launch_vehicle,
                    count: 1,
                  });
                }
              });
              let data2 = {
                labels: lvData.map((e) => e.rocket),
                datasets: [
                  {
                    label: "Launches",
                    data: lvData.map((e) => e.count),
                    backgroundColor: [
                      "rgba(219, 70, 100, 0.7)",
                      "rgba(78, 56, 150, 0.7)",
                      "rgba(54, 122, 173, 0.7)",
                      "rgba(55, 52, 89, 0.7)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                    ], //rgba(61, 18, 39, 0.7)
                    borderColor: "rgba(0,0,0 , 1)"
                  },
                ],
              };

              let copy = dataSet;
              copy[0] = data0;
              copy[1] = data1;
              copy[2] = data2;
              copy[3] = data3;
              setDataSet(copy);
            });
        });
    }
  }, [userLogin]);

  return (
    <div className='metrics-container'>
      <div className="row my-2 mx-2">
        <div className="col canvas mx-2">
          <div className="chart">
            {dataSet[3] ? (
              <>
                <h2 className="text-center">Weight Launched / Launching</h2>
                <Line data={dataSet[3]} />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="col canvas">
          <div className="chart">
            {dataSet[0] ? (
              <>
                <h2 className="text-center">Customer Sales Data</h2>
                <Doughnut
                  data={dataSet[0]}
                  className="mx-5"
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    spacing: 15
                    
                  }}
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="row my-3 mx-2">
        <div className="col canvas mx-2">
          <div className="chart">
            {dataSet[1] ? (
              <>
                <h2 className="text-center">Popularity of Orbits</h2>
                <Pie
                  data={dataSet[1]}
                  className="mx-5"
                  options={{
                    maintainAspectRatio: false, // Don't maintain w/h ratio
                    circumference: 180,
                    rotation: 90,
                  }}
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="col canvas">
          <div className="chart">
            {dataSet[2] ? (
              <>
                <h2 className="text-center">Launch Vehicle Popularity</h2>
                <Bar
                  data={dataSet[2]}
                  className="mx-5"
                  options={{
                    plugins: {
                      legend: {
                          display: false
                      },
                    },
                    maintainAspectRatio: false, // Don't maintain w/h ratio
                  }}
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
