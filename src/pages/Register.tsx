import { FormRegisterUser } from "../components/FormRegisterUser"

export function Register() {
    return (
        <main className="h-screen bg-gradiente-linear-black-ofCourse flex flex-col items-center justify-center gap-5">
            <div className="flex flex-col gap-9 bg-slate-800 w-full max-w-md p-20 rounded-xl items-center justify-center">
                <div className="mr-3">
                    <h1 className="text-white text-3xl ">Faça seu registro</h1>
                </div>
                <div>
                 <FormRegisterUser />
                </div>
            </div>
        </main>
    )
}

export default Register
