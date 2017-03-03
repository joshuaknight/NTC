from django.contrib import admin

from regmain import models


admin.site.register(models.Family)
admin.site.register(models.Church)
admin.site.register(models.AttendantType)
admin.site.register(models.ContactInfo)
admin.site.register(models.AirportInfo)
admin.site.register(models.Transport)
admin.site.register(models.SpecialRequest)
admin.site.register(models.PersonInfo)
admin.site.register(models.VolunteerType)
admin.site.register(models.Event)
admin.site.register(models.RegForm)
admin.site.register(models.PersonVolunteer)
admin.site.register(models.PersonEventMap)
admin.site.register(models.RegFormPersonMap)
