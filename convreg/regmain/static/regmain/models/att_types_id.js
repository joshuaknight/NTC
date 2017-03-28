var HTT = ''+
		'<div class="row" id="vol_list">' +
		'  <div class="row">' +
		'    <div class="col-sm-9">' +
		'		<select id="vol_type_id_list" class="form-control">'+
		'		</select>'+
		'    </div>' +
		'  </div>'+
		'</div>' 



var Attendance = function(){

		
		this.html_node = $(HTT)[0];

		this.container = null;
		
		this.person = person_id;
		
		this.vol_type_id = null;
}



Attendance.prototype.render = function(container){
		this.container = container;				
		this.vol_type_id = $(this.html_node).find("#vol_type_id_list")[0];						
		var select = this.vol_type_id;
		$.ajax({
				url : '/regmain/volunteer_types/?format=json',
				type : "GET",
				dataType : "json",
		}).done(function(json){													
				for (var i = 0; i < json.length; i++) {
						var opt = json[i];
						var ele = document.createElement("option");
						ele.textContent = opt.id+"."+opt.name;
						ele.value = opt.id;
						select.appendChild(ele);	
				}																		
		});										
		this.container.appendChild(this.html_node);
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
