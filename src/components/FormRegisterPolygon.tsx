/* eslint-disable @typescript-eslint/no-unused-vars */

import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createPolygonFormSchema = z.object({
  namePolygon: z.string().nonempty('O nome do polígono é obrigatório.')
})

type CreatePolygon = z.infer<typeof createPolygonFormSchema>

interface PolygonFormProps {
  onSubmit: (data: CreatePolygon) => void
  errorCoordinates: string
  polygons: { namePolygon: string }[]

}

export default function FormRegisterPolygon({
  onSubmit,
  errorCoordinates,
  polygons,
}: PolygonFormProps) {
  const { register, handleSubmit, reset } = useForm<CreatePolygon>()

  function handleSubmitForm(data: CreatePolygon) {
    onSubmit(data)
    reset()
  }

  console.log(polygons)

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex flex-col gap-4 max-w-md w-full mx-auto px-4 sm:px-6"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-center text-xl font-semibold text-white">
          Cadastro de Estabelecimentos
        </h1>

        <label
          htmlFor="namePolygon"
          className="text-zinc-500 font-bold mt-2"
        >
          Nome
        </label>
        <input
          {...register('namePolygon')}
          id="namePolygon"
          type="text"
          placeholder="Ex: escritório da Elleven"
          className="bg-slate-700 w-full rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {errorCoordinates && (
          <span className="text-red-500 text-sm mt-1">{errorCoordinates}</span>
        )}
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded w-full transition-colors"
      >
        Salvar
      </button>




    </form>


  )
}
