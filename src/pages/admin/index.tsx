import { useState, useEffect } from 'react'

const AdminPanel = () => {
    const [products, setProducts] = useState([])
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        image_url: '',
        category: '',
    })

    const fetchProducts = async () => {
        const res = await fetch('/api/products')
        const data = await res.json()
        setProducts(data)
    }

    const handleAddProduct = async () => {
        await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct),
        })
        setNewProduct({ name: '', description: '', price: '', stock: '', image_url: '', category:'' })
        fetchProducts()
    }

    const handleDeleteProduct = async (id: string) => {
        await fetch(`/api/products/${id}`, { method: 'DELETE' })
        fetchProducts()
    }

    const handleUpdateStock = async (id: string, newStock: number) => {
        await fetch(`/api/products/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stock: newStock }),
        })
        fetchProducts()
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

            {/* Add New Product */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="border p-2 mr-2"
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="border p-2 mr-2"
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={newProduct.image_url}
                    onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                    className="border p-2 mr-2"
                />
                <button onClick={handleAddProduct} className="bg-blue-500 text-white px-4 py-2">
                    Add Product
                </button>
            </div>

            {/* Product List */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product: any) => (
                        <div key={product.id} className="border p-4 rounded shadow">
                            <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover mb-2" />
                            <h3 className="font-bold">{product.name}</h3>
                            <p>Category: {product.category}</p>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                            <p>Stock: {product.stock}</p>
                            <input
                                type="number"
                                defaultValue={product.stock}
                                onBlur={(e) => handleUpdateStock(product.id, parseInt(e.target.value))}
                                className="border p-1 w-full mt-2"
                            />
                            <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="bg-red-500 text-white px-4 py-2 mt-2"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default AdminPanel
