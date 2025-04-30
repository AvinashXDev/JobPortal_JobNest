import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const {loading, user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center px-4 sm:px-6 max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-full md:w-3/4 lg:w-2/3 xl:w-1/2 border border-gray-200 rounded-md p-4 my-6 md:my-10'>
                    <h1 className='font-bold text-xl mb-4 md:mb-5'>Sign Up</h1>
                    
                    <div className='my-2'>
                        <Label className="block mb-1">Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Enter your full name"
                            className="w-full"
                        />
                    </div>
                    
                    <div className='my-2 mt-4'>
                        <Label className="block mb-1">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="you@example.com"
                            className="w-full"
                        />
                    </div>
                    
                    <div className='my-2 mt-4'>
                        <Label className="block mb-1">Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="8080808080"
                            className="w-full"
                        />
                    </div>
                    
                    <div className='my-2 mt-4'>
                        <Label className="block mb-1">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            className="w-full"
                        />
                    </div>
                    
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4'>
                        <div className="w-full md:w-auto">
                            <Label className="block mb-2">Select Role</Label>
                            <RadioGroup className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 my-2">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="r1">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="r2">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        
                        <div className='w-full md:w-auto mt-4 md:mt-0'>
                            <Label className="block mb-2">Profile Photo</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer w-full"
                            />
                        </div>
                    </div>
                    
                    {
                        loading ? 
                        <Button className="w-full my-4 mt-6"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : 
                        <Button type="submit" className="w-full my-4 mt-6">Signup</Button>
                    }
                    
                    <div className="text-center sm:text-left">
                        <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600 hover:underline'>Login</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup