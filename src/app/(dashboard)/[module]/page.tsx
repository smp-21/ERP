import { generateModuleData } from "@/lib/data";
import { LiquidModuleTemplate } from "@/components/templates/LiquidModuleTemplate";

interface PageProps {
  params: {
    module: string;
  };
}

export default async function ModulePage({ params }: PageProps) {
  const { module } = await params;
  
  const data = generateModuleData(module);

  return (
    <LiquidModuleTemplate 
      moduleName={module}
      data={data}
    />
  );
}
