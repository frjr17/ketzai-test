import { Button } from "@/components/ui/button";
import jsonData from "@/lib/data.json";
import Link from "next/link";

export default function TablesPage() {
  return (
    <div className="flex flex-col space-y-5 justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">Ketzai Test</h1>
      {jsonData.map((data) => (
        <Button key={data.grado} asChild>
          <Link href={"/tables/"+data.grado}>Ver {data.grado} ({data.año})</Link>
        </Button>
      ))}
    </div>
  );
}
