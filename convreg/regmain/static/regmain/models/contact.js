


var HT = ''+
		'<div class="container" id="the_contact_container">'+
		'<div class="row" id="my_form_contact">'+
		'	<div class="col-sm-4">'+
		'		<label>Address</label>'+
		'	</div>'+
		'	<div class="col-sm-4">'+
		'		<textarea type="textarea" cols="5" rows="5" class="form-control" placeholder="Address" name="address" id="address_id"  > </textarea>'+		
		'	</div>'+
		'	<div id="errormsg_for_address"> </div>'+
		'</div>'+
		'<div class="row" id="my_form_contact">'+
		'	<div class = "col-sm-4">'+
		'		<label>Cell Phone</label>'+
		' 	</div>'+
		' 	<div class = "col-sm-4">'+		
		' 		<input type="text" class="form-control" placeholder="CellPhone" name="cell_phone" id="cell_phone_id">'+
		' 	</div>'+
		'	<div id="errormsg_for_cellphone"> </div>'+
		' </div>'+
		' <div class="row" id="my_form_contact">'+
		' 	<div class = "col-sm-4">'+
		' 		<label>Telephone</label>'+
		' 	</div>'+
		' 	<div class = "col-sm-4">'+
		' 		<input type="text" class="form-control" placeholder="Telephone" name="telephone" id="telephone_id">'+
		' 	</div>'+
		'	<div id="errormsg_for_telephone"> </div>'+
		' </div>'+
		' <div class="row" id="my_form_contact">'+
		' 	<div class = "col-sm-4">'+
		' 		<label>Email</label>'+
		' 	</div>'+
		' 	<div class = "col-sm-4">'+
		' 		<input type="email" class="form-control" placeholder="@gmail.com" name="email" id = "email_id" >'+
		' 	</div>'+
		'	<div id="errormsg_for_email"> </div>'+
		' </div>'+
		'<input type="button" id="call_submit_contact"  class="btn btn-success" value="Submit Contact">'+				
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
		
		this.btn_ = $("#call_submit_contact")[0];
		
		p = this;	
		
		$(this.btn_).click(function(){p.submit();});
		
		this.validate();
}

Contact.prototype.validate = function(){

		var p = this;
		var address_bool = true;
		var cell_phone_bool = true;
		var telephone_bool = true;
		var email_bool = true;

		$("#address_id").change(function(){				
				var length = $("#address_id")[0].value.match(/\S+/g).length;
				var ele = $("#errormsg_for_address")[0];
				if ( length <= 10 ) {					
					ele.style.color = "red";
					ele.innerHTML = "Address Not Valid";					
					address_bool = false;
				}
				else {
					ele.innerHTML = "";	
					address_bool = true;									
				}
		});

		$("#cell_phone_id").change(function(){	
				var length = $("#cell_phone_id")[0].value.length;
				var ele = $("#errormsg_for_cellphone")[0];
				if ( length < 10 || 
						length > 11  || 
							!/^[0-9]+$/.test($("#cell_phone_id")[0].value) ) {
						ele.style.color="red";
						ele.innerHTML = "Cell Number Not Valid";
						cell_phone_bool = false;
				}
				else if ( length == 10 ){
						ele.innerHTML = "";
						cell_phone_bool = true;
				}
		});	



		$("#telephone_id").change(function(){
				var length = $("#telephone_id")[0].value.length;
				var ele = $("#errormsg_for_telephone")[0];
				if ( length < 7 || 
						length > 8  || 
							!/^[0-9]+$/.test($("#cell_phone_id")[0].value) ) {
						ele.style.color="red";
						ele.innerHTML = "Telephone Not Valid";
						telephone_bool = false;
				}
				else if ( length == 7 ){
						ele.innerHTML = "";
						telephone_bool = true;
				}
		});
		
		var my_flag = 0;

		$("#email_id").change(function(){			
				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    		    
				var email = $("#email_id")[0].value;				
				var ele = $("#errormsg_for_email")[0];
				if ( re.test(email) ){

					ele.innerHTML = "";
					email_bool = true;
				}
				else {
					ele.style.color="red";
					ele.innerHTML = email + " is not a valid e-mail address";
					email_bool = false;
				} 			    			   
		
				if ( my_flag == 0 && 
					checker_for_validity() &&
					$("#address_id")[0].value != "" && 
					$("#cell_phone_id")[0].value != "" && 
					$("#email_id")[0].value != "" && 
					$("#telephone_id")[0].value != ""  )
				{
					
				}

				if ( checker_for_validity() ) { 
						my_append();
					}

				else { 

					if ( !address_bool ){
						$("#address_id").change(function(){
							if ( checker_for_validity() ){
								my_append();
							}
						});
					}

					if ( !cell_phone_bool ){
						$("#cell_phone_id").change(function(){
							if ( checker_for_validity() ){
								my_append();
							}
						});
					}

					if ( !telephone_bool ){
						$("#telephone_id").change(function(){
							if ( checker_for_validity() ){
								my_append();
							}
						});
					}

					if ( !email_bool ){
						$("#email_id").change(function(){
							if ( checker_for_validity() ){
								my_append();
							}
						});
					}

				}
		});

		var checker_for_validity = function(){
			if  ( address_bool &&
						cell_phone_bool &&
							telephone_bool &&
								email_bool ) {
				return true;			
			}
			else return false;
		}

		var my_append = function(){
				my_flag = 1;

				$(p.btn_).on("click",function(){
					if ( checker_for_validity ){										
						p.submit();
						$("#html_add_contact").html('');	
						add_person_html();				
						$("html, body").animate({ scrollTop: $("#the_person_container")[0].scrollHeight}, 1000);		
					}
				});				
		}
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
				contact_id = json.id;					
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

