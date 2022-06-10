from werkzeug import exceptions
from flask_debugtoolbar import DebugToolbarExtension
from flask import Flask, render_template, request, make_response, redirect, flash, session, jsonify
from boggle import Boggle

boggle_game = Boggle()


app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)


@app.route("/")
def index():
    """Show homepage"""
    # clear session
    session['board'] = []
    session['guesses'] = []
    session['highscore'] = 0
    session['games'] = 0
    board = boggle_game.make_board()
    session['board'] = board
    return render_template("index.html", board=board)


@app.route("/guess", methods=["POST"])
def guess():
    """Get guess and update"""

    guess = request.args["guess"]
    if not guess in session['guesses']:
        result = boggle_game.check_valid_word(session['board'], guess)
    else:
        result = "duplicate"
    session['guesses'].append(guess)
    # update
    session['guesses'] = session['guesses']
    response = make_response(
        jsonify({"result": result}),
        200,
    )
    response.headers["Content-Type"] = "application/json"
    return response


@app.route("/score", methods=["POST"])
def score():
    """Get score and update"""

    score = int(request.args["score"])
    if session['highscore'] < score:
        session['highscore'] = score
    session['games'] += 1
    # update
    session['games'] = session['games']
    session['highscore'] = session['highscore']
    response = make_response(
        jsonify({"games": session['games']}),
        200,
    )
    response.headers["Content-Type"] = "application/json"
    return response
