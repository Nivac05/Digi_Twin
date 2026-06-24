import { Card } from "@/components/ui/card";
import { Heart, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

interface RiskResultProps {
  risk: number;
  category: string;
}

const RiskResult = ({ risk, category }: RiskResultProps) => {
  const getRiskColor = () => {
    if (category === "High") return "gradient-destructive";
    if (category === "Moderate") return "gradient-warning";
    return "gradient-success";
  };

  const getRiskIcon = () => {
    if (category === "High") return <AlertTriangle className="h-12 w-12" />;
    if (category === "Moderate") return <TrendingUp className="h-12 w-12" />;
    return <CheckCircle className="h-12 w-12" />;
  };

  const getRiskMessage = () => {
    if (category === "High") return "High cardiovascular risk detected. Please consult with a healthcare professional immediately.";
    if (category === "Moderate") return "Moderate cardiovascular risk. Consider lifestyle modifications and regular monitoring.";
    return "Low cardiovascular risk. Continue maintaining a healthy lifestyle.";
  };

  return (
    <Card className="p-8">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className={`${getRiskColor()} rounded-full p-6 text-white`}>
          {getRiskIcon()}
        </div>
        
        <div>
          <h2 className="text-3xl font-bold mb-2">10-Year CHD Risk</h2>
          <div className="flex items-center justify-center gap-3">
            <Heart className="h-8 w-8 text-destructive" />
            <span className="text-5xl font-bold">{risk}%</span>
          </div>
        </div>

        <div className={`px-6 py-3 rounded-full text-white font-semibold text-lg ${getRiskColor()}`}>
          {category} Risk
        </div>

        <p className="text-muted-foreground max-w-2xl">
          {getRiskMessage()}
        </p>
      </div>
    </Card>
  );
};

export default RiskResult;
