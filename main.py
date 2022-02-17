from flask import Flask, render_template, url_for, request, redirect, jsonify
from dotenv import load_dotenv
from util import json_response, hash_password, verify_password
import mimetypes
import queries

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
load_dotenv()


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


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


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
