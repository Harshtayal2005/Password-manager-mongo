import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <Manager />

        <Footer />
      </div>
    </>
  );
}

export default App;
