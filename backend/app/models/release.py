from typing import Optional
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Boolean, Date, BigInteger
from app.db.base_class import Base

class ReleaseWorkItem(Base):
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String, index=True)
    team_name: Mapped[str] = mapped_column(String, index=True)
    release_version: Mapped[str] = mapped_column(String, index=True)
    
    # Testing Gates
    unit_testing_checked: Mapped[bool] = mapped_column(Boolean, default=False)
    unit_testing_date: Mapped[Optional[str]] = mapped_column(String, nullable=True) # Using String for simple date storage yyyy-mm-dd
    
    system_testing_checked: Mapped[bool] = mapped_column(Boolean, default=False)
    system_testing_date: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    
    int_testing_checked: Mapped[bool] = mapped_column(Boolean, default=False)
    int_testing_date: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    
    # Compliance & Ops
    pvs_testing: Mapped[bool] = mapped_column(Boolean, default=False)
    pvs_intake_number: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    warranty_call_needed: Mapped[bool] = mapped_column(Boolean, default=False)
    confluence_updated: Mapped[bool] = mapped_column(Boolean, default=False)
    csca_intake: Mapped[str] = mapped_column(String, default="No") # 'Yes' or 'No'
