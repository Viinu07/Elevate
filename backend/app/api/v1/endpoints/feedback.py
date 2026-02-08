
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app import crud, schemas
from app.api import deps

router = APIRouter()


@router.get("/received", response_model=List[schemas.Feedback])
async def get_received_feedback(
    db: AsyncSession = Depends(deps.get_db),
    user_id: str = Query(..., description="User ID to get received feedback for"),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Get feedback received by a specific user.
    """
    feedbacks = await crud.feedback.get_received(db, user_id=user_id, skip=skip, limit=limit)
    return feedbacks


@router.get("/sent", response_model=List[schemas.Feedback])
async def get_sent_feedback(
    db: AsyncSession = Depends(deps.get_db),
    user_id: str = Query(..., description="User ID to get sent feedback for"),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Get feedback sent by a specific user.
    """
    feedbacks = await crud.feedback.get_sent(db, user_id=user_id, skip=skip, limit=limit)
    return feedbacks


@router.post("/", response_model=schemas.Feedback)
async def create_feedback(
    *,
    db: AsyncSession = Depends(deps.get_db),
    feedback_in: schemas.FeedbackCreate,
) -> Any:
    """
    Create new feedback. Both from_user_id and to_user_id are provided in the request body.
    """
    feedback = await crud.feedback.create(db, obj_in=feedback_in)
    return feedback
