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
	
	
	var subHtml = '';
	var $container = $('#subjects');
	
	window.addEventListener('load',function(){
		var html = '';
		for(var n in subjectLabels){
			subHtml += '<a href="#' + n + '" class="list-group-item' + '">' + subjectLabels[n] + '</a>';
/*			
			html += '<div class="dropdown special">';
			html += '<a href="#' + n + '" class="list-group-item' + ' dropdown-toggle" data-toggle="dropdown">' + subjectLabels[n] + '</a>';
			html += '<ul class="dropdown-menu">';
			for(var nn in bySubject[n]){
				html += '<li><a href="#sections" data-find="' + n + ':' + nn + '">' + nn + '&#160;&#160;' + bySubject[n][nn][0].descr + '</a></li>';
			}
			html += '</ul></div>';
*/			
		}
		
		$container.html(subHtml).click(function(e){
			var what = e.target.getAttribute('href').substr(1),html = '<a href="#back" class="list-group-item">Subjects</a>',exclude=['x','detail','map','books'];
			if(exclude.indexOf(what) != -1){return;}
			else if(what == 'back'){
				html = subHtml;
			}
			else if(what.indexOf(':') == -1){
				for(var n in bySubject[what]){
					html += '<a href="#' + what + ':' + n + '" class="list-group-item' + '">' + n + ' ' + bySubject[what][n][0].descr + '</a>';
				}
			}
			else if(what.split(':').length == 2){ 
				var get = what.split(':'),arr = bySubject[get[0]][get[1]];
				//html = '<a href="#' + get[0] + '"  class="list-group-item">' + get[1] + ' ' + arr[0].descr  + '</a>';
				html += '<a href="#' + get[0] + '"  class="list-group-item">' + subjectLabels[get[0]]  + '</a>';
				for(var i=0,l=arr.length; i<l; i++){
					html += '<div class="dropdown">';
					//html += '<a href="#' + get[0] + ':' + get[1] + ':' + arr[i].id + '" class="list-group-item' + '">' + arr[i].subject + '-' + arr[i].catalog.substr(1) + '-0' + i + ' ' + (('Y' == arr[i].m)?'M':'') + (('Y' == arr[i].t)?'T':'') + (('Y' == arr[i].w)?'W':'') + (('Y' == arr[i].r)?'R':'') + (('Y' == arr[i].f)?'F':'') + ' ' + convertTime(arr[i].startTime) + ' - ' + convertTime(arr[i].endTime) + '</a>';
					html += '<a href="#x" class="list-group-item dropdown-toggle" data-toggle="dropdown">' + arr[i].subject + '-' + arr[i].catalog.substr(1) + '-0' + i + ' ' + (('Y' == arr[i].m)?'M':'') + (('Y' == arr[i].t)?'T':'') + (('Y' == arr[i].w)?'W':'') + (('Y' == arr[i].r)?'R':'') + (('Y' == arr[i].f)?'F':'') + ' ' + convertTime(arr[i].startTime) + ' - ' + convertTime(arr[i].endTime) + '<span class="caret"></span></a>';
					html += '<ul class="dropdown-menu"><li class="active"><a href="#detail">detail</a></li><li><a href="#map">map</a></li><li><a href="#books">books</a></li><li><a href="#'+ get[0] + ':' + get[1] + ':' + arr[i].id +'">add to schedule</a></li></ul>';
					html += '</div>';
				}				
			}
			else{
				toEvent(what.split(':')[2]);					
				$(e.target).parent().parent().parent().removeClass('open');
				return false;
			}
			
			
			$container.html(html);
			return false;
		});
		
		function toEvent(objId){
			var obj = data[objId];
			var days = ['m','t','w','r','f'];
			var dates = ['Mon, 06 Jan 2014 ','Tue, 07 Jan 2014 ','Wed, 08 Jan 2014 ','Thu, 09 Jan 2014 ','Fri, 10 Jan 2014 ']
			var str = obj.subject+'-'+obj.catalog.substr(0)+'-01';
			var className = (Math.random() < .8) ? 'alert-event alert-success' : 'alert-event alert-danger';	
			for(var i=0; i<5; i++){
				if(obj[days[i]] == 'Y'){
					var evt = {title:str,allDay:false,url:'javascript:modal.open("ClassDetails",content.classDetail,["Close"])'};
					evt.start = dates[i] + convertFullCalTime(obj.startTime);
					evt.end = dates[i] + convertFullCalTime(obj.endTime);
					evt.className = className;				
					$cal.fullCalendar('renderEvent',evt);
				}
			}
			
		}
		
		var $cal = $('#calendar').fullCalendar({
	        // put your options and callbacks here
			weekends:false,
			defaultView:'agendaWeek',
			year:2014,
			month:0,
			date:9
	    });
		
		
		$('#proceed').click(function(e){
			var ttl = ['Acknowledge you Understand','Verify Contact Information'];
			var ctnt = [content.understand,content.contact];
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