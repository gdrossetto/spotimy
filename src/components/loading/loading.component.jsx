import React from 'react';
import './loading.component.styles.scss';

const Loading = ({loading}) => {
    return(
        <div className={"backdrop"}>
            <div className={"loading"} style={{display: loading ? 'flex' : 'none'}}>
                <h1>Loading...</h1>
            </div>
        </div>

    );
}
export default Loading;
