from django.shortcuts import *
from django.http import *
from django.core.exceptions import *
from  .forms import *
from  .models import *
from django.views.generic import *
from django.core.paginator import *
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import *
from django.db.models import Q 

import datetime

def get_page(request):
	article_list = New_Article.objects.all().order_by('-id')
	paginator = Paginator(article_list,4)
	try:
		page = request.GET.get('page')
		get_page = paginator.page(page)	   		
	except PageNotAnInteger:
		get_page = paginator.page(1)
	except EmptyPage:
		get_page = paginator.page(paginator.num_pages)		
	return get_page		

class article(FormView):
	template_name = 'article.html'
	form_class = MyArticle

	def form_valid(self,form):
		form.save()
		return super(article,self).form_valid(form)


	def get_context_data(self,*args,**kwargs):
		context = super(article,self).get_context_data(*args,**kwargs)
		context['key'] = 'Create'
		return context


	def get_success_url(self):
		return reverse('display_article')

class display_article(ListView):
	template_name = "article_list.html"		
	context_object_name = 'article'
	paginate_by = 4


	def get_context_data(self,*args,**kwargs):
		context = super(display_article,self).get_context_data(*args,**kwargs)
		context['page'] = get_page(self.request)
		return context

	def get_queryset(self):
		try:	
			q =  self.request.GET['q']								
			if q:					
				queryset = New_Article.objects.order_by('-id')
				return queryset.filter(Q(author_name__icontains = q)|
										Q(article_name__icontains = q))
			else:
				queryset = New_Article.objects.order_by('-id')
				return queryset
		except:
			queryset = New_Article.objects.order_by('-id')
			return queryset

class reply_create(FormView):
	template_name = "article_detail.html"
	form_class = reply_comment_form
	prefix = "reply_form"

	def form_valid(self,form):
		form.save()
		return super(reply_create,self).form_valid(form)

class reply_view(ListView):
	template_name = "article_detail.html"
	model = reply_comment
	context_object_name = 'reply'



class article_comment(FormView):
	template_name = "article.html"
	form_class = CommentForm

	def get_context_data(self,*args,**kwargs):
		context = super(article_comment,self).get_context_data(*args,**kwargs)
		context['key'] = 'Add Comment'
		return context

	def form_valid(self,form):			
		my_val = self.kwargs['pk']		
		comment = form.save(commit=False)
		comment.object_id = my_val			
		comment.save()			
		return super(article_comment,self).form_valid(form)

	def get_success_url(self):
		return reverse('article_detail',kwargs={'pk':self.kwargs['pk']})
	

def Article_Detail(request,pk):
	article = New_Article.objects.get(id=pk)
	comment = Article_Comment.objects.filter(object_id=pk)
	context= {'article' : article,'comment' : comment}
	if  request.method == 'GET':		
		form = CommentForm()
		context['form'] =  form
		return render(request,"article_detail.html",context)
	if request.method == 'POST':
		name = request.POST['comment_name']
		content = request.POST['comment_content']
		x = Article_Comment(comment_name = name, object_id = pk,comment_content = content)
		x.save()
	return render(request,'article_detail.html',context)



class article_update(UpdateView):
	template_name = "article.html"	
	model = New_Article
	form_class = MyArticle
	context_object_name = 'article'


	def get_success_url(self):
		return reverse('display_article')

	def get_context_data(self,*args,**kwargs):
		context = super(article_update,self).get_context_data(*args,**kwargs)
		context['key'] = 'Update'
		return context

class article_delete(DeleteView):
	template_name = "delete.html"
	model = New_Article	
	context_object_name = 'article'	


	def get_success_url(self):
		return reverse('display_article')



	
class author_view(DetailView):
	template_name = 'author_detail.html'
	slug_field = 'slug'	
	context_object_name = 'author'

	def get_queryset(self,*args,**kwargs):
		print self.kwargs['slug']
		return New_Article.objects.get(author_name = self.kwargs['slug'])	
	