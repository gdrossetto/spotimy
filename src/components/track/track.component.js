import React from 'react';
import './track.component.styles.scss';

const Track = ({track}) =>{
    return(
        <div className={"playlist-track"}>
            <img src={track.album.images[0].url} alt=""/>
            <h3 className={"playlist-track__name"}>{track.name}</h3>
            <span className={"playlist-track__artist"}>{track.artists[0].name}</span>
        </div>
    );
}
export default Track;
