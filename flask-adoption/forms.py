from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, TextAreaField
from wtforms.validators import InputRequired, Optional, URL


class AddPetForm(FlaskForm):
    """Form for adding pets."""

    name = StringField("Pet Name", validators=[InputRequired()])
    age = IntegerField("Age in years", validators=[InputRequired()])
    photo_url = StringField("Image URL", validators=[Optional(), URL()])
    notes = TextAreaField("Notes", validators=[Optional()])
    species = SelectField("Species", choices=[
                          ('Cat'), ('Dog'), ('Porcupine')],
                          validators=[InputRequired()])


class EditPetForm(FlaskForm):
    """Form for adding pets."""

    name = StringField("Pet Name", validators=[InputRequired()])
    age = IntegerField("Age in years", validators=[InputRequired()])
    photo_url = StringField("Image URL", validators=[Optional(), URL()])
    notes = TextAreaField("Notes", validators=[Optional()])
    species = SelectField("Species", choices=[
                          ('Cat'), ('Dog'), ('Porcupine')],
                          validators=[InputRequired()])
