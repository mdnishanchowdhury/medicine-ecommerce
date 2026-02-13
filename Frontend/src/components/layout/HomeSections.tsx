"use client";

import Image from "next/image";
import Link from "next/link";

const promoData = [
    {
        title: "Get 10 Bonus Points",
        desc: "Download our mobile app and earn reward points.",
        image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=300&h=300",
        bg: "bg-green-100",
    },
    {
        title: "Home Delivery Available",
        desc: "Fast & secure medicine delivery to your doorstep.",
        image: "https://i.ibb.co.com/Zp8qWKXj/home.png",
        bg: "bg-blue-100",
    },
];

const categories = [
    {
        name: "Medicines",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
        name: "Mother & Baby",
        image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
        name: "Cosmetics",
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
        name: "Vitamins & Supplements",
        image: "https://i.ibb.co.com/kVPs0c5X/dietary-supplement-banner.jpg"
    },
    {
        name: "Medical Devices",
        image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
        name: "Gift Cards",
        image: "https://i.ibb.co.com/BKNXP1Qp/git.png"
    },
];

export default function HomeSections() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">

                <div className="grid md:grid-cols-2 gap-6 mb-16">
                    {promoData.map((item, index) => (
                        <div
                            key={index}
                            className={`relative rounded-2xl overflow-hidden p-8 ${item.bg} flex items-center justify-between transition hover:scale-[1.02] duration-300 shadow-sm`}
                        >
                            <div className="max-w-xs">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {item.desc}
                                </p>
                                <button className="mt-4 px-4 py-2 bg-white text-gray-800 text-sm font-semibold rounded-lg shadow-sm hover:bg-gray-50">
                                    Learn More
                                </button>
                            </div>

                            <div className="relative w-42 h-42 hidden sm:block">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-contain rounded-lg"
                                    unoptimized
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center sm:text-left">
                        Popular Categories
                    </h2>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {categories.map((cat, index) => (
                            <Link
                                key={index}
                                href={"/"}
                                className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
                            >
                                <div className="relative w-full h-48">
                                    <Image
                                        src={cat.image}
                                        alt={cat.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition duration-500"
                                        unoptimized
                                    />
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition duration-300" />

                                <div className="absolute bottom-5 left-5">
                                    <h3 className="text-white font-bold text-xl tracking-wide">
                                        {cat.name}
                                    </h3>
                                    <span className="text-white/80 text-xs font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Explore Now →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}