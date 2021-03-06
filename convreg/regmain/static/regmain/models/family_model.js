
var already_added = 0;


var htfp='<div class="container">'+		 
		 '<div class="row">'+
		 '	<div class="input-group" id="family_input_block">'+
		 '		<input type="button" value="Add Person Info" id="btn_add_person_html" class="btn btn-primary" >'+		 
		 '</div>'+		 
		 '</div>'


var Family = function(){
		this.id = null;

		this.html_person = $(htfp)[0];

		this.airport_btn = null;

		this.container = null;

		this.airport=null;
		this.person=null;
		this.contact=null;


		this.msg="";

		this.special_request_message = "";
}


Family.prototype.render = function(container){
		this.container = container;		
		this.submit();
}

Family.prototype.validate = function(){
		if ( txt_family_name.value == "" ||
					txt_family_name.value.length <= 3 ){
			this.msg = "Family Name should be Utleast 4 in length"
			this.msg_append("red");
			return false;
		} 

		else{			
			return true;
		}
}

Family.prototype.msg_append = function(x){
		var family_message_container = $("#family_report_message")[0];
		family_message_container.innerHTML = "";
		var ele = document.createElement('p');
		ele.style.color=x;
		ele.innerHTML = this.msg;
		family_message_container.appendChild(ele);
}


Family.prototype.submit = function(){				

		var p = this;		

		//if ( this.already_exsist() ){
		//	this.msg = "Your Family Name " + txt_family_name.value +  " is already Created";			
		//	this.msg_append();	
		//	return;
		//}

		if ( this.validate() && 
				already_added == 0 && /^[a-zA-Z ]+$/.test($("#txt_family_name")[0].value ) ){
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
			$(sel_btn_add_person_html).on("click", function(){								
					p.add_person_html(family_id)										
				});
			this.airport_btn = $(this.html_person).find("#add_btn_airport")[0];			
			this.add_btn_contact = $(this.html_person).find("#add_btn_contact")[0];
							

			this.msg = "Successfully Created Family " + txt_family_name.value;
			this.msg_append("green");

			if ( ele_of_contact_is_valid && ele_of_airport_is_valid){
					$("#btn_add_person_html")[0].style.visibility = "hidden";
			}
			p.add_contact_html();
		}

		else if ( !/^[a-zA-Z ]+$/.test($("#txt_family_name")[0].value) ) {
				this.msg = "Family Name should Contain only Alphabets";
				this.msg_append("red");

		}
}



var finish_submit = function(){								    							        					
    	$("#main_container_all").html('');
    	$("#additional")[0].style.visibility = 'visible';
		after_final_submit()		
			
}



var after_final_submit = function(){
		

		var from_arrival = $("#from_arrival_date")[0];
		var to_arrival =$("#to_depature_date")[0];
		var submit_arrival = $("#submit_arrival_and_departure")[0];
		var error_arrival_and_departure	=  $("#error_arrival_and_departure")[0]

		var check_for_validity = function(){
				if ( from_arrival.value != "" &&
					 	 to_arrival.value != "" ) return true;
				else return false;
		}

		$(submit_arrival).on("click",function(){
				if ( check_for_validity() ) 
				{ 
						x = new Date(from_arrival.value);						
						var from_year = x.getFullYear();
						var from_month = x.getMonth() + 1;
						var from_day = x.getDate();

						y = new Date(to_arrival.value);
						var to_year = y.getFullYear();
						var to_month = y.getMonth() + 1;
						var to_day = y.getDate();

						error_arrival_and_departure.innerHTML = "";
						if ( from_year == to_year ) {

								error_arrival_and_departure.innerHTML = "";
								
								if ( from_month <= to_month ){
										error_arrival_and_departure.innerHTML = "";		
										if ( from_day < to_day ){
												error_arrival_and_departure.innerHTML = ""
												$("#additional")[0].style.visibility="hidden";
												add_airport_html();
												$("html_add_airport").html('');
												swal({title: "Do you have a special Request",													 
													 type: "input",
													 cancelButtonText:'skip',
													 showCancelButton: true,
													 closeOnConfirm: false,
													 animation: "slide-from-top",
													 inputPlaceholder: "Your Special Request" 
												},function(inputValue)
												{   
													p.special_request_message = inputValue;													
													if (inputValue === false) return false; 
													if (inputValue === "") { 
														swal.showInputError("You need to write something!");
														     return false   
														 }      	
													if (inputValue != ""){
															$.ajax({
																url : '/regmain/add_special_request/',
																data : {
																	name : txt_family_name.value,
																	desc : inputValue,
																},
																type : 'POST',
																dataType : 'json',
															}).done(function(json){
																	special_request_id = json.id;
															});
													}				 
													swal("ThankYou!", "You wrote: " + inputValue, "success"); });													
													//make an ajax call to save special request message													
										}
										else{
											msg = "Arrival day cant be lesser than Departure day"
											error_arrival_and_departure.innerHTML = msg;
										}
								}	
								else{
										msg = "Arrival Month cant be lesser than Departure Month"
										error_arrival_and_departure.innerHTML = msg;
								}

						}	
						else { 
								msg = "Arrival year and Departure year can't be different";
								error_arrival_and_departure.innerHTML = msg
						}
				}
				else {
						msg = "Enter the Arrival and Departure Date";
						error_arrival_and_departure.innerHTML = msg
				}
		});		
}



Family.prototype.all_in_one_submit = function(){
		
		if ( this.contact == undefined ){
			alert("You Need to add Contact info before you can continue");
			return false;
		}

		

		//airport.submit();				
		this.contact.submit();				

		//airport_id = this.airport.id;		
}


var add_airport_html = function(){
		var container = html_add_airport;
		this.airport = new Airport()
		this.airport.render(container);	
    	$("html, body").animate({ scrollTop: $("#html_add_airport")[0].scrollHeight}, 1000);
}

Family.prototype.add_contact_html = function(){
		var container = html_add_contact;
		this.contact = new Contact();
		this.contact.render(container);
    	$("html, body").animate({ scrollTop: $("#html_add_contact")[0].scrollHeight}, 1000);
}


var add_person_html = function(family_id) {					
		flag_volunteer = 0;				
		this.person = new Person();
		this.person.render(html_add_person_sec);
		this.person.church_select();			
		$("html, body").animate({ scrollTop: $("#html_add_person_sec")[0].scrollHeight}, 1000);
}





