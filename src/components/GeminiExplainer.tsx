import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";

interface GeminiExplainerProps {
  formData: Record<string, string>;
  risk: number;
  category: string;
}

const GeminiExplainer = ({ formData, risk, category }: GeminiExplainerProps) => {
  const [explanation, setExplanation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const generateExplanation = async () => {
    setIsLoading(true);
    
    // Format the patient data
    const patientProfile = `
Patient Profile:
- Gender: ${formData.male === "1" ? "Male" : "Female"}
- Age: ${formData.age} years
- Education Level: ${formData.education}
- Current Smoker: ${formData.currentSmoker === "1" ? "Yes" : "No"}
- Cigarettes per Day: ${formData.cigsPerDay}
- On Blood Pressure Medication: ${formData.BPMeds === "1" ? "Yes" : "No"}
- Previous Stroke: ${formData.prevalentStroke === "1" ? "Yes" : "No"}
- Hypertension: ${formData.prevalentHyp === "1" ? "Yes" : "No"}
- Diabetes: ${formData.diabetes === "1" ? "Yes" : "No"}
- Total Cholesterol: ${formData.totChol} mg/dL
- Systolic Blood Pressure: ${formData.sysBP} mmHg
- Diastolic Blood Pressure: ${formData.diaBP} mmHg
- BMI: ${formData.BMI}
- Heart Rate: ${formData.heartRate} bpm
- Glucose: ${formData.glucose} mg/dL
- Pulse Pressure: ${formData.pulse_pressure} mmHg
- Metabolic Flag: ${formData.metabolic_flag === "1" ? "Yes" : "No"}

Predicted Risk: ${risk}% 10-year coronary heart disease risk (${category} Risk)
    `;

    const prompt = `You are a medical AI assistant helping patients understand their heart disease risk assessment. 

${patientProfile}

Please provide a clear, empathetic, and detailed explanation that includes:

1. **Risk Summary**: Explain what the ${risk}% risk means in plain language
2. **Key Contributing Factors**: Identify which health metrics are most concerning and why
3. **Protective Factors**: Highlight any positive health indicators
4. **Actionable Recommendations**: Provide specific, personalized lifestyle changes or medical consultations they should consider
5. **Context**: Help them understand this is a statistical prediction based on their health profile

Keep the tone supportive and educational. Avoid medical jargon where possible, but be thorough and accurate.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyBx7QVb_2MW44WovZEbocLP095ejQ_E36Q`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to generate explanation.";
      setExplanation(generatedText);
    } catch (error) {
      console.error("Error generating explanation:", error);
      setExplanation("Failed to generate explanation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full bg-primary/10">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">AI-Powered Explanation</h2>
      </div>

      {!explanation ? (
        <div className="text-center py-6">
          <p className="text-muted-foreground mb-6">
            Get a detailed, personalized explanation of your results powered by Google Gemini AI
          </p>
          <Button
            onClick={generateExplanation}
            disabled={isLoading}
            size="lg"
            className="gradient-primary text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Explanation...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Explain My Results
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap text-foreground leading-relaxed">
            {explanation}
          </div>
          <Button
            onClick={generateExplanation}
            variant="outline"
            className="mt-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Regenerating...
              </>
            ) : (
              "Regenerate Explanation"
            )}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default GeminiExplainer;
