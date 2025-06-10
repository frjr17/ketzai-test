import jsonData from "@/lib/data.json";
import { Accordion } from "@/components/ui/accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DataTable from "@/app/components/data-table";
import { normalizeString } from "@/lib/utils";

export default async function TablePage(props: { params: Promise<{ grado: string }> }) {
  const params = await props.params;
  const data = jsonData.find(
    (data) =>
      normalizeString(data.grado) ===
      normalizeString(decodeURIComponent(params.grado))
  );
  const index = jsonData.findIndex(
    (data) =>
      normalizeString(data.grado) ===
      normalizeString(decodeURIComponent(params.grado))
  );
  return (
    <div className="text-center p-20">
      <h1 className="text-4xl font-bold">Datos de {data?.grado}</h1>
      <span className="italic text-xl">Año: {data?.año}</span>
      <section>
        <Accordion type="single" collapsible className="w-full space-y-5 mt-10">
          {jsonData[index].areas.map((area, i) => {
            return (
              <div className="" key={area.area}>
                <AccordionItem value={"item-" + (i + 1)}>
                  <AccordionTrigger className="text-2xl w-100 border border-gray">
                    {area.area}
                  </AccordionTrigger>
                  <AccordionContent className="flex space-y-3 my-7  flex-col gap-4 text-balance">
                    <section className="px-4">
                      <h1 className="text-3xl text-left font-bold">
                        Objetivos:
                      </h1>
                      <ul className="list-disc text-left ml-3 space-y-3 my-3">
                        {area.objetivos.map((objetivo) => {
                          return <li key={objetivo}>{objetivo}</li>;
                        })}
                      </ul>
                    </section>
                    <DataTable data={area.contenidos} />
                  </AccordionContent>
                </AccordionItem>
              </div>
            );
          })}
        </Accordion>
      </section>
    </div>
  );
}
