// Person model
var person_id = null;
var flag_volunteer = 0;


var TMPL_PERSON = '' +
		'<div class="container">' +
		'  <div class="row">' +
		'    <div class="col-sm-4">' +
		'      <label>First Name</label>' +
		'    </div>' +
		'    <div class="col-sm-4">' +
		'      <input type="text" name="txt_first_name" ' +
		'             class="txt_first_name" />' +
		'    </div>' +
		'  </div>' +

		'  <div class="row">' +
		'    <div class="col-sm-4">' +
		'      <label>Last Name</label>' +
		'    </div>' +
		'    <div class="col-sm-4">' +
		'      <input type="text" name="txt_last_name" ' +
		'             class="txt_last_name" />' +
		'    </div>' +
		'  </div>' +

		'  <div class="row">' +
		'    <div class="col-sm-4">' +
		'      <label>Gender</label>' +
		'    </div>' +
		'    <div class="txt_sex col-sm-4">' +
		'<input type="radio" name="sex" class="txt_sex" value="male" checked>Male'+
		'<input type="radio" name="sex" class="txt_sex" value="female">Female'+
		'<input type="radio" name="sex" class="txt_sex" value="transgender">Transgender'+
		'    </div>' +
		'  </div>' +

		'  <div class="row">' +
		'    <div class="col-sm-4">' +
		'      <label>Date of Birth</label>' +
		'    </div>' +
		'    <div class="col-sm-4">' +
		'      <input type="date" name="txt_dob" ' +
		'             class="txt_dob" />' +
		'    </div>' +
		'  </div>' +

		'  <div class="row">' +
		'		<div class="col-sm-4">' +
		'      	<label>Airport Info</label>'+
		'    	</div>' +
		'		<div class="col-sm-4">' +
		'		<input type="button" value="Add Airport Info" id="add_airport_btn"/>' +
		'    	</div>' +
		'  </div>' +

		' <div class="row" id="html_add_airport"></div>'+

		'  <div class="row">' +
		'		<div class="col-sm-4">' +
		'      	<label>Contact Info</label>'+
		'    	</div>' +
		'		<div class="col-sm-4">' +
		'		<input type="button" id="add_contact_btn" value="Contact Info">'+
		'    	</div>' +
		'  </div>' +		
		' <div class="row" id="html_contact_info"></div>'+
		
		' <div class="row">'+
		'    <div class="col-sm-4">' +
		'      <label>Church Info</label>' +
		'    </div>' +
		'    <div class="col-sm-4">' +
		'		<select id = "add_church_btn">'+		
		'		</select>'+
		'    </div>'  +
		' </div>'+

		'  <div class="row">' +
		'		<div class="col-sm-4">' +
		'      	<label>Attendance Type</label>'+
		'    	</div>' +
		'		<div class="col-sm-4">' +
		'		<select id = "vol_type_id">'+
		'		<option value="1">Normal</option>'+
		'		<option value="2">Worker</option>'+
		'		<option value="3">Volunteer</option>'+
		'		</select>'+
		'    	</div>' +
		'		<div class="col-sm-4" id="html_att_type"> </div>'+
		'  </div>' +

		'  <div class="row">' +
		'    <div class="col-sm-4">' +
		'      <input type="button" value="Submit" class="btn_person_submit"/>' +
		'    </div>' +
		'  </div>' +
		'</div>'




var Person = function(family_id) {
		flag=0;
		this.id = null;

		this.first_name = "";
		this.last_name = "";
		this.dob = null;
		this.sex = null;


		this.container = null;
		this.html_node = $(TMPL_PERSON)[0];

		this.html_contact_info = null;
		this.add_contact_btn = null;

		this.html_add_airport = null;
		this.add_airport_btn = null;

		this.txt_first_name = null;
		this.txt_last_name = null;
		this.txt_sex = null;
		this.txt_dob = null;
		this.btn_submit = null;

		this.html_att_type = null;
		this.vol_type_id = null;

		this.add_church_btn = null;	
		

		this.html_add_special = null;
		this.add_transport_btn = null;	

		this.special_btn = null;
		this.transport_btn = null;

		this.html_transport = null;


		this.additional_submit = null;

		this.primary_contact = null;
		this.arrival_date = null;
		this.depature_date = null;
		
		this.airport_info_id = null;
		this.church_id = null;
		this.family_id = family_id;
		this.contact_info_id = null;
		this.att_type_id = null;

		this.airport = null;
		this.contact = null;
		this.att_type = null;
		this.church = null;



		this.container_for_appending_html_to_person = null;
		this.html_to_be_append_for_appending_person = null;
		this.to_be_populated_with_family = null;
		this.to_be_populated_with_person = null;
}


Person.prototype.all_in_one_submit = function(){		
		if ( this.airport != null && this.contact != null 
			 && this.att_type != null ){
			this.airport.submit();			
			this.contact.submit();											
			this.contact_info_id = this.contact.id;
			this.airport_info_id = this.airport.id;			
		//	this.att_type.submit();
			this.church_id = this.church.return_id();			
		}				
		else {
			return false;	
		}
}

Person.prototype.render = function(container) {
		this.container = container;				
		this.container.appendChild(this.html_node);	
		this.bind_inputs();				
}

Person.prototype.update_values_from_form = function() {
		if (this.container === null) {
				return false;	
		}

		this.first_name = this.txt_first_name.value;
		this.last_name = this.txt_last_name.value;
		this.sex = this.txt_sex.value;
		this.dob = this.txt_dob.value;
		this.att_type_id = this.vol_type_id.value;				
		return true;
}

Person.prototype.process_response = function(json) {
		this.first_name = json.first_name;
		this.last_name = json.last_name;
		this.sex = json.sex;
		this.dob = json.dob;
		this.id = json.id;		
		this.update_html_fields();
}

Person.prototype.update_html_fields = function() {
		this.txt_first_name = this.first_name;
		this.txt_last_name = this.last_name;
		this.txt_sex = this.sex;
		this.txt_dob = this.dob;
}

Person.prototype.submit = function() {				
		if (this.container === null) {
				return false;
		}		
		this.update_values_from_form();
		p = this;

		$.ajax({
				url: "/regmain/add_person/",
				data: {
						first_name: this.first_name,
						last_name : this.last_name,
						dob : this.dob,
						sex : this.sex,	
						contact_info_id : this.contact_info_id,
						family_id : this.family_id,
						church_id : this.church_id,
						att_type_id : this.att_type_id,
				},
				type: "POST",
				dataType: "json",
		}).done(function(json) {
				p.process_response(json);
		});		
		p.append_person_to_html();
}

Person.prototype.bind_inputs = function() {
		if (this.container === null) {
				return false;
		}

		this.txt_first_name = $(this.html_node).find(
				'input.txt_first_name')[0];
		this.txt_last_name = $(this.html_node).find(
				'input.txt_last_name')[0];
		this.txt_sex = $(this.html_node).find(
				'input.txt_sex')[0];
		this.txt_dob = $(this.html_node).find(
				'input.txt_dob')[0];		

		this.html_add_airport = $(this.html_node).find(
				'#html_add_airport')[0];
		this.add_airport_btn = $(this.html_node).find(
				'#add_airport_btn')[0];

		this.html_contact_info = $(this.html_node).find(
				'#html_contact_info')[0];
		this.add_contact_btn = $(this.html_node).find(
				'#add_contact_btn')[0];

		this.btn_submit = $(this.html_node).find(
				'input.btn_person_submit')[0];

		this.vol_type_id = $(this.html_node).find(
				'#vol_type_id')[0];
		this.html_att_type = $(this.html_node).find(
				'#html_att_type')[0];

		this.add_church_btn = $(this.html_node).find(
			    '#add_church_btn')[0];	

	
		

		this.additional_submit = $("#additional_submit")[0];


		
		this.add_transport_btn = $('#html_add_transport')[0];
		this.html_add_special = $('#html_add_special')[0];
		
		this.special_btn = $('#special_btn')[0];
		this.transport_btn = $('#transport_btn')[0];

		this.html_transport = $("#html_add_transport")[0];

		var p = this;	

		
		var add_special_fn = function(){p.special_request();}
		var add_transport_fn = function(){p.transport();}
		var add_airport_fn = function() { p.add_airport_html(); }
		var add_contact_fn = function() { p.add_contact_html(); }
		
		$(this.add_airport_btn).on("click", add_airport_fn);
		$(this.vol_type_id).on(
				"click",
				function() {
						if( p.vol_type_id.value == '1' ||
							 p.vol_type_id.value == '2'){
								if (flag_volunteer == 0) {								
									p.volunteer_type();
									flag_volunteer=1;
							}
						}
						//if(p.vol_type_id.value == 'Normal'){
						//		pass
						//}
				});
		$(this.btn_submit).on("click",function(){					
					p.all_in_one_submit();
					p.submit();
		});
		$(this.add_church_btn).on("click",function(){p.church_select();});
		$(this.add_contact_btn).on("click", add_contact_fn);
		$(this.special_btn).click(add_special_fn);		
		$(this.transport_btn).click(add_transport_fn);

		$(this.additional_submit).click(function(){p.additional_sub();});
}
	

Person.prototype.add_airport_html = function(){
		this.airport = new Airport();
		this.airport.render(this.html_add_airport);
}

Person.prototype.add_contact_html = function(){
		this.contact = new Contact();
		this.contact.render(this.html_contact_info); 	
}

Person.prototype.volunteer_type = function(){	
		this.att_type = new Attendance();
		this.att_type.render(this.html_att_type);
}

Person.prototype.church_select = function(){
		this.church = new Churches();				
	    this.church.initialize(this.add_church_btn);	        
}	


Person.prototype.special_request = function(){	
		pre_eve_map = new Mapping_person();
		pre_eve_map.render(this.html_add_special);
}

Person.prototype.transport = function(){
		trans = new Transport();
		trans.render(this.html_transport);
}

Person.prototype.additional_sub = function(){
		this.update_fields_additional();
		$.ajax({
				url: "/regmain/pre_eve_map/",
				data: {
						primary_contact: this.primary_contact,
						arrival_date : this.arrival_date,
						depature_date : this.depature_date,
						transport : this.transport.id,						
				},
				type: "POST",
				dataType: "json",
		});;	
} 


Person.prototype.update_fields_additional = function(){
		this.primary_contact = $("#primary_contact").value;
		this.arrival_date = $("arrival_date").value;
		this.depature_date = $('depature_date').value;
}





var person_html_to_append = '<div class = "container">'+
							'	<div class="row">'+
							'		<div class="col-sm-4">'+
							'			<ul id="to_be_populated_with_family">'+
							'			</ul>'+		
							'			<ul id="to_be_populated_with_person">'+
							'			</ul>'+						
							'		</div>'+
							'	</div>'+
							'</div>'



Person.prototype.append_of_family = function(fam){
		$.ajax({
			url : '/regmain/families/',
			dataType : 'json',
			type : 'GET',
		}).done(function(json){
				for (var i = 0; i < json.length; i++) {
					if ( family_id == json[i].id ){	
						var textnode = document.createTextNode("Family " + json[i].name); 							
						var ele = document.createElement("li");
						ele.appendChild(textnode);						
						fam.appendChild(ele);
						return;
					}
				}
		});		
}

Person.prototype.append_of_person = function(per){
		$.ajax({
			url : '/regmain/person_infos',
			dataType : 'json',
			type : 'GET',
		}).done(function(json){
				for (var i = 0; i < json.length; i++) {
					if ( family_id == json[i].family ) {
						var textnode = document.createTextNode("Person " + json[i].first_name);
						var ele = document.createElement("li");
						ele.appendChild(textnode);						
						per.appendChild(ele);						
					}
				}
		});		
}

Person.prototype.append_person_to_html = function(){
		this.container_for_appending_html_to_person = html_add_person_after_submit_container;
		this.html_to_be_append_for_appending_person = $(person_html_to_append)[0];		
		
		this.to_be_populated_with_family = $(this.html_to_be_append_for_appending_person).find(
											'#to_be_populated_with_family')[0];			
		this.to_be_populated_with_person = $(this.html_to_be_append_for_appending_person).find(
											'#to_be_populated_with_person')[0];	
		
		this.append_of_family(this.to_be_populated_with_family);
		this.append_of_person(this.to_be_populated_with_person);

		this.container_for_appending_html_to_person.appendChild(this.html_to_be_append_for_appending_person);
}