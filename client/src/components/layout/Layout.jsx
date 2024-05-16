import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className="min-h-[80vh] p-4 lg:py-8">{children}</main>
      <Footer />
    </div>
  );
}
