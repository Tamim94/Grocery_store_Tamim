import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';

const ProductManagement = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        stock: '',
        category: '',
        image_url: '', // Add image_url to the initial state
    });
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Fetch products
    const fetchProducts = async () => {
        const { data, error } = await supabase.from('products').select('*');
        if (error) console.error('Error fetching products:', error);
        else setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Create Product
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from('products')
            .insert([newProduct])
            .select(); // Add .select() to return the inserted row

        if (error) {
            console.error('Error adding product:', error);
        } else {
            // Ensure data is an array before spreading
            if (Array.isArray(data)) {
                setProducts([...products, ...data]);
            } else {
                console.error('Unexpected data format:', data);
            }
            setNewProduct({ name: '', price: '', stock: '', category: '', image_url: '' });
        }
    };

    // Update Product
    const handleUpdate = async (id: number) => {
        const { error } = await supabase.from('products').update(editingProduct).eq('id', id);
        if (error) console.error('Error updating product:', error);
        else {
            setProducts(products.map(p => (p.id === id ? editingProduct : p)));
            setEditingProduct(null);
        }
    };

    // Delete Product
    const handleDelete = async (id: number) => {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) console.error('Error deleting product:', error);
        else setProducts(products.filter(p => p.id !== id));
    };

    // Filter products by search query and category
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>

            {/* Search Bar and Category Filter */}
            <div className="mb-6 flex space-x-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="p-2 border rounded w-full md:w-1/2"
                />
                <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">All Categories</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Bakery">Bakery</option>
                </select>
            </div>

            {/* Add Product Form */}
            <form onSubmit={handleCreate} className="mb-6 bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newProduct.name}
                        onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        placeholder="Stock"
                        value={newProduct.stock}
                        onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
                        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={newProduct.category}
                        onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Category</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Bakery">Bakery</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newProduct.image_url}
                        onChange={e => setNewProduct({ ...newProduct, image_url: e.target.value })}
                        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                >
                    Add Product
                </button>
            </form>

            {/* Product List */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Product List</h3>
                <table className="min-w-full border border-gray-200">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-3">Image</th>
                        <th className="border p-3">Name</th>
                        <th className="border p-3">Price</th>
                        <th className="border p-3">Stock</th>
                        <th className="border p-3">Category</th>
                        <th className="border p-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product.id} className="hover:bg-gray-100">
                            {editingProduct?.id === product.id ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            value={editingProduct.image_url}
                                            onChange={e => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                                            className="p-2 border rounded"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editingProduct.name}
                                            onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                            className="p-2 border rounded"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={editingProduct.price}
                                            onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                            className="p-2 border rounded"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={editingProduct.stock}
                                            onChange={e => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                                            className="p-2 border rounded"
                                        />
                                    </td>
                                    <td>
                                        <select
                                            value={editingProduct.category}
                                            onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
                                            className="p-2 border rounded"
                                        >
                                            <option value="Fruits">Fruits</option>
                                            <option value="Vegetables">Vegetables</option>
                                            <option value="Dairy">Dairy</option>
                                            <option value="Bakery">Bakery</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleUpdate(product.id)}
                                            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                                        >
                                            Save
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="border p-3">
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>
                                    <td className="border p-3">{product.name}</td>
                                    <td className="border p-3">${product.price}</td>
                                    <td className="border p-3">{product.stock}</td>
                                    <td className="border p-3">{product.category}</td>
                                    <td className="border p-3">
                                        <button
                                            onClick={() => setEditingProduct(product)}
                                            className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-300 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductManagement;
