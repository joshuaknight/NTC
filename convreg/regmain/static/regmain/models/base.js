var sel_btn_family_name = "input#btn_family_name";
var sel_txt_family_name = "input#txt_family_name";

var sear_btn_family = "input#btn_rock_family_name";
var sear_txt_family = "input#txt_rock_family_name";

var sel_btn_add_person_html = "input#btn_add_person_html";
var sel_html_add_person_sec = "#html_add_person_sec";
var sel_html_person_info_sec = "#html_person_info_sec";

var sel_add_airport_btn = "#add_airport_btn";
var sel_html_add_airport = "#html_add_airport"; 
var sel_html_add_contact = "#html_add_contact";

var person_container = "#add_person_html_impt";

var add_person_after_submit = "#add_person_after_submit";

var searched_family_list = "#searched_family_list";

var sel_add_contact_btn = "#add_contact_btn";

var searched_family_success_person_add = "#searched_family_success_person_add";

var html_searched_family_list = $(searched_family_list)[0];

var html_add_contact = $(sel_html_add_contact)[0];	

var html_add_airport = $(sel_html_add_airport)[0];
var add_airport_btn = $(sel_add_airport_btn)[0];

var txt_family_name = $(sel_txt_family_name)[0];
var btn_family_name = $(sel_btn_family_name)[0];

var btn_add_person_html = $(sel_btn_add_person_html)[0];

var html_add_person_sec = $(sel_html_add_person_sec)[0];

var html_person_info_sec = $(sel_html_person_info_sec)[0];

var html_person_add = $(person_container)[0];


var html_add_person_after_submit_container = $(add_person_after_submit)[0];

var html_searched_family_success_person_add = $(searched_family_success_person_add)[0];


var family_id = -1;
var person_list = [];
var found_family = 0;


var flag_volunteer= 0;


function do_onload() {					
		$(sel_btn_family_name).on("click", add_family_submit);		
		$(btn_rock_family_name).on("click",search_family);		
}

function search_family() {
		$.ajax({
			url : "/regmain/families/?format=json",
			type : "GET",
			dataType : "json",
		}).done(function(json){										
			var entered_value = $(sear_txt_family)[0].value;				
			if ( found_family == 0 ){
				for ( i=0; i<json.length; i++) {					
						if ( entered_value.toLowerCase() == json[i].name.toLowerCase()){																	
								found_family = 1;
								var ele = document.createElement('button');								
								ele.setAttribute("id", "search_family_add_person_list");
						        //var textnode = 						        
						        //ele.setAttribute('href', "/regmain/family_person_list/" + json[i].name);						        
						        ele.innerHTML = "Found family " + json[i].name;
						        //ele.appendChild(textnode);
						        html_searched_family_list.appendChild(ele);
								break;														
						}		
				}
				if ( found_family == 0 ){
						alert("No Family Found");
				}
			} 			
			$("#search_family_add_person_list").on("click",function(){					
					$.ajax({
							url : '/regmain/family_person_list/'+$(sear_txt_family)[0].value,
							type :'GET',
							dataType :'json',						
					}).done(function(json){																									
						var size = Object.keys(json).length												
						for (var i = 0; i < size ; i++){																					
								var ele = document.createElement('button');
								ele.innerHTML = "Person"+"-"+json['first_name'];
								html_searched_family_success_person_add.appendChild(ele);
						}
					});
			});
		});
}

function add_person_html() {			
		flag_volunteer = 0;
		person = new Person(family_id);
		person.render(html_add_person_sec);
		person.church_select();
}


function add_family_submit(event) {		
		fam = new Family();
		fam.render(html_person_add);
}



do_onload();
