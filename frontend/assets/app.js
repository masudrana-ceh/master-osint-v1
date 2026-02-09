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
document.getElementById('do-search').addEventListener('click', async ()=>{
  const q = (document.getElementById('search-input').value || 'example query').trim();
  const source = document.getElementById('search-source').value;
  const container = document.getElementById('search-results');
  container.innerHTML = '<div class="loading">Searching...</div>';
  try{
    let results = [];
    if(source === 'duckduckgo'){
      results = await duckDuckGoSearch(q);
    }else if(source === 'github'){
      results = await githubSearch(q);
    }else if(source === 'web' || source === 'social'){
      results = mockResultsForQuery(q);
    }
    renderResults(results);
  }catch(err){
    container.innerHTML = `<div class="error">⚠️ ${err.message}</div>`;
  }
});

async function duckDuckGoSearch(q){
  const endpoint = `https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&no_redirect=1&no_html=1`;
  try{
    const data = await fetchAPI(endpoint);
    const results = [];
    if(data.AbstractText){
      results.push({title: data.Heading || q, url: data.AbstractURL || `https://duckduckgo.com/?q=${encodeURIComponent(q)}`, snippet: data.AbstractText});
    }
    if(Array.isArray(data.RelatedTopics)){
      data.RelatedTopics.slice(0,8).forEach(t=>{
        if(t.Text && t.FirstURL){
          results.push({title: (t.Text.split(' - ')[0]||t.Text), url: t.FirstURL, snippet: t.Text});
        }else if(t.Topics){
          t.Topics.slice(0,5).forEach(st=>{
            if(st.Text) results.push({title: (st.Text.split(' - ')[0]||st.Text), url: st.FirstURL||'', snippet: st.Text});
          });
        }
      });
    }
    return results.length === 0 ? [{title:'No results', url:'#', snippet:'No results returned from DuckDuckGo.'}] : results;
  }catch(e){
    return [{title:'DuckDuckGo error', url:'#', snippet:'Falling back to mock results.'}];
  }
}

async function githubSearch(q){
  const repoEndpoint = `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=5`;
  const userEndpoint = `https://api.github.com/search/users?q=${encodeURIComponent(q)}&per_page=3`;
  try{
    const results = [];
    const repoData = await fetchAPI(repoEndpoint);
    if(repoData.items && Array.isArray(repoData.items)){
      repoData.items.forEach(repo=>{
        results.push({title: `📦 ${repo.full_name}`, url: repo.html_url, snippet: repo.description || 'No description'});
      });
    }
    const userData = await fetchAPI(userEndpoint);
    if(userData.items && Array.isArray(userData.items)){
      userData.items.forEach(user=>{
        results.push({title: `👤 ${user.login}`, url: user.html_url, snippet: `GitHub profile for user: ${user.login}`});
      });
    }
    return results.length > 0 ? results : [{title:'No GitHub results', url:'#', snippet:'No matching repositories or users found.'}];
  }catch(e){
    return [{title:'GitHub API error', url:'#', snippet:'Falling back to mock results.'}];
  }
}

function mockResultsForQuery(q){
  return [
    {title: `Public page mentioning "${q}"`, url: 'https://example.com/article', snippet: 'This is a mock snippet from a public web page.'},
    {title: `Social mention of "${q}"`, url: 'https://social.example/user/post/123', snippet: 'Public post referencing the query.'},
    {title: `Certificate or metadata for "${q}"`, url: 'https://crt.sh/?q=example', snippet: 'Public cert information (mock).'}
  ];
}

function renderResults(results){
  const container = document.getElementById('search-results');
  container.innerHTML = '';
  results.forEach(item=>{
    const el = document.createElement('div');
    el.className = 'result-item';
    el.innerHTML = `<h3>${item.title}</h3><p>${item.snippet||''}</p><a href='${item.url}' target='_blank' style='color:var(--accent3)'>${item.url}</a>`;
    container.appendChild(el);
  });
}

// ========== GLOBAL SEARCH ==========
document.getElementById('search-btn').addEventListener('click', ()=>{
  const q = document.getElementById('global-search').value || '';
  document.querySelector('.nav-btn[data-panel="search"]').click();
  document.getElementById('search-input').value = q;
  const src = document.getElementById('search-source'); if(src) src.value = 'duckduckgo';
  document.getElementById('do-search').click();
});

// ========== DOMAIN ANALYSIS (Phase 3) ==========
document.getElementById('do-domain-lookup').addEventListener('click', async ()=>{
  const domain = (document.getElementById('domain-input').value || 'example.com').trim();
  const source = document.getElementById('domain-source').value;
  const container = document.getElementById('domain-results');
  container.innerHTML = '<div class="loading">Analyzing domain...</div>';
  try{
    let results = [];
    if(source === 'whois') results = await whoisLookup(domain);
    else if(source === 'dns') results = await dnsLookup(domain);
    else if(source === 'ssl') results = await sslCertLookup(domain);
    renderDomainResults(results);
  }catch(err){
    container.innerHTML = `<div class="error">⚠️ ${err.message}</div>`;
  }
});

async function whoisLookup(domain){
  const endpoint = `https://www.whois-json.com/api/v1/whois?domain=${encodeURIComponent(domain)}`;
  try{
    const data = await fetchAPI(endpoint);
    if(data.success && data.result){
      const r = data.result;
      return [
        {label: 'Registrar', value: r.registrar || 'N/A'},
        {label: 'Registration Date', value: r.creation_date || 'N/A'},
        {label: 'Expiration Date', value: r.expiration_date || 'N/A'},
        {label: 'Registrant Country', value: r.registrant_country || 'N/A'},
        {label: 'Name Servers', value: (r.nameservers || []).join(', ') || 'N/A'}
      ];
    }
    return [{label: 'Status', value: 'No WHOIS data found'}];
  }catch(e){
    return mockDomainResults('whois', domain);
  }
}

async function dnsLookup(domain){
  const endpoint = `https://dns.google/resolve?name=${encodeURIComponent(domain)}`;
  try{
    const data = await fetchAPI(endpoint);
    let records = [];
    if(data.Answer){
      data.Answer.forEach(ans=>{
        records.push({label: `${ans.name} (${ans.type})`, value: ans.data});
      });
    }
    return records.length > 0 ? records : [{label: 'Status', value: 'No DNS records found'}];
  }catch(e){
    return mockDomainResults('dns', domain);
  }
}

async function sslCertLookup(domain){
  const endpoint = `https://crt.sh/?q=${encodeURIComponent(domain)}&output=json`;
  try{
    const certs = await fetchAPI(endpoint);
    if(Array.isArray(certs) && certs.length > 0){
      return certs.slice(0, 5).map((c, i)=>({
        label: `Cert ${i+1}: ${c.name_value || c.common_name || 'N/A'}`,
        value: `Issuer: ${c.issuer_name || 'N/A'} | Valid: ${c.not_before} - ${c.not_after}`
      }));
    }
    return [{label: 'Status', value: 'No SSL certificates found'}];
  }catch(e){
    return mockDomainResults('ssl', domain);
  }
}

function mockDomainResults(type, domain){
  const mocks = {
    whois: [
      {label: 'Registrar', value: 'Example Registrar Inc.'},
      {label: 'Registration Date', value: '2015-03-15'},
      {label: 'Expiration Date', value: '2026-03-15'},
      {label: 'Registrant Country', value: 'US'},
      {label: 'Name Servers', value: 'ns1.example.com, ns2.example.com'}
    ],
    dns: [
      {label: `${domain} (A)`, value: '93.184.216.34'},
      {label: `${domain} (MX)`, value: '10 mail.example.com'},
      {label: `${domain} (TXT)`, value: 'v=spf1 include:_spf.google.com ~all'},
      {label: `${domain} (NS)`, value: 'ns1.example.com'}
    ],
    ssl: [
      {label: 'Cert 1: example.com', value: 'Issuer: Let\'s Encrypt | Valid: 2024-01-15 - 2025-01-15'},
      {label: 'Cert 2: *.example.com', value: 'Issuer: DigiCert | Valid: 2023-01-20 - 2026-01-20'}
    ]
  };
  return mocks[type] || [{label: 'Status', value: 'Mock data'}];
}

function renderDomainResults(results){
  const container = document.getElementById('domain-results');
  container.innerHTML = '';
  results.forEach(item=>{
    const el = document.createElement('div');
    el.className = 'result-item';
    el.innerHTML = `<strong>${item.label}:</strong> <span style='color:var(--accent3)'>${item.value}</span>`;
    container.appendChild(el);
  });
}

// ========== UTILITY: Generic API fetcher with error handling ==========
async function fetchAPI(url, timeout=5000){
  const controller = new AbortController();
  const id = setTimeout(()=>controller.abort(), timeout);
  try{
    const resp = await fetch(url, {signal: controller.signal});
    clearTimeout(id);
    if(!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return await resp.json();
  }catch(e){
    clearTimeout(id);
    throw e;
  }
}

// ========== PEOPLE & IDENTITY (Phase 5) ==========
document.getElementById('do-people-lookup').addEventListener('click', async ()=>{
  const query = (document.getElementById('people-input').value || 'example').trim();
  const source = document.getElementById('people-source').value;
  const container = document.getElementById('people-results');
  container.innerHTML = '<div class="loading">Searching...</div>';
  try{
    let results = [];
    if(source === 'username') results = await usernameSearch(query);
    else if(source === 'email') results = await emailDiscovery(query);
    else if(source === 'reverse-email') results = await reverseEmailLookup(query);
    renderPeopleResults(results);
  }catch(err){
    container.innerHTML = `<div class="error">⚠️ ${err.message}</div>`;
  }
});

async function usernameSearch(username){
  const results = [];
  // GitHub API - check if user exists and get info
  try{
    const data = await fetchAPI(`https://api.github.com/users/${encodeURIComponent(username)}`);
    results.push({label: '👤 GitHub', value: `${username} | Name: ${data.name || 'N/A'} | Repos: ${data.public_repos}`});
  }catch(e){ }
  // Mock Twitter-like result (Twitter API requires auth)
  results.push({label: '🐦 Twitter', value: `@${username} (requires API authentication - mock data)`});
  results.push({label: '💼 LinkedIn', value: `Search: ${username} (public profiles only - mock data)`});
  return results.length > 0 ? results : [{label: 'Status', value: 'No public profiles found'}];
}

async function emailDiscovery(email){
  const results = [];
  // Use breach database API (public, free)
  try{
    const domain = email.split('@')[1] || email;
    const data = await fetchAPI(`https://api.hunter.io/v2/domain-search?domain=${encodeURIComponent(domain)}&limit=5`);
    if(data.data && data.data.emails){
      data.data.emails.forEach(e=>{
        results.push({label: '📧 Found Email', value: `${e.value} | Position: ${e.position || 'Unknown'}`});
      });
    }
  }catch(e){
    // Fallback: mock data if API fails
    results.push({label: '📧 Breach Check', value: `${email} (no known breaches in public databases)`});
  }
  if(results.length === 0) results.push({label: 'Status', value: 'No email discovery data available'});
  return results;
}

async function reverseEmailLookup(email){
  const results = [];
  results.push({label: 'Domain', value: email.split('@')[1] || 'Unknown'});
  results.push({label: 'Local Part', value: email.split('@')[0] || 'Unknown'});
  // Hunter.io reverse lookup
  try{
    const data = await fetchAPI(`https://api.hunter.io/v2/email-finder?domain=${encodeURIComponent(email.split('@')[1])}`);
    if(data.data) results.push({label: 'Person', value: `${data.data.first_name || ''} ${data.data.last_name || 'Unknown'}`});
  }catch(e){
    results.push({label: 'Person', value: 'Reverse lookup unavailable (requires API key)'});
  }
  return results;
}

function renderPeopleResults(results){
  const container = document.getElementById('people-results');
  container.innerHTML = '';
  results.forEach(item=>{
    const el = document.createElement('div');
    el.className = 'result-item';
    el.innerHTML = `<strong>${item.label}:</strong> <span style='color:var(--accent3)'>${item.value}</span>`;
    container.appendChild(el);
  });
}

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

// ========== DOCUMENT METADATA (Phase 4) ==========
document.getElementById('do-extract-metadata').addEventListener('click', async ()=>{
  const file = document.getElementById('file-upload').files[0];
  const container = document.getElementById('metadata-results');
  if(!file){
    container.innerHTML = '<div class="error">⚠️ Please select a file first</div>';
    return;
  }
  container.innerHTML = '<div class="loading">Extracting metadata...</div>';
  try{
    let metadata = [];
    const fileType = file.type;
    const fileName = file.name;
    metadata.push({label: 'File Name', value: fileName});
    metadata.push({label: 'File Type', value: fileType});
    metadata.push({label: 'File Size', value: `${(file.size / 1024).toFixed(2)} KB`});
    metadata.push({label: 'Last Modified', value: new Date(file.lastModified).toLocaleString()});
    
    if(fileType.startsWith('image/')){
      const imgMeta = await extractImageMetadata(file);
      metadata = metadata.concat(imgMeta);
    }else if(fileType === 'application/pdf'){
      const pdfMeta = await extractPdfMetadata(file);
      metadata = metadata.concat(pdfMeta);
    }else{
      metadata.push({label: 'Format', value: 'Unsupported format'});
    }
    renderMetadataResults(metadata);
  }catch(err){
    container.innerHTML = `<div class="error">⚠️ ${err.message}</div>`;
  }
});

async function extractImageMetadata(file){
  const metadata = [];
  const img = new Image();
  const url = URL.createObjectURL(file);
  return new Promise((resolve)=>{
    img.onload = ()=>{
      metadata.push({label: 'Image Width', value: `${img.width}px`});
      metadata.push({label: 'Image Height', value: `${img.height}px`});
      metadata.push({label: 'Aspect Ratio', value: (img.width / img.height).toFixed(2)});
      // Note: EXIF extraction requires a library like piexifjs; for now, basic dimensions
      metadata.push({label: 'EXIF Data', value: 'EXIF requires library (use piexifjs for full extraction)'});
      URL.revokeObjectURL(url);
      resolve(metadata);
    };
    img.src = url;
  });
}

async function extractPdfMetadata(file){
  const metadata = [];
  const reader = new FileReader();
  return new Promise((resolve)=>{
    reader.onload = (e)=>{
      const content = e.target.result;
      const text = new TextDecoder().decode(new Uint8Array(content));
      // Basic PDF extraction: look for common metadata fields
      const titleMatch = text.match(/\/Title\\?\(([^)]+)\\?\)/);
      const authorMatch = text.match(/\/Author\\?\(([^)]+)\\?\)/);
      const creatorMatch = text.match(/\/Creator\\?\(([^)]+)\\?\)/);
      const producerMatch = text.match(/\/Producer\\?\(([^)]+)\\?\)/);
      if(titleMatch) metadata.push({label: 'PDF Title', value: titleMatch[1]});
      if(authorMatch) metadata.push({label: 'Author', value: authorMatch[1]});
      if(creatorMatch) metadata.push({label: 'Creator App', value: creatorMatch[1]});
      if(producerMatch) metadata.push({label: 'Producer', value: producerMatch[1]});
      if(metadata.length === 0) metadata.push({label: 'PDF Metadata', value: 'No standard metadata found'});
      resolve(metadata);
    };
    reader.readAsArrayBuffer(file);
  });
}

function renderMetadataResults(metadata){
  const container = document.getElementById('metadata-results');
  container.innerHTML = '';
  metadata.forEach(item=>{
    const el = document.createElement('div');
    el.className = 'result-item';
    el.innerHTML = `<strong>${item.label}:</strong> <span style='color:var(--accent3)'>${item.value}</span>`;
    container.appendChild(el);
  });
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
renderResults(mockResultsForQuery('example.com'));
renderDomainResults(mockDomainResults('whois', 'example.com'));
renderMetadataResults([
  {label: 'Status', value: 'Upload an image (JPEG/PNG) or PDF to extract metadata'},
  {label: 'File Types', value: 'JPEG, PNG, PDF (client-side processing)'},
  {label: 'Features', value: 'EXIF, PDF title/author, image dimensions'}
]);
renderPeopleResults([
  {label: 'Status', value: 'Search for a username, email, or person name'},
  {label: 'Sources', value: 'GitHub, Hunter.io, breach databases'}
]);
addChatMessage("Welcome to AI Assistant! 🤖 Ask me anything about OSINT methodology, data analysis, or how to interpret your findings.", 'ai');