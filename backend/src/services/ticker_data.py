import yfinance as yf
import json

def get_indian_stock_summary(ticker_symbol: str):
    """
    Fetches comprehensive fundamental summary for an Indian ticker.
    Example input: 'RELIANCE.NS' or 'HDFCBANK.NS'
    """
    try:
        ticker = yf.Ticker(ticker_symbol)
        info = ticker.info
        
        # Filter down the payload so you don't overwhelm the agent's context window
        summary = {
            "company_name": info.get("longName"),
            "industry": info.get("industry"),
            "business_summary": info.get("longBusinessSummary"),
            "market_cap_inr": info.get("marketCap"),
            "trailing_pe": info.get("trailingPE"),
            "price_to_book": info.get("priceToBook"),
            "forward_pe": info.get("forwardPE"),
            "dividend_yield": info.get("dividendYield"),
            "roea": info.get("returnOnEquity"),
            "total_revenue": info.get("totalRevenue"),
            "gross_profits": info.get("grossProfits"),
            "debt_to_equity": info.get("debtToEquity")
        }
        return json.dumps(summary, indent=2)
    except Exception as e:
        return f"Error fetching data: {str(e)}"

# Print the payload you will pass to the AI Agent
print(get_indian_stock_summary("INFY.NS"))