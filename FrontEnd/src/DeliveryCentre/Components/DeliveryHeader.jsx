import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../../redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function DeliveryHeader() {

    const currentUser = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(signoutSuccess());
        navigate('/deliverysignin')
      };

    return (
        <div>
            <div className='flex justify-between items-center p-4 bg-gray-800 text-white'>
                <h1 className='text-xl font-bold'>Delivery Dashboard</h1>
                {currentUser ? (
                    <div>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div>
                        <button className=' text-white font-bold py-2 px-4 rounded mr-4 cursor-pointer'>
                            <Link to="/deliverysignin" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                Login
                            </Link>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
