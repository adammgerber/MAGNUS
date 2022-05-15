import json
from magnus import app
from magnus.functions import *

from fileinput import filename
import os
from flask import Flask, jsonify, request, make_response,redirect, url_for, render_template, send_from_directory
from requests import session
from werkzeug.utils import secure_filename


import spacy
#*******************************



russian = spacy.load('ru_core_news_lg')
spanish = spacy.load('es_core_news_sm')
french = spacy.load('fr_dep_news_trf')




@app.route('/upload', methods=["GET", "POST"])
def upload():

    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            
            pdf = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            process_file(pdf, russian)
            os.remove(pdf)
            res = 'file upload success'
        
    fail = 'Error'
    return fail



@app.route('/books')
def allbooks():
    conn = sqlite3.connect('magnus.db')
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    books = cursor.fetchall()
    conn.close()
    return jsonify(books)

@app.route("/content")
def content():
    title = request.values['title']
    conn = sqlite3.connect('magnus.db')
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {title}")
    words = cursor.fetchall()
    conn.close()
    return jsonify(words)
    