import { redirect } from "next/navigation";
import generateMetadataUtil from "@/utils/generateMetadata";

export async function generateMetadata() {
  return generateMetadataUtil(null, "Welcome to my portfolio - showcasing my projects and skills.", "Explore my portfolio to see a curated selection of my projects, skills, and experiences. Discover how I can bring value to your team or project with my expertise in software development and design.", "/");
}

export default function Home() {
  redirect("/home");
}