import { useEffect, useState } from "react";
import { axiosSeries, apiKey } from "../apis/config";
import { SeriesCard } from "../components/SeriesCard";
import { useDispatch } from "react-redux";
import { SetBannerData } from "../Store/seriesSlice";
import React from 'react';


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
      <div className="container-fluid py-3">
        {/* Welcome Section */}
        <div className="welcome-section p-4 mb-4" style={{ borderRadius: "8px", background: "#e4e0e0" }}>
          <h1>Welcome to Our Movie App</h1>
          <p>Browse and search through a variety of movies from the latest releases to the classic hits!</p>

        </div>
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

