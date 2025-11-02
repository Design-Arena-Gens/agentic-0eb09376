import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PatientChain',
  description: 'Patient data on a client-side blockchain with Hyperledger-like view',
  manifest: '/manifest.json',
  themeColor: '#0ea5e9'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js');
            });
          }
        ` }} />
      </body>
    </html>
  );
}
