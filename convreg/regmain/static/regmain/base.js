var sel_btn_family_name = "input#btn_family_name";
var sel_txt_family_name = "input#txt_family_name";
var sel_btn_add_person_html = "input#btn_add_person_html";
var sel_html_add_person_sec = "#html_add_person_sec";
var sel_html_person_info_sec = "#html_person_info_sec";
var sel_add_airport_btn = "#add_airport_btn";
var sel_html_add_airport = "#html_add_airport"; 
var sel_html_add_contact = "#html_add_contact";
var sel_add_contact_btn = "#add_contact_btn";


var html_add_contact = $(sel_html_add_contact)[0];	
var html_add_airport = $(sel_html_add_airport)[0];
var add_airport_btn = $(sel_add_airport_btn)[0];
var txt_family_name = $(sel_txt_family_name)[0];
var btn_family_name = $(sel_btn_family_name)[0];
var btn_add_person_html = $(sel_btn_add_person_html)[0];
var html_add_person_sec = $(sel_html_add_person_sec)[0];
var html_person_info_sec = $(sel_html_person_info_sec)[0];


var family_id = -1;
var person_list = [];



function do_onload() {			
		$(sel_btn_family_name).on("click", add_family_submit);
		$(sel_btn_add_person_html).on("click", add_person_html);
}

function add_person_html() {		
		person = new Person(family_id);
		person.render(html_add_person_sec);
}


function add_family_submit(event) {
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
}

do_onload();
