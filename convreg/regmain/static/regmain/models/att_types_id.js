var HTT = ''+
		'<div class="row">' +
		
		'  <div class="row">' +
		'    <div class="col-sm-4">' +
		'		<select id = "vol_type_id">'+
		'		<option value="" selected>........</option>'+
		'		<option value="Serving Food">Serving Food</option>'+
		'		<option value="Health Care">Health Care</option>'+		
		'		</select>'+
		'    </div>' +
		'  </div>'+
		'</div>' 


var Attendance = function(){
		this.id = null;
		this.name = "";
		this.html_node = $(HTT)[0];
		this.container = null;
		this.person = person_id;
		this.vol_type_id = null;
}


Attendance.prototype.render = function(container){
		this.container = container;
		container.appendChild(this.html_node);
		this.bind_inputs();
}

Attendance.prototype.bind_inputs = function(){
		this.vol_type_id = $(this.html_node).find("#vol_type_id")[0];		
}

Attendance.prototype.submit = function(){
		if (this.container == null){
			return false;
		}
		this.update_form_fields();
		$.ajax({
					url: "/regmain/att_type/",
					data: {
							name : this.name,
							person : this.person,
					},
					type: "POST",
					dataType: "json",
			}).done(function(json) {
					p.process_response(json);
		});
}

Attendance.prototype.update_form_fields = function(){
		if (this.container == null){
			return false;
		}
		this.name = this.vol_type_id.value;
}

Attendance.prototype.process_response = function(json){
		this.name = json.name;
		this.id = json.id;
		this.update_html_form();
}

Attendance.prototype.update_html_form = function(){
		this.vol_type_id = this.name;
}
