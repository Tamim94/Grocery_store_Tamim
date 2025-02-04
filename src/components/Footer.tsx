const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white text-center p-6 mt-10">
            <p>&copy; {new Date().getFullYear()} Grocery Store. All rights reserved.</p>
            <p>Follow us on <a href="#" className="text-blue-400">Instagram</a> & <a href="#" className="text-blue-400">Facebook</a></p>
        </footer>
    )
}

export default Footer
