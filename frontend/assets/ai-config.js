/**
 * AI Configuration for Master OSINT
 * 
 * Uses Hugging Face Inference API (free tier)
 * Model: Mistral-7B-Instruct (lightweight, fast, free)
 * 
 * Get your free token at: https://huggingface.co/settings/tokens
 * (Create a "read" token and replace the demo token in app.js)
 */

const AI_CONFIG = {
  model: "mistralai/Mistral-7B-Instruct-v0.1",
  endpoint: "https://api-inference.huggingface.co/models/",
  maxLength: 150,
  timeout: 30000,
  
  // System prompt for OSINT context
  systemPrompt: `You are an expert OSINT analyst assistant. Help users understand:
- Public data analysis techniques
- Digital footprint interpretation
- Ethical open-source intelligence gathering
- Relationship mapping and correlation
Keep responses concise (150 words max) and focused on methodology.`
};

// Alternative free models to try:
// - "distilgpt2" - very lightweight, best for speed
// - "gpt2" - good balance of quality and speed
// - "TheBloke/Mistral-7B-Instruct-v0.1-GGUF" - requires GGUF runtime
// - "meta-llama/Llama-2-7b-chat-hf" - quality but slower

export default AI_CONFIG;