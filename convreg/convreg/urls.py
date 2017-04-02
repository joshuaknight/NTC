from django.conf.urls import include, url
from django.contrib import admin

from regmain import urls as regmain_urls

from Article import urls as article_urls

from convreg.views import *

from contact.views import *

urlpatterns = [
    # Examples:
    # url(r'^$', 'convreg.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^regmain/', include(regmain_urls)),
    url(r'^article/', include(article_urls)),
    url(
        r'^api-auth/',
        include('rest_framework.urls', namespace='rest_framework')),
    url(
        r'^$', home.as_view(), name='home'),

    url(
        r'^contact/$', contact.as_view(), name='contact'),
]
