import { Toaster } from "./components/ui/toaster";
import "./index.css";
import HomeLayout from "./layouts/HomeLayout";

export default function App() {
  return (
    <>
      <HomeLayout />
      <Toaster />
    </>
  );
}
