import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow p-6 bg-gray-100 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">About This Project</h1>
                <p className="text-lg text-center mb-6">
                    For this project we had to make a web app with NextJS so I've made a grocery store app with NextJS and Supabase/PostgreSQL.
                </p>
                <div className="flex space-x-4">
                    <a href="https://tamimg-portfolio.web.app/" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
                        Portfolio
                    </a>
                    <a href="https://github.com/Tamim94" className="bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-900 transition">
                        GitHub
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;