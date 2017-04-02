from django.forms import ModelForm,Textarea
from django import forms
from bootstrap3_datetime.widgets import DateTimePicker
from Article.models import New_Article,Article_Comment,reply_comment
from django.utils import timezone
from pagedown.widgets import PagedownWidget

class MyArticle(ModelForm):
	class Meta:
		model = New_Article
		fields = '__all__'
		exclude = ('publ_date','article_comment_key','slug')

		widgets = {
			'content' : PagedownWidget(attrs = {'cols':1,'rows':10})
			}

		initals = {
			'publ_date' : timezone.now(),

		}			

		
class CommentForm(ModelForm):	
	class Meta:
		model = Article_Comment
		fields = '__all__'		
		exclude =  ('comment_date','slug','object_id')
		widgets = {
			'comment_content' : Textarea(attrs = {'cols':1,'rows':10}),
		}

class reply_comment_form(ModelForm):
	class Meta:
		model = reply_comment
		fields = '__all__'		