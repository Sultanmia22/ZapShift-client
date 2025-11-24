import React from 'react';
import riderImg from '../../assets/agent-pending.png'
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';
const Rider = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const axiosSecure = useAxiosSecure()

    //! handle Submit Rider function 
    const handleSubmitRider = (data) => {
        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your application has been submitted. please waiting for approval",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    return (
        <div className='p-10'>
            <div>
                <h2 className='text-4xl font-bold text-secondary'> Be a Rider </h2>
                <p>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. <br /> From personal packages to business shipments — we deliver on time, every time.</p>
            </div>

            <div className='flex items-center '>
                <form onSubmit={handleSubmit(handleSubmitRider)} className='flex-1'>
                    <h2 className='text-4xl font-bold text-secondary py-4'>Tell us about yourself</h2>
                    <div className="percel-details grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
                        <fieldset className="fieldset sender-details">
                            {/* Name  */}
                            <label className="label font-bold text-secondary text-[18px]">Your Name</label>
                            <input type="text" {...register('name')} className="input w-full" placeholder="Your Name" />

                            {/* Your Email  */}
                            <label className="label font-bold text-secondary text-[18px]">Your Email</label>
                            <input type="email" {...register('email')} className="input w-full" placeholder="Your Email" />

                            {/* Your NID  */}
                            <label className="label font-bold text-secondary text-[18px]">Your NID</label>
                            <input type="number" {...register('NID')} className="input w-full" placeholder="Your NID" />

                            {/* Your Bike Name  */}
                            <label className="label font-bold text-secondary text-[18px]">Your Bike Name</label>
                            <input type="text" {...register('bike')} className="input w-full" placeholder="Your bike" />

                        </fieldset>

                        <fieldset className="fieldset receiver-details">
                            {/* Age */}
                            <label className="label font-bold text-secondary text-[18px]">Your age</label>
                            <input type='number' {...register('age')} className="input w-full" placeholder="Your Age" />

                            {/* District */}
                            <label className="label font-bold text-secondary text-[18px]">Your District</label>
                            <input type="text" {...register('district')} className="input w-full" placeholder="Your District" />

                            {/* Your Contact  */}
                            <label className="label font-bold text-secondary text-[18px]">Your Contact</label>
                            <input type="number" {...register('contact')} className="input w-full" placeholder="Your Contact" />

                            {/* Your Driving Lisence  */}
                            <label className="label font-bold text-secondary text-[18px]">Your License No.</label>
                            <input type="number" {...register('contact')} className="input w-full" placeholder="Your License" />


                        </fieldset>
                    </div>
                    <div> <input type="submit" value="Submit" className='btn btn-primary text-secondary my-5' /> </div>
                </form>

                <div className='flex-1 flex justify-center'>
                    <img src={riderImg} alt="" />
                </div>
            </div>

        </div>
    );
};

export default Rider;