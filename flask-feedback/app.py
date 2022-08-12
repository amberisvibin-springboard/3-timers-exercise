"""Flask app for Feedback"""

from flask import Flask, jsonify, json, abort, request, render_template, redirect, flash, session
from models import connect_db, db, User
from werkzeug.exceptions import HTTPException, NotFound
from forms import AddUserForm, LoginUserForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///feedback'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "transgenderism"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['TEMPLATES_AUTO_RELOAD'] = True

connect_db(app)
db.create_all()

@app.route("/")
def index():
    """redir to /register"""
    return redirect("/login")

@app.route("/register", methods=["GET", "POST"])
def add_user():
    """User add form; handle adding."""

    if "username" in session:
        flash("Logout first!")
        return redirect(f"/users/{session['username']}")

    form = AddUserForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        if User.register(username, password, email, first_name, last_name): 
            session["username"] = username  # keep logged in
            return redirect(f"/users/{username}")

        else:
            flash("Email already exists")
            return render_template(
                "register.html", form=form)
        
    else:
        return render_template(
            "register.html", form=form)

@app.route("/login", methods=["GET", "POST"])
def login_user():
    """User login form; handle login."""

    if "username" in session:
        flash("Logout first!")
        return redirect(f"/users/{session['username']}")

    form = LoginUserForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        result = User.login(username, password)
        if result == "Not found":
            flash("User does not exist")
            return render_template(
                "login.html", form=form)
        elif result == "Bad password":
            flash("Incorrect password")
            return render_template(
                "login.html", form=form)
        elif result == "Success":
            session["username"] = username  # keep logged in
            return redirect(f"/users/{username}")
    else:
        return render_template(
            "login.html", form=form)

@app.route("/users/<string:username>")
def show_user(username):
    """Show user page"""
    if "username" not in session:
        flash("You must be logged in to view!")
        return redirect("/login")

    else:
        user = User.query.get_or_404(username)
        return render_template("user.html", user=user)

@app.route("/logout")
def logout():
    """Logout user"""
    
    session.pop("username")

    return redirect("/")


def auth_user(user, password) -> bool:
    if user.password == password:
        return True
    else:
        return False
