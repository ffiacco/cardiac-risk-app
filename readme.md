# About #
A port of the [Cardiac Risk Visualization SMART Application](https://github.com/smart-classic/smart_sample_apps/tree/master/static/framework/cardio_risk_viz
) to use an [HL7 FHIR](http://www.hl7.org/implement/standards/fhir/index.htm) data source for [Observations](http://hl7.org/fhir/observation.html)
) and [Patient demographics](http://hl7.org/fhir/patient.html).

# Deploy #

From a console in the project directory, execute:

```
npm install
npm run serve
```

To run with our dummy patient, Ivor Cox, go to  http://localhost:8001/launch.html?fhirServiceUrl=http://hapi.fhir.org/baseDstu3&patientId=1203706 after having ran the npm run serve command.

# Public Demo #
See app in [SMART's Gallery](https://gallery.smarthealthit.org/boston-childrens-hospital/cardiac-risk)

# Screenshot #

![Screenshot](https://raw.github.com/sethrylan/fhir_cardiac_risk/gh-pages/screenshot.png)
