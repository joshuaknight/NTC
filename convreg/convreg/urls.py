from django.conf.urls import include, url
from django.contrib import admin

from regmain import urls as regmain_urls


urlpatterns = [
    # Examples:
    # url(r'^$', 'convreg.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^regmain/', include(regmain_urls)),
    url(
        r'^api-auth/',
        include('rest_framework.urls', namespace='rest_framework')),
]
