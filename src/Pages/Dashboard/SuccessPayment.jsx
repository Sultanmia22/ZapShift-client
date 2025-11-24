import { useSearchParams } from "react-router";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useEffect, useState } from "react";




const SuccessPayment = () => { 

    /* const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')
    const axiosSecure = useAxiosSecure()
    const [paymentInfo,setPaymentInfo] = useState({})
    
    useEffect(() => {
        if(sessionId){
            axiosSecure.patch(`/success-payment?session_id=${sessionId}`)
            .then(res => {
                console.log(res.data)
                setPaymentInfo({
                    transactionId: res.data.transactionId,
                    trackingId:res.data.trackingId,
                })
            })
        }
    },[sessionId,axiosSecure])
 */
     const [searchParams] = useSearchParams()
     const sessionId = searchParams.get('session_id');
     const axiosSecure = useAxiosSecure()
     const [payment,setPayment] = useState({})

     useEffect(() => {
        if(sessionId){
            axiosSecure.patch(`/success-payment?session_id=${sessionId}`)
            .then(res => {
                setPayment({
                    transactionId: res.data.transactionId,
                    trackingId:res.data.trackingId,
                })
            })
        }
     },[axiosSecure,sessionId])

    console.log(sessionId)

    return (
        <div>
            <h2> Your Payment Successfully </h2>
            <p> Your TransactionId ({payment.transactionId}) </p>
            <p> Your TrackingId ({payment.trackingId}) </p> 
        </div>
    );
};
   
export default SuccessPayment;