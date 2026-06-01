import yfinance as yf
from typing import Optional
from src.cache.redis_conn import cache_manager
from fastapi import Depends

import redis


def format_ticker(ticker: str, exchange: str) -> str:
    """Convert user input to yfinance format."""
    ticker = ticker.upper().strip()
    # if already has suffix leave it
    if "." in ticker:
        return ticker
    suffix = ".NS" if exchange.upper() == "NSE" else ".BO"
    return f"{ticker}{suffix}"


def get_stock_data(ticker: str, exchange: str) -> dict:
    """
    Fetch fundamental data for an Indian stock.
    Returns structured dict for agent consumption.

    Args:
        ticker: e.g. "RELIANCE" or "INFY"
        exchange: "NSE" or "BSE"
    """
    formatted = format_ticker(ticker, exchange)

    try:
        stock = yf.Ticker(formatted)
        info = stock.info

        # validate — yfinance returns empty dict for bad tickers
        if not info or info.get("regularMarketPrice") is None:
            return {
                "success": False,
                "error": f"Ticker '{ticker}' not found on {exchange}. Check the symbol.",
            }

        return {
            "success": True,
            "ticker": ticker,
            "exchange": exchange,
            "formatted_ticker": formatted,
            # company basics
            "company_name": info.get("longName"),
            "sector": info.get("sector"),
            "industry": info.get("industry"),
            "business_summary": info.get("longBusinessSummary"),
            "website": info.get("website"),
            "employee_count": info.get("fullTimeEmployees"),
            # valuation
            "market_cap": info.get("marketCap"),
            "current_price": info.get("regularMarketPrice"),
            "trailing_pe": info.get("trailingPE"),
            "forward_pe": info.get("forwardPE"),
            "price_to_book": info.get("priceToBook"),
            "price_to_sales": info.get("priceToSalesTrailing12Months"),
            "enterprise_value": info.get("enterpriseValue"),
            "ev_to_ebitda": info.get("enterpriseToEbitda"),
            # profitability
            "return_on_equity": info.get("returnOnEquity"),  # ROE
            "return_on_assets": info.get("returnOnAssets"),  # ROA
            "profit_margins": info.get("profitMargins"),
            "operating_margins": info.get("operatingMargins"),
            "gross_margins": info.get("grossMargins"),
            "ebitda": info.get("ebitda"),
            # revenue & growth
            "total_revenue": info.get("totalRevenue"),
            "revenue_growth": info.get("revenueGrowth"),  # YoY
            "earnings_growth": info.get("earningsGrowth"),
            "earnings_quarterly_growth": info.get("earningsQuarterlyGrowth"),
            # financial health
            "total_debt": info.get("totalDebt"),
            "total_cash": info.get("totalCash"),
            "debt_to_equity": info.get("debtToEquity"),
            "current_ratio": info.get("currentRatio"),
            "quick_ratio": info.get("quickRatio"),
            "free_cashflow": info.get("freeCashflow"),
            # dividends
            "dividend_yield": info.get("dividendYield"),
            "dividend_rate": info.get("dividendRate"),
            "payout_ratio": info.get("payoutRatio"),
            # 52 week range
            "52w_high": info.get("fiftyTwoWeekHigh"),
            "52w_low": info.get("fiftyTwoWeekLow"),
            "50d_avg": info.get("fiftyDayAverage"),
            "200d_avg": info.get("twoHundredDayAverage"),
            # analyst signals
            "analyst_recommendation": info.get("recommendationKey"),  # buy/hold/sell
            "target_mean_price": info.get("targetMeanPrice"),
            "number_of_analysts": info.get("numberOfAnalystOpinions"),
        }

    except Exception as e:
        return {"success": False, "error": f"Failed to fetch data: {str(e)}"}


async def get_yfinance_stock(ticker: str, exchange: str) -> dict:
    """Fetch the data if present in cache else from external source"""

    # check if redis cache exist
    cache_key = f"{ticker}:{exchange}"
    print("here we are")
    # if exist then check if ticker present and if yes then if under valid window
    res = await cache_manager.get_data(cache_key)
    if res is None:
        print("Key doesn't exist")
        # call the api
        stock_info = get_stock_data()
