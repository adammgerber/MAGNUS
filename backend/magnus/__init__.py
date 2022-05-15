from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

UPLOAD_FOLDER = os.path.dirname(os.path.abspath(__file__)) + '/uploads/'
PROCESSED_FOLDER = os.path.dirname(os.path.abspath(__file__)) + '/processed_pdf/'


app = Flask(__name__, static_url_path="/static")
CORS(app)
DIR_PATH = os.path.dirname(os.path.realpath(__file__))
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['PROCESSED_FOLDER'] = PROCESSED_FOLDER
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///magnus.db'
db = SQLAlchemy(app)

from magnus import routes
