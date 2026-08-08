from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.dependencies import get_current_user
from app.models import User, ChatHistory, Conversation
from app.schemas.chat_schema import ChatRequest, ChatResponse, ChatHistoryResponse
from app.services.chat_service import ChatService


router = APIRouter()

chat_service = ChatService()


# =========================================
# CHAT
# =========================================

@router.post("/chat", response_model=ChatResponse)
def chat(
    request: ChatRequest,
    current_user: User = Depends(get_current_user)
):
    answer, conversation_id = chat_service.generate_response(
        request.question,
        current_user.id,
        request.conversation_id
    )

    return ChatResponse(
        answer=answer,
        conversation_id=conversation_id
    )


# =========================================
# CHAT HISTORY (all messages for the user)
# =========================================

@router.get("/chat/history", response_model=list[ChatHistoryResponse])
def get_chat_history(
    current_user: User = Depends(get_current_user)
):
    db = SessionLocal()

    try:
        chats = (
            db.query(ChatHistory)
            .filter(
                ChatHistory.user_id == current_user.id
            )
            .order_by(ChatHistory.created_at.desc())
            .all()
        )

        result = []

        for chat in chats:
            result.append({
                "id": chat.id,
                "question": chat.question or "",
                "answer": chat.answer or "",
                "created_at": chat.created_at
            })

        return result

    finally:
        db.close()


# =========================================
# ALL CONVERSATIONS (for Recents sidebar)
# =========================================

@router.get("/conversations")
def get_conversations(
    current_user: User = Depends(get_current_user)
):
    db: Session = SessionLocal()

    try:
        conversations = (
            db.query(Conversation)
            .filter(
                Conversation.user_id == current_user.id
            )
            .order_by(Conversation.created_at.desc())
            .all()
        )

        result = []

        for conversation in conversations:

            first_message = (
                db.query(ChatHistory)
                .filter(
                    ChatHistory.conversation_id == conversation.id
                )
                .order_by(ChatHistory.created_at.asc())
                .first()
            )

            result.append({
                "id": conversation.id,
                "title": conversation.title,
                "created_at": conversation.created_at,
                "message_id": first_message.id if first_message else None
            })

        return result

    finally:
        db.close()


# =========================================
# SINGLE CONVERSATION HISTORY
# =========================================

@router.get("/conversations/{conversation_id}")
def get_conversation_history(
    conversation_id: int,
    current_user: User = Depends(get_current_user)
):
    db: Session = SessionLocal()

    try:
        history = (
            db.query(ChatHistory)
            .filter(
                ChatHistory.conversation_id == conversation_id,
                ChatHistory.user_id == current_user.id
            )
            .order_by(ChatHistory.created_at.asc())
            .all()
        )

        return [
            {
                "id": chat.id,
                "question": chat.question,
                "answer": chat.answer,
                "created_at": chat.created_at
            }
            for chat in history
        ]

    finally:
        db.close()


# =========================================
# DELETE CONVERSATION (whole thread)
# =========================================

@router.delete("/conversations/{conversation_id}")
def delete_conversation(
    conversation_id: int,
    current_user: User = Depends(get_current_user)
):
    db: Session = SessionLocal()

    try:
        conversation = (
            db.query(Conversation)
            .filter(
                Conversation.id == conversation_id,
                Conversation.user_id == current_user.id
            )
            .first()
        )

        if not conversation:
            raise HTTPException(
                status_code=404,
                detail="Conversation not found"
            )

        db.query(ChatHistory).filter(
            ChatHistory.conversation_id == conversation_id
        ).delete()

        db.delete(conversation)
        db.commit()

        return {
            "message": "Conversation deleted successfully",
            "id": conversation_id
        }

    finally:
        db.close()


# =========================================
# UPDATE CHAT MESSAGE
# =========================================

@router.put("/chat-history/{chat_id}")
def update_chat_history(
    chat_id: int,
    question: str,
    answer: str,
    current_user: User = Depends(get_current_user)
):
    db: Session = SessionLocal()

    try:
        chat = (
            db.query(ChatHistory)
            .filter(
                ChatHistory.id == chat_id,
                ChatHistory.user_id == current_user.id
            )
            .first()
        )

        if not chat:
            raise HTTPException(
                status_code=404,
                detail="Chat history not found"
            )

        chat.question = question
        chat.answer = answer

        db.commit()
        db.refresh(chat)

        return {
            "message": "Chat history updated successfully",
            "id": chat.id,
            "question": chat.question,
            "answer": chat.answer
        }

    finally:
        db.close()


# =========================================
# DELETE CHAT MESSAGE
# =========================================

@router.delete("/chat-history/{chat_id}")
def delete_chat_history(
    chat_id: int,
    current_user: User = Depends(get_current_user)
):
    db: Session = SessionLocal()

    try:
        chat = (
            db.query(ChatHistory)
            .filter(
                ChatHistory.id == chat_id,
                ChatHistory.user_id == current_user.id
            )
            .first()
        )

        if not chat:
            raise HTTPException(
                status_code=404,
                detail="Chat history not found"
            )

        db.delete(chat)
        db.commit()

        return {
            "message": "Chat history deleted successfully",
            "id": chat_id
        }

    finally:
        db.close()