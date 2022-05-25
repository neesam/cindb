import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
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

  const handleLogout = () => {
    axios.post("http://localhost:8000/api/user/logout", {}, {withCredentials:true})
        .then((res) => console.log(res), navigate("/"))
        .catch((err) => console.log(err, "Error"));
};

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
    <div style={{background: '#8c94f7', height: '100vh'}}>
    <Nav style={{display: 'flex', position: 'relative', alignItems: 'center'}} activeKey="/home">
                <Nav.Item style={{fontSize: '40px', padding: '30px', marginRight: '30px', color: 'pink', textShadow: '2px 2px 2px black'}}><b><a style={{textDecoration: 'none', color: 'pink'}} href={`/home/${userName}`}>CinDB</a></b>
                </Nav.Item>
                <div style={{display: 'flex', marginLeft: '750px'}}>
                <Nav.Item class="profile">
                    <Nav.Link style={{fontSize: '20px', padding: '50px', color: 'pink', textShadow: '2px 2px 2px black'}} href={`/user/${userName}`}><b>{userName}'s profile</b></Nav.Link>
                </Nav.Item>
                <Nav.Item class="profile">
                    <Nav.Link style={{fontSize: '20px', padding: '50px', marginLeft: '-20px', color: 'pink', textShadow: '2px 2px 2px black'}} href={`/newRating/${userName}`}><b>add rating</b></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Button style={{marginTop:'50px', marginLeft: '30px', backgroundColor: 'pink', color: 'black', border: 'none', boxShadow: '2px 2px 2px black'}} classname="logoutBtn" size="sm" 
                    onClick={()=> handleLogout()}>logout</Button>
                </Nav.Item>
                </div>
            </Nav>
    <div style={{padding: '50px', background: 'white', margin: '50px', borderRadius: '50px', boxShadow: '5px 5px 5px grey', display: 'flex', flexDirection: 'column'}}  className="movieForm-component">
      <div className="container">
        <div className="row">
            <form onSubmit={handleSubmit}>
              <div className="form-group">


                <h2>edit rating</h2>
             

                <div style={{marginTop: '40px'}}>
                  <label htmlFor="name">movie / show</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={movieNameEdit}
                    onChange={(e) => setMovieNameEdit(e.target.value)}
                  />
                  {errors.movieName ? <p>{errors.movieName.message}</p> : null}
                </div>

                <div style={{marginTop: '10px'}}>
                  <label htmlFor="name">details</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={movieDetailEdit}
                    onChange={(e) => setMovieDetailEdit(e.target.value)}
                  />
                  {errors.movieDetail ? <p>{errors.movieDetail.message}</p> : null}
                </div>

                <div style={{marginTop: '10px'}}>
                  <label htmlFor="name">rating</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={ratingEdit}
                    onChange={(e) => setRatingEdit(e.target.value)}
                  />
                  {errors.rating ? <p>{errors.rating.message}</p> : null}
                </div>

                <div style={{marginTop: '10px'}}>
                  <label htmlFor="name">comment</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={commentEdit}
                    onChange={(e) => setCommentEdit(e.target.value)}
                  />
                  {errors.comment ? <p>{errors.comment.message}</p> : null}
                </div>

                <div style={{marginTop: '30px'}} className="button-space">
                  <button className="btn btn-primary" type="submit">
                    submit
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