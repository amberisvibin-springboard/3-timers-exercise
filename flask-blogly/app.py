"""Blogly application."""

from curses.ascii import US
from flask import Flask, render_template, request, make_response, redirect, flash, session, jsonify
from werkzeug import exceptions
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post

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
    return redirect("/users")


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
def new_user():
    """Show new user form"""
    return render_template("new_user.html")


@app.route("/users/new", methods=["POST"])
def new_user_submit():
    """Get new user and redirect to users"""

    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['image_url']

    new_user = User(first_name=first_name,
                    last_name=last_name, image_url=image_url)
    db.session.add(new_user)
    db.session.commit()
    return redirect("/users")


@app.route("/users/<int:user_id>/edit")
def edit_user(user_id):
    """Show edit user form"""
    user = User.query.get_or_404(user_id)
    return render_template("edit_user.html", user=user)


@app.route("/users/<int:user_id>/edit", methods=["POST"])
def get_user_edit(user_id):
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
def delete_user(user_id):
    """Delete user and redirect to users"""

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return redirect("/users")


@ app.route("/posts/<int:post_id>")
def show_post(post_id):
    """Show post"""
    post = Post.query.get_or_404(post_id)
    return render_template("post.html", post=post)


@app.route("/posts/<int:post_id>/delete", methods=["POST"])
def delete_post(post_id):
    """Delete post and redirect to users"""

    post = Post.query.get_or_404(post_id)
    user_id = post.user.id
    db.session.delete(post)
    db.session.commit()
    return redirect(f"/users/{user_id}")


@app.route("/users/<int:user_id>/posts/new")
def show_new_post(user_id):
    """Show new post form"""

    user = User.query.get_or_404(user_id)
    return render_template("new_post.html", user=user)


@app.route("/users/<int:user_id>/posts/new", methods=["POST"])
def new_post(user_id):
    """Get new post and redirect to user"""

    user = User.query.get_or_404(user_id)
    title = request.form['title']
    content = request.form['content']

    new_post = Post(user_id=user.id, title=title, content=content)
    db.session.add(new_post)
    db.session.commit()
    return redirect(f"/users/{user_id}")


@app.route("/posts/<int:post_id>/edit")
def post(post_id):
    """Show edit post form"""
    post = Post.query.get_or_404(post_id)
    return render_template("edit_post.html", post=post)


@app.route("/posts/<int:post_id>/edit", methods=["POST"])
def get_post_edit(post_id):
    """Get edit post form"""

    title = request.form['title']
    content = request.form['content']

    post = Post.query.get_or_404(post_id)
    post.title = title
    post.content = content
    db.session.commit()
    return redirect(f"/posts/{post_id}")
