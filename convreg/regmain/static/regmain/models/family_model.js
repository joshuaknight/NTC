var already_added = 0;

var htfp='<div class="container">'+
		 '<div class="row">'+
		 ' 		<h1 class="breadcrums">Persons</h1>'+
		 ' </div> '+
		 '<div class="row">'+
		 '	<div class="input-group">'+
		 '		<input type="button" value="Add Person" id="btn_add_person_html" class="btn btn-primary" />'+
		 '	</div>'+
		 '</div>'+		 
		 '</div>'


var Family = function(){
		this.id = null;

		this.html_person = $(htfp)[0];

		this.container = null;

}


Family.prototype.render = function(container){
		this.container = container;		
		this.submit();
}

Family.prototype.validate = function(){
		if ( txt_family_name.value == ""){
			return false;
		} 
		else{
			return true;
		}
}


Family.prototype.submit = function(){		
		var msg = "";
		if ( this.validate() && 
				already_added == 0 ){
			console.log("Did validate");
			$.ajax({
				url: "/regmain/add_family/",
				data: {
					name: txt_family_name.value
				},	
				type: "POST",
				dataType: "json"
			}).done(function(json) {
				family_id = json.id;							
			})
			this.container.appendChild(this.html_person);
			already_added = 1;
			$(sel_btn_add_person_html).on("click", function(){
					add_person_html(family_id)
				});
			msg = "Successfully Created"

		}

		else {
			msg = "Your Family Name is Empty or you already Created a Family";			
		}

		var family_message_container = $("#family_report_message")[0];
		var ele = document.createElement('p');
		ele.innerHTML = msg;
		family_message_container.appendChild(ele);
}

