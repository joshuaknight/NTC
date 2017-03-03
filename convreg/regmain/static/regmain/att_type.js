var Att_Type = function(){
		this.id = null;
		this.att_type = null;
}

var Att_Types = function(){
		this.att = [];
}

Att_Types.prototype.initialize = function() {
		this.get_all();
};

Att_Types.prototype.get_all = function(){
		att = this;
		$.ajax({
				url: "/regmain/attendance/",
				type: "GET",
				dataType: "json"
		}).done(function(json) {
				this.att = att.process_all_response(json)
		});	
};

Att_Types.prototype.process_all_response() = function(json){
		temp_arr = [];
		for(i=0; i<json.length; i++) {
				att = new Att_Type();
				att.id = json[i].id;
				att.att_type = json[i].att_type;
				tmp_arr.push(att);
			}
			return tmp_arr;
};