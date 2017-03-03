APP_LABEL = 'regmain'


class ATTENDANT_TYPE(object):

    NORMAL = 'normal'
    VOLUNTEER = 'volunteer'
    WORKER = 'worker'

    ALL = (NORMAL, VOLUNTEER, WORKER)


class SEX_TYPE(object):

    MALE = 'male'
    FEMALE = 'female'
    TRANSGENDER = 'transgender'

    ALL = (MALE, FEMALE, TRANSGENDER)


class FLOW_TYPE(object):

    INBOUND = 'inbound'
    OUTBOUND = 'outbound'

    ALL = (INBOUND, OUTBOUND)
