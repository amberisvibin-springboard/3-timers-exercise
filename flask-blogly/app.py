"""Blogly application."""

from flask import Flask, render_template, request, make_response, redirect, flash, session, jsonify
from werkzeug import exceptions
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db

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
    return render_template("users.html")

@app.route("/users/user")
def user():
    """Show user"""
    return render_template("user.html", first_name="John", last_name="Doe", image_url="/static/default.jpg")

@app.route("/users/create")
def create():
    """Show create user form"""
    return render_template("create.html")

@app.route("/users/edit")
def edit():
    """Show edit user form"""
    return render_template("edit.html")
