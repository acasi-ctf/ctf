from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from routes.api.admin_challenges import bp as admin_challenges_bp

app = Flask(__name__)
app.register_blueprint(admin_challenges_bp, url_prefix='/api/admin/challenges')

app.config['SQLALCHEMY_DATABASE_URI'] = \
    'postgresql://postgres:postgres@localhost:5432/ctf-frontend'
db = SQLAlchemy(app)
migrate = Migrate(app, db)


@app.route("/", methods=['POST'])
def hello_world():
    return "Hello, World!"
