from django.db import models 
from django.core import validators 
from django.core.exceptions import ValidationError
import re 
from django.utils import timezone


def author_article(self):
		return "%s %s"%(self.author_name,self.article_name)
link_name = property(author_article)

def valid_name(value,length=5):
	regex = r"([a-zA-Z]+)"
	if not re.search(regex,value) or len(str(value)) < length:
		raise ValidationError("Not a Valid Name")

def valid_content(value,length=20):
	regex = r"([a-zA-Z]+)"
	stuff = value.split(' ')
	if not re.search(regex,value) or len(stuff) < length:
		raise ValidationError("Not Valid Be More Specific")

def valid_comment(value,length = 10):
	regex = r"([a-zA-Z]+)"
	stuff = value.split(' ')
	if not re.search(regex,value) or len(stuff) < length:
		raise ValidationError("Sorry But Your Comment is Not Valid")

class AuthorManager(models.Manager):
	def get_queryset(self):
		return super(AuthorManager,self).get_queryset().count()

class ArticleManager(models.Manager):
	def get_queryset(self):
		return super(ArticleManager,self).get_queryset().values_list('article_name')




class New_Article(models.Model):
	author_name = models.CharField(max_length = 20,validators = [valid_name]) 
	slug = models.SlugField()
	article_name = models.CharField(max_length=30,validators=[valid_name])	
	content = models.CharField(max_length=20000,validators=[valid_content])
	publ_date = models.DateField(verbose_name = "Publication Date")	
	objects = models.Manager()	
	article_list = ArticleManager()
	author_count = AuthorManager()	

	def save(self,*args,**kwargs):
		self.publ_date = timezone.now()		
		self.slug = self.article_name				
		return super(New_Article,self).save(*args,**kwargs)

	def __str__(self):
		return self.article_name		


class Article_Comment(models.Model):
	comment_name = models.CharField(max_length= 20,validators = [valid_name],verbose_name = "Your Name")	
	comment_date = models.DateField()	
	slug = models.SlugField()
	object_id = models.PositiveIntegerField(blank = True)	
	comment_content = models.CharField(max_length = 400,validators = [valid_comment])
	

	def save(self,*args,**kwargs):
		self.comment_date = timezone.now()		
		self.slug = self.comment_name											
		return super(Article_Comment,self).save(*args,**kwargs)

class reply_comment(models.Model):
	reply_content = models.CharField(max_length = 100)
	reply_id = models.ForeignKey("Article_Comment")	

