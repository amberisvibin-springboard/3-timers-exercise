"""Blogly application."""

from curses.ascii import US
from flask import Flask, render_template, request, make_response, redirect, flash, session, jsonify
from werkzeug import exceptions
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "transgenderism"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()


@app.route("/")
def index():
    """Show homepage"""
    return render_template("index.html")


@app.route("/users")
def users():
    """Show user list"""
    user_list = User.query.all()
    return render_template("users.html", users=user_list)


@ app.route("/users/<int:user_id>")
def show_user(user_id):
    """Show user"""
    user = User.query.get_or_404(user_id)
    return render_template("user.html", user=user)


@ app.route("/users/new")
def new():
    """Show new user form"""
    return render_template("new.html")


@app.route("/users/new", methods=["POST"])
def new_submit():
    """Get new user and redirect to users"""

    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['image_url']

    new_user = User(first_name=first_name,
                    last_name=last_name, image_url=image_url)
    db.session.add(new_user)
    db.session.commit()
    return redirect("/users")


@ app.route("/users/<int:user_id>/edit")
def edit(user_id):
    """Show edit user form"""
    user = User.query.get_or_404(user_id)
    return render_template("edit.html", user=user)


@ app.route("/users/<int:user_id>/edit", methods=["POST"])
def get_edit(user_id):
    """Get edit user form"""

    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['image_url']

    user = User.query.get_or_404(user_id)
    user.first_name = first_name
    user.last_name = last_name
    user.image_url = image_url
    db.session.commit()
    return redirect(f"/users/{user_id}")


@app.route("/users/<int:user_id>/delete", methods=["POST"])
def delete(user_id):
    """Delete user and redirect to users"""

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return redirect("/users")
