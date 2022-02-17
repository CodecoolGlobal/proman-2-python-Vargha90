from flask import Flask, render_template, url_for, request, jsonify, session
import os
from dotenv import load_dotenv

import util
from util import json_response
import mimetypes
import queries

secret_key = os.urandom(24)
mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
app.secret_key = secret_key
load_dotenv()


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/api/logged")
@json_response
def if_logged():
    if session:
        username = session['username']
        user_id = session['user_id']
        logged_data = {'username': username,
                       'user_id': user_id,
                       'logged': 'True'}
        return logged_data
    else:
        session.clear()
        logged_data = {'logged': 'False'}
        return logged_data


@app.route("/api/login", methods=['POST'])
@json_response
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    user_data = queries.get_user_data_by_username(username)
    if len(user_data) > 0:
        if username == user_data[0]['username'] and util.verify_password(password, user_data[0]['password']):
            session['username'] = username
            session['user_id'] = str(user_data[0]['id'])
            logged_data = {'logged': 'True',
                           'username': username,
                           'user_id': session['user_id']}
            return logged_data
        else:
            logged_data = {'logged': '0'}
            return logged_data
    else:
        logged_data = {'logged': '0'}
        return logged_data


@app.route("/api/logout")
def logout():
    session.clear()
    logged_data = {'logged': 'False'}
    return logged_data


@app.route("/api/register", methods=['POST'])
@json_response
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']
    hashed_password = util.hash_password(password)
    queries.create_new_user(username, hashed_password)


@app.route("/api/boards/new_board", methods=['POST'])
@json_response
def create_new_board():
    data = request.get_json()
    title = data['title']
    queries.create_new_board(title)
    response = {'status': 'ok'}
    return response


@app.route("/api/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queries.get_boards()


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)


@app.route("/api/statuses")
@json_response
def get_statuses():
    return queries.get_statuses()


@app.route("/change_board_title/<int:board_id>/<new_title>", methods=["POST"])
@json_response
def change_board_title(board_id, new_title):
    queries.update_board_title(board_id, new_title)
    return jsonify("", render_template("new_title_model.html"), new_title=new_title)


@app.route("/save_drag_changes/<board_id>/<card_column_id>/<card_id>", methods=["POST"])
@json_response
def save_drag_changes(board_id, card_column_id, card_id):
    queries.update_card_column(board_id, card_column_id, card_id)


@app.route("/change_card_title/<card_id>/<new_title>", methods=["POST"])
@json_response
def change_card_title(card_id, new_title):
    queries.update_card_title(card_id, new_title)
    return jsonify("", render_template("new_card_title_model.html"), new_title=new_title)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
