function calculate(){  
    // получаем значения полей
    var k = 2, n = 3, x0=2,xq0=2, L1=12, L2 = 1; 
    var Ch = document.inputData.keyCh;
    Ch = Ch.value;
    var tp = document.inputData.keyTp;
    tp = parseInt(tp.value);
    var q0_ = document.inputData.keyq0;
    var q0 = parseInt(q0_.value);
    var qT_ = document.inputData.keyqT;
    var qT = parseInt(qT_.value);
    if(tp < 0)
        tp = 0;
    var T = tp;
    var time = [];
    var x = [];
    var pi = 3.1458;
    var returnStr = "<table width=\"100%\" border=\"1\">";
    returnStr += "<tr bgcolor=\"#ffcc00\"><th width=\"50%\"> Время </th> <th width=\"50%\"> Значение </th></tr>";
    var i = 0;
    var temp = 0;
    while(temp <= tp){
        time[i] = roundPlus(temp,4);
        //x[i] = q0 + (3*(Math.pow(time[i],2))*(qT-q0)/(Math.pow(T,2)))+(2*(Math.pow(time[i],3))*(q0-qT)/(Math.pow(T,3)));// лр 3
        // if(q0 >= qT){
        //     x[i] = Math.abs((q0 - qT)/2);
        // }
        // if(q0 < qT){
        if(qT > q0)
            x[i] = (qT - q0)/(-2);
        if(qT <= q0)
            x[i] = (q0 - qT)/2;
        x[i] = (q0 - qT)/2;
        //}
        //x[i] = Math.abs((q0 - qT)/2);
        x[i] *= Math.cos(((pi*time[i])/T)) - 1;
        x[i] += q0;
        // L1 = (-1)*n + Math.sqrt(n*n - k*k);
        // L2 = (-1)*n - Math.sqrt(n*n - k*k); 
        // x[i] = ((x0 * L2 - xq0)/(L2 - L1)) * Math.exp(L1 * time[i])
        // x[i] += ((x0 * L1 - xq0)/(L2 - L1)) * Math.exp(L2 * time[i])      
        x[i] = roundPlus(x[i], 3);
        temp += 1/Ch;
        i++;
    }
    i = 0;
    while(i < time.length){
        returnStr += "<tr>";
        returnStr += "<th>" + time[i] + "</th><th>" + x[i] + "</th>";
        returnStr += "</tr>";
        i++;
    }
    returnStr += "</table>"
    document.getElementById("sidebar2").innerHTML = returnStr;
    //alert(document.documentElement.clientWidth);
    var pxx = setWidth();
    createGraph(x,time,pxx);
}

function createGraph(x,time,pxx){
    pxx -= 5;
    var height = pxx/2;
    var minX = x[15];
    var maxX = x[15];
    var maxT = time[time.length-1];
    for (var i = 0; i <= time.length; i++) {
        if(minX > x[i])
            minX = x[i];
        if(maxX < x[i])
            maxX = x[i];
    }
    var mashX = Math.abs(maxX);
    if(Math.abs(maxX) < Math.abs(minX)){
        mashX = Math.abs(minX);
    }
    var mashtabX = (pxx-40 - height)/mashX;
    if(maxX < 0){
        mashtabX = (pxx-40 - height)/mashX;
    }
    mashtabX *= (-1);
    var mashtabT = (pxx-80)/maxT;
    var returnStr = "<svg width=\""+  pxx  +"\" height=\""+  pxx  +"\" xmlns=\"http://www.org/2000/svg\"";
    returnStr += "xmlns:xlink=\"http://www.w3.org/1999/xlink\">";
    returnStr += "<style type=\"text/css\"> path { stroke:black; fill:none;} </style>";
    returnStr += "<path d=\"M 40 "+ height;
    for (var i = 0; i <= time.length; i++) {
        var t = time[i]*mashtabT+40;
        var x_ = x[i]*mashtabX+height;
        returnStr += " L "+t+" "+x_;
    }
    returnStr += "\"/>";
    returnStr += "<path d=\"M 40 0 l0," + pxx + " M 40 0 l6,20 M 40 0 l-6,20 M 0 "+ height +" l" + pxx + ",0 M "+ pxx +" "+ height +" l-20,6 M "+ pxx +" "+ height +" l-20,-6\"/>";
    returnStr += "<text x=\"0\" y=\"15\">q(t)</text>";
    returnStr += "<text x=\""+(pxx-15)+"\" y=\""+(height+20)+"\">t</text>";
    for (var i = 1; i <= 10; i++) {
        var number = (maxT*mashtabT)/10;
        number *= i;
        returnStr += "<path d=\"M "+ (number+40) +" "+ (height+5) + "l0,-10\"/>";
        returnStr += "<text x=\""+ (number+37) +"\" y=\""+(height+20)+"\">"+ roundPlus((number/mashtabT),2) +"</text>";
    }
    var number_ = (mashX*mashtabX)/9;   
    for (var i = 0; i < 10; i++) {
        returnStr += "<path d=\"M "+ 35 +" "+ (i*number_+height) + "l10,0\"/>";
        returnStr += "<text x=\""+ 0 +"\" y=\""+(i*number_+height)+"\">"+ roundPlus((i*number_)/mashtabX,2) +"</text>";    
    }
    for (var i = 0; i < 10; i++) {
        returnStr += "<path d=\"M "+ 35 +" "+ ((-1)*i*number_+height) + "l10,0\"/>";
        returnStr += "<text x=\""+ 0 +"\" y=\""+((-1)*i*number_+height)+"\">"+ roundPlus(((-1)*i*number_)/mashtabX,2) +"</text>";    
    }
    returnStr += "</svg>";
    document.getElementById("content").innerHTML = returnStr;   
}

function roundPlus(x, n) { //x - число, n - количество знаков 
  if(isNaN(x) || isNaN(n)) return false;
  var m = Math.pow(10,n);
  return Math.round(x*m)/m;
}

function setWidth(){ 
    var pxx = document.documentElement.clientWidth/3;
    document.getElementById('content').style.width = pxx + "px";
    return pxx;
}


$(".ripple").on("click",function(event){
$(this).append("<span class='ripple-effect'>");
$(this).find(".ripple-effect").css({
   left:event.pageX-$(this).position().left,
    top:event.pageY-$(this).position().top
  }).animate({
    opacity: 0,
  }, 1500, function() {
   $(this).remove();
  });
});

  	$(document).ready(function() { 

	(function ($) { 
		$('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
		
		$('.tab ul.tabs li a').click(function (g) { 
			var tab = $(this).closest('.tab'), 
				index = $(this).closest('li').index();
			
			tab.find('ul.tabs > li').removeClass('current');
			$(this).closest('li').addClass('current');
			
			tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
			tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
			
			g.preventDefault();
		} );
	})(jQuery);

});