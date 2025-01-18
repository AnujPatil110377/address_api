import './globals.css';

export const metadata = {
  title: 'Address Comparison Tool',
  description: 'Compare two addresses using Gemini AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
