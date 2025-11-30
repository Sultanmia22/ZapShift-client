import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hook/useAuth';
import GoogleSign from './GoogleSign';
import { Link, useNavigate } from 'react-router';

const Login = () => {
    const {register,handleSubmit} = useForm()
    const {signInUser} = useAuth()
    const navigate = useNavigate()

    const handleLogin = (data) => {
        signInUser(data.email,data.password)
        .then(res => {
            const user = res.user;
            // console.log(user)
            navigate('/')
        })
        .catch(er => {
            const error = er
        })
    }

    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <div className='py-5 space-y-2 text-start'>
                <h2 className='text-4xl font-bold text-secondary'> Welcome Back </h2>
                <p>Login with ZapShift</p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                   <form onSubmit={handleSubmit(handleLogin)}>
                     <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" {...register('email',{required:true})} className="input" placeholder="Email" />

                        {/* Password */}
                        <label className="label">Password</label>
                        <input type="password" {...register('password',{required:true})} className="input" placeholder="Password" />
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                   </form>
                   <GoogleSign/>
                   <p>Don't Have an Account ? <Link to='/register' className='font-bold text-secondary'>Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;