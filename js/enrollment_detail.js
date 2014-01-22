(function(){
	var $input = $('#class-find');
	var $proceed = $('#checkout');
	var dropdown = new DropDown($input);	
	var cartHeadings = ['classNbr','course','descr','days','time','facility','status'];
	var cartMenu = ['detail','map','books','remove'];
	var numClass = 0;
	
	$input.focus();
	$input.keyup(function(e){
		var el = this,rslt=[],special=[13,40,38];
		if(el.value.length > 1){
			if(special.indexOf(e.keyCode) > -1){
				switch(e.keyCode){
				case 13:
					var i = dropdown.current;     
					dropdown.clear();
					var rData = addToTable($cart,dropdown.data(i),cartHeadings,cartMenu); 
					$input.val('');
					$input.focus();
					break;
				case 40:
					dropdown.next();
					break;
				case 38:
					dropdown.prev();
					break;
				}
			}
			else{
				//start guessing
				if(!isNaN(parseInt(el.value))){
					rslt = search('classNbr',el.value);
				}
				else if(el.value.search(" ") > -1){
					rslt = search('descr',el.value);
				}
				else{
					rslt = search('subject',el.value);
				}
				if(rslt.length > 0)	dropdown.populate(rslt);
			}	
		}
		else{
			//stop guessing
			dropdown.clear();
		}		
	});
	
	$proceed.click(function(){
		var ttl = ['Acknowledge you Understand','Verify Contact Information','Confirm Selections'];
		var ctnt = [content.understand,content.contact,content.confirm];
		var bArr = ['Cancel','Continue'];
		var eCount = 0;
		var fn = function(){
			$cart.parent().children('tr[id]').each(function(i){ 
				if($(this).children(':first-child').hasClass('alert-success')){
					$(this).children().removeClass('alert-success');
					eCount++;
					var $r = $(this),$ind = $r.children('td:last-child');
					if($ind.length > 0){
						$ind.remove();
						$r.find('a[href = "#remove"]').attr('href','#drops').html('drops');
						$enrl.parent().append($r);
					}
				}
			});
			numClass = eCount;
			$('#hours').html(numClass * 3);
			modal.close();
		};
		modal.open(ttl,ctnt,bArr,fn);		
		return false;
	});
	
	$cart = $("#getcart>table .headings");
	$enrl = $("#getenroll>table .headings");
	$drop = $("#getdrop>table .headings");
}());
