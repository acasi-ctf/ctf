import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Auth0Provider} from "@auth0/auth0-react";

ReactDOM.render(
    <React.StrictMode>
        <Auth0Provider domain='acasictf-dev-lg.us.auth0.com'
                       clientId='NwK4H7fWWg67IxOQujxId6HHsCkCp44b'>
            <App/>
        </Auth0Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

