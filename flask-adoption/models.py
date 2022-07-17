"""Models for adoption."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)


class Pet(db.Model):
    """Pet"""

    __tablename__ = "pets"

    id = db.Columm = db.Column(
        db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    species = db.Column(db.String(50), nullable=False)
    photo_url = db.Column(db.String(200))
    age = db.Columm = db.Column(db.Integer)
    notes = db.Column(db.String(5000))
    available = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        """Show info about user."""

        p = self
        return f"<Pet {p.id} {p.name} {p.species} {p.photo_url} {p.age} {p.available}>"


# class Post(db.Model):
#     """Post"""

#     __tablename__ = "posts"

#     id = db.Columm = db.Column(
#         db.Integer, primary_key=True, autoincrement=True)
#     user_id = db.Column(
#         db.Integer,
#         db.ForeignKey('users.id'))
#     user = db.relationship('User')
#     title = db.Column(db.String(50), nullable=False)
#     content = db.Column(db.String(5000), nullable=False)
#     creation_date = db.Column(db.DateTime(timezone=True),
#                               server_default=db.func.now())
#     tags = db.relationship(
#         'Tag',
#         secondary="posts_tags",
#         # cascade="all,delete",
#     )

#     def __repr__(self):
#         """Show info about post."""

#         p = self
#         return f"<Post {p.id} {p.user_id} {p.user.first_name} {p.user.last_name} {p.title}>"


# class Tag(db.Model):
#     """Tag"""

#     __tablename__ = "tags"

#     id = db.Columm = db.Column(
#         db.Integer, primary_key=True, autoincrement=True)
#     name = db.Column(db.String(50), nullable=False)
#     posts = db.relationship(
#         'Post',
#         secondary="posts_tags",
#         # cascade="all,delete",
#     )

#     def __repr__(self):
#         """Show info about tag."""

#         t = self
#         return f"<Tag {t.id} {t.name}>"


# class PostTag(db.Model):
#     """PostTag"""

#     __tablename__ = "posts_tags"

#     post_id = db.Columm = db.Column(
#         db.Integer, db.ForeignKey('posts.id'), primary_key=True)
#     tag_id = db.Columm = db.Column(
#         db.Integer, db.ForeignKey('tags.id'), primary_key=True)

#     def __repr__(self):
#         """Show info about post-tag relationship."""

#         pt = self
#         return f"<PostTag {pt.post_id} {pt.tag_id}>"
