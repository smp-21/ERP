import { generateModuleData } from "@/lib/data";
import { LiquidModuleTemplate } from "@/components/templates/LiquidModuleTemplate";

interface PageProps {
  params: {
    module: string;
    feature: string;
  };
}

export default async function FeaturePage({ params }: PageProps) {
  // Wait for params as required by Next.js 15+ async params standard
  const { module, feature } = await params;
  
  const data = generateModuleData(module, feature);

  return (
    <LiquidModuleTemplate 
      moduleName={module}
      featureName={feature}
      data={data}
    />
  );
}
