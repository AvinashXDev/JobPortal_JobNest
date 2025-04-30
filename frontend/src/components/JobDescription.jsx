import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job)
  const { user } = useSelector(store => store.auth)
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false
  const [isApplied, setIsApplied] = useState(isInitiallyApplied)

  const params = useParams()
  const jobId = params.id
  const dispatch = useDispatch()

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true })

      if (res.data.success) {
        setIsApplied(true)
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        }
        dispatch(setSingleJob(updatedSingleJob))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Something went wrong.")
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSingleJob()
  }, [jobId, dispatch, user?._id])

  return (
    <div className='max-w-7xl mx-auto my-8 px-4'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
        <div>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>{singleJob?.title}</h1>
          <div className='flex flex-wrap gap-2 mt-3'>
            <Badge className='text-blue-700 font-semibold' variant='ghost'>{singleJob?.postion} Positions</Badge>
            <Badge className='text-red-600 font-semibold' variant='ghost'>{singleJob?.jobType}</Badge>
            <Badge className='text-purple-700 font-semibold' variant='ghost'>{singleJob?.salary} LPA</Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg px-6 py-2 text-white transition ${
            isApplied ? 'bg-gray-500 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800'
          }`}>
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <div className='bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-xl font-semibold text-gray-900 border-b pb-2 mb-4'>Job Description</h2>
        <div className='space-y-3 text-gray-700'>
          <p><span className='font-semibold'>Role:</span> <span className='ml-2'>{singleJob?.title}</span></p>
          <p><span className='font-semibold'>Location:</span> <span className='ml-2'>{singleJob?.location}</span></p>
          <p><span className='font-semibold'>Description:</span> <span className='ml-2'>{singleJob?.description}</span></p>
          <p><span className='font-semibold'>Experience:</span> <span className='ml-2'>{singleJob?.experience} yrs</span></p>
          <p><span className='font-semibold'>Salary:</span> <span className='ml-2'>{singleJob?.salary} LPA</span></p>
          <p><span className='font-semibold'>Total Applicants:</span> <span className='ml-2'>{singleJob?.applications?.length}</span></p>
          <p><span className='font-semibold'>Posted Date:</span> <span className='ml-2'>{singleJob?.createdAt?.split("T")[0]}</span></p>
        </div>
      </div>
    </div>
  )
}

export default JobDescription
