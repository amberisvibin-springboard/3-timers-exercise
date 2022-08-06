"""Models for Feedback app."""
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)

class User(db.Model):
    """User"""

    __tablename__ = "users"

    # id = db.Columm = db.Column(
    #     db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(20), nullable=False, primary_key=True)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)

    def __repr__(self):
        """Show info about user."""

        u = self
        return f"<User {u.username}>"

    @classmethod
    def register(cls, username, password, email, first_name, last_name):

        hashed = bcrypt.generate_password_hash(password)
        # turn bytestring into normal (unicode utf8) string
        hashed_utf8 = hashed.decode("utf8")

        new_user = User(
            username = username,
            password = hashed_utf8,
            email = email,
            first_name = first_name,
            last_name = last_name
        )

        db.session.add(new_user)
        try:
            db.session.commit()
        except:
            return False
        else:
            return True

    @classmethod
    def login(cls, username, password):
        try:
            user = User.query.get_or_404(username)
        except:
            return "Not found"
        else:
            if bcrypt.check_password_hash(user.password, password):
                return "Success"
            else:
                return "Bad password"