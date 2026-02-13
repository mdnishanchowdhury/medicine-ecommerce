import React from "react";
import { Medicine } from "@/types/medi.service";
import Link from "next/link";

interface MediCardProps {
  medicine: Medicine;
}

const MediCard: React.FC<MediCardProps> = ({ medicine }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4 flex flex-col group">
      
      <div className="relative mb-4 bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden flex justify-center items-center p-6 h-48">
        <img
          src={medicine.image}
          alt={medicine.name}
          className=" object-contain group-hover:scale-105 transition-transform duration-300"
        />

        <span className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/80 dark:bg-slate-700/80 px-2 py-1 rounded shadow-sm">
          {medicine.category.categoryName}
        </span>

        {!medicine.isActive && (
          <span className="absolute inset-0 bg-white/60 dark:bg-black/60 flex items-center justify-center font-bold text-red-600 uppercase text-xs">
            Not Available
          </span>
        )}
      </div>

      <div className="mb-2">
        <h2 className="text-md font-bold text-slate-800 dark:text-slate-100 truncate">
          {medicine.name}
        </h2>
        <p className="text-[11px] text-slate-400 font-medium">
          Manufacturer: {medicine.manufacturer}
        </p>
      </div>

      <p className="text-[13px] text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed h-10">
        {medicine.description}
      </p>

      <div className="flex justify-between items-end mb-5">
        <div className="flex flex-col">
          <span className="text-xl font-black text-blue-600 dark:text-blue-400">
            Tk {medicine.price}
          </span>
        </div>
        <span
          className={`text-[11px] font-bold px-2 py-1 rounded-full ${
            medicine.stock > 0 
            ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20" 
            : "text-red-600 bg-red-50 dark:bg-red-900/20"
          }`}
        >
          {medicine.stock > 0 ? `${medicine.stock} in stock` : "Out of stock"}
        </span>
      </div>

      <Link href={`/medicine/${medicine.id}`} className="mt-auto">
        <button
          disabled={!medicine.isActive || medicine.stock <= 0}
          className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${
            medicine.isActive && medicine.stock > 0
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 dark:shadow-none shadow-lg"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          {medicine.isActive && medicine.stock > 0 ? "Buy Now" : "Unavailable"}
        </button>
      </Link>
    </div>
  );
};

export default MediCard;