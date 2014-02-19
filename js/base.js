(function(){
	var targetArea = document.getElementById('main-content');
	$('#main-menu').click(function(e){
		if(e.target.getAttribute('href')){
			$.get(e.target.href,function(response){
				targetArea.innerHTML = response;
				var file = e.target.getAttribute('href').substr('4').replace('html','js');
				$eScript.attr('src','js'+file);
			});
		}
		return false;
	});

	// Setup function for Google maps
	// function initialize() {
	//         var mapOptions = {
	//           center: new google.maps.LatLng(-34.397, 150.644),
	//           zoom: 8
	//         };
	//         var map = new google.maps.Map(document.getElementById("map-canvas"),
	//             mapOptions);
	//     }

	//     google.maps.event.addDomListener(window, 'load', initialize);
	
	$(document).ready(function(){
		window.$eScript = $('<script>');
		
		$eScript.attr('type','text/javascript');
		$eScript.appendTo('body');	
	});

	// Re-initialize google maps with set lat/long
	$('#mapModal').on('shown.bs.modal', function (e) {
		var mapOptions = {
	          center: new google.maps.LatLng(42.240630, -97.016050),
	          zoom: 20
	        };
		var map = new google.maps.Map(document.getElementById("map-canvas"),
	            mapOptions);
		google.maps.event.trigger(map, 'resize');
		map.setCenter(mapOptions.center);
	});
		
	$(document).click(function(e){ 	
		if(e.target.className.indexOf('menu-toggle') > -1){  
			$(e.target).parent().toggleClass('open');
			e.preventDefault();			
		}	
		else if(e.target.getAttribute('href') == '#map'){
			//if(e.target.className.indexOf('menu-toggle') > -1){$(e.target).parent().attr('data-finder','here').removeClass('open');}
			$(e.target).parent().parent().parent().attr('data-finder','here').removeClass('open');

			modal.open('Campus Map',content.map1,['Close']);
			e.preventDefault();
		}
		else if(e.target.getAttribute('href') == '#detail'){ 
			//if(e.target.className.indexOf('menu-toggle') > -1){$(e.target).parent().removeClass('open');}
			$(e.target).parent().parent().parent().attr('data-finder','here').removeClass('open');
			modal.open('Class Details',content.classDetail,['Close']);
			e.preventDefault();
		}
		else if(e.target.getAttribute('href') == '#books'){
			//if(e.target.className.indexOf('menu-toggle') > -1){$(e.target).parent().removeClass('open');}
			$(e.target).parent().parent().parent().attr('data-finder','here').removeClass('open');
			window.open("http://www.neebo.com/university-of-nebraska-at-kearney");
			e.preventDefault();
		}
		else if(e.target.getAttribute('href') == '#remove'){
			$(e.target).parent().parent().parent().parent().parent().remove();		
			e.preventDefault();
		}
		else if(e.target.getAttribute('href') == '#drops'){
			//if(e.target.className.indexOf('menu-toggle') > -1){$(e.target).parent().removeClass('open');}
			$(e.target).parent().parent().parent().attr('data-finder','here').removeClass('open');
			modal.open(['Dropping Classes'],[content.drop],['Cancel','Drop Class'],function(){
				$(e.target).parent().parent().parent().parent().parent().append('<td>50%</td>').appendTo('#getdrop table');
				$('#hours').html(parseInt($('#hours').text()) -3);
				modal.close();
			});		
			e.preventDefault();
		}
		else if(e.target.getAttribute('href') == '#cart'){
			var id = $(e.target).parent().parent().parent().attr('data-finder','here').removeClass('open').parent().parent().attr('id');			
			var random = Math.random();
			var classAttr = (random < .8) ? 'alert-success' : 'alert-danger';			
			tempCart += '<tr><td class="' + classAttr + '">' + data[id].subject + '-' + data[id].catalog.substr(1) + '</td>';
			if(classAttr == 'alert-success'){
				tempCart += '<td class="' + classAttr + '">' + (('Y' == data[id].m)?'M':'') + (('Y' == data[id].t)?'T':'') + (('Y' == data[id].w)?'W':'') + (('Y' == data[id].r)?'R':'') + (('Y' == data[id].f)?'F':'') + '</td>';
				tempCart += '<td class="' + classAttr + '">' + convertTime(data[id].startTime) + ' - ' + convertTime(data[id].endTime) + '</td>';
				tempCart += '<td class="' + classAttr + '"><input type="checkbox" checked="checked"/></td>';
				tempCart += '</tr>';
			}
			else{
				tempCart += '<td colspan="3" class="' + classAttr + '">This course is full</td></tr>';
			}			
			e.preventDefault();
		}
		else if(e.target.getAttribute('href') == '#sections'){
			var $target = $(e.target);
			$target.parent().parent().parent().removeClass('open');
/*			
			var get = $target.attr('data-find').split(':');
			var html = '<table class="table"><tr class="headings"><th id="class_nbr">Class Nbr.</th><th>Section</th><th>Inst. Mode</th><th id="days">Days</th><th id="time">Time</th><th id="location">Location</th></tr>';
			for(var i=0,l=accessAll[get[0]][get[1]].length; i<l; i++){
				
			}
			html += '</table>'
*/			
			e.preventDefault();
		} 
	});
}());

var content = {
	map1:'<div id="map-canvas" />',	
	classDetail:'<dl class="dl-horizontal"><dt>Class Number</dt><dd>11143</dd><dt>Course</dt><dd>PHYS-323</dd><dt>Title</dt><dd>Analog and Digital Electronics</dd><dt>Description</dt><dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in sem vel leo ultricies convallis non quis tellus. Sed porttitor ac magna a fringilla. Nunc porttitor ut nulla vel aliquam. Quisque eleifend dui vel semper vulputate. Praesent facilisis dui eu iaculis tincidunt.</dd><dt>Type</dt><dd>LEC</dd><dt>Instruction Mode</dt><dd>In Person</dd><dt>Location</dt><dd>BHS 108</dd><dt>Dates</dt><dd>Aug 25 - Dec 19</dd><dt>Days</dt><dd>TR</dd><dt>Time</dt><dd>08:00AM-09:45AM</dd></dl>',
	understand:'<p>I understand that by submitting course registrations via MyBLUE, I am considered officially enrolled and unless I complete the procedure to drop or withdraw completely, I am accountable for all tuition and related fees for my classes. Failure to attend class meetings does not constitute withdrawal from the class and does NOT eliminate the obligation to pay all tuition and related fees.</p><p>Detailed information on drop deadlines and procedures can be found <a herf="#">here</a>.</p>',
	contact:'<p>Please verify that all contact information is correct.  All attempts to contact you will use this information.</p><dl class="dl-horizontal"><dt>Address</dt><dd>416 East 26th<br/>Kearney, NE  68847</dd><dt>Phone</dt><dd>913/674-9762</dd><dt>Email</dt><dd>pswensn@nebraska.edu</dd></dl>',
	confirm:'<p>These are the open classes you are attempting to enroll in.  Make adjustments as necessary and press continue to complete your enrollment.</p><table class="table"><tr><th>Select</th><th>Class</th><th>Days</th><th>Time</th></tr><tr><td><input type="checkbox" checked="checked"/></td><td>CSIS-440-01</td><td>TR</td><td>12:30PM-1:45pm</td></tr><tr><td><input type="checkbox" checked="checked"/></td><td>ART-100-03</td><td>TR</td><td>10:50AM-12:15pm</td></tr><tr><td><input type="checkbox" checked="checked"/></td><td>CSIS-440-01</td><td>TR</td><td>12:30PM-1:45pm</td></tr><tr><td><input type="checkbox" checked="checked"/></td><td>GEOG-301H-02</td><td>MWF</td><td>12:20PM-1:10pm</td></tr></table>',
	drop:'<p>Withdrawl from a class does not mean you won\'t have to pay for it. Refunds for this class follow the schedule below:</p><dl class="dl-horizontal"><dt>August 31</dt><dd>100% Refund</dd><dt>September 10</dt><dd>75% Refund</dd><dt>September 18</dt><dd>50% Refund</dd><dt>September 25</dt><dd>No Refund</dd><dt>October 13</dt><dd>Drop Deadline</dd></dl>',
	dynamic:'<table class="table"><tr><th>Class</th><th>Days</th><th>Time</th><th>Select</th></tr>[data]</table>'
};

var tempCart = '';


//Function for searching data	
function search(field,value){
	var i=0,l=data.length,results=[];
	for(; i<l; i++){
		if(field === 'classNbr'){
			if(data[i][field].indexOf(value) === 0){
				data[i].id = i;
				results.push(data[i]);				
			}
		}
		else if(field === 'descr'){
			if(data[i][field].indexOf(value) > -1){
				data[i].id = i;
				results.push(data[i]);	
			}
		}
		else{			
			var arr = value.split('-');
			if(data[i]['subject'].indexOf(arr[0].toUpperCase()) === 0){				
				if(arr.length > 1){
					if(data[i]['catalog'].indexOf(arr[1]) > -1){
						data[i].id = i;
						results.push(data[i]);	
					}
				}
				else{
					data[i].id = i;
					results.push(data[i]);	
				}				
			}
		}
		if(results.length === 8) return results;
	}
	return results;
};

function addToTable(table,data,headings,menu){
	var sArr = ['Open','Open','Open','Open','Open','Open','Open','Full','Full','Prequisite'];
	var cArr = ['alert-success','alert-success','alert-success','alert-success','alert-success','alert-success','alert-success','alert-danger','alert-danger','alert-danger'];
	
	var stat = Math.floor(Math.random() * sArr.length);
	data.status = sArr[stat];
	data.statusClass = cArr[stat];
	
	var rw = '<tr id="' + data.id + '">';
	for(var i=0,l=headings.length; i<l; i++){
		rw += '<td class="' + cArr[stat] + '">';
		
/*		rw += '<td class="';
		if(headings[i] === 'status') rw += cArr[stat];
		rw += '">';
*/		
		if(i === 0 && menu){
			rw += '<div class="dropdown"><a class="menu-toggle" href="#">';
		}
		switch(headings[i]){
		case 'course':
			rw += data.subject + '-' + data.catalog.substr(1);
			break;
		case 'days':
			if(data.m === 'Y') rw += 'M';
			if(data.t === 'Y') rw += 'T';
			if(data.w === 'Y') rw += 'W';
			if(data.r === 'Y') rw += 'R';
			if(data.f === 'Y') rw += 'F';
			break;
		case 'time':
			rw += convertTime(data.startTime) + '-' + convertTime(data.endTime);
			break;		
		case 'status':
			rw += sArr[stat];
			break;
		default:
			rw += data[headings[i]];
		}
		if(i === 0 && menu){
			rw += '<span class="caret"></span></a>';
			rw += '<ul class="dropdown-menu">';
			for(var ii=0,ll=menu.length; ii<ll; ii++){
				rw += '<li';
				if(ii === 0){rw += ' class="active"';}
				rw += '>';
					rw += '<a href="#' + menu[ii] + '">' + menu[ii] + '</a>';
				rw += '</li>';
			}				
			rw += '</ul></div>';
		}
		rw += '</td>';
	}	
	rw += '</tr>'; 
	table.after(rw);
	return data;
};

function convertTime(decimal){
	var t = decimal * 24;
	var h = parseInt(t);
	var m = Math.round((t - h) * 60);
	if(m == 60){m = '00'; h++;}
	var aMpM = (h >= 12) ? 'PM' : 'AM';
	
	if(aMpM === 'PM' && h > 12){
		h -= 12;
	}
	return h + ':' + m + aMpM;
}

function convertFullCalTime(decimal){
	var t = decimal * 24;
	var h = parseInt(t);
	var m = Math.round((t - h) * 60);
	if(m == 60){m = '00'; h++;}
	h = (h < 10) ? '0'+h : h;
	return h + ':' + m + ':00 CST';
}

var DropDown = function(bindTo){
	var o=this;
	var $p = $(bindTo).parent();
	var $dd = $('<ul>');
	var currentData = null;
	var len = 0;
	//dd.className = 'dropdown-menu';
	$dd.addClass('dropdown-menu');	
	
	$(bindTo).after($dd);
	
	var updateActive = function(){
		$dd.find('li').each(function(i){
			if(i === o.current){this.className = 'active';}
			else{this.className = '';}
		});
	};
	
	o.current = 0;
	
	o.data = function(i){
		return currentData[i];
	};
	
	o.populate = function(arr){ 
		var str = "";
		o.current = 0;
		currentData = arr;
		len = arr.length;
		for(var i=0,l=arr.length; i<l; i++){
			str += (i === 0) ? '<li class="active">' : '<li>';
			str += '<a href="' + arr[i].id + '">';
			str += '<span>' + arr[i].classNbr + '&#160;</span>';
			str += '<span>' + arr[i].subject + '-' + arr[i].catalog.substr(1) + '&#160;</span>';
			str += '<span>' + arr[i].descr + '&#160;</span>';
			str += '<span>' + convertTime(arr[i].startTime) + '&#160;</span>';
			str += '<span>' + (('Y' == arr[i].m)?'M':'') + (('Y' == arr[i].t)?'T':'') + (('Y' == arr[i].w)?'W':'') + (('Y' == arr[i].r)?'R':'') + (('Y' == arr[i].f)?'F':'') + '&#160;</span>';			
			str += '</a></li>';
		}
		$dd.html(str);
		$p.addClass('open');
	};
	
	o.clear = function(){
		$p.removeClass('open');
		$dd.html('');		
	};
	
	o.next = function(){
		o.current++; 
		if(o.current >= len)o.current = len-1;
		else updateActive();
	};
	
	o.prev = function(){
		o.current--; 
		if(o.current < 0)o.current = 0;
		else updateActive();
	};
};


var Modal = function(){
	var o=this,$modal = $('#myModal').modal({show:false}),
		$title = $('#myModalLabel'),
		$body = $('#myModaltext'),
		$btnCancel = $('#myModalCancel'),
		$btnSave = $('#myModalSave'),
		btnDflt = ['Close', 'Continue'],
		btnCurr = [],		
		callData = {},
		steps = {title:[],content:[],complete:[],index:0,callback:function(){}};
		
	$btnSave.click(function(e){
		steps.index++;
		if(steps.index < steps.title.length){
			$title.html(steps.title[steps.index]);
			$body.html(steps.content[steps.index]);
		}
		else{
			steps.callback();
		}
	});
	
	o.open = function(title,content,btnArr,oncomplete){//workflow
		if(title instanceof Array && content instanceof Array && typeof oncomplete === 'function'){
			steps.index = 0;
			steps.title = title;
			steps.content = content;
			steps.callback = oncomplete;
			$title.html(title[0]);
			$body.html(content[0]);
		}
		else{//regular
			$title.html(title);
			$body.html(content);			
		}
		
		//Buttons
		if(btnArr){
			btnCurr[0] = btnArr[0] || btnDflt[0];
			btnCurr[1] = (btnArr[1]) ? btnArr[1] : null;
		}
		else{
			btnCurr = btnDflt.splice(0);
		}
		
		//Do it
		$btnCancel.text(btnCurr[0]);
		(btnCurr[1] === null) ? $btnSave.hide() : $btnSave.text(btnCurr[1]).show();
		$modal.modal('show');
	};	
	
	o.close = function(){
		$modal.modal('hide');
	};
};
var modal = new Modal();

