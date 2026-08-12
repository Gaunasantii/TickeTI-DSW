import { Component } from "react";

type cardProps={
  title:string,
  description:string,
  colspan:string,
  Icon: React.ElementType
}

export const CardComponent=({title,description,colspan,Icon}:cardProps)=>{
  return(
    <div className={colspan}>
      <div className=" p-5 flex flex-col bg-[#FCFCFC] rounded-xl h-full justify-center gap-5">
        
        <div className=" w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>

        <span className="text-xl font-semibold content-center text-start ">
          {title}
        </span>
        <span className="text-slate-600 ">
          {description}
        </span>
      </div>
      
    </div>
  )
}