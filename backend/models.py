from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Book(Base):
    __tablename__ = 'book'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    status_id = Column(Integer, ForeignKey('status.id'))

    status = relationship('Status')


class Status(Base):
    __tablename__ = 'status'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
