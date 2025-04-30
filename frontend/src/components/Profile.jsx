import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true

const Profile = () => {
  useGetAppliedJobs()
  const [open, setOpen] = useState(false)
  const { user } = useSelector(store => store.auth)

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-6 p-6 shadow-sm'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-20 w-20'>
              <AvatarImage
                src='https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg'
                alt='profile'
              />
            </Avatar>
            <div>
              <h1 className='font-semibold text-xl text-gray-800'>{user?.fullname}</h1>
              <p className='text-sm text-gray-600'>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant='outline' size='icon'>
            <Pen size={18} />
          </Button>
        </div>

        <div className='my-6 space-y-3'>
          <div className='flex items-center gap-3 text-gray-700'>
            <Mail size={18} />
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3 text-gray-700'>
            <Contact size={18} />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className='my-6'>
          <h2 className='font-semibold mb-2'>Skills</h2>
          <div className='flex flex-wrap gap-2'>
            {user?.profile?.skills?.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index} className='capitalize'>
                  {item}
                </Badge>
              ))
            ) : (
              <span className='text-gray-500'>NA</span>
            )}
          </div>
        </div>

        <div className='mt-6'>
          <Label className='text-md font-semibold'>Resume</Label>
          <div className='mt-1'>
            {isResume ? (
              <a
                href={user?.profile?.resume}
                target='_blank'
                rel='noreferrer'
                className='text-blue-600 hover:underline break-all'
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className='text-gray-500'>NA</span>
            )}
          </div>
        </div>
      </div>

      <div className='max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-sm'>
        <h2 className='font-bold text-lg mb-4'>Applied Jobs</h2>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
