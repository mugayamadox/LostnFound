import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const AddButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="absolute -top-1/2">
          <Button
            variant={"ghost"}
            className="rounded-full p-0 w-14 h-14 border-2 bg-primary border-primary-foreground ">
            <Plus />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add Lost and Found Item</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AddButton;
