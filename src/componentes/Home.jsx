// components/Home.jsx
import Footer from './footer/Footer'

const Home = () => {
  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Banner image */}
      <div className="absolute left-0 right-0 z-0 flex justify-center">
        <img
          className="logo"
          src="/img/logo.jpeg"
          alt="Banner"
        />
      </div>
    </div>
  );
};

export default Home;
