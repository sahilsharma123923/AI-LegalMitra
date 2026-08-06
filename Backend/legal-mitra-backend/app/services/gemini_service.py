import os
import google.generativeai as genai

from app.config import GEMINI_API_KEY


class GeminiService:

    def __init__(self):

        print("Creating GeminiService...")

        self.model = None
        self.api_key = (
            GEMINI_API_KEY
            or os.getenv("GEMINI_API_KEY")
        )

        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel("gemini-2.0-flash")
            print("GeminiService ready.")
        else:
            print("GeminiService created without a configured API key; chat will fall back to a friendly message.")

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
9. Do not write "Source 1", "Source 2", etc.
10. Do not write the source or page in the middle of the answer.
11. At the VERY END, write exactly ONE source line in this format:

Source: FILE_NAME | Page: PAGE_NUMBER

12. Choose the source and page that most directly supports your answer.
13. If multiple retrieved documents exist, choose only the most relevant one for the final source line.
14. If the answer is not available in the provided legal documents, say:

I could not find this information in the provided legal documents.

USER QUESTION:

{question}

LEGAL DOCUMENT CONTEXT:

{context}

Now answer the question clearly and completely.

Remember:
- Answer first.
- Source line must be LAST.
- Only ONE source/page line.
"""

        # =========================================
        # GEMINI
        # =========================================

        if not self.model:
            return (
                "The legal assistant is not configured with an LLM API key yet. "
                "Please add GEMINI_API_KEY to the backend environment to enable chat responses."
            )

        response = self.model.generate_content(prompt)

        answer = response.text

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