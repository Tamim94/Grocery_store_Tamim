import { useEffect, useState } from 'react'

const ProductsPage = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('/api/products')
            const data = await res.json()
            setProducts(data)
        }

        fetchProducts()
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p><strong>Category:</strong> {product.category}</p>
                        <p>Price: ${product.price}</p>
                        <p>Stock: {product.stock}</p>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default ProductsPage
