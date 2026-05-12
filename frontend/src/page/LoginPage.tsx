import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore"; 

import type { FormEvent, ChangeEvent } from "react";
import type { LoginParams } from "@/types/auth"; 


export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn, isLoggingIn } = useAuth();
  const isAuth = useAuthStore((state) => state.isAuth);

  const [form, setForm] = useState<LoginParams>({
    login_identifier: "",
    password: "",
  });


  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(form);
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-zinc-800/20 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="w-full max-w-95 z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-zinc-800 border border-zinc-700 rounded-xl flex items-center justify-center mb-5 shadow-lg">
            <img src="/logo.png" className="h-6 w-6 brightness-0 invert opacity-80" alt="HyperDrive Logo" />
          </div>
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">
            С возвращением
          </h1>
          <p className="text-zinc-500 text-sm mt-2">
            Войдите в свой аккаунт HyperDrive
          </p>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 p-6 rounded-2xl shadow-2xl space-y-5"
        >
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-zinc-400 ml-1">
              Email или Логин
            </label>
            <div className="relative group">
              <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
              <input
                type="text"
                name="login_identifier"
                value={form.login_identifier}
                onChange={handleChange}
                required
                placeholder="name@example.com или username"
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm 
                         text-zinc-200 placeholder-zinc-600 outline-none 
                         focus:border-zinc-500 focus:bg-zinc-900 transition-all duration-200"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="block text-xs font-medium text-zinc-400">
                Пароль
              </label>
            </div>
            <div className="relative group">
              <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm 
                         text-zinc-200 placeholder-zinc-600 outline-none 
                         focus:border-zinc-500 focus:bg-zinc-900 transition-all duration-200"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full mt-2 py-2.5 px-4 bg-zinc-100 hover:bg-white disabled:bg-zinc-600 text-zinc-950 text-sm font-semibold 
                       rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-white/5"
          >
            {isLoggingIn ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}