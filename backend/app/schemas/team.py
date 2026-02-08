
from typing import List, Optional
from pydantic import BaseModel, ConfigDict

from .user import User, UserInTeam

# ... (Previous content kept)

class Team(TeamInDBBase):
    members: List[UserInTeam] = []
