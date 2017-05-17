from flask import session, redirect, url_for, render_template, request
from . import main


@main.route('/', methods=['GET', 'POST'])
def index():
    """"Login form to enter a room."""
    if request.method == 'POST':
        session['name'] = request.form.get('name')
        session['room'] = request.form.get('room')
        return redirect(url_for('.chat'))
    elif request.method == 'GET':
        return render_template('index.html')


@main.route('/chat')
def chat():
    """Chat room. The user's name and room must be stored in
    the session."""
    name = session.get('name', '')
    room = session.get('room', '')
    if name == '' or room == '':
        return redirect(url_for('.index'))
    return render_template('chat.html', name=name, room=room)
