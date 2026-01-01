// File: app/layout.jsx
import './globals.css';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* ✅ Custom styled Toaster */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            // Default options for all toasts
            style: {
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
              color: 'white',
              padding: '16px 24px',
              fontWeight: 'bold',
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
            },
            success: {
              iconTheme: {
                primary: '#00ffcc',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ff4d4f',
                secondary: '#ffffff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
