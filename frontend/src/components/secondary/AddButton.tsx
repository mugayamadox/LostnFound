import React, { forwardRef } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface AddButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const AddButton = forwardRef<HTMLButtonElement, AddButtonProps>(
  (props, ref) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              ref={ref}
              size="icon"
              className="rounded-full w-14 h-14 md:w-14 md:h-14"
              {...props}>
              <Plus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Post Item</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

AddButton.displayName = "AddButton";

export default AddButton;
