import { useState } from "react";
import type { FormEvent } from "react"
import { FaUser } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-normal mb-6 text-left text-gray-300 flex row items-center">
          <FaUser color="у" className="mr-3"/>Авторизация
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full py-2 bg-transparent text-gray-200 placeholder-gray-500 border-b-2 border-gray-600
                        focus:outline-none transition-colors duration-200 focus:border-gray-300 hover:border-gray-400"
              placeholder="Введите ваш email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full py-2 bg-transparent text-gray-200 placeholder-gray-500 border-b-2 border-gray-600
                        focus:outline-none transition-colors duration-200 focus:border-gray-300 hover:border-gray-400"
              placeholder="Введите пароль"
            />
          </div>

          <button
            type="submit"
            className="w-full py-1 mt-1 text-gray-300 border-2 border-gray-500 rounded-lg hover:border-gray-400
             transition-colors duration-200 active:border-gray-300 focus:border-gray-400"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
