import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = () => (
    <div className="container">
        Go <Link to='/'>home</Link>. You're drunk.
    </div>
);

export default NotFoundPage;
