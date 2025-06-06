import { useForm } from "react-hook-form"

export default function LoginForm() {

    const { register, handleSubmit } = useForm()

    const onSubmitLoginForm = (data) => {
        console.log(data);
    }

    return (
        <form 
            onSubmit={handleSubmit(onSubmitLoginForm)}
            className="flex flex-col space-y-2 mt-10">

            <div className="flex space-x-5 justify-center items-center">
                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    id='username'
                    {...register("username")} 
                    className="bg-slate-50 text-slate-800 font-semibold px-3 py-1 rounded-sm outline-none border-none" />
            </div>

            <div className="flex space-x-6.5 justify-center items-center">
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id='password' 
                    {...register("password")}
                    className="bg-slate-50 text-slate-800 font-semibold px-3 py-1 rounded-sm outline-none border-none " />
            </div>

            <div className="flex justify-center items-center">
                <button className="bg-slate-950 px-3 py-2 rounded-md">Submit</button>
            </div>

        </form>
    )
}
