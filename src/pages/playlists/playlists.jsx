import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserPlaylists } from "../../services/user.service";
import './playlists.styles.scss';
import { useHistory } from "react-router-dom";

const Playlists = () => {
  const user = useSelector((state) => state.user);
  const [playlists, setPlaylists] = useState([]);
  const history = useHistory();

  async function getPlaylists() {
    let myPlaylists = await getUserPlaylists();
    setPlaylists(myPlaylists.items);
  }


  useEffect(() => {
    getPlaylists();
  }, [user]);

  return (
    <div className="playlists">
      <div className={"page-header"}>
        My playlists
      </div>
      <div className="playlists-list">
      {playlists.map((item) => {
        return (
          <div onClick={()=>history.push(`/playlist/${item.id}`)} className="playlists-item" key={item.id}>
            {item.images.length > 0 ? (
              <img src={item.images[0].url} alt="" />
            ) : null}
            <div className="playlists-item__name">{item.name}</div>
          </div>
        );
      })}
      </div>
      
    </div>
  );
};
export default Playlists;
