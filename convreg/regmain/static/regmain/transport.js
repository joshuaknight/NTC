var TML_TRANSPORT = ''+
		'<div class="container"'+
			'<div class="row">'+
			'<div class="row">'+
			'	<div class="col-sm-4">'+
			'		<label>Transport Type</label>'+
			'	</div>'+
			'	<div class="col-sm-4">'+
			'		<input type="text" name="transport_type" id="transport_type_id">'+
			'	</div>'+
			'</div>'+		
			'<div class="row">'+
			'	<div class="col-sm-4">'+
			'		<label>Comment </label>'+
			'	</div>'+
			'	<div class="col-sm-4">'+
			' 	<textarea id="comments_id" rows="4" cols="50"></textarea>'+
			'   <input type="submit" value="Add Transport" id="submit_btn">'+
			'	</div>'+
			'</div>'+						
			'</div>'+
		'</div>'



var Transport = function(){
		this.id = null;

		this.transport_type = null;
		this.airport_info = null;
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
				'#submit_btn')[0];
		var p = this;
		$(this.submit_btn).click(function(){p.submit();});
}

Transport.prototype.submit = function(){
		if ( this.container == null){
			return false;
		}
		this.update_form_field();
		$.ajax({
					url: "/regmain/add_transport/",
					data: {
							transport_type : this.transport_type,
	//						airport_info : this.airport_info,
							comments : this.comments,
					},
					type: "POST",
					dataType: "json",
			}).done(function(json) {
					p.process_response(json);
		});
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
}