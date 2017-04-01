var person_list=[];

var event_hmtl_node = ''+
					  '<div class="container" >' +
					  '<div class="row" id="create_div_event" >' +
					  '<input type="button" class="btn btn-success" id="add_event_submit" value="Add Event">'+			  					  
					  '</div>'



var Event = function(){
		this.id = null;
		this.container = null;
		this.html_node = $(event_hmtl_node);

		this.event_name = null;
		this.event_start_date = null;
		this.event_end_date = null;
		this.event_location = null;

		this.add_event_submit = null;

}


Event.prototype.render = function(container){
		this.container = container;
		$(this.container).append(this.html_node);
		this.bind_input(); 
}


Event.prototype.bind_input = function(){		

		this.add_event_submit = $(this.html_node).find("#add_event_submit")[0];

		$.ajax({
				url : '/regmain/family_person_list/'+txt_family_name.value,
				type : 'GET',
				datatype : 'json',
		}).done(function(json){																									
				var size = Object.keys(json).length;																						
				for (var i = 1; i < size ; i++){			

						var ele_div = document.createElement('div');
						var ele = document.createElement('h5');		

						ele.setAttribute('id',json['id']);
						ele_div.setAttribute('class','col-md-9');
						ele.setAttribute('name',json['first_name']);

						person_list[i] = json['id'];
						ele.innerHTML = "Person"+"-"+json['first_name'];					
						$(ele_div).append(ele);						
						$.ajax({
								url : '/regmain/events/',
								data : 'GET',
								datatype : 'json',
						}).done(function(json){
								for (var i = 0; i < json.length; i++) {
										var ele_drop = document.createElement('option');
										ele_drop.textContent = json[i].name;			
										$(ele_div).append(ele_drop);			
								}
						});												
						$("#create_div_event").append(ele_div);						
						
			}
		});

		console.log(person_list);
		// get list of persons added to a family using family_id 
		// add them in a way with event drop down in thier right 
		// add a Register Button 
		// after which it refreshes the page to welcome message 
		$(this.add_event_submit).on("click",this.submit);
}

Event.prototype.submit = function(){
		$.ajax({
				url : '/regmain/person_event_maps/',
				type : 'POST',
				data : {
						person : person_id,
						event : event_id,						
						arrival	: arrival_date,
						departure : departure_date,
						special_request : special_request_id,
						transportation : transport_id,
				}
		}).done(function(){
				final_ele();
		});
}