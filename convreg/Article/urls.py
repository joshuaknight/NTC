from .views import *
from django.conf.urls import *


urlpatterns = [
		url(r'^add$',article.as_view(),name = 'article'),
		url(r'^view$',display_article.as_view(),name = 'display_article'),		
		url(r'^detail/(?P<pk>\d+)/$',Article_Detail,name = 'article_detail'),		
		url(r'^update/(?P<pk>\d+)/$',article_update.as_view(),name = 'article_update'),		
		url(r'^delete/(?P<pk>\d+)/$',article_delete.as_view(),name = 'article_delete'),		
		url(r'^detail/(?P<pk>\d+)/add/comment$',article_comment.as_view(),name = 'article_comment'),
		url(r'^comment/reply/add$',reply_create.as_view(),name = 'reply_create'),
		url(r'^comment/reply/view$',reply_view.as_view(),name = 'reply_view'),		
		url(r'^author/view/(?P<slug>[\w-]+)/*$',author_view.as_view(),name = 'author_view'),
]
