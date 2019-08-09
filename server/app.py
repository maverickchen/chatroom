from flask import Flask, render_template, request
from flask_socketio import SocketIO, send, emit, join_room, \
    leave_room, close_room, rooms


app = Flask(__name__,
            static_folder="../client-chat/build/static",
            template_folder="../client-chat/build")

socketio = SocketIO(app)


@app.route("/")
def index():
    return render_template('index.html')


@socketio.on('check-in')
def notify_user_checked_in():
    try:
        username = rooms()[0]  # online users should only ever be in one room
        emit('is-online', {"username": username}, broadcast=True)
    except Exception as e:
        print('Caught error', e)


@socketio.on('login-user')
def notify_user_login(username):
    leave_room(request.sid)  # leave the sid room and join the username room
    join_room(username)
    emit('is-online', {"username": username}, broadcast=True)
    # Ask all users to declare if they are online for our new user
    emit('all-users-check-in', broadcast=True)
    print('User', username, 'has signed on')


@socketio.on('logoff-user')
def notify_user_logoff(username):
    close_room(username)  # leave the sid room and join the username room
    emit('is-offline', {"username": username}, broadcast=True)
    print('User', username, 'has signed off')


@socketio.on('send-chat')
def send_chat(json):
    print('received message object', json)
    recipient = json['recipient']
    message = json['message']
    sender = json['sender']
    msg_obj = {
        "recipient": recipient,
        "message": message,
        "sender": sender
    }
    emit('incoming-chat', msg_obj, room=recipient)
    emit('incoming-chat', msg_obj, room=sender)


# @socketio.on('join')
# def on_join(room):
#     print("User joining", room)
#     join_room(room)


# @socketio.on('leave')
# def on_leave(room):
#     close_room(room)


@socketio.on('connect')
def handle_connect():
    print('Client connected')


@socketio.on('disconnect')
def handle_disconnect():
    try:
        print('Client', rooms(), 'disconnected')
        username = rooms()[0]
        emit('is-offline', {"username": username}, broadcast=True)
    except Exception as e:
        print('Caught', e)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0')
