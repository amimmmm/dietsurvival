function copyIP(){navigator.clipboard.writeText('play.dietsurvival.fun');const t=document.getElementById('toast');t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1500)}
// Live Minecraft player count. Uses a public status endpoint, so no server-side code is required.
async function updateMinecraftStatus(){
  const el=document.getElementById('mc-online');
  const card=document.querySelector('.minecraft-status');
  if(!el)return;
  try{
    const r=await fetch('https://api.mcsrvstat.us/3/play.dietsurvival.fun',{cache:'no-store'});
    const d=await r.json();
    if(d.online){
      el.innerHTML='<span class="live-dot"></span>'+(d.players?.online ?? 0)+' players online';
      card?.classList.remove('offline');
    }else{
      el.innerHTML='<span class="live-dot"></span>Server offline';
      card?.classList.add('offline');
    }
  }catch(e){el.innerHTML='<span class="live-dot"></span>Status unavailable';}
}

// Discord's live count is available through its invite endpoint when the invite exposes approximate counts.
async function updateDiscordStatus(){
  const online=document.getElementById('discord-online');
  const members=document.getElementById('discord-members');
  const card=document.querySelector('.discord-status');
  if(!online)return;
  try{
    const r=await fetch('https://discord.com/api/v10/invites/KyxKYvyfGR?with_counts=true',{cache:'no-store'});
    if(!r.ok)throw new Error('Discord status unavailable');
    const d=await r.json();
    online.innerHTML='<span class="live-dot"></span>'+Number(d.approximate_presence_count||0).toLocaleString()+' users online';
    members.textContent=Number(d.approximate_member_count||0).toLocaleString()+' members';
    card?.classList.remove('offline');
  }catch(e){
    online.innerHTML='<span class="live-dot"></span>Join our Discord';
    members.textContent='Live count unavailable';
  }
}
updateMinecraftStatus(); updateDiscordStatus();
setInterval(updateMinecraftStatus,60000);
setInterval(updateDiscordStatus,60000);
