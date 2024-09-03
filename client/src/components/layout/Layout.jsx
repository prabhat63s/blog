import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className="min-h-[80vh] lg:w-[80%] mx-auto p-4 lg:py-8">{children}</main>
      <Footer />
    </div>
  );
}
