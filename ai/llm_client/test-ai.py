import sys
from pathlib import Path

# Project root ko sys.path mein shamil karein taake kisi bhi folder se run karne par 'ai' import ho sake
ROOT_DIR = Path(__file__).resolve().parent.parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

try:
    from ai.llm_client.client import ask_claude
except ModuleNotFoundError:
    from client import ask_claude

if __name__ == "__main__":
    print("Sending request to Claude API...")
    try:
        result = ask_claude(
            stats_summary="Total revenue: $500,000. Top segment: VIP (35 customers).",
            question="Business kaisa chal raha hai?"
        )
        print("\n--- Response from Claude ---")
        print(result)
    except Exception as e:
        print(f"\n[API Error occurred]: {e}")
        if "API key is invalid" in str(e) or "authentication_error" in str(e):
            print("\n[Wajah / Reason]:")
            print("1. Anthropic API ko request chali gayi hai lekin API ne '401 - API key is invalid' return kiya hai.")
            print("2. Aapki .env file mein mojood key valid Anthropic key nahi hai.")
            print("   Anthropic ki official API keys 'sk-ant-api03-...' se shuru hoti hain.")
            print("   Barahe karam Console (console.anthropic.com) se apni sahi Anthropic API key copy karke .env file mein update karein:")
            print("   ANTHROPIC_API_KEY=sk-ant-api03-xxxx...")

