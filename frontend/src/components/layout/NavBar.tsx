import { useCloseOnOutside } from "@/hooks/closeOnOutside";

import { useRef, useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { IoExitOutline } from "react-icons/io5";



export default function NavBar () {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchBuffer, setSearchBuffer] = useState<string>("");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])

  const searchSuggestionsRef = useRef<HTMLDivElement | null>(null);


  function handleSubmit(value?: string) {

    const query = value ?? searchBuffer
    if (!query) return

    setSearchBuffer(query)

    setIsOpen(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      searchBuffer && setSearchSuggestions([searchBuffer, ...searchSuggestions])
    }, 2000)

    return () => clearTimeout(timer)
  }, [searchBuffer])


  useCloseOnOutside(isOpen, searchSuggestionsRef, () => setIsOpen(false))

  return (
    <>
      <div className="w-full flex items-center justify-between px-4 py-2">

        <div className="flex flex-1 items-center gap-2">
          <img src="/logo.png" className="h-10 w-10" />
          <div className="text-gray-300 text-xl font-medium">
            HyperDrive
          </div>
        </div>

        <div className="flex items-center border-b-2 border-gray-500 px-2 gap-2 w-105
                        transition-colors duration-200 hover:border-gray-300 focus-within:border-gray-300 ">
          <GoSearch className="h-4 w-4 text-gray-400" />

          <form onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
            <input
              type="text"
              value={searchBuffer}
              placeholder="Поиск на диске..."
              className="flex-1 h-8 bg-transparent text-gray-300 placeholder-gray-400 focus:outline-none"
              onChange={(e) => setSearchBuffer(e.target.value)}
              onClick={() => setIsOpen(true)}
            />
          </form>

          {isOpen && (
            <div
              className="absolute w-100 text-gray-300 top-15 bg-black/80 z-50 flex flex-col
                        rounded-2xl gap-2 px-2"
              ref={searchSuggestionsRef}
            >
              {searchSuggestions.map((text) => (
                <div
                  key={text}
                  className="px-2 py-1 border-b-2  border-transparent hover:border-gray-400 transition-colors duration-300 rounded cursor-pointer"
                  onClick={() => handleSubmit(text)}
                >
                  {text}
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="flex flex-1 justify-end items-center w-auto h-9 text-gray-300 hover:text-white transition-colors">
          <IoExitOutline className="ml-1.5 h-6 w-6"/>
        </button>
      </div>
    </>
  )
}