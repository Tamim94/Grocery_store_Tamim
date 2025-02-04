import { useState, useEffect } from 'react'

const AdminPanel = () => {
    const [products, setProducts] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [sortOption, setSortOption] = useState('')

    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        image_url: '',
        category: '',
    })
    const [editingProduct, setEditingProduct] = useState<any | null>(null)

    const handleEditClick = (product: any) => {
        setEditingProduct(product)
    }

    const handleUpdateProduct = async () => {
        if (!editingProduct) return

        await fetch(`/api/products/${editingProduct.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingProduct),
        })

        setEditingProduct(null) // Close edit mode
        fetchProducts() // Refresh the list
    }

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

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value)
        sortProducts(e.target.value)
    }

    const sortProducts = (option: string) => {
        const sortedProducts = [...products]
        switch (option) {
            case 'name-asc':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
                break
            case 'name-desc':
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name))
                break
            case 'price-asc':
                sortedProducts.sort((a, b) => a.price - b.price)
                break
            case 'price-desc':
                sortedProducts.sort((a, b) => b.price - a.price)
                break
            case 'stock-asc':
                sortedProducts.sort((a, b) => a.stock - b.stock)
                break
            case 'stock-desc':
                sortedProducts.sort((a, b) => b.stock - a.stock)
                break
            default:
                break
        }
        setProducts(sortedProducts)
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
                <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="border p-2 ml-2"
                >
                    <option value="">Sort by</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                    <option value="stock-asc">Stock (Low to High)</option>
                    <option value="stock-desc">Stock (High to Low)</option>
                </select>

                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border p-2 w-full mb-4"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products
                        .filter((product) =>
                            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.category.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((product) => (
                            <div key={product.id} className="border p-4 rounded shadow">
                                {editingProduct?.id === product.id ? (
                                    // Edit Form
                                    <div>
                                        <input
                                            type="text"
                                            value={editingProduct.name}
                                            onChange={(e) =>
                                                setEditingProduct({ ...editingProduct, name: e.target.value })
                                            }
                                            className="border p-1 w-full"
                                        />
                                        <input
                                            type="text"
                                            value={editingProduct.category}
                                            onChange={(e) =>
                                                setEditingProduct({ ...editingProduct, category: e.target.value })
                                            }
                                            className="border p-1 w-full"
                                        />
                                        <input
                                            type="text"
                                            value={editingProduct.description}
                                            onChange={(e) =>
                                                setEditingProduct({ ...editingProduct, description: e.target.value })
                                            }
                                            className="border p-1 w-full"
                                        />
                                        <input
                                            type="number"
                                            value={editingProduct.price}
                                            onChange={(e) =>
                                                setEditingProduct({ ...editingProduct, price: e.target.value })
                                            }
                                            className="border p-1 w-full"
                                        />
                                        <input
                                            type="number"
                                            value={editingProduct.stock}
                                            onChange={(e) =>
                                                setEditingProduct({ ...editingProduct, stock: e.target.value })
                                            }
                                            className="border p-1 w-full"
                                        />
                                        <input
                                            type="text"
                                            value={editingProduct.image_url}
                                            onChange={(e) =>
                                                setEditingProduct({ ...editingProduct, image_url: e.target.value })
                                            }
                                            className="border p-1 w-full"
                                        />

                                        <button onClick={handleUpdateProduct} className="bg-green-500 text-white px-4 py-2 mt-2">
                                            Save
                                        </button>
                                        <button onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white px-4 py-2 mt-2 ml-2">
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    // Display Product
                                    <>
                                        <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover mb-2" />
                                        <h3 className="font-bold">{product.name}</h3>
                                        <p>Category: {product.category}</p>
                                        <p>{product.description}</p>
                                        <p>Price: ${product.price}</p>
                                        <p>Stock: {product.stock}</p>

                                        <button onClick={() => handleEditClick(product)} className="bg-yellow-500 text-white px-4 py-2 mt-2">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-500 text-white px-4 py-2 mt-2 ml-2">
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        ))}

                </div>
            </div>
        </div>
    )
}

export default AdminPanel