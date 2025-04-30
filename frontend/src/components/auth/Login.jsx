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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center px-4 sm:px-6 max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-full md:w-3/4 lg:w-2/3 xl:w-1/2 border border-gray-200 rounded-md p-4 my-6 md:my-10'>
                    <h1 className='font-bold text-xl mb-4 md:mb-5'>Login</h1>
                    <div className='my-2'>
                        <Label className="block mb-1">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="patel@gmail.com"
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
                    <div className='mt-4'>
                        <Label className="block mb-2">Select Role</Label>
                        <RadioGroup className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 my-2 sm:my-3">
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
                    {
                        loading ? 
                        <Button className="w-full my-4 mt-6"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : 
                        <Button type="submit" className="w-full my-4 mt-6">Login</Button>
                    }
                    <div className="text-center sm:text-left">
                        <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600 hover:underline'>Signup</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login