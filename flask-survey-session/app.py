from flask import Flask, render_template, request, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from werkzeug import exceptions
from surveys import *

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

survey = surveys["satisfaction"]


@app.route("/")
def index():
    """Show homepage"""
    # clear session
    session['responses'] = []
    return render_template("index.html", title=survey.title, instructions=survey.instructions)


@app.route("/questions/<int:q_num>")
def question(q_num):
    """Show question"""
    if len(session['responses']) >= len(survey.questions):
        return redirect("/thanks")
    elif len(session['responses']) == q_num:
        return render_template("question.html", question=survey.questions[q_num], q_num=q_num + 1, num_q=len(survey.questions))
    else:
        flash("Tried to access bad question number, redirected to correct question.")
        return redirect(f"/questions/{len(session['responses'])}")


@app.route("/answer", methods=["POST"])
def answer():
    """Get answer and redirect to next question"""

    answer = request.form["answer"]
    session['responses'].append(answer)
    # update
    session['responses'] = session['responses']
    q_num = len(session['responses'])
    if q_num >= len(survey.questions):
        return redirect("/thanks")
    else:
        return redirect(f"/questions/{q_num}")


@app.route("/thanks")
def thanks():
    """Show thank you page"""
    return render_template("thanks.html")


@app.errorhandler(exceptions.BadRequest)
def handle_bad_request(e):
    """Handle bad requests. Probably a bad idea to assume its an empty question"""
    flash("Please answer before submitting!")
    q_num = len(session['responses'])
    if q_num >= len(survey.questions):
        return redirect("/thanks")
    else:
        return redirect(f"/questions/{q_num}")
