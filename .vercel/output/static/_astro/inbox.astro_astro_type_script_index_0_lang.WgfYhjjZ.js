let r={},a=[],t=null;const g=document.getElementById("loginForm"),E=document.getElementById("adminInterface"),w=document.getElementById("loginBtn"),L=document.getElementById("logoutBtn"),i=document.getElementById("loginError"),m=document.getElementById("username"),o=document.getElementById("password"),v=document.getElementById("messageList"),F=document.getElementById("messageDetail"),I=document.getElementById("backToList"),A=document.getElementById("updateForm"),l=document.getElementById("saveStatus"),u=document.getElementById("typeFilter"),p=document.getElementById("statusFilter"),y=document.getElementById("wantsReplyFilter"),x=document.getElementById("hasReplyFilter"),B=document.getElementById("applyFiltersBtn");async function f(){const e=m.value.trim(),n=o.value.trim();if(!e||!n){c("Please enter username and password");return}r={Authorization:`Basic ${btoa(e+":"+n)}`};try{(await fetch("/api/admin/message/list",{headers:r})).ok?(g.classList.add("hidden"),E.classList.remove("hidden"),h()):(c("Invalid credentials"),r={})}catch{c("Login failed"),r={}}}function c(e){i.textContent=e,i.classList.remove("hidden"),setTimeout(()=>{i.classList.add("hidden")},3e3)}function $(){r={},a=[],t=null,E.classList.add("hidden"),g.classList.remove("hidden"),m.value="",o.value=""}async function h(){const e=new URLSearchParams;u.value!=="all"&&e.set("type",u.value),p.value!=="all"&&e.set("status",p.value),y.value!=="all"&&e.set("wants_reply",y.value),x.value!=="all"&&e.set("has_reply",x.value);try{const n=await fetch(`/api/admin/message/list?${e}`,{headers:r});if(!n.ok)throw new Error("Failed to load messages");const s=await n.json();if(s.ok)a=s.messages,T();else throw new Error(s.error||"Failed to load messages")}catch(n){document.getElementById("messagesTableContainer").innerHTML=`
            <div class="text-red-400 text-center py-8">Error: ${n.message}</div>
          `}}function T(){const e=document.getElementById("messagesTableContainer");if(a.length===0){e.innerHTML=`
            <div class="text-[#F5F2EA]/70 text-center py-8">No messages found.</div>
          `;return}const n=`
          <div class="bg-black border border-[#F5F2EA]/30 rounded-lg overflow-hidden">
            <table class="w-full">
              <thead>
                <tr class="border-b border-[#F5F2EA]/20">
                  <th class="px-6 py-4 text-left text-[#F5F2EA] text-sm font-serif">Name</th>
                  <th class="px-6 py-4 text-left text-[#F5F2EA] text-sm font-serif">Type</th>
                  <th class="px-6 py-4 text-left text-[#F5F2EA] text-sm font-serif">Status</th>
                  <th class="px-6 py-4 text-left text-[#F5F2EA] text-sm font-serif">Reply</th>
                  <th class="px-6 py-4 text-left text-[#F5F2EA] text-sm font-serif">Date</th>
                  <th class="px-6 py-4 text-left text-[#F5F2EA] text-sm font-serif">Preview</th>
                </tr>
              </thead>
              <tbody>
                ${a.map(s=>`
                  <tr class="border-b border-[#F5F2EA]/10 hover:bg-[#F5F2EA]/5 transition-colors duration-300 cursor-pointer" data-message-id="${s.id}">
                    <td class="px-6 py-4 text-[#F5F2EA]">
                      ${s.nickname||"Anonymous"}
                    </td>
                    <td class="px-6 py-4 text-[#F5F2EA]/80 text-sm">${s.type}</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 rounded text-xs ${s.status==="approved"?"bg-green-900/30 text-green-300":s.status==="rejected"?"bg-red-900/30 text-red-300":"bg-yellow-900/30 text-yellow-300"}">
                        ${s.status}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-[#F5F2EA]/80 text-sm">
                      ${s.reply_body?"✓":s.wants_reply?"Pending":"None"}
                    </td>
                    <td class="px-6 py-4 text-[#F5F2EA]/60 text-sm">
                      ${new Date(s.created_at).toLocaleDateString()}
                    </td>
                    <td class="px-6 py-4 text-[#F5F2EA]/70 text-sm max-w-xs">
                      <div class="truncate">${s.body}</div>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `;e.innerHTML=n,e.querySelectorAll("tr[data-message-id]").forEach(s=>{s.addEventListener("click",()=>{const d=s.dataset.messageId;k(d)})})}function k(e){if(t=a.find(d=>d.id===e),!t)return;const n=`
          <div class="flex justify-between items-start">
            <h2 class="text-[#F5F2EA] text-xl font-serif">${t.nickname||"Anonymous"}</h2>
            <time class="text-[#F5F2EA]/50 text-sm">
              ${new Date(t.created_at).toLocaleString()}
            </time>
          </div>
          
          <div class="flex flex-wrap gap-2 text-xs">
            <span class="px-2 py-1 bg-[#F5F2EA]/10 text-[#F5F2EA] rounded">
              ${t.type}
            </span>
            ${t.wants_reply?'<span class="px-2 py-1 bg-[#F5F2EA]/10 text-[#F5F2EA] rounded">wants reply</span>':""}
            <span class="px-2 py-1 rounded ${t.status==="approved"?"bg-green-900/30 text-green-300":t.status==="rejected"?"bg-red-900/30 text-red-300":"bg-yellow-900/30 text-yellow-300"}">
              ${t.status}
            </span>
          </div>
          
          <div class="text-[#F5F2EA] leading-relaxed whitespace-pre-wrap">
            ${t.body}
          </div>
        `;document.getElementById("selectedMessageContent").innerHTML=n,document.getElementById("statusSelect").value=t.status,document.getElementById("replyTextArea").value=t.reply_body||"";const s=`
          <h4 class="text-[#F5F2EA] mb-2">Metadata</h4>
          <div class="space-y-1 text-[#F5F2EA]/60">
            <div>ID: ${t.id}</div>
            ${t.email?`<div>Email: ${t.email}</div>`:""}
            <div>IP Hash: ${t.ip_hash||"None"}</div>
            <div>User Agent: ${t.user_agent||"None"}</div>
            ${t.reply_created_at?`<div>Replied: ${new Date(t.reply_created_at).toLocaleString()}</div>`:""}
          </div>
        `;document.getElementById("messageMetadata").innerHTML=s,v.classList.add("hidden"),F.classList.remove("hidden")}function M(){F.classList.add("hidden"),v.classList.remove("hidden"),t=null}async function _(){if(!t)return;const e={id:t.id,status:document.getElementById("statusSelect").value,replyText:document.getElementById("replyTextArea").value};try{const s=await(await fetch("/api/admin/message/update",{method:"POST",headers:{"Content-Type":"application/json",...r},body:JSON.stringify(e)})).json();if(s.ok){l.textContent="Changes saved successfully",l.className="text-green-400 text-sm",l.classList.remove("hidden");const d=a.findIndex(b=>b.id===t.id);d!==-1&&(a[d].status=e.status,a[d].reply_body=e.replyText,t=a[d]),setTimeout(()=>{l.classList.add("hidden")},3e3)}else throw new Error(s.error||"Failed to save changes")}catch(n){l.textContent=`Error: ${n.message}`,l.className="text-red-400 text-sm",l.classList.remove("hidden")}}w.addEventListener("click",f);L.addEventListener("click",$);m.addEventListener("keydown",e=>{e.key==="Enter"&&o.focus()});o.addEventListener("keydown",e=>{e.key==="Enter"&&f()});I.addEventListener("click",M);B.addEventListener("click",h);A.addEventListener("submit",e=>{e.preventDefault(),_()});
