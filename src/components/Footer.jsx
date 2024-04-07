import React from 'react'
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-sky-950 text-white flex flex-col items-center w-full">
         <div className="font-bold text-[1.3rem]">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </div>
        <div className="flex items-center gap-1">
            <span>Created with</span>
            <FaHeart style={{fill : 'red'}} />
            <span>by Harsh Tayal</span>
        </div>
      
    </div>
  )
}

export default Footer
