import { Sidebar } from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import "./home.scss";
import { Widgets } from "../../components/widgetLg/Widgets";
import { Featured } from "../../components/featured/Featured";
import { Chart } from "../../components/chart/Chart";
import { List } from "../../components/table/Table";
import axios from "axios";
import { useMemo } from "react";
import { useContext, useState, useEffect } from "react";
import WidgetSm from '../../components/widgetSm/WidgetSm'

const Home = () => {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("https://leoflix.onrender.com/api/users/stats", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjYxNTQ3NWMwZDBlNDNjZjlkZmMwOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2OTIzMTYyMywiZXhwIjoyNTMzMjMxNjIzfQ.PBibyNQnxuwtGS85pnVBa1nBdenZbt5og0UB3zqyz5k",
          },
        });
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);
  console.log(userStats);
  return (
    <div className="home">
          <Chart
            data={userStats}
            title="User Analytics"
            grid
            dataKey="New User"
          />
        <div className="homeWidgets">
          <WidgetSm />
        </div>
    </div>
  );
};

export default Home;
