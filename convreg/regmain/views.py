from django import shortcuts
from django import http
from django.views.decorators import csrf

from django.views.generic import TemplateView

import dateparser
import constants
from regmain import models

import json


def single_form(request):
    context = {}
    if request.method == 'GET':
        churches = models.Church.objects.all()        
        att_types = models.AttendantType.objects.all()
        vol_types = models.VolunteerType.objects.all()
        context['att_types'] = [a for a in att_types]
        context['vol_types'] = [a for a in vol_types]
        context['churches'] = [c for c in churches]
        return shortcuts.render(
            request, 'regmain/single_form.html', context)

        
@csrf.csrf_exempt
def add_family(request):
    context = {}

    if request.method == 'GET':
        return shortcuts.render(
            request, 'regmain/add_family.html', context)

    if request.method == 'POST':
        name = request.POST.get('name')

        family = models.Family(name=name)
        family.save()

        return http.JsonResponse(family.to_dict())

@csrf.csrf_exempt
def add_contact_info(request):
    context = {}
    if request.method == 'GET':
        return shortcuts.render(
            request, 'regmain/add_contact_info.html', context)
    if request.method == 'POST':        
        address = request.POST.get('address')
        cell_phone = request.POST.get('cell_phone')
        email = request.POST.get('email')
        telephone = request.POST.get('telephone')

        contact_info = models.ContactInfo(
            address=address,
            cell_phone=cell_phone,
            email=email,
            telephone=telephone)
        contact_info.save()        
        return http.JsonResponse(contact_info.to_dict())


@csrf.csrf_exempt
def add_person(request):
    context = {}
    if request.method == 'GET':
        churches = models.Church.objects.all()
        context['churches'] = [c.to_dict() for c in churches]

        att_types = models.AttendantType.objects.all()
        context['att_types'] = [a.to_dict() for a in att_types]
        return shortcuts.render(
            request, 'regmain/add_person.html', context)

    if request.method == 'POST':       
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        dob = request.POST.get('dob')
        sex = request.POST.get('sex')
        church_id = request.POST.get('church_id')
        family_id = request.POST.get('family_id')
        contact_info_id = request.POST.get('contact_info_id')
        att_type_id = request.POST.get('att_type_id')

        dob_obj = dateparser.parse(dob)
        church = models.Church.objects.get(id=church_id)
        family = models.Family.objects.get(id=family_id)
        contact_info = models.ContactInfo.objects.get(
            id=contact_info_id)
        att_type = models.AttendantType.objects.get(id=att_type_id)

        person = models.PersonInfo(
            first_name=first_name,
            last_name=last_name,
            dob=dob,
            sex=sex,
            church=church,
            family=family,
            contact_info=contact_info,
            att_type=att_type)
        person.save()

        return http.JsonResponse(person.to_dict())

@csrf.csrf_exempt
def airport_info(request):
    context = {}
    if request.method == 'GET':     
        return shortcuts.render(request,"regmain/airport_info.html",context)
    if request.method == 'POST':
        flow_type = request.POST.get('flow_type')
        airport_code = request.POST.get('airport_code')
        airline = request.POST.get('airline')
        datetime = request.POST.get('datetime')
        luggages = request.POST.get('luggages')
        x = models.AirportInfo(flow_type = flow_type,airport_code = airport_code,
                        airline = airline,datetime = datetime,luggages = luggages)
        x.save()
        return http.JsonResponse(x.to_dict())


@csrf.csrf_exempt
def churches(request):    
    if request.method == 'POST':
        name = request.POST.get('name')
        x = models.Church(name=name)
        x.save()
        return http.JsonResponse(x.to_dict())                




@csrf.csrf_exempt        
def att_type(request):    
    if request.method == 'POST':
        name = request.POST['name']
        person_inst = models.PersonInfo.objects.get(id = id)
        x = models.Event.objects.get(id = 1);
        y = models.PersonVolunteer(person = person_inst,activity = name,event = x)
        y.save()
        return http.JsonResponse(y.to_dict())


@csrf.csrf_exempt
def add_special_request(request):
    context = {}        
    if request.method == 'POST':
        name =  request.POST['name']
        desc =  request.POST['desc']
        x = models.SpecialRequest(name = name,desc = desc)
        x.save()
        return http.HttpResponse("Thank You")

@csrf.csrf_exempt
def add_transport(request):
    context = {}        
    if request.method == 'POST':
        transport_type = request.POST['transport_type']
        airport_info = request.POST['airport_info']
        comments = request.POST['comments']
        x = models.Transport(transport_type = transport_type,
            airport_info = airport_info,comments = comments)
        x.save()
        return http.HttpResponse("Thank You")        






@csrf.csrf_exempt
def pre_eve_map(request):
    context = {}        
    if request.method == 'POST':            
            #primary_contact = request.POST['primary_contact']
            #arrival = request.POST['arrival']
            #departure = request.POST['depature']

           # x = models.PersonEventMap(primary_contact = primary_contact,
            #    arrival = arrival,departure = departure)
           # x.save()
            return http.JsonResponse(to_dict())


def my_dict(lis):
    dic={}
    for y in lis:       
        dic['id'] = y.id
        dic['first_name'] = y.first_name
        return dic


def Family_list_all_person(request,pk):    
    if request.method == 'GET':        
    
        get_name = models.Family.objects.get(name = pk)
        family_id = get_name.to_dict()['id']

        person_list = models.PersonInfo.objects.filter(family_id = family_id)
        
                    
    return http.JsonResponse(my_dict(person_list))
        
