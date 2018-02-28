(function(window) {
    window.extractData = function() {
        var ret = $.Deferred();

        FHIR.oauth2.ready(function(smart) {
            var patient = smart.patient;

            var pt = patient.read();
            var labs = smart.patient.api.fetchAll({
                type: "Observation",
                query: {
                    code: {
                        $or: ['http://loinc.org|30522-7',
                            'http://loinc.org|14647-2', 'http://loinc.org|2093-3',
                            'http://loinc.org|2085-9', 'http://loinc.org|8480-6',

                            'http://loinc.org|54776-0', 'http://loinc.org|54984-0',
                            'http://loinc.org|57527-4', 'http://loinc.org|65392-3',
                            'http://loinc.org|75633-8', 'http://loinc.org|88239-9',
                            'http://loinc.org|45668-1', 'http://loinc.org|71758-7',
                            'http://loinc.org|71757-9', 'http://loinc.org|64391-6',
                            'http://loinc.org|66238-7', 'http://loinc.org|62796-8',
                            'http://loinc.org|39156-5', 'http://loinc.org|46463-6',
                            'http://loinc.org|58238-7', 'http://loinc.org|8490-5',
                            'http://loinc.org|70483-3', 'http://loinc.org|70318-1',
                            'http://loinc.org|60984-2'
                        ]
                    }
                }
            });

            $.when(pt, labs).done(function(patient, labs) {
                var byCodes = smart.byCodes(labs, 'code');

                var gender = patient.gender;

                dob = new XDate(patient.birthDate);
                age = Math.floor(dob.diffYears(new XDate()));

                var fname = patient.name[0].given.join(" "),
                    lname = patient.name[0].family;

                // Start 

                // Atrial Fibrillation
                var b_AF = byCodes("54776-0");
                var b_atypicalantipsy = byCodes("54984-0");
                var b_corticosteroids = byCodes("57527-4"); // huge range to choose from - line 52138
                var b_migraine = byCodes("65392-3");
                var b_ra = byCodes("75633-8"); // Activity score instead of bool? - line 71784
                var b_renal = byCodes("88239-9"); // option out of two & unsure about this
                var b_semi = byCodes("45668-1", "71758-7", "71757-9"); // (schizophrenia, bipolar score, Depression score) // option of "psychotic illness without schizophrenia"
                var b_sle = byCodes("64391-6"); // Systemic lupus erythematosus
                var b_treatedhyp = byCodes("66238-7"); // blood pressure treatment
                var b_type1 = byCodes("62796-8"); // Type 1 and 2 Diabetes together option only - Diabetes status option
                var b_type2 = byCodes("62796-8"); // Type 1 and 2 Diabetes together option

                var bmi = byCodes("39156-5"); // Body Mass Index
                var ethrisk = byCodes("46463-6"); // Race or ethnicity
                var fh_cvd = byCodes("58238-7"); // family history of heart attack measure // Angina or heart attack in 1st degree relative under 60?
                var rati = byCodes(""); //  Cholesterol/HDL ratio -> Calculate from values below?
                var sbp = byCodes("60984-2"); // Aorta Intravascular systolic - which systolic though?// systolic blood pressure 
                var sbps5 = byCodes("8490-5"); // 24 hour mean - no S.d found?? // standard deviation of at least two more recent systolic blood pressure readings
                var smoke_cat = byCodes("70483-3"); // Have you ever smoked // options of pipes, cigars, cigarettes
                var b_impotence = byCodes("70318-1"); //  For men -have and maintain an erection past 7D ??// patient has a diagnosis of or treatment for erectile disfunction
                
                // End 

                var hscrp = byCodes("30522-7");
                var cholesterol = byCodes("14647-2", "2093-3");
                var hdl = byCodes("2085-9");
                var systolic = byCodes("8480-6");

                var missingData = [];
                if (hscrp.length == 0) {
                    missingData = missingData.concat(["hs-CRP"]);
                }
                if (cholesterol.length == 0) {
                    missingData = missingData.concat(["Cholesterol"]);
                }
                if (hdl.length == 0) {
                    missingData = missingData.concat(["HDL"]);
                }

                // default logic for demonstration purposes
                if (systolic.length == 0) {
                    systolic = "120";
                } else {
                    systolic = systolic[0].valueQuantity.value;
                    if (systolic < 105) {
                        systolic = 105
                    }
                    if (systolic > 200) {
                        systolic = 200;
                    }
                }

                if (missingData.length > 0) {
                    var missingDataMessage = "No results (";
                    var delimiter = "";
                    for (var i = 0; i < missingData.length; i++) {
                        missingDataMessage += delimiter + missingData[i];
                        delimiter = ", ";
                    }
                    missingDataMessage += ") for " + fname + " " + lname + ".";
                    alert(missingDataMessage);
                    return ret.reject();
                }

                p = defaultPatient();
                p.birthday = { value: dob };
                p.age = { value: age };
                p.gender = { value: gender };
                p.givenName = { value: fname };
                p.familyName = { value: lname };
                p.hsCRP = { value: hscrp_in_mg_per_l(hscrp[0]) };
                p.cholesterol = { value: cholesterol_in_mg_per_dl(cholesterol[0]) };
                p.HDL = { value: cholesterol_in_mg_per_dl(hdl[0]) };
                p.LDL = { value: p.cholesterol.value - p.HDL.value };
                p.sbp = { value: systolic };
                // additional params
                p.b_AF = b_AF;
                p.b_atypicalantipsy = b_atypicalantipsy;
                p.b_corticosteroids = b_corticosteroids;
                p.b_migraine = b_migraine;
                p.b_ra = b_ra;
                p.b_renal = b_renal;
                p.b_semi = b_semi;
                p.b_sle = b_sle;
                p.b_treatedhyp = b_treatedhyp;
                p.b_type1 = b_type1;
                p.b_type2 = b_type1;
                p.bmi = bmi;
                p.ethrisk = ethrisk;
                p.fh_cvd = fh_cvd;
                p.rati = rati;
                p.sbp = sbp;
                p.sbps5 = sbps5;
                p.smoke_cat = smoke_cat;
                p.b_impotence = b_impotence;

                ret.resolve(p);
            });
        });
        return ret.promise();
    };

    function defaultPatient() {
        return {
            smoker_p: { value: false },
            fx_of_mi_p: { value: false }
        }
    };

    /**
     * Unit conversion formula.
     * See values at http://www.amamanualofstyle.com/page/si-conversion-calculator
     */
    cholesterol_in_mg_per_dl = function(v) {
        if (v.valueQuantity.unit === "mg/dL") {
            return parseFloat(v.valueQuantity.value);
        } else if (v.valueQuantity.unit === "mmol/L") {
            return parseFloat(v.valueQuantity.value) / 0.026;
        }
        throw "Unanticipated cholesterol units: " + v.valueQuantity.unit;
    };

    /**
     * Unit conversion formula.
     * See values at http://www.amamanualofstyle.com/page/si-conversion-calculator
     */
    hscrp_in_mg_per_l = function(v) {
        if (v.valueQuantity.unit === "mg/L") {
            return parseFloat(v.valueQuantity.value);
        } else if (v.valueQuantity.unit === "mmol/L") {
            return parseFloat(v.valueQuantity.value.value) / 0.10;
        }
        throw "Unanticipated hsCRP units: " + v.valueQuantity.unit;
    };

})(window);