import os
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

def ask_claude(stats_summary: str, question: str) -> str:
    message = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=300,
        messages=[
            {
                "role": "user",
                "content": f"Tum ek business analyst ho. Yahan business data hai:\n\n{stats_summary}\n\nUser ka sawal: {question}\n\nIs data ke hisab se, clear aur concise jawab do."
            }
        ]
    )
    return message.content[0].text