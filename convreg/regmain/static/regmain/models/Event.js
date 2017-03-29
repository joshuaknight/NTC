var event_hmtl_node = ''+
					  '<div>'



var Event = function(){
		this.id = null;
		this.container = null;
		this.html_node = $(event_hmtl_node);

		this.event_name = null;
		this.event_start_date = null;
		this.event_end_date = null;
		this.event_location = null;

}


Event.prototype.render = function(container){
		this.container = container;
		$(this.container).append(this.html_node);
		this.bind_input(); 
}


Event.prototype.bind_input = function(){
		this.event_name = $(this.html_node).find("#event_name")[0];
		this.event_start_date = $(this.html_node).find("#event_start_date")[0];
		this.event_end_date = $(this.html_node).find("#event_end_date")[0]
		this.event_location = $(this.html_node).find("#event_location")[0]
}