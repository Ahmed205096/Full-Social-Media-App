import "./Style/Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { search_user } from "../APIs/SearchAPIs/SearchAPI";

export default function Search() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handelSearchChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    async function onSearch() {
      const result = await search_user(search);
      setSearchResult(result);
    }
    onSearch();
  }, [search]);

  const card = searchResult.map((user) => {
    return (
      <>
        <div
          style={{ height: "200px" }}
          key={user.id}
          className="network-section-connections"
        >
          <div className="network-section-bg-img">
            <img src={user.user_bg_img} alt="" />
          </div>
          <div className="network-section-all-user-data">
            <div className="network-section-profile-img">
              <Link to={`/profile/${+user.id + 1772002}`}>
                {" "}
                <img src={user.user_img} alt="" />
              </Link>
            </div>
            <Link to={`/profile/${+user.id + 1772002}`}>
              <div className="network-section-user-name">{user.name}</div>{" "}
            </Link>
            <div className="network-section-user-info">
              {user.title} <p>{user.rule}</p>
            </div>
            <div className="network-section-follow-button"></div>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <div className="search-outer-container">
        <div className="search-inner-container">
          <span className="search-container">
            <div className="search-input-container">
              <input
                onChange={handelSearchChange}
                value={search}
                className="search-input"
                type="text"
                placeholder="Search..."
              />
            </div>
            <div className="search-icon-container">
              <FontAwesomeIcon icon={faSearchengin} />
            </div>
          </span>
          <div className="search-output-container">
            <div className="search-card">
              {card ? card : "There are no results"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
