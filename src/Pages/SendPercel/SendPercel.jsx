import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import useAuth from '../../Hook/useAuth';

const SendPercel = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    //! axios secure 
    const axiosSecure = useAxiosSecure()

    //! user
    const { user } = useAuth()


    const serviceCenter = useLoaderData();

    const duplicateRegion = serviceCenter.map(s => s.region)

    const region = [...new Set(duplicateRegion)]

    const senderRegion = watch('senderRegion')
    const receiverRegion = watch('receiverRegion')

    const regionBaseDistrict = (region) => {
        const allDataByRegion = serviceCenter.filter(data => data.region === region)
        const district = allDataByRegion.map(d => d.district)
        return district
    }


    // handleSendPercel function
    const handleSendPercel = (data) => {
        const isDocument = data.percelType === 'document'
        const isSameDistrict = data.senderDistrict === data.receiverDistrict
        const percelWeights = parseFloat(data.percelWeight)
        let cost = 0;

        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        }
        else {
            if (percelWeights < 3) {
                cost = isSameDistrict ? 110 : 150
            }
            else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = percelWeights - 3
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40
                cost = minCharge + extraCharge
            }
        }

        Swal.fire({
            title: "Agree with the Cost ?",
            text: `You will be charged ${cost} taka`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I Agree"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.post(`/percels`, data)
                    .then(res => {
                        console.log('after saving percels', res.data)
                    })


                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

    }



    return (
        <div className='my-10 max-w-[1500px] mx-auto'>
            <h2 className='text-5xl font-bold '>Send A Parcel</h2>
            <p className='mt-10 font-bold'> Enter Your percel Details </p>
            <div className='w-full h-px bg-gray-300 my-3'></div>
            <form onSubmit={handleSubmit(handleSendPercel)} className=''>
                <div className="percel-category flex gap-4">
                    <label className="label">
                        <input type="radio" {...register('percelType')} value="document" className="radio" defaultChecked />
                        Document</label>

                    <label className="label">
                        <input type="radio" {...register('percelType')} value=" non-document" className="radio" />
                        Non-Document</label>
                </div>


                <div className="percel-info grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 my-6">
                    <fieldset className="fieldset percel-name">
                        <label className="label font-bold text-secondary text-[18px]">Percel Name</label>
                        <input type="text" {...register('percelName')} className="input w-full" placeholder="Percel Name" />
                    </fieldset>

                    <fieldset className="fieldset percel-weight">
                        <label className="label font-bold text-secondary text-[18px]">Percel Weight</label>
                        <input type="text" {...register('percelWeight')} className="input w-full" placeholder="Percel Weight(KG)" />
                    </fieldset>
                </div>


                <div className="percel-details grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
                    <fieldset className="fieldset sender-details">
                        <h2 className='text-3xl font-bold'>Sender Details</h2>
                        <label className="label font-bold text-secondary text-[18px]">Sender Name</label>
                        <input type="text" {...register('senderName')} className="input w-full" placeholder="Sender Name" />

                        <label className="label font-bold text-secondary text-[18px]">Sender Email</label>
                        <input defaultValue={user?.email} type="email" {...register('senderEmail')} className="input w-full" placeholder="Sender Email" />


                        <label className="label font-bold text-secondary text-[18px]">Sender Address</label>
                        <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Sender Address" />

                        <label className="label font-bold text-secondary text-[18px]">Sender Phone No</label>
                        <input type="text" {...register('senderPhoneNo')} className="input w-full" placeholder="Sender Phone No" />

                        <label className="label font-bold text-secondary text-[18px]">Your Region</label>
                        <select defaultValue="Select Your Region" {...register('senderRegion')} className="select w-full">
                            <option disabled={true}>Select Your Region</option>
                            {
                                region.map((r, i) =>
                                    <option key={i} value={r}>{r}</option>
                                )
                            }
                        </select>

                        <label className="label font-bold text-secondary text-[18px]">Your District</label>
                        <select defaultValue="Select Your District" {...register('senderDistrict')} className="select w-full">
                            <option disabled={true}>Select Your District</option>
                            {
                                regionBaseDistrict(senderRegion).map((d, i) =>
                                    <option key={i} value={d}>{d}</option>
                                )
                            }
                        </select>

                        <label className="label font-bold text-secondary text-[18px]">Pickup Instruction</label>
                        <textarea className="textarea w-full" {...register('senderPickUpInstruction')} placeholder="Pickup Instruction"></textarea>
                    </fieldset>

                    <fieldset className="fieldset receiver-details">
                        <h2 className='text-3xl font-bold'>Receiver Details</h2>
                        <label className="label font-bold text-secondary text-[18px]">Receiver Name</label>
                        <input type="text" {...register('receiverlName')} className="input w-full" placeholder="Receiver Name" />

                        <label className="label font-bold text-secondary text-[18px]">Receiver Email</label>
                        <input type="email" {...register('receiverEmail')} className="input w-full" placeholder="Receiver Email" />

                        <label className="label font-bold text-secondary text-[18px]">Receiver Address</label>
                        <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Receiver Address" />

                        <label className="label font-bold text-secondary text-[18px]">Receiver Contact No</label>
                        <input type="text" {...register('receiverContactNo')} className="input w-full" placeholder="Receiver Phone No" />

                        <label className="label font-bold text-secondary text-[18px]">Receiver Region</label>
                        <select defaultValue="Select Receiver Region" {...register('receiverRegion')} className="select w-full">
                            <option disabled={true}>Select Receiver Region</option>
                            {
                                region.map((r, i) =>
                                    <option key={i} value={r}>{r}</option>
                                )
                            }
                        </select>

                        <label className="label font-bold text-secondary text-[18px]">Receiver District</label>
                        <select defaultValue="Select Receiver District" {...register('receiverDistrict')} className="select w-full">
                            <option disabled={true}>Select Receiver District</option>
                            {
                                regionBaseDistrict(receiverRegion).map((d, i) =>
                                    <option key={i} value={d}>{d}</option>
                                )
                            }
                        </select>

                        <label className="label font-bold text-secondary text-[18px]">Pickup Instruction</label>
                        <textarea className="textarea w-full" {...register('receiverPickUpInstruction')} placeholder="Receiver Pickup Instruction"></textarea>
                    </fieldset>
                </div>
                <input type="submit" value="Submit" className='btn btn-secondary my-5' />
            </form>
        </div>
    );
};

export default SendPercel;