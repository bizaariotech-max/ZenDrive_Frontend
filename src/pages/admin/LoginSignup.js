import { Checkbox, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormInput from '../../components/common/FormInput'
import FormButton from '../../components/common/FormButton'
import { toast } from 'react-toastify'

const LoginSignup = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return toast.error("Please enter valid email and password");
        }
        navigate("/admin")
    }

    return (
        <div className='h-screen overflow-auto grid  grid-cols-1 lg:grid-cols-2 gap-3 p-4'>
            <div className='flex items-center justify-center p-4'>
                <img src="/LoginSide.png" alt="Signup Image" className='w-full max-h-[600px] h-full object-cover rounded-lg' />
            </div>
            <div className='flex w-full justify-center flex-col py-8 md:py-14 px-10 md:px-20'>
                <div className='flex items-center justify-center mb-8'>
                    <img src="/logo.png" alt="Logo Image" className='w-32' />
                </div>
                <Typography variant='h5' sx={{ mb: 1, fontWeight: 'bold' }}>Welcome Back</Typography>
                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>Need an account? <Link to="/signup" className='text-primary underline'>Sign Up </Link></Typography>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8 rounded-md ">
                    <div className="grid grid-cols-1 gap-4">
                        <FormInput
                            label="Username"
                            name="username"
                            placeholder="Enter your username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormInput
                            label="Password"
                            name="password"
                            placeholder="Enter your password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="remember"
                                sx={{
                                    color: "var(--primary)",
                                    "&.Mui-checked": {
                                        color: "var(--primary)",
                                    },
                                }}
                            />
                            <label htmlFor="remember" className="text-primary cursor-pointer">
                                Remember me
                            </label>
                        </div>
                        <Link to="/forgot-password" className='text-primary underline'>Forgot Password?</Link>
                    </div>

                    <div className="mt-4">
                        <FormButton fullWidth disable={isLoading}> {isLoading ? "Logging in..." : "Login"}</FormButton>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default LoginSignup