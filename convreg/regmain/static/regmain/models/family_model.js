var already_added = 0;

var htfp='<div class="container">'+
		 '<div class="row">'+
		 ' 		<h1>Persons</h1>'+
		 ' </div> '+
		 '<div class="row">'+
		 '	<div class="col-sm-4">'+
		 '		<input type="button" value="Add Person" id="btn_add_person_html" />'+
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
		if ( this.validate() && already_added == 0){
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
			$(sel_btn_add_person_html).on("click", add_person_html);
		}
		else {
			alert("Your Family Name is Empty or you already Created a Family");
			console.log("Did not validate");
		}
}

