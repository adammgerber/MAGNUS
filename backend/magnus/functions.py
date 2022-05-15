import pandas as pd
import sqlite3
from flask_sqlalchemy import SQLAlchemy
from pandas import read_csv
from sqlalchemy import create_engine, Integer,Column, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
import sqlite3 as db
from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
#*****IMPORTS FOR PROCESSING****
from filesplit.split import Split
from langdetect import detect
import pdftotext
import spacy
import pandas as pd
import re
import icu 
from PyPDF2 import PdfFileReader

from magnus.models import Words, Book, engine, Base

ALLOWED_EXTENSIONS = {'pdf'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



def process_file(path, nlp):
    language_processing(path, nlp)



def language_processing(path, nlp):
    

    # nlp = spacy.load('ru_core_news_lg')
    russian = spacy.load('ru_core_news_lg')
    spanish = spacy.load('es_core_news_sm')
    # nlp.max_length = 2000000
    russian.max_length = 2000000
    spanish.max_length = 2000000


    with open(path, "rb") as j:
        pdf = PdfFileReader(j)
        info = pdf.getDocumentInfo()
        global book_title
        book_title = info.title
        global book_author
        book_author = info.author


    with open(path, "rb") as f:
        pdf2 = pdftotext.PDF(f)
        pdftotext_text = "\n\n".join(pdf2)

    regex = re.compile('[^a-zA-Z\ЁёА-я\-ÀàÂâÆæÇçÈèÉéÊêËëÎîÏïÔôŒœÙùÛûÜü]')
    s= re.sub(regex, ' ', pdftotext_text)

    lang = detect(s)

    if lang=='ru':
        document = russian(s)
    elif lang =='es':
        document = spanish(s)


    # document= nlp(s)
    


    #ADD WORDS TO LIST IF PART OF SPEECH IS A VERB/NOUN/ADJ
    verbs = [token.lemma_ for token in document if token.pos_ == 'VERB']
    nouns = [token.lemma_ for token in document if token.pos_ == 'NOUN']
    adjs = [token.lemma_ for token in document if token.pos_ == 'ADJ']

    #ADD LOCALE TO SORT UNICODE ALPHABETICALLY
    collator = icu.Collator.createInstance(icu.Locale('ru_RU.UTF-8'))
    sorted_verbs = sorted(verbs,key=collator.getSortKey)
    sorted_nouns = sorted(nouns,key=collator.getSortKey)
    sorted_adjs = sorted(adjs,key=collator.getSortKey)

    #REMOVE ANY DUPLICATES FROM SORTED LIST
    final_verbs = list(dict.fromkeys(sorted_verbs))
    final_nouns = list(dict.fromkeys(sorted_nouns))
    final_adjs = list(dict.fromkeys(sorted_adjs))


    #CREATE PANDAS DATAFRAME
    df_verbs = pd.DataFrame(final_verbs, columns=['verbs'])
    df_nouns = pd.DataFrame(final_nouns, columns=['nouns'])
    df_adjs = pd.DataFrame(final_adjs, columns=['adjectives'])
    df_add = pd.concat([df_verbs,df_nouns], axis=1)
    df_final = pd.concat([df_add, df_adjs], axis=1)

    conn = sqlite3.connect('magnus.db')
    

    """ class Book:
        id:int pk
        title: str
        author: str
        language: str
    
    class Words:
        id: int pk
        verbs: str
        nouns: str
        adjectives: str
        book_id: int foreignkey 
    """
    
    
    # Base.metadata.create_all(engine)
    # session=sessionmaker()(bind=engine)

    # new_book= Book(
    #     title = book_title,
    #     author = book_author,
    #     language = lang
    # )

    # session.add(new_book)
    # session.commit()

    # book = session.query(Book).filter(Book.id==3).first()
  
    # for word in df_final.index:
    #     new_words = Words(
    #         verbs = df_final['verbs'][word],
    #         nouns = df_final['nouns'][word],
    #         adjectives = df_final['adjectives'][word],
    #         name = book
    #     )
    #     session.add(new_words)
    #     session.commit()

    # new_words = Words(
    #     verbs = df_verbs[0],
    #     nouns = df_nouns[1],
    #     adjectives = df_adjs[2]
    # )

    
    df_final.to_sql(f"{book_title}", conn, if_exists='replace', index=False)
    conn.close()

