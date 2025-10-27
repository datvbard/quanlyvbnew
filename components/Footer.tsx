import React from 'react';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode; color: string }> = ({ href, children, color }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${color}`}>
        {children}
    </a>
);


export const Footer: React.FC = () => {
    return (
        <footer className="mt-12 py-8 bg-white border-t">
            <div className="container mx-auto px-4 md:px-8 text-center text-gray-600">
                <p className="font-semibold mb-3">Follow us</p>
                <div className="flex justify-center space-x-4 mb-4">
                    <SocialIcon href="#" color="bg-blue-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
                    </SocialIcon>
                    <SocialIcon href="#" color="bg-sky-500">
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.645 20.32l.001-.001.002.001.001.001a1.5 1.5 0 002.708 0l.001-.001.002-.001.001-.001L21.03 3.682a1.5 1.5 0 00-2.022-2.022L2.01 9.292a1.5 1.5 0 00-.012 2.72l6.236 2.39.001.001 2.39 6.236a1.5 1.5 0 002.72-.012l2.31-7.245z"></path></svg>
                    </SocialIcon>
                    <SocialIcon href="#" color="bg-indigo-600">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.41a10.81 10.81 0 00-2.072-.663.05.05 0 00-.04.02 9.53 9.53 0 00-1.22 1.946c-2.274-.32-4.48-.32-6.753 0a9.6 9.6 0 00-1.22-1.946.05.05 0 00-.04-.02 10.82 10.82 0 00-2.072.663.05.05 0 00-.022.046c.52 2.273 1.54 5.56 1.54 5.56s-1.125-.796-2.072-1.54a.05.05 0 00-.066.008.05.05 0 00-.01.052c.032.14.13.43.253.796.18.52.4.998.64 1.454a9.12 9.12 0 005.47 3.32.05.05 0 00.052-.018 7.31 7.31 0 001.482-.64.05.05 0 00.01-.066 8.35 8.35 0 01-1.177-1.392.05.05 0 01.01-.066c.284-.18.56-.378.828-.59s.508-.43.732-.662a.05.05 0 01.066 0c.224.23.458.45.732.662s.545.41.828.59a.05.05 0 01.01.066 8.35 8.35 0 01-1.177 1.392.05.05 0 00.01.066 7.31 7.31 0 001.482.64.05.05 0 00.052.018 9.12 9.12 0 005.47-3.32c.24-.457.46-.934.64-1.454.122-.367.22-.656.253-.796a.05.05 0 00-.01-.052.05.05 0 00-.066-.008c-.947.745-2.072 1.54-2.072 1.54s1.02-3.287 1.54-5.56a.05.05 0 00-.022-.046zM10.12 14.195c-.828 0-1.508-.732-1.508-1.63s.68-1.63 1.508-1.63c.828 0 1.508.73 1.508 1.63s-.68 1.63-1.508 1.63zm3.76 0c-.828 0-1.508-.732-1.508-1.63s.68-1.63 1.508-1.63c.828 0 1.508.73 1.508 1.63s-.68 1.63-1.508 1.63z"/></svg>
                    </SocialIcon>
                </div>
                <p className="text-sm">&copy; 2025 Copyright by congdongagribank.com</p>
            </div>
        </footer>
    );
};