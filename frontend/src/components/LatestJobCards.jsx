import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    
    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='p-5 rounded-xl shadow-lg bg-white border border-gray-100 cursor-pointer flex flex-col justify-between h-full hover:shadow-2xl transition-shadow duration-300'
        >
            <div>
                <h1 className='font-medium text-base md:text-lg truncate'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>

            <div className='mt-3'>
                <h2 className='font-bold text-lg md:text-xl my-1 truncate'>{job?.title}</h2>
                <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant="ghost">{job?.position} Positions</Badge>
                <Badge className='text-[#F83002] font-bold' variant="ghost">{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] font-bold' variant="ghost">{job?.salary} LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards;
