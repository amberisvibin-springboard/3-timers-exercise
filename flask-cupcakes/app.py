"""Flask app for Cupcakes"""

from flask import Flask, jsonify, json, abort, request, render_template
from models import db, connect_db, Cupcake
from werkzeug.exceptions import HTTPException, NotFound

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
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
    """Show homepage"""
    return render_template("index.html")

# code from SO to make errors return as JSON
@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response

def serialize_cupcake(cupcake):
    """Serialize a cupcake SQLAlchemy obj to dictionary."""

    return {
        "id": cupcake.id,
        "flavor": cupcake.flavor,
        "size": cupcake.size,
        "rating": cupcake.rating,
        "image": cupcake.image,
    }

@app.route("/api/cupcakes")
def list_all_cupcakes():
    """Return JSON {'cupcakes': [{id, flavor, size, rating, image}, ...]}"""

    cupcakes = Cupcake.query.all()

    serialized = [serialize_cupcake(c) for c in cupcakes]

    return jsonify(cupcakes=serialized)

@app.route("/api/cupcakes/<cupcake_id>")
def list_single_cupcake(cupcake_id):
    """Return JSON {'cupcake': {id, flavor, size, rating, image}}"""

    cupcake = Cupcake.query.get(cupcake_id)

    if (not cupcake):
        raise NotFound

    serialized = serialize_cupcake(cupcake)

    return jsonify(cupcake=serialized)

@app.route("/api/cupcakes", methods=["POST"])
def create_cupcake():
    """Create cupcake from data & return it.

    Returns JSON {'cupcake': {id, flavor, size, rating, image}}
    """

    flavor = request.json["flavor"]
    size = request.json["size"]
    rating = request.json["rating"]
    image = request.json["image"]
    

    new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)

    db.session.add(new_cupcake)
    db.session.commit()

    serialized = serialize_cupcake(new_cupcake)

    # Return w/status code 201 --- return tuple (json, status)
    return ( jsonify(cupcake=serialized), 201 )

@app.route("/api/cupcakes/<cupcake_id>", methods=["PATCH"])
def patch_single_cupcake(cupcake_id):
    """Patch cupcake from data & return it.
    
    Return JSON {'cupcake': {id, flavor, size, rating, image}}"""

    cupcake = Cupcake.query.get(cupcake_id)

    if (not cupcake):
        raise NotFound

    cupcake.flavor = request.json["flavor"]
    cupcake.size = request.json["size"]
    cupcake.rating = request.json["rating"]
    cupcake.image = request.json["image"]
    db.session.commit()

    serialized = serialize_cupcake(cupcake)

    return jsonify(cupcake=serialized)

@app.route("/api/cupcakes/<cupcake_id>", methods=["DELETE"])
def delete_single_cupcake(cupcake_id):
    """Delete cupcake from id and return 200.
    
    Return JSON {message: 'Deleted'}"""

    cupcake = Cupcake.query.get(cupcake_id)

    if (not cupcake):
        raise NotFound

    db.session.delete(cupcake)

    resp = jsonify(message='Deleted')
    resp.status_code = 200

    return resp