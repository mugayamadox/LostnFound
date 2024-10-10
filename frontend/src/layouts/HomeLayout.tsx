import AddNew from "@/components/primary/AddNew";
import MapArea from "@/components/secondary/MapArea";
import SearchBar from "@/components/secondary/Searchbar";

const HomeLayout = () => {
  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <div className="absolute w-full h-full">
        <MapArea />
      </div>
      <div className="fixed top-10 w-full flex items-center justify-center px-4">
        <SearchBar />
      </div>
      <div className="fixed right-10 sm:right-20 bottom-10 sm:bottom-20">
        <AddNew />
      </div>
    </div>
  );
};

export default HomeLayout;
