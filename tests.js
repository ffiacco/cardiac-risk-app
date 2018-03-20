QUnit.test("accMul test", function( assert ){
    x = accMul(2, 4);
    assert.equal(x, 8, "yay");
});

QUnit.test("accAdd test", function( assert ){
    x = accAdd(2, 4);
    assert.equal(x, 6);
});

QUnit.test("accDiv test", function( assert ){
    x = accDiv(8, 2);
    assert.equal(x, 4);
});

QUnit.test("QRisk test", function (assert){
    p = {
        'givenName':    "Francesco",
        'familyName':  "Fiacco",
        'gender':      {'value': "male"},
        'age':         {'value': 65},
        'hsCRP':       0,
        'cholesterol': 5.2,
        'HDL':        1.4,
        'smoker_p':    0,
        'b_AF':        1,
        'b_atypicalantipsy': 1,
        'b_migraine':  1,
        'b_ra' :       0,
        'b_renal':     1,
        'b_semi'  :    0,
        'b_sle':       0,
        'b_treatedhyp': 0,
        'b_type1':     1,
        'b_type2':     0,
        'bmi':         20.83,
        'ethrisk':     1,
        'fh_cvd':      0,
        'rati':        3.71,
        'sbp':         120,
        'sbps5':       10,
        'smoke_cat':   2,
        'b_impotence': 0,
        'postCode':    "EH8 8EQ",
        'cigsperDay':  10,
        'chdFamilyHistory': 0,
        'arthritis': 0,
        'b_corticosteroids': 0
    };

    x = qrisk_score(p);
    assert.equal(Math.round(x * 10) / 10, 77.5);

    p.smoke_cat = 0;
    x = qrisk_score(p);
    assert.equal(Math.round(x * 10) / 10, 65.6);

    p.fh_cvd = 1;
    x = qrisk_score(p);
    assert.equal(Math.round(x * 10) / 10, 75.2);
});

QUnit.test("Assign test", function (assert){
    p = {
        'givenName':    "Francesco",
        'familyName':  "Fiacco",
        'gender':      {'value': "male"},
        'age':         {'value': 65},
        'hsCRP':       0,
        'cholesterol': {'value': 5.2},
        'HDL':        {'value': 1.4},
        'smoker_p':    0,
        'b_AF':        1,
        'b_atypicalantipsy': 1,
        'b_migraine':  1,
        'b_ra' :       0,
        'b_renal':     1,
        'b_semi'  :    0,
        'b_sle':       0,
        'b_treatedhyp': 0,
        'b_type1':     1,
        'b_type2':     0,
        'bmi':         20.83,
        'ethrisk':     1,
        'fh_cvd':      0,
        'rati':        3.71,
        'sbp':         120,
        'sbps5':       10,
        'smoke_cat':   2,
        'b_impotence': 0,
        'postCode':    null,
        'cigsperDay':  10,
        'chdFamilyHistory': 0,
        'arthritis': 0,
        'b_corticosteroids': 0
    };

    x = assign_score(p);
    assert.equal(Math.round(x), 34);

    p.cigsperDay = 0;
    x = assign_score(p);
    assert.equal(Math.round(x), 29);
});