from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Email, Length


class AddUserForm(FlaskForm):
    """Form for adding users."""

    username = StringField("Username", validators=[InputRequired(), Length(max=20)])
    password = PasswordField("Password", validators=[InputRequired(), Length(max=20)])
    email = StringField("Email", validators=[InputRequired(), Email(), Length(max=50)])
    first_name = StringField("First Name", validators=[InputRequired(), Length(max=30)])
    last_name = StringField("Last Name", validators=[InputRequired(), Length(max=30)])
    


# class EditPetForm(FlaskForm):
#     """Form for adding pets."""

#     name = StringField("Pet Name", validators=[InputRequired()])
#     age = IntegerField("Age in years", validators=[InputRequired()])
#     photo_url = StringField("Image URL", validators=[Optional(), URL()])
#     notes = TextAreaField("Notes", validators=[Optional()])
#     species = SelectField("Species", choices=[
#                           ('Cat'), ('Dog'), ('Porcupine')],
#                           validators=[InputRequired()])
