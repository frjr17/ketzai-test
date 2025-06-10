import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col space-y-5 justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">Ketzai Test</h1>
      <Button asChild>
        <Link href={"/tables"}>See table</Link>
      </Button>
    </div>
  );
}
