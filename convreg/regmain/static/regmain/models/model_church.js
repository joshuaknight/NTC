var flag=0;

var Churches = function() {

		this.container = null;
}


Churches.prototype.initialize = function(container){					

		this.container = container;

		var select = this.container;
		
		$.ajax({
				url : '/regmain/churches/?format=json',
				type : "GET",
				dataType : "json",
		}).done(function(json){	
				if ( flag == 0 ){					
					for (var i = 0; i < json.length; i++) {
							var opt = json[i];
							var ele = document.createElement("option");
							ele.textContent = opt.id+"."+opt.name;
							ele.value = opt.id;
							select.appendChild(ele);
					}
					flag = 1;	
				}																												
		});					
						
}


Churches.prototype.return_id = function(){
		return this.container.value;
}

