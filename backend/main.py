import os
import uvicorn
from typing import Union
from fastapi import FastAPI,  HTTPException
from fastapi_sqlalchemy import DBSessionMiddleware, db
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from schema import Book as SchemaBook
from schema import NewStatus as SchemaNewStatus

from models import Book as ModelBook

load_dotenv('.env')

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=[
                   '*'], allow_credentials=True, allow_methods=["*"], allow_headers=['*'])
app.add_middleware(DBSessionMiddleware, db_url=os.environ['DATABASE_URL'])


@app.get('/books')
async def get_books():
    books = db.session.query(ModelBook).all()
    return books


@app.get('/books/{book_id}')
async def get_single_book(book_id: int):
    book = db.session.query(ModelBook).filter(ModelBook.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail='No Book Found')
    return book


@app.post('/books')
async def create_book(book: SchemaBook):
    db_book = ModelBook(title=book.title, status_id=book.status_id)
    db.session.add(db_book)
    db.session.commit()
    return db_book


class NewStatusModel:
    status: int


@app.patch('/books/{book_id}/status')
async def update_book_status(status: SchemaNewStatus, book_id: int):
    db_book = db.session.query(ModelBook).filter(
        ModelBook.id == book_id).first()
    if not db_book:
        raise HTTPException(status_code=404, detail='No Book Found')

    db_book.status_id = status.status
    db.session.commit()
    return book_id


@app.delete('/books/{book_id}')
async def delete_book(book_id: int):
    db_book = db.session.query(ModelBook).filter(
        ModelBook.id == book_id).first()
    if not db_book:
        raise HTTPException(status_code=404, detail='No Book Found')

    db.session.delete(db_book)
    db.session.commit()
    return book_id


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)
