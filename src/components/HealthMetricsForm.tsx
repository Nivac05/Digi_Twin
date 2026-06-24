import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface HealthMetricsFormProps {
  formData: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

const HealthMetricsForm = ({ formData, onChange }: HealthMetricsFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Demographics */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-primary">Demographics</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="male">Sex (1=Male, 0=Female)</Label>
            <Input
              id="male"
              name="male"
              type="number"
              min="0"
              max="1"
              step="1"
              value={formData.male}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="age">Age (years)</Label>
            <Input
              id="age"
              name="age"
              type="number"
              min="20"
              max="100"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="education">Education Level (1-4)</Label>
            <Input
              id="education"
              name="education"
              type="number"
              min="1"
              max="4"
              step="1"
              value={formData.education}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </Card>

      {/* Lifestyle */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-primary">Lifestyle Factors</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="currentSmoker">Current Smoker (1=Yes, 0=No)</Label>
            <Input
              id="currentSmoker"
              name="currentSmoker"
              type="number"
              min="0"
              max="1"
              step="1"
              value={formData.currentSmoker}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="cigsPerDay">Cigarettes Per Day</Label>
            <Input
              id="cigsPerDay"
              name="cigsPerDay"
              type="number"
              min="0"
              value={formData.cigsPerDay}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </Card>

      {/* Medical History */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-primary">Medical History</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="BPMeds">On BP Medication (1=Yes, 0=No)</Label>
            <Input
              id="BPMeds"
              name="BPMeds"
              type="number"
              min="0"
              max="1"
              step="1"
              value={formData.BPMeds}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="prevalentStroke">Previous Stroke (1=Yes, 0=No)</Label>
            <Input
              id="prevalentStroke"
              name="prevalentStroke"
              type="number"
              min="0"
              max="1"
              step="1"
              value={formData.prevalentStroke}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="prevalentHyp">Hypertension (1=Yes, 0=No)</Label>
            <Input
              id="prevalentHyp"
              name="prevalentHyp"
              type="number"
              min="0"
              max="1"
              step="1"
              value={formData.prevalentHyp}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="diabetes">Diabetes (1=Yes, 0=No)</Label>
            <Input
              id="diabetes"
              name="diabetes"
              type="number"
              min="0"
              max="1"
              step="1"
              value={formData.diabetes}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </Card>

      {/* Vital Signs */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-primary">Vital Signs</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="sysBP">Systolic BP (mmHg)</Label>
            <Input
              id="sysBP"
              name="sysBP"
              type="number"
              min="80"
              max="250"
              value={formData.sysBP}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="diaBP">Diastolic BP (mmHg)</Label>
            <Input
              id="diaBP"
              name="diaBP"
              type="number"
              min="40"
              max="150"
              value={formData.diaBP}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
            <Input
              id="heartRate"
              name="heartRate"
              type="number"
              min="40"
              max="200"
              value={formData.heartRate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="pulse_pressure">Pulse Pressure (mmHg)</Label>
            <Input
              id="pulse_pressure"
              name="pulse_pressure"
              type="number"
              value={formData.pulse_pressure}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </Card>

      {/* Lab Results */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-primary">Lab Results</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="totChol">Total Cholesterol (mg/dL)</Label>
            <Input
              id="totChol"
              name="totChol"
              type="number"
              min="100"
              max="600"
              value={formData.totChol}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="glucose">Glucose (mg/dL)</Label>
            <Input
              id="glucose"
              name="glucose"
              type="number"
              min="40"
              max="400"
              value={formData.glucose}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </Card>

      {/* Body Metrics */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-primary">Body Metrics</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="BMI">BMI</Label>
            <Input
              id="BMI"
              name="BMI"
              type="number"
              min="15"
              max="60"
              step="0.1"
              value={formData.BMI}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="metabolic_flag">Metabolic Flag (1=Yes, 0=No)</Label>
            <Input
              id="metabolic_flag"
              name="metabolic_flag"
              type="number"
              min="0"
              max="1"
              step="1"
              value={formData.metabolic_flag}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HealthMetricsForm;
