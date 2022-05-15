from magnus import db
from magnus import functions
from sqlalchemy import create_engine, Integer,Column, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker

engine = create_engine('sqlite:///magnus.db', echo=True)
Base=declarative_base()

class Book(Base):
    __tablename__='books'
    id=Column(Integer(), primary_key=True)
    title = Column(String(50), nullable=False)
    author = Column(String(30), nullable=False)
    language = Column(String(50), nullable=False)
    words=relationship('Words', back_populates='name')

    def __repr__(self):
        return f"<Book: {self.title}>"

class Words(Base):
    __tablename__ = 'words'
    id=Column(Integer(), primary_key=True)
    verbs = Column(String(50), nullable=True)
    nouns = Column(String(50), nullable=True)
    adjectives = Column(String(50), nullable=True)
    book_id=Column(Integer(), ForeignKey('books.id'))
    name=relationship('Book', back_populates='words')
