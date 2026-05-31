from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["items"])


@router.get("/items/{item_id}")
async def get_item(item_id: int):
    """GET endpoint to retrieve an item by ID"""
    return {
        "item_id": item_id,
        "name": f"Item {item_id}",
        "description": "Sample item from GET endpoint",
    }
