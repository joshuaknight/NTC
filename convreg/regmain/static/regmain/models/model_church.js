var flag=0;
var Church = function() {
		this.id = null;

		this.name = "";
}

var Churches = function() {
}

var churches = [];


Churches.prototype.update_html_fields = function(){				
		var select = this.container;		

		for(i=0; i<churches.length; i++) {
			if ( flag == 0 ){
			    	var opt = churches[i];
			    	var el = document.createElement("option");
			    	el.textContent = opt.id + "." +opt.name;
			    	el.value = opt;
			    	select.appendChild(el);			    	
		    }
		    else {
		    	return;
		    }
		}
		flag = 1;

}

Churches.prototype.initialize = function(container) {
		this.get_all();
		this.container = container;						
}

Churches.prototype.process_all_response = function(json) {				
		for(i=0; i<json.length; i++) {
				church = new Church();
				church.id = json[i].id;
				church.name = json[i].name;
				churches.push(church);								
		}							
		this.update_html_fields();
}

Churches.prototype.get_all = function() {
		p = this;

		$.ajax({
				url: "/regmain/churches/?format=json",
				type: "GET",
				dataType: "json"
		}).done(function(json) {
				p.process_all_response(json);												
		})		
}




