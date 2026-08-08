import os
from langchain_groq import ChatGroq

from app.config import GROQ_API_KEY


class GroqService:

    def __init__(self):

        print("Creating GroqService...")

        self.model = None
        self.api_key = (
            GROQ_API_KEY
            or os.getenv("GROQ_API_KEY")
        )

        if self.api_key:
            self.model = ChatGroq(
                api_key=self.api_key,
                model="llama-3.3-70b-versatile"
            )
            print("GroqService ready.")
        else:
            print("GroqService created without a configured API key; chat will fall back to a friendly message.")

    def generate_answer(self, question: str, laws):

        # =========================================
        # RAG DOCUMENT CONTEXT
        # =========================================

        context_parts = []

        for i, doc in enumerate(laws):

            source = doc.metadata.get(
                "source",
                "Unknown"
            )

            page = doc.metadata.get(
                "page",
                "Unknown"
            )

            context_parts.append(
                f"""
DOCUMENT {i + 1}

SOURCE FILE:
{source}

PAGE:
{page}

CONTENT:
{doc.page_content}
"""
            )

        context = "\n".join(context_parts)

        # =========================================
        # DEBUG
        # =========================================

        print("\n========================================")
        print("CONTEXT SENT TO LLM")
        print("========================================")
        print(context[:8000])
        print("========================================")

        # =========================================
        # PROMPT
        # =========================================

        prompt = f"""
You are Legal Mitra, a legal information assistant.

Answer the user's question ONLY using the legal documents provided below.

STRICT RULES:

1. Answer only from the provided legal context.
2. Do not invent any legal fact.
3. Do not invent section numbers.
4. Do not invent punishments.
5. Do not use outside knowledge.
6. Give a complete and clear answer to the user's question.
7. Use simple English.
8. Do not mention that you are an AI.
9. Do not mention the source file name or page number anywhere in the answer.
10. Do not add any citation, reference, or source line at the end.
11. Format your answer clearly:
    - Break the answer into short paragraphs (2-3 sentences each), OR
    - Use bullet points (starting with "- ") when listing multiple rights, rules, or steps.
    - Leave a blank line between paragraphs or bullet points.
12. Just answer the user's question directly and completely.
13. If the answer is not available in the provided legal documents, say:

I could not find this information in the provided legal documents.

USER QUESTION:

{question}

LEGAL DOCUMENT CONTEXT:

{context}

Now answer the question clearly and completely.

Remember:
- Only answer the user's question.
- Do not include any source, file name, or page number in your response.
- Format with short paragraphs or bullet points, with blank lines between them.
"""

        # =========================================
        # GROQ
        # =========================================

        if not self.model:
            return (
                "The legal assistant is not configured with an LLM API key yet. "
                "Please add GROQ_API_KEY to the backend environment to enable chat responses."
            )

        response = self.model.invoke(prompt)

        answer = response.content

        # =========================================
        # CLEAN ANSWER
        # =========================================

        answer = answer.strip()

        print("\n========================================")
        print("LLM ANSWER")
        print("========================================")
        print(answer)
        print("========================================")

        return answer