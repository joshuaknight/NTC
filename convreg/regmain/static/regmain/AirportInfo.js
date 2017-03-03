var Ht = ''+
		'<div class="container">'+
		'<div class="row">'+
		'	<div class="col-sm-4">'+
		'		<label>Airport Name</label>'+
		'	</div>'+
		'	<div class="col-sm-4">'+
		'		<input type="text" name="flow_type" id="flow_type" required>'+
		'	</div>'+
		'</div>'+
		'<div class="row">'+
		'	<div class = "col-sm-4">'+
		'		<label>Airport Code</label>'+
		' 	</div>'+
		' 	<div class = "col-sm-4">'+
		' 		<input type="text" name="airport_code" id="airport_code" required>'+
		' 	</div>'+
		' </div>'+
		' <div class="row">'+
		' 	<div class = "col-sm-4">'+
		' 		<label> Airline</label>'+
		' 	</div>'+
		' 	<div class = "col-sm-4">'+
		' 		<input type="text" name="airline" id="airline" required>'+
		' 	</div>'+
		' </div>'+
		' <div class="row">'+
		' 	<div class = "col-sm-4">'+
		' 		<label> DateTime</label>'+
		' 	</div>'+
		' 	<div class = "col-sm-4">'+
		' 		<input type="date" name="datetime" id = "datetime" required>'+
		' 	</div>'+
		' </div>'+
		' <div class="row">'+
		' 	<div class = "col-sm-4">'+
		' 		<label>Luggages</label>'+
		' 	</div>'+
		' 	<div class = "col-sm-4">'+
		' 		<input type="number" name="luggages" id="luggages" required>'+
		' 	</div>'+
		' </div>'+
		//'<airport_infoput type="button" id="call_submit" value="Add Airport">'+
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
		this.btn_submit = $(this.html_node).find("#call_submit")[0];

		var p = this;
		var submit_fn = function(){p.submit();};
		$(this.btn_submit).click(submit_fn);
		return true;
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
