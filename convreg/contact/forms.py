from django import forms 
from django.forms import ModelForm,Textarea
import re 
from django.utils.translation import ugettext_lazy as _
from contact.models import *

class ContactForm(ModelForm):
    class Meta:
        model = Contact_all
        fields = ('name','email','query')
        widgets = {
            'query': Textarea(attrs={'cols': 50, 'rows': 10}),        	
        	}
       	help_texts = {          
       		'query' : _('Please Be Brief about your Query'),
       		'name'  : _('Name should be valid'),
       		'email' : _('The way to contact you back'),
       	}

	
