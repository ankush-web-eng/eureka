import Auth from "@/components/ui/Auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Book your appointment with your favourite doctor",
};

export default function Home() {
  return <Auth />
}
