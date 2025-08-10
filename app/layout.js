import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata = {
  title: 'SMATE',
  description: 'Smart Attendance Tracking for Healthcare Staff'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
