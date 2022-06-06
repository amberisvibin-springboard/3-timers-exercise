from flask import Flask, render_template, request
from flask_debugtoolbar import DebugToolbarExtension
from stories import Story

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"

debug = DebugToolbarExtension(app)

story = Story(
    ["place", "noun", "verb", "adjective", "plural_noun"],
    """Once upon a time in a long-ago {place}, there lived a
       large {adjective} {noun}. It loved to {verb} {plural_noun}."""
)


@app.route("/")
def index():
    """Show homepage"""
    out = []
    for prompt in story.prompts:
        out.append(f"""
            <label for="{prompt}">{prompt}</label>
            <input name="{prompt}" id="{prompt}">""")
    return render_template("index.html", form="".join(out))


@app.route("/story")
def show_story():
    """Show generated story"""
    answers = request.args

    return render_template("story.html", story=story.generate(answers))
