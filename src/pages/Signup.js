import { Typography } from '@mui/material'
import React from 'react'
import { Link, } from 'react-router-dom'
import FormInput from '../components/common/FormInput'
import FormButton from '../components/common/FormButton'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signup = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState({
        password: false,
        cpassword: false
    });

    const handleClickShowPassword = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const validationSchema = Yup.object().shape({
        PhoneNumber: Yup.number().required("PhoneNumber is required"),
        password: Yup.string().required("Password is required"),
    });
    const formik = useFormik({
        initialValues: {
            UserName: "",
            PhoneNumber: "",
            password: "",
            cPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            try {
                setIsLoading(true);
                const payload = {
                    LoginFrom: "Admin",
                    PhoneNumber: values.PhoneNumber,
                    Password: values.password,
                };
                console.log("values", values);

                // reset after 3 seconds
                setTimeout(() => {
                    setIsLoading(false);
                }, 3000);
            } catch (error) {
                console.error("Error in Login:", error);
                setIsLoading(false); // only reset immediately if an error occurs
            }
        }

    })
    return (
        <div className='h-screen overflow-auto grid  grid-cols-1 md:grid-cols-2 gap-3 p-4'>
            <div className='flex items-center justify-center xs:px-2 sm:px-4 py-4'>
                <img src="/LoginSide2.png" alt="Signupbg" className='w-full max-h-[600px] h-full object-cover rounded-lg' />
            </div>
            {/*==========  Signup Form  start here ==========*/}
            <div className='flex w-full justify-center flex-col py-8 md:py-14 xs:px-4 sm:px-6 md:px-20'>
                <div className='flex items-center justify-center mb-8'>
                    <img src="/logo.png" alt="productLogo" className='w-32' />
                </div>
                <Typography variant='h5' sx={{ mb: 1, fontWeight: "medium",fontFamily: "Lato, sans-serif"}}>Sign Up</Typography>
                <Typography variant='h6' sx={{ fontWeight:"normal",fontFamily: "Poppins, sans-serif"  }} className='text-muted-foreground'>Enter details to create your account</Typography>
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mt-8 rounded-md ">
                    <div className="grid grid-cols-1 gap-4">
                        <FormInput
                            label="User Name"
                            name="UserName"
                            placeholder="Enter user name"
                            value={formik.values.UserName}
                            onChange={formik.handleChange}
                            error={formik.touched.UserName && Boolean(formik.errors.UserName)}
                            helperText={formik.touched.UserName && formik.errors.UserName}
                        />
                        <FormInput
                            label="Phone Number"
                            name="PhoneNumber"
                            placeholder="Enter mobile number"
                            value={formik.values.PhoneNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.PhoneNumber && Boolean(formik.errors.PhoneNumber)}
                            helperText={formik.touched.PhoneNumber && formik.errors.PhoneNumber}
                        />
                        <FormInput
                            label="Password"
                            name="password"
                            type={showPassword?.password ? "text" : "password"}
                            placeholder="Enter your password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => handleClickShowPassword("password")}
                                            edge="end"
                                        >
                                            {showPassword?.password ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <FormInput
                            label="Confirm Password"
                            name="cPassword"
                            type={showPassword?.cpassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={formik.values.cPassword}
                            onChange={formik.handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => handleClickShowPassword("cpassword")}
                                            edge="end"
                                        >
                                            {showPassword?.cpassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <div className="mt-2">
                        <FormButton
                            className="w-full"
                            disabled={
                                isLoading ||
                                !formik.values.UserName ||
                                !formik.values.PhoneNumber ||
                                !formik.values.password ||
                                !formik.values.cPassword
                            }
                        >
                            {isLoading ? "Creating..." : "Sign Up"}
                        </FormButton>

                        <h4 className='text-center mt-4'>Already Registered? <Link to="/" className='text-primary underline'>Login</Link></h4>
                    </div>
                </form>
            </div>
            {/*==========  Signup Form  End here ==========*/}

        </div>
    )
}

export default Signup