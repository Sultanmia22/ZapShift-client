import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';
const position = [23.685, 90.356]
const Coverage = () => {

    const serviceCenter = useLoaderData()
    const mapRef = useRef(null)
    
    const handleSearch = e => {
        e.preventDefault();
        const locations = e.target.location.value;
        const districs = serviceCenter.find(cernter => cernter.district.toLowerCase().includes(locations.toLowerCase()))
        if(districs){
            const coordinate = [districs.latitude,districs.longitude]
            mapRef.current.flyTo(coordinate,14)
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

            {/* MAP */}
            <div className='border w-11/12 mx-auto h-[800px]'>
                <MapContainer center={position} zoom={8} scrollWheelZoom={false} className='h-[800px]' ref={mapRef}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        serviceCenter.map((center, index) =>
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