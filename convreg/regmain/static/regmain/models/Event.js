var person_list=[];

var event_hmtl_node = 	''+
					  	'<div class="container" >' +
						' <div class="row" id="my_form_person">'+
						'    <div class="col-sm-4">' +
						'      <label>Event List</label>' +
						'    </div>' +
						'    <div class="col-sm-4">' +
						'		<select class="form-control" id = "select_event_list">'+		
						'		</select>'+
						'    </div>'  +
						' </div>'+
					  	'</div>'



var Event = function(){
		this.id = null;
		this.container = null;
		this.html_node = $(event_hmtl_node);

		this.event_name = null;		
		this.event_location = null;

		this.select_event_list = null;
		this.add_event_submit = null;

}


Event.prototype.render = function(container){
		this.container = container;
		$(this.container).append(this.html_node);
		this.bind_input(); 
}


Event.prototype.bind_input = function(){				
		this.select_event_list = $(this.html_node).find("#select_event_list")[0];
		$.ajax({
				url : '/regmain/events/',
				type : 'GET',
				dataType : 'json',				
		}).done(function(json){
				for (var i = 0; i < json.length; i++) {
						var str = json[i].name + " - " + json[i].location;
						var option = document.createElement('option');
						option.textContent = str;
						option.value=json[i].id;
						option.setAttribute('id',json[i].name+"_"+json[i].id);
						$("#select_event_list").append(option);
				}
		});
}





/**

		
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
						$.ajax({
								url : '/regmain/events/',
								data : 'GET',
								datatype : 'json',
						}).done(function(json){
								for (var i = 0; i < json.length; i++) {
										var select = document.createElement('select');
										var ele_drop = document.createElement('option');
										ele_drop.textContent = json[i].name;			
										$(select).append(ele_drop);
										$(ele_div).append(select);			
										$(ele_div).append(ele);			
								}
						});																						
						$("#create_div_event").append(ele_div);		
			}
		});


		**/
