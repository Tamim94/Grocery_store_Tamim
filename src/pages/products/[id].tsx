import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProductDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                setLoading(true);
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    console.error('Error fetching product:', error);
                    setError('Failed to load product details.');
                } else {
                    setProduct(data);
                }
                setLoading(false);
            };

            fetchProduct();
        }
    }, [id]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow container mx-auto p-4 pt-20">
                <div className="flex flex-col md:flex-row md:space-x-8">
                    <img src={product?.image_url} alt={product?.name} className="w-full md:w-1/2 h-64 object-cover mb-4 md:mb-0" />
                    <div className="md:w-1/2">
                        <h1 className="text-2xl font-bold mb-4">{product?.name}</h1>
                        <p className="text-gray-700 mb-4">{product?.description}</p>
                        <p className="text-gray-700 mb-2"><strong>Category:</strong> {product?.category}</p>
                        <p className="text-gray-700 mb-2"><strong>Price:</strong> ${product?.price}</p>
                        <p className="text-gray-700 mb-2"><strong>Stock:</strong> {product?.stock}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetails;
