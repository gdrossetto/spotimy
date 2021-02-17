import React from 'react';
import './page-header.component.styles.scss';

const PageHeader = ({title}) =>{
    return(
        <div className={"page-header"}>
            {title}
        </div>
    );
}
export default PageHeader;
