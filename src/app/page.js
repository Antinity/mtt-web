import Image from "next/image";
import RadiantSphere from "@/components/RadiantSphere";

export default function Home() {
  return (
    <div className="flex justify-center h-[90vh]">
      <div className="container h-full flex flex-col space-y-3 justify-center items-center">
        <h1 className="text-4xl font-bold">
          Coming Soon
        </h1>
        <p>Why not join our <a href="https://discord.gg/CwtfYEV6p7" className="bg-blue-700 hover:bg-blue-800 transition px-2 py-1 rounded">Discord</a> while you wait</p>
        <p className="text-sm">(Brought to you by antinity)</p>
      </div>

      <RadiantSphere x="30%" y="50%" size={500} blurRadius={300} color="#0EBCAD" />
    </div>
  );
}
