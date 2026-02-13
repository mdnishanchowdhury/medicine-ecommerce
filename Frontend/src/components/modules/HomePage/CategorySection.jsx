"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LayoutGrid, CircleDollarSign, X, Check } from 'lucide-react';
import PriceFilter from './PriceFilter';

const CategorySection = ({ categories }) => {
    const searchParams = useSearchParams();
    const [activeDrawer, setActiveDrawer] = useState(null);

    const activeCategory = searchParams.get('category');
    const closeDrawer = () => setActiveDrawer(null);

    return (
        <div className="ml-15 md:ml-0">
            {/* Mobile Buttons */}
            <div className="lg:hidden flex gap-2 p-4 bg-white border rounded-2xl sticky top-0 z-20">
                <button
                    onClick={() => setActiveDrawer('category')}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 active:bg-slate-100"
                >
                    <LayoutGrid size={18} className="text-blue-600" />
                    Categories
                </button>
                <button
                    onClick={() => setActiveDrawer('price')}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 active:bg-slate-100"
                >
                    <CircleDollarSign size={18} className="text-emerald-600" />
                    Price Filter
                </button>
            </div>

            {/* Mobile Drawer */}
            {activeDrawer && (
                <div className="fixed inset-0 z-[100] lg:hidden">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={closeDrawer} />
                    <div className="absolute bottom-0 left-0 right-0  rounded-t-[24px] p-6 shadow-2xl max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-black text-slate-900">
                                {activeDrawer === 'category' ? 'Select Category' : 'Set Price Range'}
                            </h2>
                            <button onClick={closeDrawer} className="p-2 bg-slate-100 rounded-full text-slate-500">
                                <X size={20} />
                            </button>
                        </div>

                        {activeDrawer === 'category' ? (
                            <div className="grid grid-cols-1 gap-3">
                                <Link
                                    href="/"
                                    scroll={false}
                                    onClick={closeDrawer}
                                    className={`flex items-center justify-between p-4 rounded-2xl border ${!activeCategory ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-slate-50 border-slate-100'}`}
                                >
                                    <span className="font-bold">All Medicines</span>
                                    {!activeCategory && <Check size={18} />}
                                </Link>
                                {categories.map((cat) => {
                                    const catId = cat._id || cat.id;
                                    const isActive = activeCategory === catId;
                                    return (
                                        <Link
                                            key={catId}
                                            href={`/?category=${catId}`}
                                            scroll={false}
                                            onClick={closeDrawer}
                                            className={`flex items-center justify-between p-4 rounded-2xl border ${isActive ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-slate-50 border-slate-100'}`}
                                        >
                                            <span className="font-bold">{cat.categoryName}</span>
                                            {isActive && <Check size={18} />}
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="pb-4">
                                <PriceFilter />
                                <button 
                                    onClick={closeDrawer} 
                                    className="w-full mt-4 py-3 text-slate-500 text-sm font-medium"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-full max-w-[280px] space-y-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <h2 className="text-[16px] font-black text-slate-800 mb-4 border-b pb-2">Product Categories</h2>
                    <div className="space-y-3">
                        <Link href="/" scroll={false} className="flex items-center gap-3 group">
                            <input type="checkbox" checked={!activeCategory} readOnly className="w-4 h-4 rounded text-blue-600 cursor-pointer" />
                            <span className={`text-sm font-bold ${!activeCategory ? 'text-blue-600' : 'text-slate-600'} group-hover:text-blue-600 transition-colors`}>All Medicines</span>
                        </Link>
                        {categories.map((cat) => {
                            const catId = cat._id || cat.id;
                            const isActive = activeCategory === catId;
                            return (
                                <Link key={catId} href={`/?category=${catId}`} scroll={false} className="flex items-center gap-3 group">
                                    <input type="checkbox" checked={isActive} readOnly className="w-4 h-4 rounded text-blue-600 cursor-pointer" />
                                    <span className={`text-sm font-bold ${isActive ? 'text-blue-600' : 'text-slate-600'} group-hover:text-blue-600 transition-colors`}>{cat.categoryName}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
                   <PriceFilter />
            </div>
        </div>
    );
};

export default CategorySection;