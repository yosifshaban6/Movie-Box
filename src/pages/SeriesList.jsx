import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SeriesCard } from "../components/SeriesCard";
import { useDispatch } from "react-redux";
import { SetBannerData } from "../Store/seriesSlice";
import React from "react";
import { LanguageContext } from "../LanguageContext";
import { appItems } from "../services/config";

export const SeriesList = () => {
  const { language } = useContext(LanguageContext);
  const [items, setItems] = useState(
    appItems[language.substring(0, 2).toLowerCase()],
  );
  const [Series, setSeries] = useState([]);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/tv",
      params: {
        include_adult: "false",
        include_video: "false",
        language: language,
        page: "1",
        sort_by: "popularity.desc",
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzc5ZmViNzNmOTdlOTcyMjhjYTdlM2E4N2YwZmZjYyIsIm5iZiI6MTc0NjgxNjcwOS43NTUsInN1YiI6IjY4MWU0ZWM1OThjNmU1OWFkZjM0OGRkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2Oc3iu5fKvJqr1U-xWZqwTWB1UVedsSeUhGLPwMCRuw",
      },
    };

    axios
      .request(options)
      .then((res) => {
        if (res?.data?.results?.length) {
          setSeries(res.data.results);
          dispatch(SetBannerData(res.data.results));
        } else {
          setSeries([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching series:", error);
        setSeries([]);
      });
  }, [dispatch, language]);

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
          <h1 className="mt-4">{items.welcome}</h1>
          <p>{items.description}</p>

          {/* Search Input and Button */}
          <div className="d-flex justify-content-center align-items-center gap-2 w-100 mt-5">
            <div className="input-group" style={{ flexGrow: 1 }}>
              <input
                type="text"
                className="form-control rounded-1 py-2"
                placeholder={items.searchDescription}
                value={searchText}
                onChange={handleChange}
                onFocus={handleFocus}
                style={{ fontSize: 14 }}
              />
            </div>
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
              {items.search}
            </button>
          </div>
        </div>
        <div className="row g-4 ">
          {Series.map((show) => {
            return <SeriesCard show={show} key={show.id} />;
          })}
        </div>
      </div>
    </>
  );
};
