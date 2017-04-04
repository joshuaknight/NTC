from .forms import *
from .models import *
from django.core.mail import send_mail
from django.views.generic import *
from convreg.settings import *
from django.core.urlresolvers import reverse

class contact(FormView):
	template_name = 'contact.html'
	form_class = ContactForm

	def get_context_data(self,**kwargs):
		context = super(contact, self).get_context_data(**kwargs)
		context['key'] = 'SEND'
		return context

	def form_valid(self,form):
		name = self.request.POST['name']
		email = self.request.POST['email']
		query = self.request.POST['query']
		message = """Hello %s and Welcome,Please Feel Free to reply to this mail
					Your Query is Processed and will be responded with the solution
					in the next working hours Thank You

					This is Your Following Query 

					%s 
					Thank You Regards 
						Owner"""%(name,query)
		mymail = EMAIL_HOST_USER
		send_mail(name,message,mymail,[email],fail_silently = False)
		return super(contact,self).form_valid(form)

	def get_success_url(self):		
		return reverse('home')