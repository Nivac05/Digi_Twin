from flask import Flask, request, jsonify
from flask_cors import CORS  # pip install flask-cors
import joblib, shap
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import os
import time

app = Flask(__name__)
CORS(app)  # Enable CORS

model_path = r"C:\Cavin Real\sem 7\Healthcare\wwww\public\Heart_Twin_Model_legacy.pkl"
cal = joblib.load(model_path)
# --- Handle both possible calibration forms ---
if hasattr(cal, "estimators_"):      # cross-validated form
    inner_model = cal.estimators_[0]
else:                                # prefit form
    inner_model = cal.estimator

gbm_model = inner_model.named_steps['clf']
preprocessor = inner_model.named_steps['prep']

gbm_model = inner_model.named_steps['clf']
preprocessor = inner_model.named_steps['prep']
shap_explainer = shap.Explainer(gbm_model)

feature_cols = [
    "male", "age", "education", "currentSmoker", "cigsPerDay",
    "BPMeds", "prevalentStroke", "prevalentHyp", "diabetes",
    "totChol", "sysBP", "diaBP", "BMI", "heartRate", "glucose",
    "pulse_pressure", "metabolic_flag"
]

@app.route('/predict', methods=['POST'])
def predict():
    input_data = [float(request.form.get(col, 0)) for col in feature_cols]
    df = pd.DataFrame([input_data], columns=feature_cols)

    pred_prob = cal.predict_proba(df)[0][1]
    risk_percent = round(pred_prob * 100, 2)

    if risk_percent >= 20:
        category = "High"
    elif risk_percent >= 7.5:
        category = "Moderate"
    else:
        category = "Low"

    df_trans = preprocessor.transform(df)
    shap_vals = shap_explainer(df_trans)
    shap_table = pd.DataFrame({
        'Feature': feature_cols,
        'SHAP Impact': shap_vals.values[0],
    }).sort_values(by='SHAP Impact', key=abs, ascending=False)

    os.makedirs("static", exist_ok=True)

    plt.figure()
    shap.summary_plot(shap_vals, df_trans, feature_names=feature_cols, plot_type='bar', show=False)
    plt.tight_layout()
    plt.savefig("static/shap_bar.png", bbox_inches='tight')
    plt.close()

    plt.figure()
    shap.plots.waterfall(shap_vals[0], show=False)
    plt.tight_layout()
    plt.savefig("static/shap_waterfall.png", bbox_inches='tight')
    plt.close()

    # Return JSON instead of HTML
    return jsonify({
        'risk': risk_percent,
        'category': category,
        'shap_table': shap_table.to_html(classes='table table-striped', index=False),
        'shap_bar': f'/static/shap_bar.png?t={time.time()}',
        'shap_waterfall': f'/static/shap_waterfall.png?t={time.time()}'
    })

if __name__ == "__main__":
    app.run(debug=True)
