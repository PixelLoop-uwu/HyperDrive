import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { TbFaceIdError } from "react-icons/tb";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex items-center justify-center overflow-hidden relative">
      <div className="absolute w-125 h-125 bg-zinc-800/10 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4"
      >
        <TbFaceIdError color="f4f4f5" />

        <h1 className="text-[12rem] font-black text-zinc-800/50 leading-none select-none">
          404
        </h1>
        
        <div className="relative -mt-16">
          <h2 className="text-3xl font-bold text-zinc-100 mb-2">
            Пустота...
          </h2>
          <p className="text-zinc-500 max-w-75 mx-auto mb-8 text-sm leading-relaxed">
            Похоже, эта страница была удалена или никогда не существовала.?
          </p>

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-semibold rounded-xl transition-all duration-200 group"
          >
            <HiOutlineArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Вернуться на главную
          </button>
        </div>
      </motion.div>

      <div className="absolute bottom-8 text-zinc-700 text-[10px] uppercase tracking-[0.2em] font-mono">
        HyperDrive // System Error
      </div>
    </div>
  );
}