import '@/styles/globals.css';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from '@/utils/supabaseClient';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function MyApp({ Component, pageProps }) {
    return (
        <SessionContextProvider supabaseClient={supabase}>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
        </SessionContextProvider>
    );
}

export default MyApp;
