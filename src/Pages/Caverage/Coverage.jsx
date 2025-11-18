
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';
import { useRef } from 'react';

const position = [23.685, 90.356]
const Coverage = () => {

    const serviceCenter = useLoaderData()

        const mapRef = useRef(null)

        const handleSearch = (e) => {
            e.preventDefault();
            const location = e.target.location.value;
            const district = serviceCenter.find(center => center.district.toLowerCase().includes(location.toLowerCase()))
            if(district){
                const coordinate = [district.latitude,district.longitude]
                mapRef.current.flyTo(coordinate,12)
            }
        }

    return (
        <div className='my-25'>
            {/* Title and Button */}
            <div className='pb-10 mx-10 space-y-3'>
                <h2 className='text-4xl font-bold '>We are available in 64 districts</h2>
                <div className='flex gap-2 items-center'>
                   <form className='flex items-center gap-2' onSubmit={handleSearch}>
                     <input type="text" className='input rounded-xl' placeholder='Search here' name='location' />
                    <button className='btn bg-primary text-secondary rounded-xl'> Search </button>
                   </form>
                </div>
            </div>

            <div className='border w-11/12 mx-auto min-h-screen h-[800px]'>
                <MapContainer center={position} zoom={8} scrollWheelZoom={false} className='h-[800px]' ref={mapRef}>
                     <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        serviceCenter.map((center,index) => 
                        <Marker key={index} position={[center.latitude,center.longitude]}>
                        <Popup>
                            <strong>{center.district}</strong>   
                            <br /> 
                            Service Area : {center.covered_area.join(', ')}                        
                        </Popup>
                    </Marker>
                        )
                    }
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;