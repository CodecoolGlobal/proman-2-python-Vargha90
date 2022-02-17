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


def create_new_board(title):
    data_manager.execute_cud(
        """
        INSERT INTO boards
        (title)
        VALUES (%(title)s)
        """,
        {"title": title}
    )
