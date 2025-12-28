import "../styles/global.css";

export const metadata = {
  title: "Yoink",
  description: "Grab it before it's gone.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
