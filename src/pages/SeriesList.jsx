import { useEffect, useState } from "react";
import { SeriesCard } from "../components/SeriesCard";
import axios from "axios";
export const SeriesList = () => {
  const [Series, setSeries] = useState([]);
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/tv/popular?api_key=0c79feb73f97e97228ca7e3a87f0ffcc`)
      .then((res) => setSeries(res.data.results));
  }, []);
  return (
    <>
      <div className="container">
        <div className="row g-4 ">
          {Series.map((show) => {
            return (
              <div className="col-lg-2  d-flex" key={show.id}>
                <div className="w-100 h-100">
                  <SeriesCard show={show} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
