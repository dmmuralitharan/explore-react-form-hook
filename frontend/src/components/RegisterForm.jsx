import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";

export default function RegisterForm() {

    const registerSchame = z.object({
        username: z.string().min(1, "Username is required"),
        email: z.string()
            .min(1, "Email is required")
            .email("Invalid email address"),
        password: z.string()
            .min(8, "Password must be at least 8 characters")
            .regex(
                /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                "Password must include an uppercase, number and special character"
            ),
        confirm_password: z.string()
            .min(1, "Password is required"),
    }).refine((data) => data.password === data.confirm_password, {
        path: ["confirm_password"],
        message: "Passwords do not match"
    })

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchame)
    })

    const onSubmitRegisterForm = (data) => {
        console.log(data);
    }

    const termsAccepted = watch("terms_accepted")
    
    return (
        <form
            className="flex flex-col justify-center items-center space-y-2 my-10"
            onSubmit={handleSubmit(onSubmitRegisterForm)}
        >

            <h1 className="text-xl font-semibold">Register</h1>

            <div className="flex flex-col  justify-center items-start">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id='username'
                    {...register("username")}
                    className="bg-slate-50 text-slate-800 font-semibold px-3 py-1 rounded-sm outline-none border-none"
                />
                {
                    errors?.username && <p className="text-red-500 text-sm">{errors.username.message}</p>
                }
            </div>

            <div className="flex flex-col  justify-center items-start">
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id='email'
                    {...register("email")}
                    className="bg-slate-50 text-slate-800 font-semibold px-3 py-1 rounded-sm outline-none border-none"
                />
                {
                    errors?.email && <p className="text-red-500 text-sm">{errors.email.message}</p>
                }
            </div>

            <div className="flex flex-col justify-center items-start">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id='password'
                    {...register("password")}
                    className="bg-slate-50 text-slate-800 font-semibold px-3 py-1 rounded-sm outline-none border-none "
                />
                {
                    errors?.password && <p className="text-red-500 text-sm">{errors.password.message}</p>
                }
            </div>

            <div className="flex flex-col justify-center items-start">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id='confirmPassword'
                    {...register("confirm_password")}
                    className="bg-slate-50 text-slate-800 accent-amber-800 font-semibold px-3 py-1 rounded-sm outline-none border-none "
                />
                {
                    errors?.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>
                }
            </div>

            <div className="flex justify-center items-center space-x-2">
                <input
                    type="checkbox"
                    id='termsAccepted'
                    {...register("terms_accepted")}
                    className="bg-slate-50 text-slate-800 font-semibold px-3 py-1 rounded-sm outline-none border-none"
                />
                <label htmlFor="termsAccepted">Accept all the terms</label>
            </div>

            <div className="flex flex-col justify-center items-end">
                <button
                    className="bg-slate-950 px-3 py-2 rounded-md disabled:bg-slate-600"
                    disabled={!termsAccepted}>
                    Submit
                </button>
            </div>

        </form>
    )
}
