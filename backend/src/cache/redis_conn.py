import redis.asyncio as redis
from dotenv import load_dotenv
from fastapi import FastAPI
from typing import Optional
import os
import json

load_dotenv()

REDIS_URL = os.getenv("REDIS_URL")
CACHE_TTL = 60 * 60


class CacheManager:
    def __init__(self):
        self.client: Optional[redis.Redis] = None

    def initialize(self) -> None:
        """Initialise global async Redis client."""
        if not self.client:
            self.client = redis.from_url(
                REDIS_URL, encoding="utf-8", decode_responses=True
            )
            print("🚀 Redis Connection Pool Initialized Globally.")

    async def close(self) -> None:
        """Closes the redis connection pool"""
        if self.client is not None:
            await self.client.close()
            print("🛑 Redis Connection Pool Closed Cleanly.")

    async def get_data(self, key: str):
        if not self.client:
            return

        res = await self.client.get(key)
        return json.loads(res) if res else None

    async def set(self, ticker: str, exchg: str, data: dict):
        if not self.client:
            return
        s_val = json.dumps(data)
        await self.client.setex(f"{ticker}:{exchg}", CACHE_TTL, s_val)


cache_manager = CacheManager()
