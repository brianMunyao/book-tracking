# build a schema using pydantic
from pydantic import BaseModel
from dataclasses import dataclass


@dataclass
class Book(BaseModel):
    title: str
    status_id: int

    class Config:
        from_attributes = True


@dataclass
class Status(BaseModel):
    name: str

    class Config:
        from_attributes = True


@dataclass
class NewStatus(BaseModel):
    status: int
