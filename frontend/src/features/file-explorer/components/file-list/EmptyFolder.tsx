import { RiEmotionSadLine } from "react-icons/ri";


export default function EmptyFolder({ colSpan }: { colSpan: number }) {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
            <RiEmotionSadLine className="text-zinc-600" size={32} />
          </div>
          <h3 className="text-zinc-200 font-medium text-lg">Здесь пока пусто</h3>
          <p className="text-zinc-500 text-sm max-w-50 mt-1">
            Похоже, вы еще не загрузили ни одного файла.
          </p>
        </div>
      </td>
    </tr>
  );
}