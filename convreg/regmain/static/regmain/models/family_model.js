
var already_added = 0;
var contact_id = 0;
var airport_id = 0;


var htfp='<div class="container">'+		 
		 '<div class="row">'+
		 '	<div class="input-group" id="family_input_block">'+
		 '		<input type="button" value="Add Person Info" id="btn_add_person_html" class="btn btn-primary" >'+
		 '		<input type="button" value="Add Airport Info" id="add_btn_airport" class="btn btn-primary" />'+		 
		 '		<input type="button" value="Add Contact Info" id="add_btn_contact" class="btn btn-primary" />'+		 
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
			
			$(this.airport_btn).on("click",function(){
					$("#add_btn_airport")[0].style.visibility = "hidden";
					$("#add_btn_airport").button("destroy");										
					p.add_airport_html();
			});

			$(this.add_btn_contact).on("click",function(){
					$("#add_btn_contact")[0].style.visibility = "hidden";
					$("#add_btn_contact").button("destroy");					
					p.add_contact_html();
			});

			this.msg = "Successfully Created Family " + txt_family_name.value;
			this.msg_append("green");

			if ( ele_of_contact_is_valid && ele_of_airport_is_valid){
					$("#btn_add_person_html")[0].style.visibility = "hidden";
			}
		}

		else if ( !/^[a-zA-Z ]+$/.test($("#txt_family_name")[0].value) ) {
				this.msg = "Family Name should Contain only Alphabets";
				this.msg_append("red");

		}

		
		$("#finish_submit_btn").on("click",function(){				
				p.all_in_one_submit();
				$("#main_container_all").html('');
				$("#additional")[0].style.visibility = 'visible';
		});
}


Family.prototype.all_in_one_submit = function(){
		if ( this.airport == undefined ){
			alert("You Need to add airport info before you can continue");
			return false;
		}
		if ( this.contact == undefined ){
			alert("You Need to add Contact info before you can continue");
			return false;
		}

		if ( this.person == undefined ){
			alert("You need to add Person Info Before Youai can continue");
		}

		this.airport.submit();				
		this.contact.submit();
		contact_id = this.contact.id;
		airport_id = this.airport.id;
		this.person.submit();
}


Family.prototype.add_airport_html = function(){
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


Family.prototype.add_person_html = function(family_id) {			
		$("#html_add_person_parent").append(html_add_person_sec);
		flag_volunteer = 0;				
		this.person = new Person(family_id);
		this.person.render(html_add_person_sec);
		this.person.church_select();			
		$("html, body").animate({ scrollTop: $("#html_add_person_sec")[0].scrollHeight}, 1000);
}