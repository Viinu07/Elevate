
from datetime import datetime
from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base_class import Base

class Event(Base):
    id: Mapped[str] = mapped_column(primary_key=True, index=True)
    name: Mapped[str]
    date_time: Mapped[datetime] = mapped_column(DateTime)
    meeting_link: Mapped[str]
    organizer_id: Mapped[str] = mapped_column(ForeignKey("user.id", ondelete="CASCADE"), index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    
    # Relationship
    organizer: Mapped["User"] = relationship("User", foreign_keys=[organizer_id])
    
    @property
    def organizer_name(self) -> str:
        return self.organizer.name if self.organizer else "Unknown"
