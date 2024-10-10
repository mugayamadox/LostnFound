import { Search } from "lucide-react";
import { Input } from "../ui/input";

const NavbarSearch = () => {
  return (
    <form className="w-full max-w-xl">
      <div className="relative">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="What did you Lose?..."
          className="pl-12 md:py-6 shadow-none rounded-full bg-background"
        />
      </div>
    </form>
  );
};

export default NavbarSearch;
