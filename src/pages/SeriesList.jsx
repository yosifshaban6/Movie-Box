import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SeriesCard } from "../components/SeriesCard";
import { useDispatch } from "react-redux";
import { SetBannerData } from "../Store/seriesSlice";
import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { LanguageContext } from "../LanguageContext";
import { appItems } from "../services/config";

const range = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export const SeriesList = () => {
  const { language } = useContext(LanguageContext);
  const [items, setItems] = useState(
    appItems[language.substring(0, 2).toLowerCase()]
  );
  const [series, setSeries] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [totalPages] = useState(100); 

  useEffect(() => {
    setItems(appItems[language.substring(0, 2).toLowerCase()]);
  }, [language]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/tv",
      params: {
        include_adult: "false",
        include_video: "false",
        language: language,
        page: page,
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
  }, [dispatch, language, page]);


  const handlePageChange = (newPage) => {
    setPage(newPage);
    navigate(`/series/?page=${newPage}`);
  };

  function getPaginationRange(page, totalPages) {
    const delta = Math.min(5, page - 1);
    let start = page - delta;
    let end = Math.min(page + 5 - delta, totalPages);

    if (end - start + 1 > 6) {
      end = totalPages;
      start = Math.max(1, end - 5);
    }

    if (start < 1) {
      start = 1;
      end = Math.min(6, totalPages);
    }

    return { start, end };
  }

  const { start, end } = getPaginationRange(page, totalPages);

  return (
    <>
      <div className="container py-3">
        {/* Series List */}
        <div className="row g-4">
          {series.map((show) => (
            <SeriesCard show={show} key={show.id} />
          ))}
        </div>

        {/* Centered Pagination */}
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={page === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(Math.max(page - 1, 1))}
              disabled={page === 1}
            />
            {range(start, end).map((pageNumber) => (
              <Pagination.Item
                key={pageNumber}
                active={pageNumber === page}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
              disabled={page === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={page === totalPages}
            />
          </Pagination>
        </div>
      </div>
    </>
  );
};
