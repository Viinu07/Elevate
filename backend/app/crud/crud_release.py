from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.crud.base import CRUDBase
from app.models.release import ReleaseWorkItem
from app.schemas.release import ReleaseWorkItemCreate, ReleaseWorkItemUpdate

class CRUDReleaseWorkItem(CRUDBase[ReleaseWorkItem, ReleaseWorkItemCreate, ReleaseWorkItemUpdate]):
    pass

release_work_item = CRUDReleaseWorkItem(ReleaseWorkItem)
