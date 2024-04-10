/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
// import { v4 as uuid } from 'uuid'

import { useState } from 'react'
import { Eye, EyeSlash } from 'phosphor-react'
import { Link } from 'react-router-dom'
import { api } from '../api/axios'

// Define o esquema para o formulário de criação de usuário usando Zod
const createUserFormSchema = z.object({
    name: z
        .string()
        .nonempty('O nome é obrigatório'),
    username: z
        .string()
        .nonempty('O usuário é obrigatório'),
    password: z
        .string()
        .min(6, 'A senha precisa de no mínimo +</br> 6 caractetes'),
})

// Define o tipo TypeScript com base no esquema do Zod
type CreateUser = z.infer<typeof createUserFormSchema>

export function FormRegisterUser() {
    // Estado para alternar a visibilidade da senha
    const [visiblePassword, setVisiblePassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateUser>({
        resolver: zodResolver(createUserFormSchema),
    })



    // Função para lidar com a criação de usuário
    async function createUser(data: CreateUser) {
        const { name, username, password } = data

        try {
            api.post('/user', {
                name,
                username,
                password
            })

            console.log('Usuário criado com sucesso')
        } catch (error) {
            console.error('Erro ao enviar os dados para api de registro de usuário')
        }
    }

    return (
        <form
            action=""
            onSubmit={handleSubmit(createUser)}
            className="flex flex-col gap-4"
        >
            <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-white">
                    Nome
                </label>

                <input
                    type="text"
                    className="rounded h-9 w-56 shadow-sm"
                    {...register('name')}
                />

                {errors.name && (
                    <span className="text-red-600 text-sm">
                        {errors.name.message}
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-white">
                    Usuário
                </label>
                <input
                    type="text"
                    className="rounded h-9 w-56 shadow-sm"
                    {...register('username')}
                />
                {errors.username && (
                    <span className="text-red-600 text-sm">
                        {errors.username.message}
                    </span>
                )}
            </div>

            <div className="flex flex-col relative">
                <label htmlFor="" className="text-white">
                    Senha
                </label>
                <div className="relative flex items-center">
                    <input
                        type={visiblePassword ? 'text' : 'password'}
                        className="rounded h-9 w-56 shadow-sm pr-10 pl-2"
                        {...register('password')}
                    />
                    <button
                        type="button"
                        className="text-black absolute ml-[12.5rem]"
                        onClick={() => setVisiblePassword(!visiblePassword)}
                    >
                        {visiblePassword ? <Eye /> : <EyeSlash />}
                    </button>
                </div>
                {errors.password && (
                    <span className="text-red-600 text-sm">
                        A senha precisa de no mínimo 6 caractetes
                    </span>
                )}
            </div>


            <button
                type="submit"
                className="text-white bg-green-600 hover:bg-green-800 font-semibold rounded h-9 w-56 "
            >
                Criar conta
            </button>
            <div>
                <Link to="/" className="text-[#9CA3AF] text-xs mr-14">
                    Já tem uma conta? fazer Login
                </Link>
            </div>
        </form>
    )
}