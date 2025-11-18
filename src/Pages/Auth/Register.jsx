import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hook/useAuth';
import { Link } from 'react-router';
import GoogleSign from './GoogleSign';
import axios from 'axios';

const Register = () => {
    const { handleSubmit, register, formState: { errors } } = useForm()
    const { creatUser,updateUserProfile } = useAuth();

    const handleRegister = (data) => {

        const profileImg = data.photo[0]

        console.log(profileImg)
        creatUser(data.email, data.password)
            .then(res => {
                const user = res.user;
                console.log(user)

                const formData = new FormData();
                formData.append( 'image', profileImg)

                const imageURLKey = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                axios.post(imageURLKey,formData)
                .then(res => {
                    const profileUser = {
                        displayName : data.name,
                        photoURL : res.data.data.url
                    }

                    updateUserProfile(profileUser)
                    .then(res => {

                    })
                    .catch(er => {
                        
                    })
                })
            })

            .catch(er => {
                const error = er;
            })
    }

    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <div className='space-y-2 pb-5 text-center'>
                <h2 className='text-4xl font-bold text-secondary text-start'> Create an Account </h2>
                <p className='text-secondary'>Register with ZapShift</p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <fieldset className="fieldset">

                            {/* Name field */}
                            <label className="label">Name</label>
                            <input type="text" {...register('name', { required: true })} className="input" placeholder="Name" />
                            {errors.name?.type === 'required' && <p className='text-red-600'> This field is required </p>}


                            {/* image field */}
                            <label className="label">Name</label>
                            <input type='file' {...register('photo', { required: true })} className="file-input" placeholder="Your Photo" />
                            {errors.photo?.type === 'required' && <p className='text-red-600'> This field is required </p>}

                            {/* Email Field */}
                            <label className="label">Email</label>
                            <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                            {errors.email?.type === 'required' && <p className='text-red-600'> This field is required </p>}

                            <label className="label">Password</label>
                            <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                            {errors.password?.type === 'minLength' && <p className='text-red-600'> This field is required </p>}
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4">Register</button>

                        </fieldset>
                    </form>
                    <GoogleSign />
                    <p>Already have an Account? <Link to='/login' className='font-bold text-secondary'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;