import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import React from 'react'

const DisplayAll = () => {
  const [allMovies, setAllMovies] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/movie")
      .then((response) => {
        console.log(response.data);
        setAllMovies(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const handleDeleteMovies = (idFromBelow) => {
    axios
      .delete(`http://localhost:8000/api/movie/${idFromBelow}`)
      .then((response) => {
        console.log("success deleting Movie");
        console.log(response);
        const filteredMovies = allMovies.filter((movie) => {
          return movie._id !== idFromBelow;
        });
        setAllMovies(filteredMovies);
      })
      .catch((err) => {
        console.log("error deleting movie", err.response);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <Link to="/new">add a movie</Link>
          <p className="purple-text">rate a movie</p>
          <table className="table" id="myTable2" responsive="md">
            <thead>
              <tr>
                <th scope="col" >show / movie (title)</th>
                <th scope="col">rating</th>
                <th scope="col">comments</th>
                <th scope="col">edit</th>
                <th scope="col">details</th>
                
            </tr>
            </thead>
            <tbody>
              {allMovies.map((movie, index) => {
                return (
                  <tr key={movie._id}>
                    <td>{movie.movieName}</td>
                    <td>{movie.rating}</td>
                    <td>{movie.comment}</td>


                    <td>
                      <Link to={`/edit/${movie._id}`}>
                      <button className="btn btn-primary">edit</button>
                      </Link>
                      </td>
                      <td>
                      <Link to={`/details/${movie._id}`}>
                        <button className="btn btn-primary">details</button>
                      </Link>

                      
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DisplayAll;