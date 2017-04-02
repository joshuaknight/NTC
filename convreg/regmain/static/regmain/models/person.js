// Person model
var person_id = null;



var TMPL_PERSON = '' +
		'<div class="container" id="the_person_container">' +
		'  <div class="row" id="my_form_person">' +
		'    <div class="col-sm-4">' +
		'      <label>First Name</label>' +
		'    </div>' +
		'    <div class="col-sm-4">' +
		'      <input type="text" placeholder="First name" name="txt_first_name" ' +
		'             id="txt_first_name" class="form-control" />' +
		'    </div>' +
		'	  <div id="error_message_first_name"> </div>'+
		'  </div>' +

		'  <div class="row" id="my_form_person">' +
		'    <div class="col-sm-4">' +
		'      <label>Last Name</label>' +
		'    </div>' +
		'    <div class="col-sm-4">' +
		'      <input type="text" name="txt_last_name" ' +
		'             id="txt_last_name" class="form-control" placeholder="Last name" />' +
		'    </div>' +
		'	  <div id="error_message_last_name"> </div>'+
		'  </div>' +

		'  <div class="row" id="my_form_person">' +
		'    <div class="col-sm-4">' +
		'      <label>Gender</label>' +
		'    </div>' +
		'    <div id="txt_sex" class="radio">' +		
		'	<label> <input 	type="radio" name="sex" id="1" value="male">Male </label>'+
		'	<label> <input  type="radio" name="sex" id="2" value="female">Female</label>'+
		'	<label> <input  type="radio" name="sex" id="3" value="transgender">Transgender</label>'+		
		'	  <div id="error_message_sex"> </div>'+
		'    </div>' +		
		'  </div>' +

		'  <div class="row" id="my_form_person">' +
		'    <div class="col-sm-4">' +
		'      <label>Date of Birth</label>' +
		'    </div>' +
		'    <div class="col-sm-4">' +
		'      <input type="date"  class="form-control" name="txt_dob" ' +
		'             id="txt_dob" />' +
		'    </div>' +
		'	  <div id="error_message_dob"> </div>'+
		'  </div>' +		

		' <div class="row" id="my_form_person">'+
		'    <div class="col-sm-4">' +
		'      <label>Church Info</label>' +
		'    </div>' +
		'    <div class="col-sm-4">' +
		'		<select class="form-control" id = "add_church_btn">'+		
		'		</select>'+
		'    </div>'  +
		' </div>'+

		'  <div class="row" id="my_form_person">' +
		'		<div class="col-sm-4">' +
		'      	<label>Attendance Type</label>'+
		'    	</div>' +
		'		<div class="col-sm-4">' +
		'		<select id = "vol_type_id" class="form-control">'+
		'		<option value="1">Normal</option>'+
		'		<option value="2">Worker</option>'+
		'		<option value="3">Volunteer</option>'+
		'		</select>'+
		'    	</div>' +
		'		<div class="col-sm-4" id="html_att_type"> </div>'+
		'  </div>' +

		'  <div class="row">' +
		'    <div class="col-sm-4">' +
		'      <input type="button" value="Submit Person" class="btn btn-success" id="btn_person_submit"/>' +
		'    </div>' +
		'  </div>' +
		'</div>'





var Person = function() {
		flag=0;
		this.id = null;

		this.first_name = "";
		this.last_name = "";
		this.dob = null;
		this.sex = null;


		this.container = null;
		this.html_node = $(TMPL_PERSON)[0];


		this.txt_first_name = null;
		this.txt_last_name = null;
		this.txt_sex = null;
		this.txt_dob = null;
		this.btn_submit = null;

		this.html_att_type = null;
		this.vol_type_id = null;

		this.add_church_btn = null;	
		
		
		this.church_id = null;
		this.family_id = family_id;
		this.contact_info_id = null;
		this.att_type_id = null;

		this.contact = null;
		this.att_type = null;
		this.church = null;

		this.sex_1 = null;
		this.sex_2 = null;
		this.sex_3 =  null;

		this.container_for_appending_html_to_person = null;
		this.html_to_be_append_for_appending_person = null;
		this.to_be_populated_with_family = null;
		this.to_be_populated_with_person = null;
}


Person.prototype.render = function(container) {
		this.container = container;				
		this.container.appendChild(this.html_node);	
		this.bind_inputs();				
}



Person.prototype.submit = function(contact_info_id) {	
					
		this.church_id = this.church.return_id();

		if (this.container === null) {
				return false;
		}

		this.first_name = this.txt_first_name.value;
		this.last_name = this.txt_last_name.value;		
		this.dob = this.txt_dob.value;
		this.att_type_id = this.vol_type_id.value;		
		
		if ( this.sex_1.checked ){			
				this.sex = this.sex_1.value;
				console.log(this.sex_1);
		}

		if ( this.sex_2.checked ){
				this.sex = this.sex_2.value;
		}

		if ( this.sex_3.checked ){
				this.sex = this.sex_3.value;
		}
		
		
		p = this;

		$.ajax({
				url: "/regmain/add_person/",
				data: {
						first_name: this.first_name,
						last_name : this.last_name,
						dob : this.dob,
						sex : this.sex,	
						contact_info_id : contact_id,
						family_id : this.family_id,
						church_id : this.church_id,
						att_type_id : this.att_type_id,
				},
				type: "POST",
				dataType: "json",
		})
		//p.append_person_to_html();
}

Person.prototype.bind_inputs = function() {
		if (this.container === null) {
				return false;
		}

		this.txt_first_name = $(this.html_node).find(
				'#txt_first_name')[0];
		this.txt_last_name = $(this.html_node).find(
				'#txt_last_name')[0];
		this.txt_sex = $(this.html_node).find(
				'#txt_sex')[0];

		this.sex_1 = $(this.html_node).find(
				'#1')[0];

		this.sex_2 = $(this.html_node).find(
				'#2')[0];

		this.sex_3 = $(this.html_node).find(
				'#3')[0];

		this.txt_dob = $(this.html_node).find(
				'#txt_dob')[0];		


		this.btn_submit = $(this.html_node).find(
				'#btn_person_submit')[0];

		this.vol_type_id = $(this.html_node).find(
				'#vol_type_id')[0];
		this.html_att_type = $(this.html_node).find(
				'#html_att_type')[0];

		this.add_church_btn = $(this.html_node).find(
			    '#add_church_btn')[0];	

		
		this.add_transport_btn = $('#html_add_transport')[0];
		
		

		var p = this;	


		p.call_me_after_person_input();

}


Person.prototype.volunteer_type = function(){	
		this.att_type = new Attendance();
		this.att_type.render(this.html_att_type);
}

Person.prototype.church_select = function(){
		this.church = new Churches();				
	    this.church.initialize(this.add_church_btn);	        
}	





var person_html_to_append = '<div class = "container">'+
							'	<div class="row">'+
							'		<div class="col-sm-4">'+
							'			<ul id="to_be_populated_with_family"> </ul>'+		
							'			<ul id="to_be_populated_with_person"> </ul>'+						
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
						var textnode = document.createTextNode("Family - " + json[i].name); 							
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
			url : '/regmain/person/',
			dataType : 'json',
			type : 'GET',
		}).done(function(json){
				for (var i = 0; i < json.length; i++) {				
					if ( family_id == json[i].family ) {
						var textnode = document.createTextNode("Person - " + json[i].first_name);
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




Person.prototype.call_me_after_person_input = function(){
		var p = this;
		var my_flag = 0;
		var have_error_first_name=true;
		var have_error_last_name=true;
		var have_error_dob_name=true;
		var have_error_sex = true;
		
		$("#txt_first_name").change(function(){	
				var ele = $(p.html_node).find("#error_message_first_name")[0];
				if ( $("#txt_first_name")[0].value.length < 3 || 
						!/^[a-zA-Z ]+$/.test($("#txt_first_name")[0].value) ){											
					ele.style.color = "red";				
					ele.innerHTML = p.txt_first_name.value + " is not a valid name";					
					have_error_first_name = false;
				}				
				else {
					ele.innerHTML="";	
					have_error_first_name=true;				
				}							
		});
		
		$("#txt_last_name").change(function(){	
				var ele = $(p.html_node).find("#error_message_last_name")[0];
				if ( $("#txt_last_name")[0].value.length < 3 || 
						!/^[a-zA-Z ]+$/.test($("#txt_last_name")[0].value) ){											
					ele.style.color = "red";				
					ele.innerHTML = p.txt_last_name.value + " is not a valid name";
					have_error_last_name = false;
				}				
				else {
					ele.innerHTML="";
					have_error_last_name = true;
				}							
		});
		
		$("#txt_dob").change(function(){		
				var ele_sex = $("#error_message_sex")[0];
				if ( !$("#1")[0].checked  && !$("#2")[0].checked && !$("#3")[0].checked ){									
						ele_sex.style.color = "red";
						ele_sex.innerHTML = "Select a Gender";									
						have_error_sex = false;
				}
				
				$("#txt_sex").change(function(){
					ele_sex.innerHTML = "";		
					have_error_sex = true;								
				})		
								

				var ele = $(p.html_node).find("#error_message_dob")[0];
				ele.style.color = "red";						
				var x = new Date($("#txt_dob")[0].value);
				var year = x.getFullYear();
				if ( year >= 2016 || year < 1930 ){						
					ele.innerHTML = p.txt_dob.value + " is not a valid DOB";
					have_error_dob_name = false;
				}
				else{
					ele.innerHTML="";
					have_error_dob_name = true;
				}

		});		
				

		$("#vol_type_id").change(function(){				
				if ( $("#vol_type_id")[0].value == '2' ||
						$("#vol_type_id")[0].value == '3') {						
						$("#html_att_type")[0].style.visibility = "visible";
						if ( flag_volunteer == 0 ){
							p.volunteer_type();							
							flag_volunteer=1;
							return;
					}
				} 	
				else if ( $("#vol_type_id")[0].value == '1' ){
						$("#html_att_type")[0].style.visibility = "hidden";						
				}
						

		
			if ( my_flag == 0 &&  
				 check_for_validity() && 											
				  	$("#txt_dob")[0].value != "" && 
					$("#txt_first_name")[0].value != "" && 
					$("#txt_last_name")[0].value != ""  &&
					( $("#1")[0].value != "" || $("#2")[0].value  != ""  || $("#3")[0].value != ""  ) &&
					$("#vol_type_id")[0].value != "" &&
					$("#add_church_btn")[0].value != ""  )				
				{ 

					my_append();
				}

			else {
					if ( !have_error_first_name ){
						$("#txt_first_name").change(function(){
							if ( check_for_validity() ) {								
								my_append();
							}
						});
					}

					if ( !have_error_last_name ){
						$("#txt_last_name").change(function(){
							if ( check_for_validity() ) {								
								my_append();
							}
						});
					}

					if ( !have_error_dob_name ){
						$("#txt_dob").change(function(){
							if ( check_for_validity() ) {								
								my_append();
							}
						});
					}

					if ( !have_error_sex ){
						$("#txt_sex").change(function(){
							if ( check_for_validity() ) {								
								my_append();
							}
						});
					}
			}				

		});
			var check_for_validity = function(){
					if ( have_error_first_name &&
							have_error_last_name &&
								have_error_dob_name &&
										have_error_sex ) {
						return true;
					}
					else return false;
			}

			var my_append = function(){
					//$("#finish_submit_btn_div")[0].style.visibility = "visible";
					$("#btn_person_submit").on("click",function(){
							my_flag = 1;
							console.log("asfas");
							if ( check_for_validity() ) {
								p.submit();
								p.new_person();
								delete p 
							}							
					});										
					
					//$("html, body").animate({ scrollTop: $("#family_input_block")[0].scrollHeight}, 1000);
			}
		
		$("#btn_person_submit").on("click",function(){
				my_flag = 1;
				console.log("asfas");
				if ( check_for_validity() ) {
					p.submit();
					p.new_person();					
			}				
		});

}


Person.prototype.new_person = function(){
		
		swal({   title: "Do you want to add another Family Member?",   
				 text : "Press Yes or No",
				 type: "info",
				 showCancelButton: true,
				 confirmButtonText: "Yes, Add!",
				 cancelButtonText: "No, Continue Further",
				 closeOnConfirm: false,   closeOnCancel: false 
				}, 
				function(isConfirm){ 
					if (isConfirm) {     
						$("#html_add_person_sec").html('');
						add_person_html();
						swal("Cool", "Thank you", "success");   
					} 
					else {
						 $("#html_add_person_sec").html('');
						 add_airport_html();
					     swal("Cancelled", "Continuing Form:)", "success");   
					 } 
			});
}





// if all is valid enable the continue button 

// after the continue button is clicked finish_submit_btn 

// function call if_all_are_valid();

// empty the main_container_all $("#main_container_all").html('');

// append new container with following message 

/*
	Welcome FamilyName, We are happy to see that you have registered to attend the 
	event held on this particular date please continue your registration by filling 
	the below details Thank you Have a Wonderfull Day !
*/

// append new form with arrival and departure date event selection etc 

// Once the form is filled Finish Registration Button send the confirmation mail with the following message 

/*

	We are pleased to inform you that the registration was  successfull, a person from our side will
	contact you, and also if you have any queries you can contact us via email or by using the contact form
	in our website, You can also edit your profile anytime  by loggin in with the userid and password provided 
	below Once again have a wonderfull day

	#CaseSensitive
	Userid   : familynameprimarypersonname,
	password : familynameprimarypersonname,

	Thank You

*/

var final_ele = function(){


	var user_id = txt_family_name.value 
	var password = txt_family_name.value  

	var txt_h = "Welcome '" + 
			   txt_family_name.value +
			   "' We are pleased to inform you that the registration was  successfull,"

	var txt_p = "A person from our side will "+
			    "contact you, and also if you have any queries you can contact us via email or by using the contact form "+
			    "in our website"+
			    " Thank You "			   

	var ele_h=document.createElement('h3');
	var ele_p=document.createElement('p');
	ele_h.innerHTML = txt_h;
	ele_h.setAttribute('id','ele_header_thankyou');
	ele_p.setAttribute('id','ele_para_thankyou');
	ele_p.innerHTML = txt_p;
	$("#add_personal_note").append(ele_h);			   
	$("#add_personal_note").append(ele_p);			   
}










/*
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
*/


/*
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
*/