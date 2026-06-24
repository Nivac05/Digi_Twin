import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Activity, Stethoscope } from "lucide-react";
import { toast } from "sonner";
import HealthMetricsForm from "@/components/HealthMetricsForm";
import RiskResult from "@/components/RiskResult";
import ShapVisualization from "@/components/ShapVisualization";
import GeminiExplainer from "@/components/GeminiExplainer";

const Index = () => {
  const [formData, setFormData] = useState({
    male: "1",
    age: "50",
    education: "2",
    currentSmoker: "0",
    cigsPerDay: "0",
    BPMeds: "0",
    prevalentStroke: "0",
    prevalentHyp: "0",
    diabetes: "0",
    totChol: "200",
    sysBP: "120",
    diaBP: "80",
    BMI: "25",
    heartRate: "75",
    glucose: "90",
    pulse_pressure: "40",
    metabolic_flag: "0",
  });

  const [results, setResults] = useState<{
    risk: number;
    category: string;
    shap_table: string;
    shap_bar: string;
    shap_waterfall: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create FormData object
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });

      // Make request to Flask backend
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      // Parse JSON response
      const data = await response.json();
      
      setResults({
        risk: data.risk,
        category: data.category,
        shap_table: data.shap_table,
        shap_bar: `http://localhost:5000${data.shap_bar}`,
        shap_waterfall: `http://localhost:5000${data.shap_waterfall}`,
      });
      
      toast.success("Risk assessment completed successfully!");
    } catch (error) {
      toast.error(
        "Failed to connect to prediction service. Make sure your Flask backend is running on http://localhost:5000 with CORS enabled"
      );
      console.error("Prediction error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setFormData({
      male: "1",
      age: "50",
      education: "2",
      currentSmoker: "0",
      cigsPerDay: "0",
      BPMeds: "0",
      prevalentStroke: "0",
      prevalentHyp: "0",
      diabetes: "0",
      totChol: "200",
      sysBP: "120",
      diaBP: "80",
      BMI: "25",
      heartRate: "75",
      glucose: "90",
      pulse_pressure: "40",
      metabolic_flag: "0",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <header className="gradient-primary text-white py-12 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
              <Activity className="h-10 w-10 animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Heart Disease Risk Predictor
            </h1>
            <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
              <Heart className="h-10 w-10 animate-pulse" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Stethoscope className="h-5 w-5" />
            <p className="text-center text-white/95 text-lg font-medium">
              AI-Powered 10-Year Coronary Heart Disease Risk Assessment
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {!results ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="text-center mb-10">
              <div className="inline-block p-4 rounded-full bg-primary/10 mb-4">
                <Stethoscope className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Patient Health Metrics
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Enter all required health parameters for accurate risk prediction
              </p>
            </div>

            <HealthMetricsForm formData={formData} onChange={handleInputChange} />

            <div className="flex justify-center gap-4 pt-8">
              <Button
                type="submit"
                size="lg"
                className="gradient-primary text-white px-10 py-7 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Activity className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing Your Health Data...
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 h-5 w-5" />
                    Calculate Risk Assessment
                  </>
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-500">
            <RiskResult risk={results.risk} category={results.category} />
            
            <GeminiExplainer 
              formData={formData}
              risk={results.risk}
              category={results.category}
            />
            
            <ShapVisualization
              shapTable={results.shap_table}
              shapBar={results.shap_bar}
              shapWaterfall={results.shap_waterfall}
            />
            
            <div className="flex justify-center">
              <Button
                onClick={handleReset}
                size="lg"
                variant="outline"
                className="px-10 py-7 text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Activity className="mr-2 h-5 w-5" />
                New Assessment
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-primary/10 mt-20 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary"></div>
              <Stethoscope className="h-6 w-6 text-primary" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary"></div>
            </div>
            <p className="text-muted-foreground text-sm">
              <strong className="text-foreground">Medical Disclaimer:</strong> This tool is for educational purposes only and should not replace professional medical advice.
            </p>
            <p className="text-muted-foreground text-sm">
              Always consult with a qualified healthcare provider for proper diagnosis and treatment.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-4">
              Powered by AI & Machine Learning • Results explained by Google Gemini
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
