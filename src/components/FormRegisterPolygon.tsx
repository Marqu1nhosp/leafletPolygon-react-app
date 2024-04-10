/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const createPolygonFormSchema = z.object({
  namePolygon: z.string().nonempty('O nome do polígono é obrigatório.')
});

type CreatePolygon = z.infer<typeof createPolygonFormSchema>;

interface PolygonFormProps {
  onSubmit: (data: CreatePolygon) => void;
  errorCoordinates: string;
  polygons: { namePolygon: string }[];
  handlePolygonSelection: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedPolygons: string[];
  onShowAllPolygons: () => void;
}

export default function FormRegisterPolygon({
  onSubmit,
  errorCoordinates,
  polygons,
  handlePolygonSelection,
  onShowAllPolygons,
  selectedPolygons
}: PolygonFormProps) {
  const { register, handleSubmit, reset } = useForm<CreatePolygon>();

  function handleSubmitForm(data: CreatePolygon) {
    onSubmit(data);
    reset();
  }

  console.log(polygons)

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div>
          <label htmlFor="" className="text-zinc-500 font-bold">Nome do polígono</label>
        </div>
        <div>
          <input {...register('namePolygon')} type="text" placeholder="Ex: escritório da Elleven" className="bg-slate-700 w-80 rounded-md p-1.5 mr-1.5 text-white" />
        </div>
        <div>
          {errorCoordinates && (
            <span className="text-red-500 text-sm">{errorCoordinates}</span>
          )}
        </div>
      </div>

      <div>
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-1.5 px-1.5 rounded w-80">Salvar</button>
      </div>
      <div>
        <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1.5 px-1.5 rounded w-80" onClick={onShowAllPolygons}>Visualizar todos</button>
      </div>

      <div className="">
        <select
          id="polygons"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1.5 px-14 rounded w-80"
          value={selectedPolygons.length > 0 ? selectedPolygons[0] : ""}
          onChange={handlePolygonSelection}
        >
          <option value="">Selecione um polígono</option>
          {polygons.map((polygon, index) => (
            <option className="items-center justify-center" key={index} value={polygon.namePolygon}>{polygon.namePolygon}</option>
          ))}
        </select>
      </div>
    </form>
  );
}
