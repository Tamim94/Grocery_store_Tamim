import { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-gray-800 text-white p-4">Grocery Store</header>
            <main className="flex-grow p-4">{children}</main>
            <footer className="bg-gray-800 text-white p-4 text-center">© 2025 Grocery Store</footer>
        </div>
    )
}

export default Layout
