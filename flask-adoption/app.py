"""Addoption application."""

from flask import Flask, render_template, request, make_response, redirect, flash, session, jsonify
from werkzeug import exceptions
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet
from forms import AddPetForm, EditPetForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adoption'
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
    pet_list = Pet.query.all()
    return render_template('index.html', pets=pet_list)


@app.route("/add", methods=["GET", "POST"])
def add_pet():
    """Pet add form; handle adding."""

    form = AddPetForm()

    if form.validate_on_submit():
        name = form.name.data
        age = form.age.data
        species = form.species.data
        photo_url = form.photo_url.data
        notes = form.notes.data
        new_pet = Pet(name=name,
                      age=age,
                      species=species,
                      photo_url=photo_url,
                      notes=notes,
                      available=True)
        db.session.add(new_pet)
        db.session.commit()

        flash(f"Added {name} at {age} yrs old and of species {species}.")
        return redirect("/")

    else:
        return render_template(
            "add_pet_form.html", form=form)


@app.route("/pets/<int:pet_id>")
def show_pet(pet_id):
    """Show pet"""
    pet = Pet.query.get_or_404(pet_id)
    return render_template("pet.html", pet=pet)


@app.route("/pets/<int:pet_id>/edit", methods=["GET", "POST"])
def edit_pet(pet_id):
    """Pet edit form; handle editing."""

    pet = Pet.query.get_or_404(pet_id)

    form = EditPetForm(name=pet.name, age=pet.age, species=pet.species,
                       photo_url=pet.photo_url, notes=pet.name)

    if form.validate_on_submit():
        pet.name = form.name.data
        pet.age = form.age.data
        pet.species = form.species.data
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        db.session.commit()

        flash(
            f"Edited {pet.name} at {pet.age} yrs old and of species {pet.species}.")
        return redirect(f"/pets/{pet_id}")

    else:
        return render_template(
            "edit_pet_form.html", form=form)
