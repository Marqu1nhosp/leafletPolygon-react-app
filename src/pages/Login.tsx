import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeSlash } from 'phosphor-react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { zodResolver } from "@hookform/resolvers/zod";

const signInFormSchema = z.object({
    username: z.string(),
    password: z.string().min(6, 'A senha precisa de no mínimo 6 caracteres'),
});

type UserSignIn = z.infer<typeof signInFormSchema>;

export function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<UserSignIn>({ resolver: zodResolver(signInFormSchema) });
    const [visiblePassword, setVisiblePassword] = useState(false);
    const navigate = useNavigate();
    const { signIn, isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated) {
        return <Navigate to="/manage-location" />;
    } 

    async function handleSignIn(data: UserSignIn) {
        try {
            await signIn(data);
            // Se o login for bem-sucedido, o usuário será redirecionado automaticamente pelo contexto de autenticação
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Credenciais inválidas. Por favor, verifique seu usuário e senha e tente novamente.');
        }
    }

    if (isAuthenticated) {
        // Se o usuário já estiver autenticado, redirecione para a página desejada
        navigate('/manage-location');
    }

    return (
        <main className="h-screen bg-gradient-linear-black-ofCourse flex flex-col items-center justify-center gap-5">
            <div className="flex flex-col gap-9 bg-slate-800 w-full max-w-md p-20 rounded-xl items-center justify-center">
                <div>
                    <h1 className="text-white text-3xl">Faça seu login</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="text-white">Usuário</label>
                            <input type="text" className="rounded h-9 w-56 shadow-sm" {...register('username')} />
                            {errors.username && <span className="text-red-600 text-sm">{errors.username.message}</span>}
                        </div>
                        <div className="flex flex-col gap-1 relative">
                            <label htmlFor="" className="text-white">Senha</label>
                            <div className="relative">
                                <input type={visiblePassword ? 'text' : 'password'} className="rounded h-9 w-56 pr-10 pl-2 shadow-sm" {...register('password')} />
                                <div className="w-52">
                                    {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
                                </div>
                                <button type="button" className="text-black absolute top-1/2 transform -translate-y-1/2 right-2" onClick={() => setVisiblePassword(!visiblePassword)}>
                                    {visiblePassword ? <Eye /> : <EyeSlash />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-1.5 px-1.5 rounded w-56">Entrar</button>
                        <div>
                            <Link to="/register" className="text-[#9CA3AF] text-xs">Ainda não tem uma conta? Crie uma</Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
