var Templ_special_request = ''+			
			'<div class="container"'+
			'<div class="row">'+
			'<div class="row">'+
			'	<div class="col-sm-4">'+
			'		<label>Special Request</label>'+
			'	</div>'+
			'	<div class="col-sm-4">'+
			'		<input type="text" name="special_request" id="txt_special_request_name">'+
			'	</div>'+
			'</div>'+		
			'<div class="row">'+
			'	<div class="col-sm-4">'+
			'		<label>Your Message</label>'+
			'	</div>'+
			'	<div class="col-sm-4">'+
			' 	<textarea id="txt_special_request_message" rows="4" cols="50"></textarea>'+
			'   <input type="submit" value="Add SpecialRequest" id="add_special_submit">'+
			'	</div>'+
			'</div>'+						
			'</div>'+
			'</div>'							

var Mapping_person = function(){
		this.id = null;

		this.txt_special_request_name = null;
		this.txt_special_request_message = null;		
		this.add_special_submit = null;

		this.txt_special_request_name_id = null;
		this.txt_special_request_message_id = null;		

		this.container = null;
		this.html_node = $(Templ_special_request)[0];

}

Mapping_person.prototype.render = function(container){
		this.container = container;
		this.container.appendChild(this.html_node);
		this.bind_input();
}

Mapping_person.prototype.bind_input = function(){
		if ( this.container == null){
			return false;
		}
		var p = this;
		this.txt_special_request_name_id = $(this.html_node).find(
			"#txt_special_request_name")[0];
		this.txt_special_request_message_id = $(this.html_node).find(
			'#txt_special_request_message')[0];
		this.add_special_submit = $(this.html_node).find(
			'#add_special_submit')[0];
		$(this.add_special_submit).click(function(){
			p.submit()});
}

Mapping_person.prototype.submit = function(){
	if ( this.container == null){
		return false;
	}
	this.update_form_field();
	$.ajax({
				url: "/regmain/add_special_request/",
				data: {
						name : this.txt_special_request_name,
						desc : this.txt_special_request_message,
				},
				type: "POST",
				dataType: "json",
		}).done(function(json) {
				p.process_response(json);
	});
}


Mapping_person.prototype.update_form_field = function(){
	this.txt_special_request_name = this.txt_special_request_name_id.value;
	this.txt_special_request_message = this.txt_special_request_name_id.value;
}

Mapping_person.prototype.process_response = function(json){
		this.id = json.id;
		this.txt_special_request_name = json.name,
		this.txt_special_request_message = json.desc
		this.update_html_field();
}

Mapping_person.prototype.update_html_field = function(){
		this.txt_special_request_name_id = this.txt_special_request_name;
		this.txt_special_request_message_id = this.txt_special_request_message; 
}