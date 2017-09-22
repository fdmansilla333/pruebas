
var bmiCalc = new function()
{
    var copyObject = function(obj)
    {
        copy = Object.keys(obj).reduce(function(c,k){c[k]=obj[k];return c;},{});
        return copy;
    };
    
	var getFormData = function(theForm)
	{
	    formData = new Object();
	    
	    theElems = theForm.elements;   
	     
	    for(var i=0;i<theElems.length;i++)
	    {
	        e = theElems[i];
	
	        switch(e.type)
	        {
	        case 'text':
	        case 'textarea':
	            formData[e.name] = e.value;
	            break;
	        case 'radio': // assumes at least one of the buttons is selected
	            if ( e.checked )
	                formData[e.name] = e.value;
	            break;
	            
	        case 'select':
	            formData[e.name] = e.options[e.selectedIndex];
	            break;
	
	        default:
	            break;
	        }
	    }
	    return formData;
	}
	
	
	//
	// Coefficients
	// 
	var coefsMaleNoTrtbp =
	{
	    age: 3.11296, sbp: 1.85508, bmi: 0.79277, smoker: 0.70953, diabetes: 0.5316
	};
	
	var coefsFemaleNoTrtbp =
	{
	    age: 2.72107, sbp: 2.81291, bmi: 0.51125, smoker: 0.61868, diabetes: 0.77763
	};
	
	var coefSbpMaleTrtbp   = 1.92672; // replaces sbp coef if being treated
	var coefSbpFemaleTrtbp = 2.88267; // replaces sbp coef if being treated
	
	// Is contribution to some coef*data or coef*ln(data)?
	var useLogData =
	{
	    age: true, sbp: true, bmi: true, smoker: false, diabetes: false			
	};	
	
	// Constant term in sum
	var betaZeroMale   = -23.9388;
	var betaZeroFemale = -26.0145;	
	
	// Base for pow() calculation
	var baseMale = 0.88431;
	var baseFemale = 0.94833;
	
	
	// Baseline values. Need to fill in gender and age
	var baselineNormalData =
	{
	    gender: 0,  age: 30, sbp: 125, bmi: 22.5, smoker: 0, diabetes: 0, trtbp: 0			
	};	
	
	var baselineOptimalData =
	{
	    gender: 0, age: 30, sbp: 110, bmi: 22, smoker: 0, diabetes: 0, trtbp: 0		
	};	
	
	
	//
	// Funcs
	//
        
	var calcBmi = function(height, mass)
	{
           // height=data['peso'] ;
            //mass=data['altura']; 
            //bmi = mass / (height * height);
		bmi = 703.0814062 * mass / (height * height);
              
	    return bmi;   
	}
	
	// Binary search to find "normal" age for the given score
	var calcHeartAge = function(riskVal, gender)
	{
        var loAge  = 10;  // no real minimum bound, but 10 is a practical one
        var hiAge = 86;          // 85 is max

      	var testAge;          
        
        var testData = copyObject(baselineNormalData);
        testData['gender'] = gender;     
        
        // threshold should be < half of the desired accuracy (.5 in this case)
        while ( (hiAge - loAge) > .2)
        {
        	testAge = (hiAge + loAge) / 2.0;        
            testData['age'] = testAge;            	
        	
          	var testRisk = calcRisk(testData);
          	
          	if (testRisk < riskVal)
          	{
          		loAge = testAge;
          	}
          	else if (testRisk > riskVal)
          	{
          		hiAge = testAge;
          	}
          	else
          	{
          		hiAge = testAge;
          		loAge = testAge;
          	}
               	
        }
        
		return testAge;	
	}
	
	var calcRisk = function(data)
	{    
		var coefs;
		var base;
		var betaZero;
		
		if (data['gender'] == 1) // male
		{
			betaZero = betaZeroMale;
			base = baseMale;
			coefs = copyObject(coefsMaleNoTrtbp);
			if (data['trtbp'] == 1)
				coefs['sbp'] = coefSbpMaleTrtbp;
		}
		else
		{
			betaZero = betaZeroFemale;
			base = baseFemale;			
			coefs = copyObject(coefsFemaleNoTrtbp);		
			if (data['trtbp'] == 1)
				coefs['sbp'] = coefSbpFemaleTrtbp;			
		}

	    
	    // do computation
	    var betaSum = betaZero;
	    for(var k in coefs)
	    {
	    	var m = data[k].toFloat();
	    	if (useLogData[k])
	    		m = Math.log(m);
	    	
	        var dBeta = coefs[k] * m;
	        
	        betaSum += dBeta;
	    }
	
	    var risk =  1.0 - Math.pow(base, Math.exp(betaSum));
   
	    return risk;
	
	}
	
	
	var formDataValid = function(data)
	{
	    if ( (data['age'] > 74) || (data['age'] < 20))
	    {
	        $('error_msg').set('text',"La edad debe estar entre 20 y 80");
	        return false;
	    }
	    
	    if ( (data['sbp'] > 200) || (data['sbp'] < 90))
	    {
	        $('error_msg').set('text',"La presion debe estar entre 90 and 200");
	        return false;
	    }    
	

	    if ( (data['bmi'] > 50) || (data['tcl'] < 15))
	    {
	        $('error_msg').set('text',"El IMC debe ser entre 15 y 50");
	        return false;
	    }    
            data['bmi']=data['peso']/(data['altura']*data['altura']);
	    
	    return true;
	}
	
	this.doCalculation = function()
	{
	
	    var data = getFormData(document.forms.bmiCalcForm);
	
	    if ( formDataValid(data) )
	    {
	        $('error_msg').set('text',''); // clear error text

	        var risk = calcRisk(data);
	
	        // 'normal' risk    
	        var testData = copyObject(baselineNormalData);
	        testData['age'] = data['age'];
	        testData['gender'] = data['gender'];	   	        
	        var normalRisk = calcRisk(testData);
	        
	        // 'optimal' risk
	        testData = copyObject(baselineOptimalData);	        
	        testData['age'] = data['age'];	   
	        testData['gender'] = data['gender'];		        
	        var optRisk = calcRisk(testData);
	        
	        // "heart age"
	        var heartAge = calcHeartAge(risk, data['gender']);
	        
	        // text
	        
	        $('bmicalc').getElement('#bmi_heart_age_txt').set('text', Math.round( heartAge));	        
                $('bmicalc').getElement('#bmi_heart_age_input').set('value', Math.round( heartAge));
	        
	        $('bmicalc').getElement('#bmi_risk_txt').set('text', Math.round( 1000 * risk)/10 + "%");
                $('bmicalc').getElement('#bmi_risk_input').set('value', Math.round( 1000 * risk)/10);
	        $('bmicalc').getElement('#bmi_normal_txt').set('text', Math.round( 1000 * normalRisk)/10 + "%");  
                $('bmicalc').getElement('#bmi_risk_normal_input').set('value', Math.round( 1000 * normalRisk)/10); 
	        $('bmicalc').getElement('#bmi_opt_txt').set('text', Math.round( 1000 * optRisk)/10 + "%");  
                $('bmicalc').getElement('#bmi_risk_optimo_input').set('value', Math.round( 1000 * optRisk)/10); 
	       $('bmicalc').getElement('#bmi_input').set('value', Math.round(data['bmi']));
               $('bmicalc').getElement('#bmi_input_txt').set('text', Math.round(data['bmi']));
	        
	        // And bar widths in the graph
	        var fullW = $('graph_bkg').getStyle('width').toInt();
	        fullW -= 10; // 10 pixel right border. Sorry.
	
	        // NOTE: Bars peg at 100%
	        var maxVal = 100;
	        
	        $('bmicalc').getElement('#bmi_risk_bar').setStyle('width', ((Math.round( 100 * risk) * fullW / maxVal)*2).toInt());          
	        $('bmicalc').getElement('#bmi_normal_bar').setStyle('width', ((Math.round( 100 * normalRisk) * fullW / maxVal)*2).toInt());          
	        $('bmicalc').getElement('#bmi_opt_bar').setStyle('width', (Math.round( 100 * optRisk) * fullW / maxVal).toInt());          
	    		    	
	        
                
                
	    }
	}

};

function showBmiCalc()
{
	bmiCalc.doCalculation();
    $('cover').setStyle('opacity', '.5'); 	
    $('cover').setStyle('visibility', 'visible');
    $('bmicalc').setStyle('visibility', 'visible');    
}
function hideBmiCalc()
{
    $('bmicalc').setStyle('visibility', 'hidden');
    $('cover').setStyle('visibility', 'hidden');  
}

