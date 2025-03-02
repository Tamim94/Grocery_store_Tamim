import '@/styles/globals.css';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from '@/utils/supabaseClient';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionContextProvider supabaseClient={supabase}>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
        </SessionContextProvider>
    );
}

export default MyApp;
