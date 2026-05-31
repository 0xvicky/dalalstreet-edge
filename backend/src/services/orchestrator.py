from typing import TypedDict
from langgraph.graph import StateGraph, END, START


#shared state
class GraphState(TypedDict):
    user_inp:str
    sentiment:str
    final_response:str
    


    

