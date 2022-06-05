from flask import Flask, request
import operations

app = Flask(__name__)


@app.route("/add")
def add():
    """Add 2 numbers: a and b"""

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))

    return str(operations.add(a, b))


@app.route("/sub")
def sub():
    """Sub 2 numbers: a and b"""

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))

    return str(operations.sub(a, b))


@app.route("/mult")
def mult():
    """Mult 2 numbers: a and b"""

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))

    return str(operations.mult(a, b))


@app.route("/div")
def div():
    """Div 2 numbers: a and b"""

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))

    return str(operations.div(a, b))


@app.route("/math/<op>")
def math(op):
    ops = {"add": operations.add,
           "sub": operations.sub,
           "mult": operations.mult,
           "div": operations.div}

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    return str(ops.get(op)(a, b))
