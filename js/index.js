window.addEventListener('load',function(){
	
	//Early Reg
	window.addEventListener('hashchange',function(){
		if(window.location.hash == '#reg'){
			document.getElementById('early-reg').style.display = 'block';
		}
	},false);
	if(window.location.hash == '#reg'){
		document.getElementById('early-reg').style.display = 'block';
	}
	
	
	(function(){
		var $input = $('#class-find');		
		var dropdown = new DropDown($input);
		var cart = document.getElementById('cart').getElementsByTagName('tr');
		var cartCount = 1;
		var hrs = document.getElementById('hrs');
		var hArr = [0,4,4,7,10,13];
		
		$input.focus();
		$input.keyup(function(e){
			var el = this,rslt=[],special=[13,40,38];
			if(el.value.length > 1){
				if(special.indexOf(e.keyCode) > -1){
					switch(e.keyCode){
					case 13:
						var i = dropdown.current;
						dropdown.clear();
						if(cartCount == 1){cart[0].style.display = '';}
						cart[cartCount].style.display = '';
						hrs.innerHTML = hArr[cartCount];
						cartCount++;
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
					dropdown.populate(rslt);
				}	
			}
			else{
				//stop guessing
				dropdown.clear();
			}		
		});
	}());
	
	$('#proceed').click(function(){
		var ttl = ['Acknowledge you Understand','Verify Contact Information'];
		var ctnt = [content.understand,content.contact];
		var bArr = ['Cancel','Continue'];
		var fn = function(){
/*			
			$cart.parent().children('tr[id]').each(function(i){
				var $r = $(this),$ind = $r.children('.alert-success');
				if($ind.length > 0){
					$ind.remove();
					$r.find('a[href = "#remove"]').attr('href','#drops').html('drops');
					$enrl.parent().append($r);
				}
			});
*/			
			modal.close();
			window.location.href = 'quick_complete.html';
		};
		modal.open(ttl,ctnt,bArr,fn);		
		return false;
	});
},false);

