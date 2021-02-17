import React from 'react';
import {useHistory} from "react-router-dom";


const PlaylistCard = ({playlist}) => {

    const history = useHistory();
    return(
        <div onClick={() => history.push(`/playlist/${playlist.id}`)} className="playlists-item"
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
    );
}

export default PlaylistCard;
