var HT = ''+
		'<div class="container">'+
		'<div class="row">'+
		'	<div class="col-sm-4">'+
		'		<label>Address</label>'+
		'	</div>'+
		'	<div class="col-sm-4">'+
		'		<input type="textarea" class="form-control" placeholder="Address" name="address" id="address_id">'+
		'	</div>'+
		'</div>'+
		'<div class="row">'+
		'	<div class = "col-sm-4">'+
		'		<label>Cell Phone</label>'+
		' 	</div>'+
		' 	<div class = "col-sm-4">'+
		' 		<input type="text" class="form-control" placeholder="CellPhone" name="cell_phone" id="cell_phone_id">'+
		' 	</div>'+
		' </div>'+
		' <div class="row">'+
		' 	<div class = "col-sm-4">'+
		' 		<label>Telephone</label>'+
		' 	</div>'+
		' 	<div class = "col-sm-4">'+
		' 		<input type="text" class="form-control" placeholder="Telephone" name="telephone" id="telephone_id">'+
		' 	</div>'+
		' </div>'+
		' <div class="row">'+
		' 	<div class = "col-sm-4">'+
		' 		<label>Email</label>'+
		' 	</div>'+
		' 	<div class = "col-sm-4">'+
		' 		<input type="email" class="form-control" placeholder="@gmail.com" name="email" id = "email_id" >'+
		' 	</div>'+
		' </div>'+				
		'</div>'	




var Contact = function(){
		this.id = null;

		this.address = "";
		this.cell = null;
		this.email = null;
		this.telephone = null;
		
		this.html_node = $(HT)[0];	
		this.container = null;

		this.address_id = null;
		this.telephone_id = null;
		this.email_id = null;
		this.cell_phone_id = null;
		this.btn_ = null;
		
}


Contact.prototype.render = function(container){
		this.container = container;
		container.appendChild(this.html_node);
		this.bind_all();
}

Contact.prototype.bind_all = function(){
		if (this.container == null){
			return false;
		}		
		this.address_id = $(this.html_node).find("#address_id")[0];
		this.cell_phone_id = $(this.html_node).find("#cell_phone_id")[0];
		this.email_id = $(this.html_node).find("#email_id")[0];
		this.telephone_id = $(this.html_node).find("#telephone_id")[0];
		
		//this.btn_ = $("#call_submit");
		
		//p = this;	
		
		//$(this.btn_).click(function(){p.submit();});
		
		return true;
}



Contact.prototype.update_html_fields = function(){				
		this.address_id.value = this.address;
		this.cell_phone_id.value = this.cell;
		this.email_id.value = this.email;
		this.telephone_id.value = this.telephone;
}


Contact.prototype.process_response_contact = function(json){
		this.id = json.id;
		this.address = json.address;
		this.cell = json.cell_phone;
		this.email = json.email;
		this.telephone = json.telephone;			
		this.update_html_fields();
		
}	


Contact.prototype.update_values_from_field = function() {
		if (this.container === null) {
			return false;
		}		

		this.address = this.address_id.value;
		this.cell = this.cell_phone_id.value;
		this.email = this.email_id.value;
		this.telephone = this.telephone_id.value;
		return true;
}	


Contact.prototype.submit = function(){
		if( this.container == null){
			return false;			
		}		
		var p = this;
		var tmp_process_resp_fn = function(json) {				
				p.process_response_contact(json);
		};
		this.update_values_from_field();				
		$.ajax({
			url: "/regmain/add_contact_info/",
			data: {										
					address : this.address,
					cell_phone : this.cell,						
					email : this.email,	
					telephone : this.telephone,							
			},
			type: "POST",
			dataType: "json",
		}).done(tmp_process_resp_fn);		
		return true;
}	




Contact.prototype.return_id = function(){
		console.log(this.container);
		return this.container.value;
}