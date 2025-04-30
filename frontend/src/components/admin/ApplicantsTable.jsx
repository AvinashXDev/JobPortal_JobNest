import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, CheckCircle, XCircle, FileText, Calendar, Phone, Mail, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const ApplicantsTable = () => {
    const { applicants } = useSelector((store) => store.application);
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Check if window is defined (browser environment)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const checkIfMobile = () => {
                setIsMobile(window.innerWidth < 768);
            };
            
            // Initial check
            checkIfMobile();
            
            // Add event listener for resize
            window.addEventListener('resize', checkIfMobile);
            
            // Cleanup
            return () => window.removeEventListener('resize', checkIfMobile);
        }
    }, []);

    const statusHandler = async (status, id) => {
        try {
            setLoading(true);
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status },{ withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Simulate fetching data for the sake of loading state
        if (!applicants) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [applicants]);

    // Loading state component
    const LoadingState = () => (
        <div className="flex items-center justify-center py-12">
            <div className="space-y-3">
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-2 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-2 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </div>
    );

    // Empty state component
    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
                <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No applicants yet</h3>
            <p className="mt-1 text-sm text-gray-500">
                When candidates apply, they will appear here.
            </p>
        </div>
    );

    // Mobile view card rendering
    const renderMobileCards = () => {
        if (!applicants?.applications?.length) {
            return <EmptyState />;
        }

        return (
            <div className="space-y-4 px-2">
                {applicants.applications.map((item) => (
                    <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-5">
                            <div className="flex items-center mb-4">
                                <div className="bg-gray-100 rounded-full p-2 mr-3">
                                    <User className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">{item?.applicant?.fullname}</h3>
                                    <p className="text-sm text-gray-500">{item?.applicant.createdAt.split("T")[0]}</p>
                                </div>
                            </div>
                            
                            <div className="space-y-3 mb-4">
                                <div className="flex items-center text-sm">
                                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                                    <span className="text-gray-600">{item?.applicant?.email}</span>
                                </div>
                                
                                <div className="flex items-center text-sm">
                                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                                    <span className="text-gray-600">{item?.applicant?.phoneNumber || "Not provided"}</span>
                                </div>
                                
                                <div className="flex items-center text-sm">
                                    <FileText className="w-4 h-4 text-gray-400 mr-2" />
                                    {item.applicant?.profile?.resume ? (
                                        <a
                                            className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                                            href={item?.applicant?.profile?.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View Resume
                                        </a>
                                    ) : (
                                        <span className="text-gray-500">No resume</span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => statusHandler("Accepted", item?._id)}
                                    className="flex items-center justify-center px-4 py-2 bg-green-50 text-green-700 rounded-lg font-medium text-sm flex-1 hover:bg-green-100 transition-colors"
                                    aria-label="Accept applicant"
                                >
                                    <CheckCircle className="w-4 h-4 mr-1.5" />
                                    Accept
                                </button>
                                <button
                                    onClick={() => statusHandler("Rejected", item?._id)}
                                    className="flex items-center justify-center px-4 py-2 bg-red-50 text-red-700 rounded-lg font-medium text-sm flex-1 hover:bg-red-100 transition-colors"
                                    aria-label="Reject applicant"
                                >
                                    <XCircle className="w-4 h-4 mr-1.5" />
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // Desktop view table
    const renderDesktopTable = () => {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <Table>
                    <TableCaption className="text-gray-500 text-sm pb-4">
                        A list of your recent applicants
                    </TableCaption>
                    <TableHeader className="bg-gray-50">
                        <TableRow className="hover:bg-gray-50">
                            <TableHead className="font-medium text-gray-700">Full Name</TableHead>
                            <TableHead className="font-medium text-gray-700">Email</TableHead>
                            <TableHead className="font-medium text-gray-700">Contact</TableHead>
                            <TableHead className="font-medium text-gray-700">Resume</TableHead>
                            <TableHead className="font-medium text-gray-700">Date</TableHead>
                            <TableHead className="text-right font-medium text-gray-700">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!applicants?.applications?.length ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32">
                                    <EmptyState />
                                </TableCell>
                            </TableRow>
                        ) : (
                            applicants.applications.map((item) => (
                                <TableRow 
                                    key={item._id} 
                                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                >
                                    <TableCell className="font-medium text-gray-900">
                                        {item?.applicant?.fullname}
                                    </TableCell>
                                    <TableCell className="text-gray-600">
                                        <div className="flex items-center">
                                            <Mail className="w-4 h-4 text-gray-400 mr-2" />
                                            {item?.applicant?.email}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-600">
                                        <div className="flex items-center">
                                            <Phone className="w-4 h-4 text-gray-400 mr-2" />
                                            {item?.applicant?.phoneNumber || "Not provided"}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {item.applicant?.profile?.resume ? (
                                            <a
                                                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                                href={item?.applicant?.profile?.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`View resume of ${item?.applicant?.fullname}`}
                                            >
                                                <FileText className="w-4 h-4 mr-1.5" />
                                                View
                                            </a>
                                        ) : (
                                            <span className="text-gray-500 inline-flex items-center">
                                                <FileText className="w-4 h-4 mr-1.5 text-gray-400" />
                                                Not available
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-gray-600">
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                                            {item?.applicant.createdAt.split("T")[0]}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Popover>
                                            <PopoverTrigger>
                                                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                                    <MoreHorizontal className="w-5 h-5 text-gray-500" aria-label="More options" />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-40 p-2" align="end">
                                                <div
                                                    onClick={() => statusHandler("Accepted", item?._id)}
                                                    className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
                                                    aria-label="Mark as Accepted"
                                                >
                                                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                                    <span className="text-gray-700">Accept</span>
                                                </div>
                                                <div
                                                    onClick={() => statusHandler("Rejected", item?._id)}
                                                    className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
                                                    aria-label="Mark as Rejected"
                                                >
                                                    <XCircle className="w-4 h-4 mr-2 text-red-500" />
                                                    <span className="text-gray-700">Reject</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        );
    };

    return (
        <div className="w-full overflow-x-hidden">
            {loading ? (
                <LoadingState />
            ) : isMobile ? (
                <div className="px-2 py-4">
                    <h2 className="text-xl font-semibold mb-6 text-gray-900 px-2"> Total Applicants {applicants?.applications?.length}</h2>
                    {renderMobileCards()}
                </div>
            ) : (
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-6 text-gray-900">Applicants</h2>
                    {renderDesktopTable()}
                </div>
            )}
        </div>
    );
};

export default ApplicantsTable;