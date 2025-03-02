import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { supabase } from '@/utils/supabaseClient';
import Footer from "@/components/Footer";

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase.from('products').select('*').limit(6);
            if (!error) setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[500px] bg-cover bg-center flex items-center justify-center"
                 style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?grocery,fresh')" }}>
                <div className="text-center text-white bg-black bg-opacity-50 p-8 rounded-lg transform transition-all hover:scale-105">
                    <h1 className="text-5xl font-bold mb-4">Fresh Groceries, Best Prices!</h1>
                    <p className="text-xl mb-6">Order online & pick up in-store. Convenient and fast!</p>
                    <a href="/products" className="mt-4 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full inline-block text-lg font-semibold transition-all duration-300">
                        Shop Now
                    </a>
                </div>
            </div>

            {/* Featured Products */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map(product => (
                        <div key={product.id} className="border p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                            <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
                            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-3">{product.category}</p>
                            <p className="text-2xl font-bold text-green-600 mb-4">${product.price}</p>
                            <a href={`/products/${product.id}`} className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-center rounded-full font-semibold transition-all duration-300">
                                View Product
                            </a>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default HomePage;
