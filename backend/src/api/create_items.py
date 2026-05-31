from fastapi import APIRouter
from pydantic import BaseModel


class Item(BaseModel):
    name: str
    description: str = None
    price: float = None


router = APIRouter(prefix="/api", tags=["items"])


@router.post("/items")
async def create_item(item: Item):
    """POST endpoint to create a new item"""
    return {
        "message": "Item created successfully",
        "item": item.dict(),
        "status": "created",
    }
