from typing import Optional
from enum import Enum
from pydantic import BaseModel, EmailStr, ConfigDict

class UserRole(str, Enum):
    BASIC = "Basic User"
    ADMIN = "Admin User"

# Shared properties
class UserBase(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    team_id: Optional[str] = None
    # Flat API fields (Computed)
    team_name: Optional[str] = None
    art_id: Optional[str] = None
    art_name: Optional[str] = None

# Properties to receive on creation
class UserCreate(UserBase):
    name: str
    role: Optional[str] = None
    id: Optional[str] = None # We might allow setting ID manually to match frontend mock or generate it

# Properties to receive on update
class UserUpdate(UserBase):
    pass

# Properties shared by models stored in DB
class UserInDBBase(UserBase):
    id: str
    
    model_config = ConfigDict(from_attributes=True)

# Properties to return to client
class User(UserInDBBase):
    pass
