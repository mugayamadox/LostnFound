import MapArea from "@/components/secondary/MapArea";
import Navigation from "@/components/secondary/Navigation";
import SearchBar from "@/components/secondary/Searchbar";

const MainLayout = () => {
  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <div className="absolute w-full h-full">
        <MapArea />
      </div>
      <div className="absolute top-20 left-20">
        <SearchBar />
      </div>
      <div className="w-full absolute left-1/2 -translate-x-1/2 bottom-10 sm:bottom-20 px-2">
        <Navigation />
      </div>
    </div>
  );
};

export default MainLayout;
