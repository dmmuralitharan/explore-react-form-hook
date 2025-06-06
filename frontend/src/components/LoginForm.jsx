import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export default function LoginForm() {

    const loginSchema = z.object({
        username: z.string().min(1, "Username is required"),
        password: z.string()
            .min(8, "Password must be at least 8 characters")
            .regex(
                /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                "Password must include an uppercase, number and special character"
            )
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    })

    const onSubmitLoginForm = (data) => {
        console.log(data);
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmitLoginForm)}
            className="flex flex-col justify-center items-center space-y-2 mt-10">

            <div className="flex flex-col  justify-center items-start">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id='username'
                    {...register("username")}
                    className="bg-slate-50 text-slate-800 font-semibold px-3 py-1 rounded-sm outline-none border-none"
                />
                {
                    errors.username && (
                        <p className="text-red-500 text-sm">{errors.username.message}</p>
                    )
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
                    errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )
                }
            </div>

            <div className="flex flex-col justify-center items-end">
                <button className="bg-slate-950 px-3 py-2 rounded-md">Submit</button>
            </div>

        </form>
    )
}
