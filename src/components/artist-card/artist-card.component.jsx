import React from 'react';
import './artist-card.component.styles.scss';

const ArtistCard = ({artist,onPick}) => {
    return(
        <div key={artist.id} className={"artists-item"} onClick={onPick}>
            <div className={"artists-item__img"}>
                <img src={artist.images[0]?.url} alt=""/>
            </div>
            <span>{artist?.name}</span>
        </div>
    );
}
export default ArtistCard;
