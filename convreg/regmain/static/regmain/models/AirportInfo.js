var Ht = ''+
		'<div class="container" id="the_airport_container">'+
		'<div class="row" id="my_form_airport">'+
		'	<div class="col-sm-4">'+
		'		<label>Airport Name</label>'+
		'	</div>'+
		'	<div class="col-sm-4">'+
		'		<input type="text" class="form-control" placeholder="Airport Name" name="flow_type" id="flow_type" required>'+
		'	</div>'+
		'	<div id="error_message_flow_type"> </div>'+
		'</div>'+
		'<div class="row" id="my_form_airport">'+
		'	<div class = "col-sm-4">'+
		'		<label>Airport Code</label>'+
		' 	</div>'+
		' 	<div class = "col-sm-4">'+
		' 		<input type="text" class="form-control" placeholder="Airport Code" name="airport_code" id="airport_code" required>'+
		' 	</div>'+
		'	<div id="error_message_airport_code_id"> </div>'+
		' </div>'+
		' <div class="row" id="my_form_airport">'+
		' 	<div class = "col-sm-4">'+
		' 		<label> Airline</label>'+
		' 	</div>'+
		' 	<div class = "col-sm-4">'+
		' 		<input type="text" class="form-control" placeholder="Airline" name="airline" id="airline" required>'+
		' 	</div>'+
		'	<div id="error_message_airline_id"> </div>'+
		' </div>'+
		' <div class="row" id="my_form_airport">'+
		' 	<div class = "col-sm-4">'+
		' 		<label> DateTime</label>'+
		' 	</div>'+
		' 	<div class = "col-sm-4">'+
		' 		<input type="date" name="datetime" class="form-control" id = "datetime" required>'+
		' 	</div>'+
		'	<div id="error_message_datetime_id"> </div>'+
		' </div>'+
		' <div class="row" id="my_form_airport">'+
		' 	<div class = "col-sm-4">'+
		' 		<label>Luggages</label>'+
		' 	</div>'+
		' 	<div class = "col-sm-4">'+
		' 		<input type="number" min="1" max="20" name="luggages" class="form-control"  id="luggages" required>'+
		' 	</div>'+
		' </div>'+
		//'<input type="button" id="call_submit"  class="btn btn-success" value="Submit Airport">'+
		'</div>'




var Airport = function(){
	this.id = null;
	this.flow_type = "";
	this.airport_code = "";
	this.airline = "";
	this.datetime = null;

	this.luggages = null;

	this.html_node = $(Ht)[0];
	this.container = null;
	
	this.flow_type_id = null;
	this.airport_code_id = null;
	this.airline_id = null;
	this.datetime_id = null;
	this.luggages_id = null;
	this.btn_submit = null;
}

Airport.prototype.render = function(container){
	this.container = container;
	container.appendChild(this.html_node);
	this.bind_all();
}

Airport.prototype.bind_all = function(){
		if (this.container === null) {
				return false;
		}
		this.flow_type_id = $(this.html_node).find('#flow_type')[0];
		this.airport_code_id = $(this.html_node).find('#airport_code')[0];
		this.airline_id = $(this.html_node).find('#airline')[0];
		this.datetime_id = $(this.html_node).find('#datetime')[0];
		this.luggages_id = $(this.html_node).find('#luggages')[0];
		//this.btn_submit = $(this.html_node).find("#call_submit")[0];

		//var p = this;
		//var submit_fn = function(){p.submit();};
		//$(this.btn_submit).click(submit_fn);		
		this.validate_inputs();
}


Airport.prototype.validate_inputs = function(){

		$("#flow_type").change(function(){
				var ele = $("#error_message_flow_type")[0];
				if ( $("#flow_type")[0].value.length < 3  || 
						!/^[a-zA-Z ]+$/.test($("#flow_type")[0].value)){					

						ele.style.color="red";								
						ele.innerHTML = flow_type.value + " is not a valid Airport name";						
				}					
				else{
						ele.innerHTML = "";
				}
		});


		$("#airport_code").change(function(){
				var ele = $("#error_message_airport_code_id")[0];
				if ( $("#airport_code")[0].value.length < 4 || 
						!/^[0-9]+$/.test($("#airport_code")[0].value ) ){					
						ele.style.color="red";								
						ele.innerHTML = airport_code.value + " is not a valid Airport Code";						
				}					
				else{
						ele.innerHTML = "";
				}
		});

		$("#airline").change(function(){
				var ele = $("#error_message_airline_id")[0];
				if ( /^[0-9]+$/.test($("#airline")[0].value) ){					
						ele.innerHTML = "";						
				}					
				else{
					ele.style.color="red";								
					ele.innerHTML = airline.value + " is not a valid Airline Code";											
				}
		});


		$("#datetime").change(function(){
				var ele = $("#error_message_datetime_id")[0];
				var year = new Date($("#datetime")[0].value);
				if ( year.getFullYear() < 2017 || year.getFullYear() > 2017 ) {					
						ele.style.color="red";								
						ele.innerHTML = datetime.value + " is not a valid Date Time";						
				}					
				else{
						ele.innerHTML = "";
				}
		});

		$("#luggages").change(function(){

				if 	(	$("#flow_type")[0].value != "" &&
				$("#airport_code")[0].value != "" && 
				$("#airline")[0].value != "" && 
				$("#datetime")[0].value != ""  )
		{
				$("#add_btn_contact")[0].style.visibility ="visible";
				$("html, body").animate({ scrollTop: $("#family_input_block")[0].scrollHeight}, 1000);
		}
			
		});	

}

Airport.prototype.submit = function(){
		if (this.container === null) {
				return false;
		}

		var p = this;
		var tmp_process_resp_fn = function(json) {
				p.process_response(json);
		};

		this.update_form_fields();

		$.ajax({
				url: "/regmain/airport_info/",
				data: {
						flow_type : this.flow_type,
						airport_code : this.airport_code,
						airline : this.airline,
						datetime : this.datetime,
						luggages : this.luggages,
				},
				type: "POST",
				dataType: "json",
		}).done(tmp_process_resp_fn);
		return true;
}

Airport.prototype.update_form_fields = function(){
	if (this.container == null){
		return false;	
	}
	this.flow_type = this.flow_type_id.value;
	this.airport_code = this.airport_code_id.value;
	this.airline = this.airline_id.value;
	this.datetime = this.datetime_id.value;
	this.luggages = this.luggages_id.value;
	return true;
}

Airport.prototype.process_response = function(json){
	this.flow_type = json.flow_type;
	this.airport_code = json.airport_code;
	this.airline = json.airline;
	this.datetime = json.datetime;
	this.luggages = json.luggages;
	this.id = json.id;
	this.update_html_form();
}

Airport.prototype.update_html_form = function(){
	if(this.container == null){
		return false;
	}
	this.flow_type_id.value = this.flow_type;
	this.airline_id.value = this.airline;
	this.airport_code_id.value = this.airport_code;
	this.datetime_id.value = this.datetime;
	this.luggages_id.value = this.luggages;
	return true;
}
