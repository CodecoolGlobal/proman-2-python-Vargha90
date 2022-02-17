import data_manager


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def get_all_status():
    return data_manager.execute_select(
        """
        SELECT * FROM statuses
        ;
        """
    )


def get_boards():
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ORDER BY id
        ;
        """
    )


def get_cards_for_board(board_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def get_statuses():
    statuses_so_far = data_manager.execute_select(
        """
        SELECT * FROM statuses
        ;
        """)

    return statuses_so_far


def update_board_title(board_id, new_title):
    data_manager.execute_cud(f"""
        UPDATE boards
        SET title = '{new_title}'
        WHERE id = '{board_id}';
        """)


def update_card_column(board_id, card_column_id, card_id):
    data_manager.execute_cud(f"""
        UPDATE cards
        SET status_id = '{card_column_id}'
        WHERE board_id = '{board_id}' AND id = {card_id};
        """)


def update_card_title(card_id, new_title):
    data_manager.execute_cud(f"""
        UPDATE cards
        SET title = '{new_title}'
        WHERE id = '{card_id}';
        """)


def create_new_board(title):
    data_manager.execute_cud(
        """
        INSERT INTO boards
        (title)
        VALUES (%(title)s)
        """,
        {"title": title}
    )


def create_new_card(board_id, status_id, title):
    data_manager.execute_cud(
        """
        INSERT INTO cards
        (board_id, status_id, title, card_order) 
        VALUES (
        %(board_id)s,
        %(status_id)s,
        %(title)s,
        1)
        """,
        {"board_id": board_id,
         "status_id": status_id,
         "title": title}
    )


def create_new_user(username, password):
    data_manager.execute_cud(
        """
        INSERT INTO users
        (username, password)
        VALUES (
        %(username)s,
        %(password)s)
        """,
        {'username': username,
         'password': password}
    )


def get_user_data_by_username(username):
    users = data_manager.execute_select(
        """
        SELECT *
        FROM users
        WHERE users.username = %(username)s
        """,
        {'username': username}
    )
    return users
