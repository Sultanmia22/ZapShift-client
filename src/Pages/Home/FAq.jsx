import React from 'react';

const FAq = () => {
    return (
        <div className='md:w-[1282px] md:mx-auto'>
            <div className='text-center space-y-2'>
                <h2 className='text-4xl font-bold text-secondary'>Frequently Asked Question (FAQ)</h2>
                <p> Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your body with ease! </p>
            </div>

            <div className='py-8 space-y-4'>
                <div className="collapse collapse-arrow bg-[#E6F2F3] border border-base-300 ">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title font-semibold">How does this posture corrector work??</div>
                    <div className="collapse-content text-sm">A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders..</div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold">Is it suitable for all ages and body types?</div>
                    <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold">Does it really help with back pain and posture improvement??</div>
                    <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold">Does it have smart features like vibration alerts???</div>
                    <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
                </div>
            </div>
             <div className='flex justify-center pb-5'>
                <button className='btn bg-primary mx-auto'> See More FAQ </button>
             </div>
        </div>
    );
};

export default FAq;