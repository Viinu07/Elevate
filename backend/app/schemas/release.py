from typing import Optional
from pydantic import BaseModel

class TestingGate(BaseModel):
    checked: bool
    date: str

class ReleaseWorkItemBase(BaseModel):
    title: str
    team_name: str
    release_version: str
    
    unit_testing_checked: bool = False
    unit_testing_date: Optional[str] = None
    
    system_testing_checked: bool = False
    system_testing_date: Optional[str] = None
    
    int_testing_checked: bool = False
    int_testing_date: Optional[str] = None
    
    pvs_testing: bool = False
    pvs_intake_number: Optional[str] = None
    warranty_call_needed: bool = False
    confluence_updated: bool = False
    csca_intake: str = "No"
    
    is_completed: bool = False
    release_date: Optional[str] = None

class ReleaseWorkItemCreate(ReleaseWorkItemBase):
    id: int # Accepting ID from frontend to match Date.now() logic if desired, or we can make it optional

class ReleaseWorkItemUpdate(ReleaseWorkItemBase):
    pass

class ReleaseWorkItem(ReleaseWorkItemBase):
    id: int

    class Config:
        from_attributes = True
