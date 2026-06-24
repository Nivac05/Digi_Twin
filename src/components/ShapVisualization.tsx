import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ShapVisualizationProps {
  shapTable: string;
  shapBar: string;
  shapWaterfall: string;
}

const ShapVisualization = ({ shapTable, shapBar, shapWaterfall }: ShapVisualizationProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Feature Impact Analysis (SHAP)</h2>
      
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="table">Impact Table</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="waterfall">Waterfall</TabsTrigger>
        </TabsList>
        
        <TabsContent value="table" className="mt-6">
          <div className="overflow-auto">
            <div dangerouslySetInnerHTML={{ __html: shapTable }} />
          </div>
        </TabsContent>
        
        <TabsContent value="summary" className="mt-6">
          <div className="flex justify-center">
            <img 
              src={shapBar} 
              alt="SHAP Summary Plot" 
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="waterfall" className="mt-6">
          <div className="flex justify-center">
            <img 
              src={shapWaterfall} 
              alt="SHAP Waterfall Plot" 
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ShapVisualization;
