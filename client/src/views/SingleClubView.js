import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ClubBookshelf from "../components/ClubBookshelf";
import NextMeetingInfo from "../components/NextMeetingInfo";
import MembersList from "../components/MembersList";
import Api from "../helpers/Api";
import "./SingleClubView.css";
import Local from "../helpers/Local";

function SingleClubView(props) {
  const [clubBooks, setClubBooks] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  let { id } = useParams();
  let ix = id - 1;
  let currentClub = props.clubs[ix];

  useEffect(() => {
    fetchClubBooks(id);
    props.getClubs();
  }, [id]);

  async function fetchClubBooks(id) {
    let myresponse = await Api.getClubBooks(id);
    if (myresponse.ok) {
      setClubBooks(myresponse.data);
      setErrorMsg("");
    } else {
      setClubBooks([]);
      let msg = `Error ${myresponse.status}: ${myresponse.error}`;
      setErrorMsg(msg);
    }
  }

  console.log("clubs", props.clubs);
  console.log("clubs[Ix]", currentClub);
  // console.log("cLUB", props.club);
  console.log("clubBooksSCV", clubBooks);

  function redirect() {
    navigate("/login");
  }

  async function canJoin(currentClub) {
    console.log("currentClub", currentClub);
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentClub),
    };

    // add token to the header if it exists in local storage
    let token = Local.getToken();
    if (token) {
      options.headers["Authorization"] = "Bearer " + token;
    }

    try {
      let response = await fetch(`clubs/${currentClub.id}`, options);
      if (response.ok) {
        let json = await response.json();
        props.setUser(json);
        console.log(
          "this is the reply the client receives from the backend and saves it as user:",
          json
        );
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  let user = JSON.parse(localStorage.getItem("user"));
  let userMember = currentClub.membersList.some((m) => m.id === user.id);
  if (userMember) {
    let userMemberAdmin = currentClub.membersList.find(
      (m) => m.id === user.id
    ).admin;

    return (
      <div className="SingleClubView mt-0">
        {userMemberAdmin ? (
          <Link
            to={`/clubs/${id}/club-admin`}
            className="btn btn-outline-light mx-2 btn-sm user"
          >
            <h4 className="mb-0">CLUB ADMIN</h4>
          </Link>
        ) : null}

        {currentClub.name ? (
          <div className="card text-bg-dark w-100">
            <img
              src={currentClub.image}
              id="header-img"
              style={{ height: "18rem" }}
              className="card-img mb-0"
              alt={currentClub.name}
            />
            <div className="card-img-overlay">
              <h1 className="card-title">{currentClub.name}</h1>
              <h3 className="card-subtitle lh-lg">
                Category: {currentClub.category}
              </h3>
              <h3 className="card-subtitle lh-lg">
                Location: {currentClub.next_mtg_city},{" "}
                {currentClub.next_mtg_country}
              </h3>
            </div>
          </div>
        ) : (
          <h2>Loading</h2>
        )}
        <div>
          <div className="row mt-5">
            <div className="col-4">
              {props.user ? (
                currentClub.membersList
                  .map((m) => m.id)
                  .includes(props.user.id) ? null : currentClub.membersList
                    .length >= 10 ? (
                  <p>club is full</p>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-light mb-3"
                    onClick={(e) => canJoin(currentClub)}
                  >
                    JOIN
                  </button>
                )
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-light mb-3"
                  onClick={redirect}
                >
                  JOIN
                </button>
              )}
              <h2>Members</h2>
              <div>
                <MembersList clubs={props.clubs} />
              </div>
            </div>

            <div className="col-8">
              <NextMeetingInfo clubs={props.clubs} clubBooks={clubBooks} />
            </div>

            <div className="col-4"></div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <ClubBookshelf clubBooks={clubBooks} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleClubView;
