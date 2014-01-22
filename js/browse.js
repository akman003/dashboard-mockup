(function(){
	var subjectLabels = {
		ACCT:'Accounting',
		ART:'Art',
		BIOL:'Biology',
		BSAD:'Business Administration & Education',
		CHEM:'Chemistry',
		CHIN:'Chinese',
		CDIS:'Communication Disorders',
		CSIS:'Computer Science & Information Systems',
		CSP:'Counseling & School Psychology',
		CJUS:'Criminal Justice',
		DANC:'Dance',
		ECON:'Economics',
		EDAD:'Educational Administration',
		ENG:'English',
		ETHS:'Ethnic Studies',
		FSID:'Family Studies & Interior Design',
		FIN:'Finance',
		FREN:'French',
		GEOG:'Geography',
		GERM:'German',
		HSCI:'Health Sciences',
		HIST:'History',
		ITEC:'Industrial Technology',
		INTS:'International Studies',
		JAPN:'Japanese',
		JMC:'Journalixm/Mass Communication',
		LNSK:'Learning Skills',
		MGT:'Management',
		MIS:'Management Information Systems',
		MKT:'Marketing',
		MATH:'Mathmatics',
		MLSC:'Military Science',
		FORL:'Modern Language',
		MUS:'Music',
		PHIL:'Philosophy',
		PE:'Physical Education',
		PHYS:'Physics',
		PSCI:'Political Science',
		PSY:'Psychology',
		REC:'Recreation',
		SFED:'Safety Education',
		SOSC:'Socal Science',
		SOWK:'Social Work',
		SOC:'Sociology',
		SPAN:'Spanish',
		SPCH:'Speach',
		STAT:'Statistics',
		SCM:'Supply Chain Management',
		TE:'Teacher Education',
		TESE:'Teacher Education Special Ed.',
		THEA:'Theatre',
		VOED:'Vocational Education',
		WSTD:'Women\'s Studies'
	};
	
	var subjects = [];	
	var bySubject = {};
	var courses = [];
	
	
	for(var i=0,l=data.length; i<l; i++){
		if(subjects.indexOf(data[i].subject) == -1){
			subjects.push(data[i].subject);
			bySubject[data[i].subject] = {};
		}
		
		var crse = data[i].subject + '-' + data[i].catalog.substr(1);
		
		if(courses.indexOf(crse) == -1){
			courses.push(crse);
			bySubject[data[i].subject][crse] = [];
		}
		
		data[i].id = i;
		bySubject[data[i].subject][crse].push(data[i]);
		
		
	}
	
	
	window.addEventListener('load',function(){
		var html = '';
		for(var n in subjectLabels){
			html += '<a href="#' + n + '" class="list-group-item' + '">' + subjectLabels[n] + '</a>';
		}
		
		$('#subjects').html(html).click(function(e){
			$('#accordion').html(popSubject(bySubject[e.target.getAttribute('href').substr(1)]));
			return false;
		});
		$('#accordion').html(popSubject(bySubject.ACCT));
		
		$('#proceed').click(function(e){
			var ttl = ['Shopping Cart','Acknowledge you Understand','Verify Contact Information'];
			var ctnt = [content.dynamic.replace("[data]",tempCart),content.understand,content.contact];
			var bArr = ['Cancel','Continue'];
			var eCount = 0;
			var fn = function(){
				window.location.href = 'quick_complete.html';						
				modal.close();
			};
			modal.open(ttl,ctnt,bArr,fn);		
			return false;
		});
	},false);
}());



function popSubject(data){
	var html = '';
	
	for(var n in data){
		html += '<div class="panel panel-default"><div class="panel-heading">';
		html += '<h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#'+ n +'">' + n + '&#160;&#160;' + data[n][0].descr + '</a></h4>';		
		html += '</div>';
		html += '<div id="' + n + '" class="panel-collapse collapse">';
		html += '<table style="margin-bottom:0;" class="table table-bordered"><tr class="headings"><th id="class_nbr">Class Nbr.</th><th>Section</th><th>Inst. Mode</th><th id="days">Days</th><th id="time">Time</th><th id="location">Location</th></tr>';		
		for(var i=0,l=data[n].length; i<l; i++){
			html += '<tr id="' + data[n][i].id + '">';
			html += '<td ><div class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">' + data[n][i].classNbr + '<span class="caret"></span></a><ul class="dropdown-menu"><li class="active"><a href="#detail">detail</a></li><li><a href="#map">map</a></li><li><a href="#books">books</a></li><li><a href="#cart">add to cart</a></li></ul></div></td>';
			html += '<td>0' + i + '</td>';
			html += '<td>' + data[n][i].mode + '</td>';
			html += '<td>' + (('Y' == data[n][i].m)?'M':'') + (('Y' == data[n][i].t)?'T':'') + (('Y' == data[n][i].w)?'W':'') + (('Y' == data[n][i].r)?'R':'') + (('Y' == data[n][i].f)?'F':'') + '</td>';	
			html += '<td>' + convertTime(data[n][i].startTime) + ' - ' + convertTime(data[n][i].endTime)  + '</td>';
			html += '<td>' + data[n][i].facility + '</td>';
			html += '</tr>';
		}			
		html += '</table>';
		html += '</div></div>';
	}	
	return html;
}
