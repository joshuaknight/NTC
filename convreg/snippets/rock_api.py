import functools
import requests


USERNAME = 'rockadmin'
PASSWORD = '507OrangeSt'
SESSION = None


class ROCK_URLS(object):
    AUTH = 'Auth/Login'
    BASE = 'https://rock.paravila.com/api/'
    GROUPS = 'Groups/'
    GROUP_MEMBERS = 'GroupMembers/'
    GROUP_TYPES = 'GroupTypes/'
    PEOPLE = 'People/'


class PARAMS(object):
    USERNAME = 'Username'
    PASSWORD = 'Password'
    PERSISTED = 'Persisted'


def get_authenticated_session(username, password):

    session = requests.Session()

    r = session.post(
        ROCK_URLS.BASE + ROCK_URLS.AUTH,
        data={
            PARAMS.USERNAME: username,
            PARAMS.PASSWORD: password,
            PARAMS.PERSISTED: True,
        },
        verify=False)

    return session


def call_with_session(fn):

    @functools.wraps(fn)
    def inner_func(*args, **kwargs):
        global SESSION
        if not SESSION:
            SESSION = get_authenticated_session(USERNAME, PASSWORD)
        return fn(*args, **kwargs)

    return inner_func


@call_with_session
def get_people():
    r = SESSION.get(ROCK_URLS.BASE + ROCK_URLS.PEOPLE, verify=False)
    print r.status_code, r.text
    return r.json()


@call_with_session
def get_families():
    pass
