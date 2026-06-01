from src.services.ticker_data import get_stock_data, is_ttl_valid
import redis
import os
from dotenv import load_dotenv
import asyncio
from src.services.ticker_data import get_yfinance_stock
from src.cache.redis_conn import cache_manager

load_dotenv()


def get_ticker_info():
    TICKER = "HDFCBANK"
    EXG = "NSE"
    res = get_stock_data(TICKER, EXG)
    print(res)


def redis_cleanup():

    r = redis.Redis.from_url(os.getenv("REDIS_URL"))
    # r = redis.Redis(host="host.docker.internal", port=6379)
    print(r)
    r.flushdb()


async def main():
    cache_manager.initialize()
    ttl = await is_ttl_valid("HDFCBANK.NS")
    print(ttl)
    # get_ticker_info()
    # redis_cleanup()
    # res = await get_yfinance_stock("HDFCBANK", "NSE")
    # print(res)


if __name__ == "__main__":
    asyncio.run(main())
