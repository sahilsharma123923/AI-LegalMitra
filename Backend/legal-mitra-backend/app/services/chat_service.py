from app.database import SessionLocal
from app.models import ChatHistory, Conversation
from app.services.rag_service import RAGService
from app.services.groq_service import GroqService


class ChatService:

    def __init__(self):

        print("Creating ChatService...")

        self.rag_service = RAGService()
        self.groq_service = GroqService()
        print("ChatService ready.")

    def generate_response(self, question: str, user_id: int):

        print("\n========================================")
        print("CHAT SERVICE")
        print("========================================")

        print("Question:", question)

        # RAG
        laws = self.rag_service.search_laws(question)

        print("Retrieved documents:", len(laws))

        # LLM
        answer = self.groq_service.generate_answer(
            question,
            laws
        )

        # Database
        db = SessionLocal()

        try:

            conversation = Conversation(
                user_id=user_id,
                title=question[:30]
            )

            db.add(conversation)
            db.commit()
            db.refresh(conversation)

            chat = ChatHistory(
                user_id=user_id,
                conversation_id=conversation.id,
                question=question,
                answer=answer
            )

            db.add(chat)
            db.commit()

            print("Chat history saved successfully.")

        except Exception as e:

            db.rollback()

            print("Database error:", e)

            raise

        finally:
            db.close()

        print("========================================\n")

        return answer