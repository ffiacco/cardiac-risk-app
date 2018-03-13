var r;

var p2;

var score_if_non_smoker
    , score_if_sbp_of_120
    , score_if_all_optimal = null;


var qrisk_score = function(p){
  var params = {},
      result = null;

  if (p.gender.value === 'female') {
    params = {
      'age1': -2,
      'age2': 1,
      'bmi1': -2,
      'bmi2': -2,
      'age12': 0.053274843841791,
      'age22': 4.332503318786621,
      'bmi12': 0.154946178197861,
      'bmi22': 0.144462317228317,
      'rati' : 3.476326465606690,
      'sbp': 123.130012512207030,
      'sbps5' : 9.002537727355957,
      'town' : 0.392308831214905,
      'age13': -8.1388109247726188,
      'age23': 0.79733376689699098,
      'bmi13': 0.29236092275460052,
      'bmi23': -4.1513300213837665,
      'rati1' : 0.15338035820802554,
      'sbp1': 0.013131488407103424,
      'sbps51' : 0.0078894541014586095,
      'town1' : 0.077223790588590108,
      'Iethrisk' : [
              0,
              0,
              0.2804031433299542500000000,
              0.5629899414207539800000000,
              0.2959000085111651600000000,
              0.0727853798779825450000000,
              -0.1707213550885731700000000,
              -0.3937104331487497100000000,
              -0.3263249528353027200000000,
              -0.1712705688324178400000000
      ],
      'Ismoke' : [
              0,
              0.1338683378654626200000000,
              0.5620085801243853700000000,
              0.6674959337750254700000000,
              0.8494817764483084700000000
      ],
      'AF' : 1.5923354969269663,
      'atypical' : 0.25237642070115557,
      'steroids' : 0.59520725304601851,
      'impotence' : 0,
      'migraine' : 0.301267260870345,
      'ra' : 0.21364803435181942,
      'renal' : 0.65194569493845833,
      'semi' : 0.12555308058820178,
      'sle' : 0.75880938654267693,
      'hyp' : 0.50931593683423004,
      'type1' : 1.7267977510537347,
      'type2' : 1.0688773244615468,
      'fhcvd' : 0.45445319020896213,
      'survivor' : 0.988876402378082
    }
  } else {
    params = {
      'age1': -1,
      'age2': 3,
      'bmi1': -2,
      'bmi2': -2,
      'age12': 0.234766781330109,
      'age22': 77.284080505371094,
      'bmi12': 0.149176135659218,
      'bmi22': 0.141913309693336,
      'rati' : 4.300998687744141,
      'sbp': 128.571578979492190,
      'sbps5' : 8.756621360778809,
      'town' : 0.526304900646210,
      'age13': -17.839781666005575,
      'age23': 0.0022964880605765492,
      'bmi13': 2.4562776660536358,
      'bmi23': -8.3011122314711354,
      'rati1' : 0.17340196856327111,
      'sbp1': 0.012910126542553305,
      'sbps51' : 0.010251914291290456,
      'town1' : 0.033268201277287295,
      'Iethrisk' : [
              0,
              0,
              0.2771924876030827900000000,
              0.4744636071493126800000000,
              0.5296172991968937100000000,
              0.0351001591862990170000000,
              -0.3580789966932791900000000,
              -0.4005648523216514000000000,
              -0.4152279288983017300000000,
              -0.2632134813474996700000000
      ],
      'Ismoke' : [
              0,
              0.1912822286338898300000000,
              0.5524158819264555200000000,
              0.6383505302750607200000000,
              0.7898381988185801900000000
      ],
      'AF' : 0.88209236928054657,
      'atypical' : 0.13046879855173513,
      'steroids' : 0.45485399750445543,
      'impotence' : 0.22251859086705383,
      'migraine' : 0.25584178074159913,
      'ra' : 0.20970658013956567,
      'renal' : 0.71853261288274384,
      'semi' : 0.12133039882047164,
      'sle' : 0.4401572174457522,
      'hyp' : 0.51659871082695474,
      'type1' : 1.2343425521675175,
      'type2' : 0.85942071430932221,
      'fhcvd' : 0.54055469009390156,
      'survivor' : 0.977268040180206
    }
  }

  if (p.gender.value === 'female') {
    interactionParams = {
      'age1smoke1' : -4.7057161785851891,
      'age1smoke2' : -2.7430383403573337,
      'age1smoke3' : -0.86608088829392182,
      'age1smoke4' : 0.90241562369710648,
      'age1AF' : 19.938034889546561,
      'age1steroids' : -0.98408045235936281,
      'age1impotence' : 0,
      'age1migraine' : 1.7634979587872999,
      'age1renal' : -3.5874047731694114,
      'age1sle' : 19.690303738638292,
      'age1hyp' : 11.872809733921812,
      'age1type1' : -1.2444332714320747,
      'age1type2' : 6.8652342000009599,
      'age1bmi1' : 23.802623412141742,
      'age1bmi2' : -71.184947692087007,
      'age1fhcvd' : 0.99467807940435127,
      'age1sbp' : 0.034131842338615485,
      'age1town' : -1.0301180802035639,
      'age2smoke1' : -0.075589244643193026,
      'age2smoke2' : -0.11951192874867074,
      'age2smoke3' : -0.11951192874867074,
      'age2smoke4' : -0.13991853591718389,
      'age2AF' : -0.076182651011162505,
      'age2steroids' : -0.12005364946742472,
      'age2impotence' : 0,
      'age2migraine' : -0.065586917898699859,
      'age2renal' : -0.22688873086442507,
      'age2sle' : 0.077347949679016273,
      'age2hyp' : 0.00096857823588174436,
      'age2type1' : -0.28724064624488949,
      'age2type2' : -0.097112252590695489,
      'age2bmi1' : 0.52369958933664429,
      'age2bmi2' : 0.045744190122323759,
      'age2fhcvd' : -0.076885051698423038,
      'age2sbp' : -0.0015082501423272358,
      'age2town' : -0.031593414674962329,
    }
  } else {
    interactionParams = {
      'age1smoke1' : -0.21011133933516346,
      'age1smoke2' : 0.75268676447503191,
      'age1smoke3' : 0.99315887556405791,
      'age1smoke4' : 2.1331163414389076,
      'age1AF' : 3.4896675530623207,
      'age1steroids' : 1.1708133653489108,
      'age1impotence' : -1.506400985745431,
      'age1migraine' : 2.3491159871402441,
      'age1renal' : -0.50656716327223694,
      'age1sle' : 0,
      'age1hyp' : 6.5114581098532671,
      'age1type1' : 5.3379864878006531,
      'age1type2' : 3.6461817406221311,
      'age1bmi1' : 31.004952956033886,
      'age1bmi2' : -111.29157184391643,
      'age1fhcvd' : 2.7808628508531887,
      'age1sbp' : 0.018858524469865853,
      'age1town' : -0.1007554870063731,
      'age2smoke1' : -0.00049854870275326121,
      'age2smoke2' : -0.00079875633317385414,
      'age2smoke3' : -0.00083706184266251296,
      'age2smoke4' : -0.00078400319155637289,
      'age2AF' : -0.00034995608340636049,
      'age2steroids' : -0.0002496045095297166,
      'age2impotence' : -0.0011058218441227373,
      'age2migraine' : 0.00019896446041478631,
      'age2renal' : -0.0018325930166498813,
      'age2sle' : 0,
      'age2hyp' : 0.00063838053104165013,
      'age2type1' : 0.0006409780808752897,
      'age2type2' : -0.00024695695588868315,
      'age2bmi1' : 0.0050380102356322029,
      'age2bmi2' : -0.013074483002524319,
      'age2fhcvd' : -0.00024791809907396037,
      'age2sbp' : -0.00001271874191588457,
      'age2town' : -0.000093299642323272888,
    }
  }

  var dage = p.age/10;
  var age_1 = Math.pow(dage, params.age1);
  var age_2 = Math.pow(dage, params.age2);;
  var dbmi = p.bmi/10;
  var bmi_1 = Math.pow(dbmi,params.bmi1);
  var bmi_2 = Math.pow(dbmi,params.bmi1)*Math.log(dbmi);

  /* Centring the continuous variables */

  age_1 = age_1 - params.age12;
	age_2 = age_2 - params.age22;
	bmi_1 = bmi_1 - params.bmi12;
  bmi_2 = bmi_2 - params.bmi22;
  var rati = p.rati - params.rati;
  var sbp = p.sbp - params.sbp;
  var sbps5 = p.sbps5 - params.sbps5;
  var town = 0 - params.town;

  /* Start of Sum */
  var a = 0;

  a += params.Iethrisk[p.ethrisk];
  a += params.Ismoke[p.smoke_cat];

  /* Sum from continuous values */

  a += age_1 * params.age13;
	a += age_2 * params.age23
	a += bmi_1 * params.bmi13;
	a += bmi_2 * params.bmi23;
	a += rati * params.rati1;
	a += sbp * params.sbp1;
	a += sbps5 * params.sbps51;
  a += town * params.town1;

  /* Sum from boolean values */

  a += p["b_AF"] * params.AF;
	a += p["b_atypicalantipsy"] * params.atypical;
	a += p["b_corticosteroids"] * params.steroids;
	a += p["b_impotence"] * params.impotence;
	a += p["b_migraine"] * params.migraine;
	a += p["b_ra"] * params.ra;
	a += p["b_renal"] * params.renal;
	a += p["b_semi"] * params.semi;
	a += p["b_sle"] * params.sle;
	a += p["b_treatedhyp"] * params.hyp;
	a += p["b_type1"] * params.type1;
	a += p["b_type2"] * params.type2;
  a += p["fh_cvd"] * params.fhcvd;

  /* Sum from interaction terms */

  a += age_1 * (p["smoke_cat"]==1) * interactionParams.age1smoke1;
	a += age_1 * (p["smoke_cat"]==2) * interactionParams.age1smoke2;
	a += age_1 * (p["smoke_cat"]==3) * interactionParams.age1smoke3;
	a += age_1 * (p["smoke_cat"]==4) * interactionParams.age1smoke4;
	a += age_1 * p["b_AF"] * interactionParams.age1AF;
  a += age_1 * p["b_corticosteroids"] * interactionParams.age1steroids;
  a += age_1 * p["b_impotence"] * interactionParams.age1impotence;
	a += age_1 * p["b_migraine"] * interactionParams.age1migraine;
	a += age_1 * p["b_renal"] * interactionParams.age1renal;
	a += age_1 * p["b_sle"] * interactionParams.age1sle;
	a += age_1* p["b_treatedhyp"] * interactionParams.age1hyp;
	a += age_1 * p["b_type1"] * interactionParams.age1type1;
	a += age_1 * p["b_type2"] * interactionParams.age1type2;
	a += age_1 * bmi_1 * interactionParams.age1bmi1;
	a += age_1 * bmi_2 * interactionParams.age1bmi2;
	a += age_1 * p["fh_cvd"] * interactionParams.age1fhcvd;
	a += age_1 * sbp * interactionParams.age1sbp;
	a += age_1 * town * interactionParams.age1town;
	a += age_2 * (p["smoke_cat"]==1) * interactionParams.age2smoke1;
	a += age_2 * (p["smoke_cat"]==2) * interactionParams.age2smoke2;
	a += age_2 * (p["smoke_cat"]==3) * interactionParams.age2smoke3;
	a += age_2 * (p["smoke_cat"]==4) * interactionParams.age2smoke4;
	a += age_2 * p["b_AF"] * interactionParams.age2AF;
  a += age_2 * p["b_corticosteroids"] * interactionParams.age2steroids;
  a += age_2 * p["b_impotence"] * interactionParams.age2impotence;
	a += age_2 * p["b_migraine"] * interactionParams.age2migraine;
	a += age_2 * p["b_renal"] * interactionParams.age2renal;
	a += age_2 * p["b_sle"] * interactionParams.age2sle;
	a += age_2* p["b_treatedhyp"] * interactionParams.age2hyp;
	a += age_2 * p["b_type1"] * interactionParams.age2type1;
	a += age_2 * p["b_type2"] * interactionParams.age2type2;
	a += age_2 * bmi_1 * interactionParams.age2bmi1;
	a += age_2 * bmi_2 * interactionParams.age2bmi2;
	a += age_2 * p["fh_cvd"] * interactionParams.age2fhcvd;
	a += age_2 * sbp * interactionParams.age2sbp;
  a += age_2 * town * interactionParams.age2town;

  result = 100 * (1 - Math.pow(params.survivor, Math.exp(a)));

  return result;
}

var reynolds_risk_score = function(p){
  var parameters = {}
    , result = null;

  if (p.gender.value === 'female') {
    params = {
      'age': 0.0799,
      'sbp': 3.137,
      'hsCRP': 0.180,
      'cholesterol': 1.382,
      'HDL': -1.172,
      'smoker': 0.818,
      'fx_of_mi': 0.438
    }
  } else {
    params = {
      'age': 4.385,
      'sbp': 2.607,
      'hsCRP': 0.102,
      'cholesterol': 0.963,
      'HDL': -0.772,
      'smoker': 0.405,
      'fx_of_mi': 0.541
    }
  }

  var b1 = params.age          * (p.gender.value==='female' ? p.age.value : Math.log(p.age.value))
    , b2 = params.sbp          * Math.log(p.sbp.value)
    , b3 = params.hsCRP        * Math.log(p.hsCRP.value)
    , b4 = params.cholesterol  * Math.log(p.cholesterol.value)
    , b5 = params.HDL          * Math.log(p.HDL.value)
    , b6 = params.smoker       * (p.smoker_p.value ? 1 : 0)
    , b7 = params.fx_of_mi     * (p.fx_of_mi_p.value ? 1 : 0);

  var B = b1 + b2 + b3 + b4 + b5 + b6 + b7;

  if (p.gender.value === 'female') {
    var a = Math.exp(B-22.325)
      , b = Math.pow(0.98634, a)
      , c = 1 - b
      , d = c * 100
      , result = (1 - Math.pow(0.98634, (Math.exp(B-22.325)))) * 100
  } else {
    var a = Math.exp(B-33.097)
      , b = Math.pow(0.8990, a)
      , c = 1 - b
      , d = c * 100
      , result = (1 - Math.pow(0.8990,  (Math.exp(B-33.097)))) * 100
  }
  return Math.round((result < 10 ? result.toPrecision(1) : result.toPrecision(2)))
}


var compute_other_scores = function(){
  p2 = $.extend(true, {}, p);
  p2.sbp.value = (p2.sbp.value - 10 >= 0) ? p2.sbp.value - 10 : 0;
  sbp_10_lower = p2.sbp.value;
  score_if_sbp_of_10_lower = reynolds_risk_score(p2);
  p2.sbp.value = p.sbp.value; // reset sbp
  p2.smoker_p.value = false;
  score_if_non_smoker = reynolds_risk_score(p2);
  p2.hsCRP.value = 0.5;
  p2.cholesterol.value = 160;
  p2.HDL.value = 60
  p2.LDL.value = 100;
  score_if_all_optimal = reynolds_risk_score(p2);
}

var p = {
  'givenName':    {'value': null}
  ,'familyName':  {'value': null}
  ,'gender':      {'value': null}
  ,'birthday':    {'value': null}
  ,'age':         {'value': null}
  ,'hsCRP':       {'value': null}
  ,'cholesterol': {'value': null}
  ,'HDL':         {'value': null}
  ,'LDL':         {'value': null}
  ,'sbp':         {'value': null}
  ,'smoker_p':    {'value': null}
  ,'fx_of_mi_p':  {'value': null}
  ,'b_AF':        {'value': null}
  ,'b_atypicalantipsy': {'value': null}
  ,'b_migraine':  {'value': null}
  ,'b_corticosteroids': {'value': null}
  ,'b_ra' :       {'value': null}
  ,'b_renal':     {'value': null}
  ,'b_semi'  :    {'value': null}
  ,'b_sle':       {'value': null}
  ,'b_treatedhyp':{'value': null}
  ,'b_type1':     {'value': null}
  ,'b_type2':     {'value': null}
  ,'bmi':         {'value': null}
  ,'ethrisk':     {'value': null}
  ,'fh_cvd':      {'value': null}
  ,'rati':        {'value': null}
  ,'sbp':         {'value': null}
  ,'sbps5':       {'value': null}
  ,'smoke_cat':   {'value': null}
  ,'b_impotence': {'value': null}
  ,'postCode':    {'value': null}
  ,'cigsperDay':  {'value': null}
  ,'chdFamilyHistory': {'value': null}
  ,'arthritis': {'value': null}
}



var redraw = function(){
  var score = reynolds_risk_score(p);
  compute_other_scores();
  r.score_text.animate({opacity: 0}, 500, '>', function(){
    this.attr({text: score+'%'});
    this.animate({opacity: 1}, 500, '>');
  })

  r.score_if_sbp_of_10_lower_text.attr({text: score_if_sbp_of_10_lower+'%'});
  r.sbp_10_lower.attr({text: 'if your blood pressure were '+ sbp_10_lower +'mm/Hg'});
  r.score_if_all_optimal_text.attr({text: score_if_all_optimal+'%'});
  r.if_you_quit_set.items[0].attr({text: score_if_non_smoker+'%'});
  r.risk_prelude.attr({text: 'If you\'re ' + (p.smoker_p.value ? '' : 'not ') +
     'a smoker with a blood pressure\n of ' + p.sbp.value + 'mm/Hg ' + (p.fx_of_mi_p.value ?
      'and have ' : 'and don\'t have ') +
      'a family\n history of heart attack before the age of 60\n (one or both parents) your risk over 10 years is:'})

  if (p.smoker_p.value === false) {
    r.if_you_quit_set.animate({opacity: 0}, 500, '>');
    r.quit_text_1.attr({text: 'Staying smoke-free'})
    r.quit_text_2.attr({text: 'is one of the best\nways to improve your\nheart disease risk'})
  } else {
    r.if_you_quit_set.animate({opacity: 1}, 500, '>');
    r.quit_text_1.attr({text: 'Quitting smoking'})
    r.quit_text_2.attr({text: 'can decrease your\nheart disease risk\nby 50% or more'})
  }
}

var draw_visualization = function() {
    var score = reynolds_risk_score(p);
    p2 = $.extend(true, {}, p); // deep copy needed here

    compute_other_scores();

    r = Raphael('holder');
    r.if_you_quit_set = r.set();

    // set default txtattrs
    r.g.txtattr = {
      'font-family': 'Calibri, \'Helvetica Neue\', Helvetica, Verdana, sans-serif',
      'font-size': '16px',
      'text-anchor': 'start',
      'fill': '#555'
    };

    // set up overall layout and text
    // using a 8 column grid on 800px
    var headline = r.g.text(10, 20, 'Bloodwork Cardiology Result').attr({'font-size': '24px'})
    // r.path("M10 40 L300 40").attr({'stroke-dasharray': '.', 'stroke-linecap': 'butt'})

    // pad in 30px
    r.g.text(30, 55, 'Patient info').attr({'font-size': '18px', 'font-weight': 'bold'})

    r.g.text(30, 80+3, 'NAME:').attr({'fill': '#888', 'font-size': '12px', 'font-weight': '200'});
    r.g.text(70, 80, p.givenName.value + ' ' + p.familyName.value).attr({'font-size': '24px', 'font-weight': 'normal'})

    r.g.text(30, 100+3, 'GENDER:').attr({'fill': '#888', 'font-size': '12px', 'font-weight': '200'});
    r.g.text(82, 100+2, p.gender.value == 'female' ? 'F' : 'M')

    r.g.text(102, 100+3, 'AGE:').attr({'fill': '#888', 'font-size': '12px', 'font-weight': '200'});
    r.g.text(142-1, 100, p.age.value)

    r.g.text(162, 100+3, 'DOB:').attr({'fill': '#888', 'font-size': '12px', 'font-weight': '200'});
    r.g.text(192-1, 100, p.birthday.value.toString("yyyy-MM-dd"))

    // draggable for sbp
    var c = null;
    r.g.text(500, 55-24, 'Note: these results are valid for non-diabetics only!').attr({'font-size': '12px', 'font-weight': 'normal', 'fill': "#888"});

    r.circle(500+10, 55, 8)
     .attr({
       stroke: '#F4804E',
       fill: p.smoker_p.value ? '#F4804E' : '#F6F6F6' // use a bg colored fill so hover events don't fire only while mouse in on the stroke
     })
     .hover(function(){this.attr({'fill': '#F4804F', 'cursor': 'pointer'})},
            function(){if(!p.smoker_p.value)this.attr({'fill': '#F6F6F6', 'cursor': 'normal'})})
     .click(function(){
       p.smoker_p.value = !p.smoker_p.value
       this.attr('fill', p.smoker_p.value ? '#F4804E' : '#F6F6F6')
       redraw();
     })
     r.g.text(500+20+10, 55, 'Current smoker?').attr({'font-size': '16px', 'font-weight': 'normal'});

     r.circle(500+10, 55+24, 8)
      .attr({
        stroke: '#F4804E',
        fill: p.fx_of_mi_p.value ? '#F4804E' : '#F6F6F6'
      })
      .hover(function(){this.attr({'fill': '#F4804F', 'cursor': 'pointer'})},
             function(){if(!p.fx_of_mi_p.value)this.attr({'fill': '#F6F6F6', 'cursor': 'normal'})})
      .click(function(){
        p.fx_of_mi_p.value = !p.fx_of_mi_p.value
        this.attr('fill', p.fx_of_mi_p.value ? '#F4804E' : '#F6F6F6')
        redraw();
      })
      r.g.text(500+20+10, 55+24, 'Family history of heart attack?').attr({'font-size': '16px', 'font-weight': 'normal'});


    // SBP slider
    r.g.text(500+20+10, 55+24+24, 'Systolic blood pressure').attr({'font-size': '16px', 'font-weight': 'normal'});
    var min_x = 415
      , max_x = 515
      , len_x = max_x - min_x
      , start_value = 100
      , offset_value = 90
      , start_value_delta = p.sbp.value - offset_value
      , start_x = min_x + start_value_delta
      , y = 55+24+24
      , start_r = 13
      , click_r = 15

    r.path('M'+min_x+' '+y+' L'+max_x+' '+y).attr({'stroke': '#aaa', 'stroke-dasharray': '.', 'stroke-linecap': 'butt'})
    var t = r.g.text(start_x, y, p.sbp.value).attr({'cursor': 'pointer', 'font': '11px Consolas, monospace', 'text-anchor': 'middle', 'font-weight': 'bold', 'fill': '#000'});
    c = r.circle(start_x, y, start_r).attr({
      opacity: .5,
      fill: '#F4804E',
      // fill: 'hsl(18, 88, 63)', // F4804E -> hsl(18, 88, 63)
      stroke: '#F4804E',
      cursor: 'pointer'
    });

    var start = function () {
        // storing original coordinates
        this.animate({r: click_r}, 500, ">");
        this.ox = this.attr('cx');
        this.sbp = p.sbp.value;
    },
    move = function (dx, dy) {
      var cx = this.ox + dx;

      if (cx < min_x) {
        cx = min_x;
      } else if (cx > max_x) {
        cx = max_x;
      }

      this.attr({cx: cx});
      // this.attr({fill: 'hsl(18, 88, '+ 63 + (cx - min_x) + ')'});
      this.sbp = Math.round((cx - min_x) + offset_value);
      t.attr({
          text: this.sbp,
          x: cx
      });
    },
    up = function () {
      this.sbp = Math.round((this.attr('cx') - min_x) + offset_value);
      this.animate({r: start_r}, 500, ">");
      p.sbp.value = this.sbp;
      redraw();
    };
    c.drag(move, start, up);


    r.path("M10 120 L760 120").attr({'stroke-dasharray': '.', 'stroke-linecap': 'butt'})

    var y = 150;
    r.circle(30, y, 14).attr({'fill': '#F4804E', 'stroke': 'none'});
    r.g.text(30, y, '1').attr({'font': '18px Consolas, monospace', 'text-anchor': 'middle', 'font-weight': 'bold', 'fill': '#fff'})
    r.g.text(50, y, 'About this test').attr({'font-size': '18px', 'font-weight': 'bold'})
    r.g.text(50, y+20, 'This report evaluates your potential risk of heart disease, heart attack, and stroke.').attr({'fill': '#888'})
      .attr({'font-size': '14px'})

    r.path("M10 190 L760 190").attr({'stroke-dasharray': '.', 'stroke-linecap': 'butt'});

    y = 210;
    r.circle(30, y, 14).attr({'fill': '#F4804E', 'stroke': 'none'});
    r.g.text(30, y, '2').attr({'font': '18px Consolas, monospace', 'text-anchor': 'middle', 'font-weight': 'bold', 'fill': '#fff'})
    r.g.text(50, y, 'Your Results').attr({'font-size': '18px', 'font-weight': 'bold'})



    var title = 'CRP level test'
      , x = 40
      , y = 255
      , w = 700
      , h = 65
      , units_n = 10
      , unit_w = w / units_n
      , space = 2
      , cap_x = w + x
      , cap_y = y
      , cap_mid_x = 760
      , cap_mid_y = y + h/2
      , cap_end_x = cap_x
      , cap_end_y = y + h

    // make width smaller with space, start x on unit_w multiple
    r.g.text(x, y-12, title).attr({'font-size': '18px', 'font-weight': 'normal'})

    r.rect(x+0,         y, unit_w-space,       h).attr({fill: '#61AFC9', stroke: 'none'});
    r.g.text(x, y+h+8, 'Low risk').attr({'font-size': '12px', 'font-weight': 'normal'})
    r.g.text(x, y+h+20, '0 mg/L').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'})

    r.rect(x+unit_w,    y, unit_w*2-space,     h).attr({fill: '#0B9DBC', stroke: 'none'});
    r.g.text(x+unit_w,  y+h+8, 'Average').attr({'font-size': '12px', 'font-weight': 'normal'})
    r.g.text(x+unit_w,  y+h+20, '1 - 3').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'})

    // no -space here since the cap is next
    r.rect(x+unit_w*3,  y, unit_w*7,           h).attr({fill: '#008EB0', stroke: 'none'});
    r.g.text(x+unit_w*3, y+h+8, 'High risk of cardiovascular disease').attr({'font-size': '12px', 'font-weight': 'normal'})
    r.g.text(x+unit_w*3, y+h+20, '3 - 10').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'})

    r.path('M' + cap_x     + ' ' + cap_y +
           'L' + cap_mid_x + ' ' + cap_mid_y +
           'L' + cap_end_x + ' ' + cap_end_y +
           'z')
           .attr({'fill': '#008EB0', 'stroke': 'none'});

    // place circle on bar
    var circle_x = unit_w * p.hsCRP.value + x;
    r.circle(circle_x, y, 22).attr({'fill': '#F4804E', 'stroke': '#fff', 'stroke-width': '2px'});
    r.g.text(circle_x, y, p.hsCRP.value.toPrecision(2)).attr({'font': '20px Consolas, monospace', 'text-anchor': 'middle', 'font-weight': 'normal', 'fill': '#fff'})

    // mildly non-proportional to make things look nicer
    var title = 'Total cholesterol level'
      , x = 40
      , y = 380
      , w = 700
      , h = 65
      , units_n = 30 // max value 300
      , unit_w = w / units_n
      , space = 2
      , cap_x = w + x
      , cap_y = y
      , cap_mid_x = 760
      , cap_mid_y = y + h/2
      , cap_end_x = cap_x
      , cap_end_y = y + h

    r.g.text(x, y-12, title).attr({'font-size': '14px'})

    r.rect(x+0,         y, unit_w*18-space,       h).attr({fill: '#A0BE78', stroke: 'none'});
    r.g.text(x, y+h+8, 'Desirable').attr({'font-size': '12px', 'font-weight': 'normal'})
    r.g.text(x, y+h+20, '0 mg/dL').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'})

    r.rect(x+unit_w*18,    y, unit_w*4-space,     h).attr({fill: '#86AD52', stroke: 'none'});
    r.g.text(x+unit_w*18,  y+h+8, 'Borderline').attr({'font-size': '12px', 'font-weight': 'normal'})
    r.g.text(x+unit_w*18,  y+h+20, '200 - 239').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'})

    r.rect(x+unit_w*22,  y, unit_w*8,           h).attr({fill: '#5E892B', stroke: 'none'});
    r.g.text(x+unit_w*22, y+h+8, 'High').attr({'font-size': '12px', 'font-weight': 'normal'})
    r.g.text(x+unit_w*22, y+h+20, '240+').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'})

    r.path('M' + cap_x     + ' ' + cap_y +
           'L' + cap_mid_x + ' ' + cap_mid_y +
           'L' + cap_end_x + ' ' + cap_end_y +
           'z')
           .attr({'fill': '#5E892B', 'stroke': 'none'});

    var circle_x = (unit_w * (p.cholesterol.value / 10)) + x;
    r.circle(circle_x, y, 22).attr({'fill': '#F4804E', 'stroke': '#fff', 'stroke-width': '2px'});
    r.g.text(circle_x, y, parseInt(p.cholesterol.value)).attr({'font': '20px Consolas, monospace', 'text-anchor': 'middle', 'font-weight': 'normal', 'fill': '#fff'})


    var title = 'LDL "bad" cholesterol'
      , x = 140
      , y = 500 // 130px from above
      , w = 600
      , h = 30
      , units_n = 30 // max value 300
      , unit_w = w / units_n
      , space = 2
      , cap_x = w + x
      , cap_y = y
      , cap_mid_x = 760 - 10 // adjust
      , cap_mid_y = y + h/2
      , cap_end_x = cap_x
      , cap_end_y = y + h

    r.g.text(x, y-12, title).attr({'font-size': '14px'})

    r.rect(x+0,         y, unit_w*10-space,       h).attr({fill: '#DCE6CC', stroke: 'none'});
    r.g.text(x, y+h+8, 'Optimal').attr({'font-size': '12px', 'font-weight': 'normal'})
    r.g.text(x, y+h+20, '0 mg/dL').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'})

    r.rect(x+unit_w*10,    y, unit_w*3-space,     h).attr({fill: '#BDD1A0', stroke: 'none'});
    // adjust height for newline in text string
    r.g.text(x+unit_w*10,  y+h+15, 'Near\nOptimal').attr({'font-size': '12px', 'font-weight': 'normal'})
    r.g.text(x+unit_w*10,  y+h+35, '100 - 129').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'})

    r.rect(x+unit_w*13,  y, unit_w*3-space,           h).attr({fill: '#A0BE78', stroke: 'none'});
    r.g.text(x+unit_w*13, y+h+15, 'Borderline\nhigh').attr({'font-size': '12px', 'font-weight': 'normal'})
    r.g.text(x+unit_w*13, y+h+35, '129 - 159').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'})

    r.rect(x+unit_w*16,  y, unit_w*3-space,           h).attr({fill: '#86AD52', stroke: 'none'});
    r.g.text(x+unit_w*16, y+h+8, 'High').attr({'font-size': '12px', 'font-weight': 'normal'})
    r.g.text(x+unit_w*16, y+h+20, '160 - 189').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'})

    r.rect(x+unit_w*19,  y, unit_w*11,           h).attr({fill: '#5E892B', stroke: 'none'});
    r.g.text(x+unit_w*19, y+h+8, 'Very High').attr({'font-size': '12px', 'font-weight': 'normal'})
    r.g.text(x+unit_w*19, y+h+20, '190+').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'})

    r.path('M' + cap_x     + ' ' + cap_y +
           'L' + cap_mid_x + ' ' + cap_mid_y +
           'L' + cap_end_x + ' ' + cap_end_y +
           'z')
           .attr({'fill': '#5E892B', 'stroke': 'none'});

    var circle_x = (unit_w * (p.LDL.value / 10)) + x;
    r.circle(circle_x, y, 18).attr({'fill': '#F4804E', 'stroke': '#fff', 'stroke-width': '2px'});
    r.g.text(circle_x, y, parseInt(p.LDL.value)).attr({'font': '16px Consolas, monospace', 'text-anchor': 'middle', 'font-weight': 'normal', 'fill': '#fff'})

    var title = 'HDL "good" cholesterol'
      , x = 140
      , y = 620 // 120px from above
      , w = 600
      , h = 30
      , units_n = 10 // max value 100
      , unit_w = w / units_n
      , space = 2
      , cap_x = w + x
      , cap_y = y
      , cap_mid_x = 760 - 10 // adjust
      , cap_mid_y = y + h/2
      , cap_end_x = cap_x
      , cap_end_y = y + h

    r.g.text(x, y-12, title).attr({'font-size': '16px'})

    r.rect(x+0,         y, unit_w*4-space,       h).attr({fill: '#A0BE78', stroke: 'none'});
    r.g.text(x, y+h+8, 'High risk').attr({'font-size': '12px', 'font-weight': 'normal'})
    r.g.text(x, y+h+20, '0 mg/dL').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'})

    r.rect(x+unit_w*4,    y, unit_w*2-space,     h).attr({fill: '#86AD52', stroke: 'none'});
    r.g.text(x+unit_w*4,  y+h+8, 'Intermediate').attr({'font-size': '12px', 'font-weight': 'normal'})
    r.g.text(x+unit_w*4,  y+h+20, '40 - 59').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'})

    r.rect(x+unit_w*6,  y, unit_w*4,           h).attr({fill: '#5E892B', stroke: 'none'});
    r.g.text(x+unit_w*6, y+h+8, 'Protective').attr({'font-size': '12px', 'font-weight': 'normal'})
    r.g.text(x+unit_w*6, y+h+20, '60+').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'})

    r.path('M' + cap_x     + ' ' + cap_y +
           'L' + cap_mid_x + ' ' + cap_mid_y +
           'L' + cap_end_x + ' ' + cap_end_y +
           'z')
           .attr({'fill': '#5E892B', 'stroke': 'none'});

    var circle_x = (unit_w * (p.HDL.value / 10)) + x;
    r.circle(circle_x, y, 18).attr({'fill': '#F4804E', 'stroke': '#fff', 'stroke-width': '2px'});
    r.g.text(circle_x, y, parseInt(p.HDL.value)).attr({'font': '16px Consolas, monospace', 'text-anchor': 'middle', 'font-weight': 'normal', 'fill': '#fff'})


    r.path("M10 700 L760 700").attr({'stroke-dasharray': '.', 'stroke-linecap': 'butt'})
    r.circle(30, 720, 14).attr({'fill': '#F4804E', 'stroke': 'none'});
    r.g.text(30, 720, '3').attr({'font': '18px Consolas, monospace', 'text-anchor': 'middle', 'font-weight': 'bold', 'fill': '#fff'})
    r.g.text(50, 720, 'Your risk').attr({'font-size': '18px', 'font-weight': 'bold'})
    r.g.text(50+100, 720, 'You show an elevated risk of cardiovascular disease')
      .attr({'font-size': '18px', 'font-weight': 'normal', 'fill': '#888'})
    r.risk_prelude = r.g.text(50, 780, 'If you\'re ' + (p.smoker_p.value ? '' : 'not ') +
     'a smoker with a blood pressure\n of ' + p.sbp.value + 'mm/Hg ' + (p.fx_of_mi_p.value ?
      'and have ' : 'and don\'t have ') +
      'a family\n history of heart attack before the age of 60\n (one or both parents) your risk over 10 years is:')
      .attr({'font-size': '14px', 'font-weight': 'normal', 'fill': '#888'})


    r.score_text = r.g.text(320, 780, score+'%')
      .attr({'font-size': '72px', 'font-weight': 'bold', 'fill': '#6A9C2D', 'font-family': "Consolas, monospace", 'font-weight': '900'})

    y = 750;
    r.g.text(450, y, 'Your risk would be lowered to:').attr({'font-size': '14px', 'font-weight': 'bold', 'fill': '#555'})

    r.score_if_sbp_of_10_lower_text = r.g.text(460, y+16, score_if_sbp_of_10_lower+'%').attr({'font-size': '14px', 'font-weight': 'bold', 'fill': '#555'})
    r.sbp_10_lower =  r.g.text(450+36, y+16, 'if your blood pressure were ' + sbp_10_lower + 'mm/Hg').attr({'font-size': '14px', 'fill': '#888'})

    r.score_if_all_optimal_text = r.g.text(460, y+32, score_if_all_optimal+'%').attr({'font-size': '14px', 'font-weight': 'bold', 'fill': '#555'})
    r.g.text(450+36, y+32, 'if you didn\'t smoke and all levels were optimal').attr({'font-size': '14px', 'fill': '#888'})


    r.if_you_quit_set.push(
      r.g.text(460, y+48, score_if_non_smoker+'%').attr({'font-size': '14px', 'font-weight': 'bold', 'fill': '#555'}),
      r.g.text(450+36, y+48, 'if you quit smoking').attr({'font-size': '14px', 'fill': '#888'})
    );

    r.g.text(50, y+80, 'Use your test results to calculate your risk of a cardiovascular event at ReynoldsRisk.org')
      .attr({'font-size': '14px', 'font-weight': 'normal', 'fill': '#888'})

    r.path("M10 855 L760 855").attr({'stroke-dasharray': '.', 'stroke-linecap': 'butt'})
    r.circle(30, 880, 14).attr({'fill': '#F4804E', 'stroke': 'none'});
    r.g.text(30, 880, '4').attr({'font': '18px Consolas, monospace', 'text-anchor': 'middle', 'font-weight': 'bold', 'fill': '#fff'})
    r.g.text(50, 880, 'What now?').attr({'font-size': '18px', 'font-weight': 'bold'})

    // 780px into 4 col grid. each col 180 + 15 right margin

    y = 900
    x = 30
    r.image("images/runner.png", x,     y, 45, 60);
    r.g.text(x+55, y+12, 'Diet and exercise').attr({'font-size': '14px', 'font-weight': 'bold', 'fill': '#555'})
    r.g.text(x+55, y+36, 'can improve your\ncholesterol levels').attr({'font-size': '14px', 'fill': '#888'})

    r.image("images/smoker.png", x+180, y, 45, 60);
    r.quit_text_1 = r.g.text(x+180+55, y+12, 'Staying smoke-free').attr({'font-size': '14px', 'font-weight': 'bold', 'fill': '#555'})
    r.quit_text_2 = r.g.text(x+180+55, y+36+8, 'is one of the best\nways to improve your\nheart disease risk').attr({'font-size': '14px', 'fill': '#888'})

    r.image("images/doctor.png", x+360, y, 45, 60);
    r.g.text(x+360+55, y+12, 'Ask your doctor').attr({'font-size': '14px', 'font-weight': 'bold', 'fill': '#555'})
    r.g.text(x+360+55, y+36+8, 'about statins or other\nmedications that can\nlower cholesterol').attr({'font-size': '14px', 'fill': '#888'})

    // some extra left margin here for systems without Calibri (ipad, etc.)
    r.image("images/needle.png", x+540+10, y, 45, 60);
    r.g.text(x+540+65, y+12, 'Consider retesting').attr({'font-size': '14px', 'font-weight': 'bold', 'fill': '#555'})
    r.g.text(x+540+65, y+36+8, 'in 1 or 2 weeks to\nexclude a temporary\nspike in blood levels').attr({'font-size': '14px', 'fill': '#888'})

    r.path("M10 980 L760 980").attr({'stroke-dasharray': '.', 'stroke-linecap': 'butt'})
    r.g.text(90, 1000, 'Original Design: David McCandless & Stefanie Posavec for Wired Magazine // informationisbeautiful.net')
      .attr({'font-size': '14px', 'fill': '#0088CC'})
      .click(function(e){window.open('http://www.informationisbeautiful.net/2010/visualizing-bloodtests/')})
      .hover(function(e){this.attr('cursor', 'pointer')}, function(e){this.attr('cursor', 'normal')})
    r.g.text(90, 1000+16, 'Reynolds Risk Score Calculator // ReynoldsRiskScore.org')
      .attr({'font-size': '14px', 'fill': '#0088CC'})
      .click(function(e){window.open('http://ReynoldsRiskScore.org')})
      .hover(function(e){this.attr('cursor', 'pointer')}, function(e){this.attr('cursor', 'normal')})
    r.g.text(90, 1000+48, 'Development and validation of improved algorithms for the assessment of global cardiovascular risk in women:\nThe Reynolds Risk Score. Ridker el al. JAMA 2007;297:611-619')
      .attr({'font-size': '12px', 'fill': '#0088CC'})
      .click(function(e){window.open('http://jama.ama-assn.org/content/297/6/611.long')})
      .hover(function(e){this.attr('cursor', 'pointer')}, function(e){this.attr('cursor', 'normal')})
    r.g.text(90, 1000+80, 'C-reactive protein and parental history improve global cardiovascular risk prediction: The Reynolds Risk Score for Men.\n Ridker et al. Circulation. 2008;118:2243-2251')
      .attr({'font-size': '12px', 'fill': '#0088CC'})
      .click(function(e){window.open('http://circ.ahajournals.org/cgi/content/full/118/22/2243')})
      .hover(function(e){this.attr('cursor', 'pointer')}, function(e){this.attr('cursor', 'normal')})
}

// Assign score algorithm here on

// Flag to indicate when any value is out of usual range.
var outOfUsualRange = false;

// Simd score value, set on callback when each postcode area (EH9.js, etc.) array is loaded.
var simd;
var suffix;
var simdScore = 15.89;
var defaultSimd = true;
var unmatchedDigit = true;

// Scottish postcode range
var valid_postcodes = ["QQ1","AB10","AB11","AB12","AB13","AB14","AB15","AB16","AB21","AB22","AB23","AB24","AB25","AB31","AB32","AB99","AB30","AB33","AB34","AB35","AB36","AB39","AB41","AB42",
"AB43","AB44","AB45","AB51","AB52","AB53","AB54","AB55","AB56","DD10","DD9","DD11","DD2","DD3","DD4","DD5","DD7","DD8","DG1","DG10","DG11","DG12","DG13","DG14","DG16",
"DG2","DG3","DG4","DG5","DG6","DG7","DG8","DG9","DD1","EH21","EH22","EH31","EH32","EH33","EH34","EH35","EH36","EH37","EH39","EH40","EH41","EH42","EH15","EH16","EH17",
"EH18","EH2","EH27","EH28","EH29","EH3","EH30","EH4","EH5","EH52","EH1","EH10","EH11","EH12","EH13","EH14","EH49","EH51","DD6","AB37","EH19","EH20","EH23","EH24","EH25",
"EH26","EH46","AB38","EH47","EH48","EH38","EH43","EH44","EH45","EH53","EH54","EH55","EH6","EH7","EH8","EH9","EH91","EH95","EH99","FK1","FK10","FK11","FK12","FK13","FK14",
"FK15","FK16","FK17","FK18","FK19","FK2","FK20","FK21","FK3","FK4","FK5","FK6","FK7","FK8","FK9","G1","G11","G12","G13","G14","G15","G2","G20","G21","G22",
"G23","G3","G31","G32","G33","G34","G4","G40","G41","G42","G43","G44","G45","G46","G5","G51","G52","G53","G58","G60","G61","G62","G63","G64","G65",
"G66","G67","G68","G69","G70","G71","G72","G73","G74","G75","G76","G77","G78","G79","G81","G82","G83","G84","G90","HS1","HS2","HS3","HS4","HS5","HS6",
"HS7","HS8","HS9","IV1","IV10","IV11","IV12","IV13","IV14","IV15","IV16","IV17","IV18","IV19","IV2","IV20","IV21","IV22","IV23","IV24","IV25","IV26","IV27","IV28","IV3",
"IV30","IV31","IV32","IV36","IV4","IV40","IV41","IV42","IV43","IV44","IV45","IV46","IV47","IV48","IV49","IV5","IV51","IV52","IV53","IV54","IV55","IV56","IV6","IV63","IV7",
"IV8","IV9","IV99","KA1","KA10","KA11","KA12","KA13","KA14","KA15","KA16","KA17","KA18","KA19","KA2","KA20","KA21","KA22","KA23","KA24","KA25","KA26","KA27","KA28","KA29",
"KA3","KA30","KA4","KA5","KA6","KA7","KA8","KA9","KW1","KW10","KW11","KW12","KW13","KW14","KW15","KW16","KW17","KW2","KW3","KW5","KW6","KW7","KW8","KW9","KY1",
"KY10","KY11","KY12","KY13","KY14","KY15","KY16","KY2","KY3","KY4","KY5","KY6","KY7","KY8","KY9","KY99","ML1","ML10","ML11","ML12","ML2","ML3","ML4","ML5","ML6",
"ML7","ML8","ML9","PA1","PA10","PA11","PA12","PA13","PA14","PA15","PA16","PA17","PA18","PA19","PA2","PA20","PA21","PA22","PA23","PA24","PA25","PA26","PA27","PA28","PA29",
"PA3","PA30","PA31","PA32","PA33","PA34","PA35","PA36","PA37","PA38","PA4","PA41","PA42","PA43","PA44","PA45","PA46","PA47","PA48","PA49","PA5","PA6","PA60","PA61","PA62",
"PA63","PA64","PA65","PA66","PA67","PA68","PA69","PA7","PA70","PA71","PA72","PA73","PA74","PA75","PA76","PA77","PA78","PA8","PA80","PA9","PH1","PH10","PH11","PH12","PH13",
"PH14","PH15","PH16","PH17","PH18","PH19","PH2","PH20","PH21","PH22","PH23","PH24","PH25","PH26","PH3","PH30","PH31","PH32","PH33","PH34","PH35","PH36","PH37","PH38","PH39",
"PH4","PH40","PH41","PH42","PH43","PH44","PH49","PH5","PH50","PH6","PH7","PH8","PH9","TD1","TD10","TD11","TD12","TD13","TD14","TD15","TD2","TD3","TD4","TD5","TD6",
"TD7","TD8","TD9","ZE1","ZE2","ZE3"];


/***
	loaded()
		Called once the SIMD data is loaded, sets the global var.

***/
function loaded() {
	// In order to prevent any errors catch empty suffix...
	if(suffix != '') {
		// Check if the value is undefined.
		if(simd[suffix] == undefined) {
			unmatchedDigit = true;

			if(suffix.length == 3) {
				// Not found. Chop one character off the end of the suffix
				for(var key in simd) {
					if(key.indexOf(suffix.substr(0, 2)) == 0) {
						simdScore = (simd[key][0]);
						// showNotice("postcode", "Unable to match postcode on final character. A tentative SIMD of " + simdScore + " has been calculated based on the remainder.");

						return;
					}
				}

				// Chop two characters off the end of the suffix
				for(var key in simd) {
					if(key.indexOf(suffix.substr(0, 1)) == 0) {
						simdScore = (simd[key][0]);
						// showNotice("postcode", "Unable to match postcode on final two characters. A tentative SIMD of " + simdScore + " has been calculated based on the remainder.");

						return;
					}
				}

				// Fall back on default median value.
				simdScore = 20;
				// showNotice("postcode", "Unable to match postcode sufficiently to allocate a specific SIMD code. Default median value 15.89 used for ASSIGN.");
				defaultSimd = true;

				return;
			} else if(suffix.length == 2) {
				// Chop.
				for(var key in simd) {
					if(key.indexOf(suffix.substr(0, 2)) == 0) {
						simdScore = (simd[key][0]);
						//showNotice("postcode", "Unable to match postcode on final two characters. A tentative SIMD of " + simdScore + " has been calculated based on the remainder.");

						return;
					}
				}

				for(var key in simd) {
					if(key.indexOf(suffix.substr(0, 1)) == 0) {
						simdScore = (simd[key][0]);
					//	showNotice("postcode", "Unable to match postcode on final two characters. A tentative SIMD of " + simdScore + " has been calculated based on the remainder.");

						loadedCalled = true;
						return;
					}
				}

				for(var key in simd) {
					simdScore = (simd[key][0]);
				//	showNotice("postcode", "Unable to match postcode on final characters. A tentative SIMD of " + simdScore + " has been calculated based on the remainder.");

					return;
				}
			} else if(suffix.length == 1) {
				for(var key in simd) {
					simdScore = (simd[key][0]);
				//	showNotice("postcode", "Unable to match postcode on final  characters. A tentative SIMD of " + simdScore + " has been calculated based on the remainder.");

					return;
				}
			}
		} else { // Found it, so use it.
			simdScore = (simd[suffix][0]);
			//showNotice("postcode", "Based on the postcode entered a SIMD score of " + simdScore + " has been calculated.");
			unmatchedDigit = false;
		}
	} else {
		// Fall back on default median value.
		simdScore = 20;
		//showNotice("postcode", "Unable to match postcode sufficiently to allocate a specific SIMD code. Default median value 15.89 used for ASSIGN.");
		defaultSimd = true;
	}
}


/***
	calculate()
		The actual assign score calculation.

***/

function accMul(arg1, arg2)
{
	var m = 0;
	var s1 = arg1.toString ();
	var s2 = arg2.toString ();

	try { m += s1.split (".")[1].length } catch (e) {}
	try { m += s2.split (".")[1].length } catch (e) {}

	return Number(s1.replace(".","")) * Number(s2.replace(".","")) / Math.pow(10, m);
}

function accAdd(arg1, arg2) {
	var r1;
	var r2;
	var m;

	try { r1 = arg1.toString().split(".")[1].length } catch (e) {r1 = 0;}
	try { r2 = arg2.toString().split(".")[1].length } catch (e) {r2 = 0;}

	m = Math.pow(10, Math.max(r1, r2));

	return (arg1 * m + arg2 * m) / m;
}

function accDiv (arg1, arg2) {
	var t1 = 0;
	var t2 = 0;
	var r1;
	var r2;

	try {t1 = arg1.toString().split(".")[1].length} catch (e) {}
	try {t2 = arg2.toString().split(".")[1].length} catch (e) {}

	with (Math) {
		r1 = Number(arg1.toString().replace (".",""));
		r2 = Number(arg2.toString().replace (".",""));
		return (r1/r2) * pow(10, t2-t1);
	}
}
var calculating = false;
function calculate() {
	if(!calculating) {
		calculating = true;
		outOfUsualRange = false;
		var validated = true;

		$("input.numeric").each(function(item) {
			var thisValid = validate($(this).attr("name"), $(this).val());
			validated = validated && thisValid;
		});

		loadPostcodeRegion($("input[name='postcode']").val().toUpperCase()); // Required in case user skipped postcode entry.

		if(!validated)
			return false;

		// Get the inputs.
		var age = p.age.value;
		var sex = p.gender.value;
		var postcode = p.postCode.value;
		var chd = p.chdFamilyHistory.value;
		var diabetes = p.b_type1.value; // it average if type 1 and type 2 
		var arthritis = p.arthritis.value;
		var cpd = p.cigsperDay.value;
		var sbp = p.sbp.value;
		var tc = p.cholesterol.value;
		var hdl = p.HDL.value;

		if (arthritis > 0) {
			cpd = parseInt(cpd, 10) + 10;
		}

		// Linear combination, betas against inputs.
		var l = accAdd(
			accMul(betas[sex]["age"], age),
			accAdd(
				accMul(betas[sex]["tc"], tc),
				accAdd(
					accMul(betas[sex]["hdl"], hdl),
					accAdd(
						accMul(betas[sex]["sbp"], sbp),
						accAdd(
							accMul(betas[sex]["diabetes"], diabetes),
							accAdd(
								accMul(betas[sex]["chd"], chd),
								accAdd(
									accMul(betas[sex]["cpd"], cpd),
									accMul(betas[sex]["simd"], accDiv(simdScore, 10))
								)
							)
						)
					)
				)
			)
		);

		// Another linear combination, betas against coefficients.
		var l_bar =	accAdd(
			(accMul(betas[sex]["age"], beta_coefficients[sex]["age"])),
			accAdd(
				(accMul(betas[sex]["tc"], beta_coefficients[sex]["tc"])),
				accAdd(
					(accMul(betas[sex]["hdl"], beta_coefficients[sex]["hdl"])),
					accAdd(
						(accMul(betas[sex]["sbp"], beta_coefficients[sex]["sbp"])),
						accAdd(
							(accMul(betas[sex]["diabetes"], beta_coefficients[sex]["diabetes"])),
							accAdd(
								(accMul(betas[sex]["chd"], beta_coefficients[sex]["chd"])),
								accAdd(
									(accMul(betas[sex]["cpd"], beta_coefficients[sex]["cpd"])),
									(accMul(betas[sex]["simd"], beta_coefficients[sex]["simd"]))
								)
							)
						)
					)
				)
			)
		);

		// Gender specific base
		var base = { "male" : 0.8831, "female" : 0.9365 };

		// The ASSIGN score calculation.
		var a = l - l_bar;
		var b = Math.exp(a);
		var c = Math.pow(base[sex], b);
		var score = Math.round(accMul(100.0, accAdd(1.0, -c)));

		var meansUsed  = false;

		for(var j in meansFlags) {
			if(meansFlags[j]["flag"]) {
				meansUsed = true;
				break;
			}
		}

/* // we are not going need the display results hence delete?
		// Display the results...
		var results = '<div><h3 style="width:100%;">ASSIGN Score: <span class="final_score">';

		results = results + score;

		if(outOfUsualRange || meansUsed || defaultSimd || unmatchedDigit) {
			results += '<sup id="asterix">*</sup>';
		}

		results = results + '</span></h3>';

		if(score < 20) {
			results += '<p class="score">ASSIGN score below 20 is not currently high risk, implying general preventive measures (nobody is free of risk) Repeat the scoring in 5 years or earlier, depending how high the current score is.</p>';
		} else {
			results += '<p class="score">ASSIGN 20 or more is high risk, implying specific medical preventive actions. No need to repeat the scoring on another occasion.</p>';
		}

		results += '<p id="score_info"><a id="score_info_toggle" onclick="toggleResultNotes(); return false;" href="#">notes</a></p>';

		results += '<p style="display: none;" id="score_notes_block">The ASSIGN number is the risk percent of cardiovascular disease over ten years, based on the recent SHHEC study. ASSIGN 20 means 20% risk. The actual risk is probably now less than that number. What matters more is what somebody\'s score is in relation to other ASSIGN scores, and therefore their priority or ranking for action to lower their risk.</p>';

		if(meansUsed || defaultSimd || unmatchedDigit) { results += "<p><sup>*</sup> In the absence of specific data for one or more variables mean population values have been used to calculate a provisional ASSIGN score. For a more specific score enter personal values for all variables, if you can, and recalculate.</p>"; }

		if(outOfUsualRange) {
			results = results + '<p><sup>*</sup> One or more values entered are outside the usual range for which the ASSIGN score was designed. Extreme values involve extrapolation so the score is tentative. Check your data entry first. Interpret such results with care.</p>';
		}



		//results += '<div class="reset-btn"><a href="../assign-score.html">New patient</a></div><input type="submit" class="submit_again" value="Recalculate" id="calc_submit"/></div>';



		$("#results-data").html(results);

		if($('#calc_submit').val() == 'Recalculate') {
			if($('div.gateway div#results h3').length > 0) {
				$('div.gateway div#results h3').css({'backgroundColor':'#00FF00'});
				$('div.gateway div#results h3').animate({'backgroundColor':'#FF0000'},700);
			}
		}

		$('#calc_submit').val('Recalculate');

		//$("#calc_submit").bind('mousedown', function() { calculate(); });
		calculating = false;
		return false;
  } */
  
}



/***
	loadPostcodeRegion
		Callback for blur event of postcode field.

***/

function loadPostcodeRegion(postcode) {
	defaultSimd = false;

	var pc = postcode.replace(/\s/g, "");
	if (pc.length > 6) {
		postcode = pc.substr(0, 4) + ' ' + pc.substr(4);
	} else if (pc.length == 5) {
		postcode = pc.substr(0, 2) + ' ' + pc.substr(2);
	} else {
		postcode = pc.substr(0, 3) + ' ' + pc.substr(3);
	}


	var splitPostcode = postcode.split(" ");

	if(splitPostcode.length == 0) {
		if(postcode.length < 4) {
			simdScore = 20;
		  //	showNotice("postcode", "Unable to match postcode sufficiently to allocate a specific SIMD code. Default median value 15.89 used for ASSIGN.");

			defaultSimd = true;
			return;
		} else if(postcode.length > 3 && postcode.length < 7) {
			region = postcode.substr(0, 3);
			suffix = postcode.substr(3, 3);
		} else if(postcode.length == 7) {
			region = postcode.substr(0, 4);
			suffix = postcode.substr(4, 3);
		} else {
			simdScore = 20;
			// showNotice("postcode", "Unable to match postcode sufficiently to allocate a specific SIMD code. Default median value 15.89 used for ASSIGN.");

			defaultSimd = true;
			return;
		}
	} else {
		region = splitPostcode[0];
		suffix = splitPostcode[1];
	}

	$(".postcodeRegion").remove();

	try {
		delete simd;

		url = '../includes/js/postcode-simd/' + region + '.js';

		for (var i = 0; i < valid_postcodes.length; i += 1) {
			if (valid_postcodes[i] === region) {
				var match = true;
			}
		}

		if (!match) {
			simdScore = 20;
			// showNotice("postcode", "Unable to match postcode sufficiently to allocate a specific SIMD code. Default median value 15.89 used for ASSIGN.");

			defaultSimd = true;
			return;
		}

		s = document.createElement('script');
      	s.src = url;
      	s.className = 'postcodeRegion';

      	document.body.appendChild(s);
	} catch(err) {
		simdScore = 20;
	//	showNotice("postcode", "Unable to match postcode sufficiently to allocate a specific SIMD code. Default median value 15.89 used for ASSIGN.");

		defaultSimd = true;
		return;
	}
}

/***
	 showNotice
	 	Shows notice on chosen field. - > We can remove and insted insert errors or warning @Jiafeng

***/ 
/*
function showNotice(risk_factor,message) {
	if(message) {
		var risk_factor_element = $("#" + risk_factor);

		var paragraph = risk_factor_element.children("div.expand").children("p.error");

		if($("#expand_" + risk_factor).css("display") == "block") {
			risk_factor_element.children("div.expand").attr("class", "expand_both");
		} else {
			risk_factor_element.children("div.expand").attr("class", "expand");
		}

		paragraph.css("display", "block");
		paragraph.text(message);

		paragraph.append('<span class="b"></span>');
		paragraph.append('<span class="t"></span>');

	} else {
		clearNotice(risk_factor);
	}
} */

/***
	 clearNotice
	 	Clears notice on chosen field. - > We can remove and insted insert errors or warning @Jiafeng

***/
/*
function clearNotice(risk_factor) {
	var paragraph = $("#" + risk_factor + " p.error");

	$("#" + risk_factor).children("div.expand_both").attr("class", "expand");

	paragraph.css("display", "none");
	paragraph.attr("class", "error");
} */

/***
	validate
		Validates a given input factor (age, cpd, hdl, etc...) and value
***/

function validate(factor, value) {
	if(value == '' ) { value = -1; }

	if(factor) {
		var lowerbound = ranges[factor]["lowerbound"];
		var upperbound = ranges[factor]["upperbound"];

		var usual_lowerbound = usual_ranges[factor]["lowerbound"];
		var usual_upperbound = usual_ranges[factor]["upperbound"];

		if((value < lowerbound) || (value > upperbound)) {
			//showNotice(factor, "In order to return a score the " + ranges[factor]["name"] + " entered should be between " + lowerbound + " and " + upperbound + ".");
			return false;

		} else if((value < usual_lowerbound) || (value > usual_upperbound)) {
			outOfUsualRange = outOfUsualRange || true;

			//showNotice(factor, "Outside the usual range of " + usual_lowerbound + "-" + usual_upperbound + " for " + ranges[factor]["name"] + ".");
			return true;

		} else {
			outOfUsualRange = outOfUsualRange || false;

			//clearNotice(factor);
			return true;
		}
	}
}

/***
	Means

***/

// Fill in mean value and set flag to true.
function useMean(factor) {
	$("div#" + factor + " p.mean").text("use mean");

	meansFlags[factor]["flag"] = true;

	clearNotice(factor);
	setMean(factor);
}

// Re-activate anchor and set flag to false.
function resetMean(factor) {
	if(getMean(factor) != $("div#" + factor + " input").val()) {
		$("div#" + factor + " p.mean").html('<a href="#" onmousedown="useMean(\'' + factor + '\'); return false;">use mean</a>');

		meansFlags[factor]["flag"] = false;
	}

	validate(factor, $("input[name='" + factor + "']").val());
}

// Get the mean value for a given factor, depending on age and gender.
function getMean(factor) {
	var age = $("input[name='age']").val();

	for(var i = 0; i < means[factor].length; i++) {
		var lowerbound = means[factor][i]["lowerbound"];
		var upperbound = means[factor][i]["upperbound"];

		if((age >= lowerbound) && (age <= upperbound)) {
			clearNotice(factor);
			return means[factor][i][$("input[name='sex']:checked").val()];
		} else {
			if(meansFlags[factor]["flag"]) {
				showNotice(factor, "A mean value can not be calculated for the age and sex entered.");
			}
		}
	}

	return '';
}

// Set a mean value on a given factor
function setMean(factor) {
	var age = $("input[name='age']").val();

	$("input[name='" + factor + "']").val(getMean(factor));
}

// Update all means on all active factors.
function updateActiveMeans() {
	for(var j in meansFlags) {
		if(meansFlags[j]["flag"]) {
			setMean(j);
		}
	}
};
