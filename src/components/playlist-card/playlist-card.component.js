import React from 'react';
import {useHistory} from "react-router-dom";
import './playlist-card.component.styles.scss'

const PlaylistCard = ({playlist,onUnfollow}) => {

    const history = useHistory();
    return(
        <div className="playlists-item">
            <div onClick={() => history.push(`/playlist/${playlist.id}`)}
                 key={playlist.id}>
                <div className={"playlists-item__image"}>
                    {playlist.images.length > 0 ? (
                        <img src={playlist.images[0].url} alt=""/>
                    ) : null}
                </div>
                <div className="playlists-item__name">
                    <p>{playlist.name}</p>
                </div>
            </div>
            <button onClick={onUnfollow} className={"playlists-item__delete btn btn-danger"}>X</button>
        </div>

    );
}

export default PlaylistCard;
