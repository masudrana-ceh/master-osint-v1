// ========== UI ROUTING ==========
document.querySelectorAll('.nav-btn').forEach(btn=>{
  btn.addEventListener('click',e=>{
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const panel = btn.dataset.panel;
    document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
    const target = document.getElementById('panel-'+panel);
    if(target) target.classList.add('active');
  })
});

// ========== SEARCH MODULE ==========
document.getElementById('do-search').addEventListener('click', ()=>{
  const q = document.getElementById('search-input').value || 'example query';
  showMockResults(q);
});

function showMockResults(q){
  const container = document.getElementById('search-results');
  container.innerHTML = '';
  const mock = [
    {title: `Public page mentioning "${q}"`, url: 'https://example.com/article', snippet: 'This is a mock snippet from a public web page.'},
    {title: `Social mention of "${q}"`, url: 'https://social.example/user/post/123', snippet: 'Public post referencing the query.'},
    {title: `Certificate or metadata for "${q}"`, url: 'https://crt.sh/?q=example', snippet: 'Public cert information (mock).'}
  ];
  mock.forEach(item=>{
    const el = document.createElement('div');
    el.className = 'result-item';
    el.innerHTML = `<h3>${item.title}</h3><p>${item.snippet}</p><a href='${item.url}' target='_blank' style='color:var(--accent3)'>${item.url}</a>`;
    container.appendChild(el);
  });
}

// ========== GLOBAL SEARCH ==========
document.getElementById('search-btn').addEventListener('click', ()=>{
  const q = document.getElementById('global-search').value || '';
  document.querySelector('.nav-btn[data-panel="search"]').click();
  document.getElementById('search-input').value = q;
  showMockResults(q || 'example.com');
});

// ========== AI ASSISTANT ==========
const chatWindow = document.getElementById('ai-chat');
const aiInput = document.getElementById('ai-input');
const aiSend = document.getElementById('ai-send');

aiSend.addEventListener('click', sendAIMessage);
aiInput.addEventListener('keypress', (e)=>{ if(e.key==='Enter') sendAIMessage(); });

async function sendAIMessage(){
  const text = aiInput.value.trim();
  if(!text) return;
  
  aiInput.value = '';
  addChatMessage(text, 'user');
  addChatMessage('Analyzing your request...', 'ai-loading');
  
  const lastMsg = chatWindow.lastChild;
  try{
    const response = await queryHuggingFace(text);
    if(lastMsg) lastMsg.remove();
    addChatMessage(response, 'ai');
  }catch(err){
    if(lastMsg) lastMsg.remove();
    addChatMessage(`⚠️ Error: ${err.message}. Try shorter queries or check your internet.`, 'ai');
  }
}

function addChatMessage(text, role){
  const msg = document.createElement('div');
  msg.className = `chat-message ${role}`;
  msg.textContent = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function queryHuggingFace(prompt){
  // Free API endpoint using a lightweight model
  const model = "mistralai/Mistral-7B-Instruct-v0.1";
  const endpoint = `https://api-inference.huggingface.co/models/${model}`;
  
  // Using a demo token (limited rate limit - for demo only)
  // For production, use your own free token from huggingface.co/settings/tokens
  const token = "HUGGINGFACE_REMOVED";
  
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: { max_length: 150 }
    })
  });
  
  if(!response.ok){
    if(response.status === 429) throw new Error("Rate limit reached - try again in a moment");
    if(response.status === 503) throw new Error("Model loading - please wait and retry");
    throw new Error(`API error: ${response.status}`);
  }
  
  const data = await response.json();
  if(Array.isArray(data) && data[0]?.generated_text){
    let text = data[0].generated_text;
    text = text.replace(prompt, '').trim();
    return text || "Request processed.";
  }
  return "Received response from AI.";
}

// ========== INIT ==========
showMockResults('example.com');
addChatMessage("Welcome to AI Assistant! 🤖 Ask me anything about OSINT methodology, data analysis, or how to interpret your findings.", 'ai');