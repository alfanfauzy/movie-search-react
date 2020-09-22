import React, {Fragment} from 'react';

import { VscLoading } from "react-icons/vsc";

const Loading = () => {
    return(
        <Fragment>
            <VscLoading className="loading"/>
            <p>Now Loading . . .</p>
        </Fragment>
    )
}

export default Loading;