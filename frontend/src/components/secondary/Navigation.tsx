import { Library, User } from "lucide-react";
import AddButton from "./AddButton";
import { Button } from "../ui/button";

const Navigation = () => {
  return (
    <div className="flex gap-2 justify-between items-center bg-primary w-full mx-auto max-w-sm py-2 px-2 rounded-full text-primary-foreground text-sm">
      <Button
        variant={"ghost"}
        className="w-1/3 flex items-center justify-center gap-2 rounded-full">
        <Library size={"20"} />
        <span>Items</span>
      </Button>
      <div className="w-1/3 flex items-center justify-center">
        <AddButton />
      </div>
      <Button
        variant={"ghost"}
        className="w-1/3 flex items-center justify-center gap-2 rounded-full">
        <User size={"20"} />
        <span>You</span>
      </Button>
    </div>
  );
};

export default Navigation;
