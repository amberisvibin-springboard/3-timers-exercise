"""Flask app for Feedback"""

from flask import Flask, jsonify, json, abort, request, render_template, redirect, flash
from models import connect_db, db, User
from werkzeug.exceptions import HTTPException, NotFound
from forms import AddUserForm

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
    return redirect("/register")

@app.route("/register", methods=["GET", "POST"])
def add_user():
    """User add form; handle adding."""

    form = AddUserForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        
        new_user = User(
            username = username,
            password = password,
            email = email,
            first_name = first_name,
            last_name = last_name
        )

        db.session.add(new_user)
        try:
            db.session.commit()
        except:
            flash("Email already exists")
            return render_template(
            "register.html", form=form)
        else:
            return redirect("/secret")
    else:
        return render_template(
            "register.html", form=form)

@app.route("/secret")
def secret():
    """Show secret page"""
    return render_template("secret.html")

# @app.route("/pets/<int:pet_id>/edit", methods=["GET", "POST"])
# def edit_pet(pet_id):
#     """Pet edit form; handle editing."""

#     pet = Pet.query.get_or_404(pet_id)

#     form = EditPetForm(name=pet.name, age=pet.age, species=pet.species,
#                        photo_url=pet.photo_url, notes=pet.name)

#     if form.validate_on_submit():
#         pet.name = form.name.data
#         pet.age = form.age.data
#         pet.species = form.species.data
#         pet.photo_url = form.photo_url.data
#         pet.notes = form.notes.data
#         db.session.commit()

#         flash(
#             f"Edited {pet.name} at {pet.age} yrs old and of species {pet.species}.")
#         return redirect(f"/pets/{pet_id}")

#     else:
#         return render_template(
#             "edit_pet_form.html", form=form)
