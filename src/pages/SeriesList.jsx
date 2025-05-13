import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosSeries, apiKey } from "../apis/config";
import { SeriesCard } from "../components/SeriesCard";
import { useDispatch } from "react-redux";
import { SetBannerData } from "../Store/seriesSlice";
import React from "react";

export const SeriesList = () => {
  const [Series, setSeries] = useState([]);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axiosSeries
      .get(`popular?api_key=${apiKey}`)
      .then((res) => {
        if (res?.data?.results?.length) {
          setSeries(res.data.results);
          dispatch(SetBannerData(res.data.results));
        } else {
          setSeries([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setMovies([]);
      });
  }, [dispatch]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (value.trim()) {
      navigate(`/search/${value.trim()}`);
    }
  };

  const handleFocus = () => {
    navigate("/search/");
  };

  return (
    <>
      <div className="container py-3">
        {/* Welcome Section */}
        <div
          className="welcome-section p-4 mb-4"
          style={{ borderRadius: "8px", background: "#e4e0e0" }}
        >
          <h1 className="mt-4">Welcome to Our Movie App</h1>
          <p>
            Browse and search through a variety of movies from the latest
            releases to the classic hits!
          </p>
          {/* Search Input and Button */}
          <div className="d-flex justify-content-center align-items-center w-100 mt-5">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search movies..."
              value={searchText}
              onChange={handleChange}
              onFocus={handleFocus}
              style={{ flexGrow: 1, marginRight: "10px" }} // Allow input to take full width
            />
            <button
              onClick={() => navigate(`/search/${searchText.trim()}`)}
              className="btn"
              style={{
                borderRadius: "5px",
                background: "#FFE353",
                color: "#000000",
                fontWeight: "bold",
                width: "auto", // Let button width be content-based
                flexShrink: 0, // Prevent shrinking
              }}
            >
              Search
            </button>
          </div>
        </div>
        <div className="row g-4 ">
          {Series.map((show) => {
            return (
              <SeriesCard show={show} key={show.id} />
            );
          })}
        </div>
      </div>
    </>
  );
};
