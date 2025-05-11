import { useEffect, useState } from "react";
import { axiosSeries, apiKey } from "../apis/config";
import { SeriesCard } from "../components/SeriesCard";
import { useDispatch } from "react-redux";
import { SetBannerData } from "../Store/seriesSlice";

export const SeriesList = () => {
  const [Series, setSeries] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosSeries
      .get(`popular?api_key=${apiKey}`)
      .then((res) => {
        setSeries(res.data.results)
        dispatch(SetBannerData(res.data.results));
      });
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

