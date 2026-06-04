import { useState, useEffect } from "react";
import { Navbar } from "../components/NavbarSection";
export function ShopPage() {
    const [activeTab, setActiveTab] = useState("flowers");
    const [products, setProducts] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    // Reset filters when changing categories
    useEffect(() => {
        setSelectedFilters({});
    }, [activeTab]);

    // Fetch data
    useEffect(() => {
        fetch(`/${activeTab}.json`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Fetch Error:", err));
    }, [activeTab]);

    const categories = [
        {
            id: "flowers",
            label: "Flower Bouquets",
            filters: {
                "Type": ["Peony", "Lily", "Rose"],
                "Size": ["Small", "Medium", "Large", "Deluxe"],
                "Color": ["Pink", "Red", "Yellow", "Lavender"]
            }
        },
        {
            id: "vases",
            label: "Vases",
            filters: {
                "Type": ["Art Deco", "Bohemian", "Japanese", "Mediterranean", "Minimalist", "Moroccan", "Nordic", "Rustic", "Scandinavian", "Victorian",],
                "Size": ["Compact", "Deluxe", "Large", "Medium", "Small", "Tall"],
                "Color": ["Blush", "Burnt Orange", "Cobalt Blue", "Cream", "Dusty Rose", "Forest Green",
                    "Ivory", "Midnight Black", "Pearl White", "Sage Green", "Soft Gray", "Terracotta"]
            }

        },
        {
            id: "homeDecoration",
            label: "Home Decor",
            filters: {
                "Type": ["Basket", "Candle Ring", "Centerpiece", "Garland", "Lantern", "Mirror Frame", "Swag", "Table Runner", "Wall Art", "Wreath"],
                "Size": ["Compact", "Deluxe", "Large", "Medium", "Mini", "Oversized", "Small", "Tall"],
                "Color": ["Blush", "Burnt Orange", "Cobalt Blue", "Cream", "Dusty Rose", "Forest Green", "Ivory", "Lavender", "Midnight Black", "Pearl White", "Rustic Brown", "Sage Green", "Soft Gray", "Terracotta"]
            }
        }
    ];

    const activeCategory = categories.find(c => c.id === activeTab);

    // Filter Logic
    const toggleFilter = (filterName, option) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterName]: prev[filterName] === option ? null : option
        }));
    };

    const displayedProducts = products.filter(item => {
        return Object.entries(selectedFilters).every(([filterName, selectedOption]) => {
            if (!selectedOption) return true;

            if (filterName === "Type") {
                return item.type === selectedOption;
            }

            if (filterName === "Size") {
                return item.size === selectedOption;
            }

            if (filterName === "Color") {
                return item.color?.toLowerCase().includes(
                    selectedOption.toLowerCase()
                );
            }

            return true;
        });
    });

    return (
        <div className="min-h-screen bg-[hsl(var(--pum-pearl))]">
            <div className="mt-16">
                <Navbar />
            </div>
            {/* Sidebar */}
            <div className="pt-24 pb-16">

                <div className="flex justify-center items-center gap-6 mb-10 flex-wrap">

                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`
                    uppercase
                    tracking-[0.25em]
                    text-xs
                    transition-all duration-300
                    ${activeTab === cat.id
                                    ? "text-[hsl(var(--pum-green))]"
                                    : "text-[hsl(var(--pum-taupe)/50)] hover:text-[hsl(var(--pum-taupe))]"
                                }
                `}
                        >
                            {cat.label}
                        </button>
                    ))}

                </div>

                <div className="flex justify-center">
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="
                px-6 py-3
                rounded-full
                border
                border-[hsl(var(--pum-taupe)/15)]
                bg-white
                hover:shadow-lg
                transition-all
            "
                    >
                        Filters
                    </button>
                </div>

            </div>

            {/* Product Grid */}
            <main className="max-w-7xl mx-auto px-8 pb-24">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                    {displayedProducts.map(item => (
                        <div
                            key={item.id}
                            className="
                    group
                    bg-white
                    rounded-[2rem]
                    p-5
                    border border-[hsl(var(--pum-taupe))/5]
                    hover:shadow-2xl
                    transition-all duration-500
                "
                        >
                            <img
                                src={item.image}
                                className="w-full aspect-[4/5] object-cover rounded-[1.5rem] mb-6"
                                alt={item.name}
                            />

                            <p className="text-[9px] uppercase tracking-[0.2em] text-[hsl(var(--pum-green))] font-bold mb-1">
                                {item.categoryType}
                            </p>

                            <h3 className="text-xl font-serif text-[hsl(var(--pum-taupe))]">
                                {item.name}
                            </h3>

                            <p className="text-sm font-black text-[hsl(var(--pum-taupe))/60] mt-1">
                                {item.price}
                            </p>
                        </div>
                    ))}

                </div>

            </main>
            <>
                {isFilterOpen && (
                    <div
                        className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
                        onClick={() => setIsFilterOpen(false)}
                    />
                )}

                <div
                    className={`
            fixed top-0 right-0 h-full w-full max-w-md
            bg-[#FDF5FB]
            shadow-[0_20px_60px_rgba(0,0,0,0.08)]
            z-50
            p-10
            transition-transform duration-500
            ${isFilterOpen ? "translate-x-0" : "translate-x-full"}
        `}
                >
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="font-serif italic text-2xl">
                            Filters
                        </h2>

                        <button
                            onClick={() => setIsFilterOpen(false)}
                            className="text-xl"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-8 overflow-y-auto h-full pb-20">

                        {Object.entries(activeCategory?.filters || {}).map(
                            ([filterName, options]) => (
                                <div key={filterName}>
                                    <p className="text-xs uppercase tracking-[0.25em] font-bold mb-4">
                                        {filterName}
                                    </p>

                                    <div className="flex flex-wrap gap-2">

                                        {options.map(option => {
                                            const isSelected =
                                                selectedFilters[filterName] === option;

                                            return (
                                                <button
                                                    key={option}
                                                    onClick={() =>
                                                        toggleFilter(
                                                            filterName,
                                                            option
                                                        )
                                                    }
                                                    className={`
                                            px-4 py-2
                                            rounded-full
                                            text-xs
                                            transition-all
                                            ${isSelected
                                                            ? "bg-[hsl(var(--pum-green)/0.1)] border border-[hsl(var(--pum-green))] text-[hsl(var(--pum-green))]"
                                                            : "border border-[hsl(var(--pum-taupe)/15)]"
                                                        }
                                        `}
                                                >
                                                    {option}
                                                </button>
                                            );
                                        })}

                                    </div>
                                </div>
                            )
                        )}

                    </div>
                </div>
            </>
        </div>
    );
}