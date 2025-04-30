import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
  const [filteredJobs, setFilteredJobs] = useState(allAdminJobs || [])
  const navigate = useNavigate()

  useEffect(() => {
    const filtered = allAdminJobs?.filter(job => {
      if (!searchJobByText) return true
      const query = searchJobByText.toLowerCase()
      return (
        job?.title?.toLowerCase().includes(query) ||
        job?.company?.name?.toLowerCase().includes(query)
      )
    })
    setFilteredJobs(filtered)
  }, [allAdminJobs, searchJobByText])

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableCaption>A list of your recently posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs?.map(job => (
            <TableRow key={job._id}>
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.createdAt?.split('T')[0]}</TableCell>
              <TableCell className='text-right'>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      aria-label='More options'
                      className='p-1 rounded hover:bg-gray-100'
                    >
                      <MoreHorizontal />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className='w-36'>
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className='flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer'
                    >
                      <Edit2 className='w-4' />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className='flex items-center gap-2 px-2 py-1 mt-1 rounded hover:bg-gray-100 cursor-pointer'
                    >
                      <Eye className='w-4' />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTable
