var TML_TRANSPORT = ''+
		'<div class="container" id="transport_type_main_container">'+
			'<div class="row" id="my_transport_container">'+
			'	<div class="row">'+
			'		<div class="col-sm-4">'+
			'			<label>Transport Type</label>'+
			'		</div>'+
			'		<div class="col-sm-4">'+
			'			<select class="form-control" id="transport_type_id">'+
			'			<option>Airway</option>'+
			'			</select>'+	
			'		</div>'+				
			'		<div class="col-sm-4" id="error_for_transport_type"> </div>'+		
			'	</div>'+					

			'	<div class="row">'+
			'		<div class="col-sm-4">'+
			'			<label>Comment </label>'+
			'		</div>'+
			'		<div class="col-sm-4">'+
			' 			<textarea id="comments_id" class="form-control" rows="4" cols="50"></textarea>'+
			'		</div>'+			
			' 		<div class="col-sm-4" id="error_for_transport_comments"> </div>'+			
			'	</div>'+			

			'   	<input type="submit" class="btn btn-primary" value="Add Transport" id="submit_btn_transport" >'+
			
			'	<div class="col-sm-4" id="error_for_transport"></div>'+						
			
			'</div>'+			
		'</div>'



var Transport = function(){	
		this.id = null;

		this.transport_type = null;
		this.airport_info = 0;
		this.comments = null;
		
		this.transport_type_id = null;
		this.airport_info_id = null;
		this.comments_id = null;

		this.container = null;
		this.html_node = $(TML_TRANSPORT)[0];

		this.submit_btn = null;
}


Transport.prototype.render = function(container){
	this.container = container;
	this.container.appendChild(this.html_node);
	this.bind_input();	
}

Transport.prototype.bind_input = function(){
		if ( this.container == null){
			return false;
		}
		this.transport_type_id = $(this.html_node).find(
				'#transport_type_id')[0];
		//this.airport_info_id = $(this.html_node).find(
	//			'#')[0];
		this.comments_id = $(this.html_node).find(
				'#comments_id')[0];
		this.submit_btn = $(this.html_node).find(
				'#submit_btn_transport')[0];
		var p = this;
		$(this.submit_btn).click(function(){p.submit();});
}


Transport.prototype.submit = function(){


		if ( this.container == null ){
			return false;
		}

		this.update_form_field();

		this.airport_info = airport_id;

		var p = this;
		var error_for_transport = $("#error_for_transport")[0];
		var error_for_transport_type = $("#error_for_transport_type")[0];
		var error_for_transport_comments = $("#error_for_transport_comments")[0];
		var transport_type_bool = 0;
		var transport_comments_bool = 0;

		error_for_transport.style.color = "red"
		error_for_transport_type.style.color = "red"	
		error_for_transport_comments.style.color = "red"

				
	

		if ( this.transport_type != "" && this.comments != "" ) {
			error_for_transport.innerHTML = ""
			
			if ( this.transport_type.length < 3 ||
						!/^[a-zA-Z ]+$/.test(this.transport_type)) {												
				error_for_transport_type.innerHTML = this.transport_type + "is not valid";
				transport_type_bool=0;				
			}				
			else { 
					error_for_transport_type.innerHTML = "";				
					transport_type_bool=1;
			}
			if ( this.comments.match(/\S+/g).length < 10) {
					error_for_transport_comments.innerHTML = "Not Valid";					
					transport_comments_bool=0;
			}
			else{
					error_for_transport_comments.innerHTML = "";
					transport_comments_bool=1;
			}
		}	

		else {				
				error_for_transport.innerHTML = "You need to input data first";
		}



		var ajax_request = function(){
				$.ajax({
						url: "/regmain/add_transport/",
						data: {
								transport_type : p.transport_type,
								airport_info : airport_id,
								comments : p.comments,
						},
						type: "POST",
						dataType: "json",
				}).done(function(json) {
						transport_id = json.id;						
						p.process_response(json);
			});					
		}	

		if ( transport_type_bool && transport_comments_bool ) ajax_request();
}

Transport.prototype.update_form_field = function(){
		this.transport_type = this.transport_type_id.value;
		//this.airport_info = this.airport_info_id.value;
		this.comments = this.comments_id.value;
}

Transport.prototype.process_response = function(json){
		this.id = json.id;
		this.transport_type = json.transport_type;
		//this.airport_info = json.airport_info;
		this.comments = json.comments;
		this.update_html_fields();
}

Transport.prototype.update_html_fields = function(){
		this.transport_type_id = this.transport_type;
		//this.airport_info_id = this.airport_info;
		this.comments_id  = this.comments;
		register_event();
}

var register_event = function(){
		$("#transport_type_main_container").html('');
		final_ele();
}


