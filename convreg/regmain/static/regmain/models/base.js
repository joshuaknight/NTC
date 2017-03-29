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
var temp_family_id = -1;
var flag_volunteer= 0;

var main_container = $("#main_container")[0];

var searched_family_list_row = $("#searched_family_list_row")[0];
var searched_family_list_div = $("#searched_family_list_div")[0];
var searched_family_of_person_list = $("#searched_family_of_person_list")[0];
var searched_family_list_btn = $("#searched_family_list_btn")[0];
var searched_family_success_person_add = $("#searched_family_success_person_add")[0];

var container_whole_body = $("#container_whole_body")[0];
var txt_family_name_cont = $("#txt_family_name")[0];
var create_family_container = $("#create_family_container")[0];
var family_report_message = $("#family_report_message")[0];
var html_add_person_parent = $("#html_add_person_parent")[0];

var ele_of_contact_is_valid = 0;
var ele_of_airport_is_valid = 0;

var special_request_id = 0;
var airport_id = 0;
var contact_id = 0;
var transport_id = 0;

function do_onload() {					
		$(sel_btn_family_name).on("click", add_family_submit);		
		$(btn_rock_family_name).on("click",function(){				
				search_family();
		});		
}

function search_family() {					
		detach_elements_of_create_family();
		reattach_elements_of_search_family();

		$("#txt_rock_family_name").change(function(){	
				found_family = 0;	
				detach_elements_of_search_family();
		});

		$.ajax({
			url : "/regmain/families/?format=json",
			type : "GET",
			dataType : "json",
		}).done(function(json){																		
			if ( found_family == 0 ){
				for ( i=0; i<json.length; i++) {					
						if ( $(sear_txt_family)[0].value.toLowerCase() == json[i].name.toLowerCase()){																	
								found_family = 1;
								var ele = document.createElement('a');								
								ele.setAttribute("id", "search_family_add_person_list");						        						       
						        ele.innerHTML = "Found Family - " + json[i].name;
						        temp_family_id=json[i].id;						        
						        $("#searched_family_list").append(ele);
								break;														
						}		
				}
				if ( found_family == 0 ){
						alert("No Family Found");
				}

				if ( found_family ){
						$(sear_txt_family)[0].value = null;						
				}
			} 			
			

			$("#search_family_add_person_list").on("click",function(){					
					$.ajax({
							url : '/regmain/family_person_list/'+$(sear_txt_family)[0].value,
							type :'GET',
							dataType :'json',						
					}).done(function(json){																									
						var size = Object.keys(json).length;																						
						for (var i = 1; i < size ; i++){																					
								var ele = document.createElement('h4');								
								ele.innerHTML = "Person"+"-"+json['first_name'];
								html_searched_family_success_person_add.appendChild(ele);
						}
					});
					//var person_btn = $("#add_person_btn_in_family_search")[0];
					//var ele = document.createElement('button');
					//ele.setAttribute("class","btn btn-primary");
					//ele.setAttribute("id","add_person_btn_in_family_search_btn");
					//ele.innerHTML = "Add another Person";
					//person_btn.appendChild(ele);					
					//var person_btn_btn = $("#add_person_btn_in_family_search_btn")[0];
					//$(person_btn_btn).on('click',function(){							
					//		add_person_html(temp_family_id);
					//});
			});

		});
}






function add_family_submit(event) {		
		fam = new Family();
		fam.render(html_person_add);
}	


function reattach_elements_of_search_family(){
		$(main_container).append(searched_family_list_row);
		$(searched_family_list_row).append(searched_family_list_div);
		$(searched_family_list_row).append(searched_family_list_btn);
		$(searched_family_list_row).append(searched_family_of_person_list);
}


function detach_elements_of_search_family(){
		$("#searched_family_list").html('');
		$('#searched_family_list_row').html('');		
}	

var detach_elements_of_create_family = function(){		
		$("#create_family_container").detach();
		$("#family_report_message").detach('');
		$("#html_add_person_parent").detach('');
}

var reattach_elements_of_create_family = function(){		
		$(container_whole_body).append(create_family_container);		
		$(container_whole_body).append(family_report_message);
		$(container_whole_body).append(html_add_person_parent);		
}

function create_family(){		
		reattach_elements_of_create_family();
		detach_elements_of_search_family();
		$("#create_family_container")[0].style.visibility ="visible";
}



function all_in_one_validation(){
		var txt_first_name = $("#txt_first_name")[0].value;
		var txt_last_name = $("#txt_last_name")[0].value;
		var txt_last_name = $("#txt_last_name")[0].value;
		var txt_sex = $("#txt_sex")[0].value;
		var txt_dob = $("#txt_dob")[0].value;
		var add_church_btn = $("#add_church_btn")[0].value;
		var vol_type_id = $("#vol_type_id")[0].value;

		$(txt_first_name).change(function(){
				if ( txt_first_name == '' ||
							txt_first_name == null ||
								txt_first_name == undefined ) {

					console.log("ITs a error");	
				}

		});
}


do_onload();



