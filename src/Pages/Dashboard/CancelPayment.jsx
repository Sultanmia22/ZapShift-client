import React from 'react';
import { Link } from 'react-router';

const CancelPayment = () => {
    return (
        <div>
            <h2>Something is wrong</h2>
            <Link to='/dashboard/mypercels' className='text-black btn btn-primary'>Try Again</Link>
        </div>
    );
};

export default CancelPayment;  