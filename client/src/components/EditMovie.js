import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditContractor = (props) => {
  const { id, userName } = useParams();
  const [user, setUser] = useState("");
  const [movieNameEdit, setMovieNameEdit] = useState("");
  const [movieDetailEdit, setMovieDetailEdit] = useState("");
  const [ratingEdit, setRatingEdit] = useState("");
  const [commentEdit, setCommentEdit] = useState("");

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  console.log(id);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/user/${userName}`, { withCredentials: true })
        .then(res => {
            setUser(res.data);
        })
        .catch(err => {
            console.log(err)
        })
}, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/movie/${id}`)
      .then((response) => {
        console.log(response.data);
        console.log('n', response.data.queriedMovie.movieName);

        setMovieNameEdit(response.data.queriedMovie.movieName);
        setMovieDetailEdit(response.data.queriedMovie.movieDetail);
        setRatingEdit(response.data.queriedMovie.rating);
        setCommentEdit(response.data.queriedMovie.comment);

      })
      .catch((err) => {
        console.log(err.response.data.err.errors);
        setErrors(err.response.data.err.errors);

      });
  }, [id]);

  const handleSubmit = (e) => {
    console.log("submit called")
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/movie/${id}`, { movieName: movieNameEdit, movieDetail: movieDetailEdit, rating: ratingEdit, comment: commentEdit })
      .then((response) => {
        console.log(response);
        navigate(`/home/${userName}`);
      })
      .catch((err) => {
        console.log(err.response.data.err.errors);
        setErrors(err.response.data.err.errors);

      });

  };
  return (
    <div className="movieForm-component">
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-2">
            <Link to={`/home/${userName}`}>Home</Link>
            <p><Link to="/new">Add a Movie / Show (title)</Link></p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">


                <h2>Edit Movie</h2>
             

                <div>
                  <label htmlFor="name">Movie / Show (title)</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={movieNameEdit}
                    onChange={(e) => setMovieNameEdit(e.target.value)}
                  />
                  {errors.movieName ? <p>{errors.movieName.message}</p> : null}
                </div>

                <div>
                  <label htmlFor="name">Details</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={movieDetailEdit}
                    onChange={(e) => setMovieDetailEdit(e.target.value)}
                  />
                  {errors.movieDetail ? <p>{errors.movieDetail.message}</p> : null}
                </div>

                <div>
                  <label htmlFor="name">Rating</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={ratingEdit}
                    onChange={(e) => setRatingEdit(e.target.value)}
                  />
                  {errors.rating ? <p>{errors.rating.message}</p> : null}
                </div>

                <div>
                  <label htmlFor="name">Comment</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={commentEdit}
                    onChange={(e) => setCommentEdit(e.target.value)}
                  />
                  {errors.comment ? <p>{errors.comment.message}</p> : null}
                </div>

                <div className="button-space">
                  <button className="btn btn-primary" type="submit">
                    SUBMIT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>



  );
};

export default EditContractor;