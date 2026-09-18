import os
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

client = Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY"),
    base_url="https://api.hcnsec.cn"
)

def ask_claude(stats_summary: str, question: str) -> str:
    message = client.messages.create(
        model="step-3.7-flash",
        max_tokens=4096,
        messages=[
            {
                "role": "user",
                "content": f"Tum ek business analyst ho. Yahan business data hai:\n\n{stats_summary}\n\nUser ka sawal: {question}\n\nIs data ke hisab se, clear aur concise jawab do."
            }
        ]
    )
    return message.content[0].text

result = ask_claude("Total revenue: $500,000. Top segment: VIP (35 customers).", "Business kaisa chal raha hai?")
print("\n--- Final Result ---")
print(result)