from sqlalchemy import (
    Column,
    String,
    Text,
    Float,
    Integer,
    TIMESTAMP,
    ForeignKey,
    ARRAY,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from src.db.db import Base
import uuid


class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ticker = Column(String(20), nullable=False)
    exchange = Column(String(5), nullable=False)
    verdict = Column(String(10))
    final_summary = Column(Text)
    judge_score = Column(Float)
    judge_reasoning = Column(Text)
    total_latency_ms = Column(Integer)
    total_tokens_used = Column(Integer)
    created_at = Column(TIMESTAMP, server_default=func.now())
    
    agent_outputs = relationship("AgentOutput", back_populates = "analysis")
    

class AgentOutput(Base):
    __tablename__="agent_outputs"
    
    
    id=Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    analysis_id = Column(UUID(as_uuid=True), ForeignKey("analyses.id"), nullable=False)
    agent_name = Column(String(50), nullable=False)
    findings = Column(ARRAY(Text))
    confidence_score = Column(Float)
    latency_ms = Column(Integer)
    tokens_used = Column(Integer)
    created_at = Column(TIMESTAMP,server_default=func.now())
    
    analysis = relationship("Analysis", back_populates="agent_outputs")

class Document(Base):
    __tablename__="documents"
    
    id=Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ticker = Column(String(20), nullable=False)
    filename=Column(String(255))
    chunk_count=Column(Integer)
    file_size_bytes=Column(Integer)
    uploaded_at=Column(TIMESTAMP, server_default=func.now())
    