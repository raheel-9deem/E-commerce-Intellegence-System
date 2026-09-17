from ai.llm_client.client import ask_claude

result = ask_claude("Total revenue: $500,000. Top segment: VIP (35 customers).", "Business kaisa chal raha hai?")
print(result)