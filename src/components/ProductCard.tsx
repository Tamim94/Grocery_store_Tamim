import Link from 'next/link';

type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image_url: string;
    category: string;
};

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-gray-700 mb-2"><strong>Category:</strong> {product.category}</p>
                <p className="text-gray-700 mb-2"><strong>Price:</strong> ${product.price}</p>
                <p className="text-gray-700 mb-4"><strong>Stock:</strong> {product.stock}</p>
                <Link href={`/products/${product.id}`} className="text-blue-500 hover:underline">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
