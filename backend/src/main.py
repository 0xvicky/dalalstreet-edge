from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api.get_items import router as get_router
from src.api.create_items import router as create_router
from src.cache.redis_conn import cache_manager


# register cache manager
async def lifespan(app: FastAPI):
    cache_manager.initialize()
    yield

    await cache_manager.close()


# Initialize FastAPI app
app = FastAPI(title="Earnings Edge API", version="1.0.0", lifespan=lifespan)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers from separate endpoint files
app.include_router(get_router)
app.include_router(create_router)


@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Welcome to Earnings Edge API"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
