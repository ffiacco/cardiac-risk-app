var r;

var p2;

var score_if_non_smoker
    , score_if_sbp_of_120
    , score_if_all_optimal = null;


var qrisk_score = function(){
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
	a += rati * pparams.rati1;
	a += sbp * params.sbp1;
	a += sbps5 * params.sbps51;
  a += town * params.town1;
  
  /* Sum from boolean values */

  a += p[b_AF] * params.AF;
	a += p[b_atypicalantipsy] * params.atypical;
	a += p[b_corticosteroids] * params.steroids;
	a += p[b_impotence2] * params.impotence;
	a += p[b_migraine] * params.migraine;
	a += p[b_ra] * params.ra;
	a += p[b_renal] * params.renal;
	a += p[b_semi] * params.semi;
	a += p[b_sle] * params.sle;
	a += p[b_treatedhyp] * params.hyp;
	a += p[b_type1] * params.type1;
	a += p[b_type2] * params.type2;
  a += p[fh_cvd] * params.fhcvd;
  
  /* Sum from interaction terms */

  a += age_1 * (p[smoke_cat]==1) * interactionParams.age1smoke1;
	a += age_1 * (p[smoke_cat]==2) * interactionParams.age1smoke2;
	a += age_1 * (p[smoke_cat]==3) * interactionParams.age1smoke3;
	a += age_1 * (p[smoke_cat]==4) * interactionParams.age1smoke4;
	a += age_1 * p[b_AF] * interactionParams.age1AF;
  a += age_1 * p[b_corticosteroids] * interactionParams.age1steroids;
  a += age_1 * p[b_impotence2] * interactionParams.age1impotence;
	a += age_1 * p[b_migraine] * interactionParams.age1migraine;
	a += age_1 * p[b_renal] * interactionParams.age1renal;
	a += age_1 * p[b_sle] * interactionParams.age1sle;
	a += age_1* p[b_treatedhyp] * interactionParams.age1hyp;
	a += age_1 * p[b_type1] * interactionParams.age1type1;
	a += age_1 * p[b_type2] * interactionParams.age1type2;
	a += age_1 * p[bmi_1] * interactionParams.age1bmi1;
	a += age_1 * p[bmi_2] * interactionParams.age1bmi2;
	a += age_1 * p[fh_cvd] * interactionParams.age1fhcvd;
	a += age_1 * p[sbp] * interactionParams.age1sbp;
	a += age_1 * 0 * interactionParams.age1town;
	a += age_2 * (p[smoke_cat]==1) * interactionParams.age2smoke1;
	a += age_2 * (p[smoke_cat]==2) * interactionParams.age2smoke2;
	a += age_2 * (p[smoke_cat]==3) * interactionParams.age2smoke3;
	a += age_2 * (p[smoke_cat]==4) * interactionParams.age2smoke4;
	a += age_2 * p[b_AF] * interactionParams.age2AF;
  a += age_2 * p[b_corticosteroids] * interactionParams.age2steroids;
  a += age_2 * p[b_impotence2] * interactionParams.age2impotence;
	a += age_2 * p[b_migraine] * interactionParams.age2migraine;
	a += age_2 * p[b_renal] * interactionParams.age2renal;
	a += age_2 * p[b_sle] * interactionParams.age2sle;
	a += age_2* p[b_treatedhyp] * interactionParams.age2hyp;
	a += age_2 * p[b_type1] * interactionParams.age2type1;
	a += age_2 * p[b_type2] * interactionParams.age2type2;
	a += age_2 * p[bmi_1] * interactionParams.age2bmi1;
	a += age_2 * p[bmi_2] * interactionParams.age2bmi2;
	a += age_2 * p[fh_cvd] * interactionParams.age2fhcvd;
	a += age_2 * p[sbp] * interactionParams.age2sbp;
  a += age_2 * 0 * interactionParams.age2town;
  
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
  ,'b_b_atypicalantipsy': {'value': null}
  ,'b_migraine':  {'value': null}
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
};
