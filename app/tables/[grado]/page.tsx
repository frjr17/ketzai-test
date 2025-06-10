import jsonData from "@/lib/data.json"
import { Accordion } from "@/components/ui/accordion";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import DataTable from "@/app/components/data-table";





export default async function TablePage(props:{params:{grado:string}}){
    const params = await props.params;
    const data = jsonData.find(data=>data.grado === params.grado)
    const index = jsonData.findIndex(data=>data.grado === params.grado)
    return(
        <div className="flex flex-col space-y-5 justify-center items-center h-screen w-full" >
      <h1 className="text-4xl font-bold">Datos de {data?.grado}  ({data?.año})</h1>
      <section>
        <Accordion
      type="single"
      collapsible
      className="w-full"
    >
        
        {jsonData[index].areas.map((area,i)=>{
            return (
                <div className="" key={area.area}>
                    <AccordionItem value={"item-"+ (i+1)}>
        <AccordionTrigger className="text-2xl w-100">{area.area}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
         <DataTable  />
        </AccordionContent>
      </AccordionItem>
                </div>
            )
        })}
        </Accordion>
      </section>
    </div>
    )
}