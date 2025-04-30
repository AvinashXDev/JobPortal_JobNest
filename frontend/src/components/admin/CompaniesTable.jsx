import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Building2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    
    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])

    // Format date to be more readable
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        }).format(date);
    }

    return (
        <div className="w-full rounded-lg border shadow-sm overflow-hidden bg-white dark:bg-gray-950">
            <div className="overflow-x-auto">
                <Table>
                    <TableCaption className="text-gray-500 dark:text-gray-400 pb-4">
                        A list of your recently registered companies
                    </TableCaption>
                    <TableHeader className="bg-gray-50 dark:bg-gray-900">
                        <TableRow className="hover:bg-transparent border-b border-gray-200 dark:border-gray-800">
                            <TableHead className="w-20 font-semibold">Logo</TableHead>
                            <TableHead className="font-semibold">Name</TableHead>
                            <TableHead className="font-semibold">Date Added</TableHead>
                            <TableHead className="text-right font-semibold">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filterCompany && filterCompany.length > 0 ? (
                            filterCompany.map((company) => (
                                <TableRow 
                                    key={company._id} 
                                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                                >
                                    <TableCell className="py-3">
                                        <Avatar className="h-10 w-10 border border-gray-200 dark:border-gray-700">
                                            {company.logo ? (
                                                <AvatarImage src={company.logo} alt={company.name} />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                                                    <Building2 className="h-5 w-5 text-gray-500" />
                                                </div>
                                            )}
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium">{company.name}</TableCell>
                                    <TableCell className="text-gray-600 dark:text-gray-400">
                                        {company.createdAt ? formatDate(company.createdAt) : 'N/A'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                                                    <MoreHorizontal className="h-5 w-5 text-gray-500" />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-40 p-2">
                                                <button
                                                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                    className="flex w-full items-center gap-2 rounded-md p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                    <span>Edit Company</span>
                                                </button>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                    No companies found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default CompaniesTable