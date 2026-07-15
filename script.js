const SERVER_HOST = "play.upvirus.net";
const DISCORD_URL = "#"; // <-- Discord davet linkini buraya ekle

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("discordBtn").href = DISCORD_URL;

/* ---------- Copy IP ---------- */
function copyIp(btn, labelEl){
  navigator.clipboard.writeText(SERVER_HOST).then(() => {
    showToast("IP kopyalandı: " + SERVER_HOST);
    if(btn){
      btn.classList.add("copied");
      if(labelEl) labelEl.textContent = "Kopyalandı!";
      setTimeout(() => {
        btn.classList.remove("copied");
        if(labelEl) labelEl.textContent = "Kopyala";
      }, 1800);
    }
  }).catch(() => {
    showToast("Kopyalanamadı, IP: " + SERVER_HOST);
  });
}

document.getElementById("copyBtn").addEventListener("click", (e) => {
  copyIp(e.currentTarget, document.getElementById("copyBtnText"));
});
document.getElementById("copyBtn2").addEventListener("click", (e) => {
  copyIp(e.currentTarget, null);
});
document.getElementById("navIpBtn").addEventListener("click", (e) => {
  copyIp(null, null);
});

function showToast(msg){
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------- Live server status (mcsrvstat.us public API) ---------- */
async function loadServerStatus(){
  const dot = document.getElementById("hudDot");
  const statusText = document.getElementById("hudStatusText");
  const navDot = document.getElementById("navDot");

  try{
    const res = await fetch(`https://api.mcsrvstat.us/3/${SERVER_HOST}`);
    const data = await res.json();

    if(data.online){
      dot.classList.add("online");
      navDot.style.background = "var(--glint)";
      statusText.textContent = "ÇEVRİMİÇİ";

      document.getElementById("hudPlayers").textContent =
        data.players ? `${data.players.online} / ${data.players.max}` : "—";
      document.getElementById("hudVersion").textContent =
        data.version || "—";
      document.getElementById("hudMotd").textContent =
        (data.motd && data.motd.clean && data.motd.clean[0]) ? data.motd.clean[0] : "—";
      document.getElementById("hudPing").textContent =
        typeof data.debug?.ping !== "undefined" ? (data.debug.ping ? "canlı" : "—") : "—";
    } else {
      dot.classList.add("offline");
      statusText.textContent = "ÇEVRİMDIŞI";
      document.getElementById("hudPlayers").textContent = "—";
      document.getElementById("hudVersion").textContent = "—";
      document.getElementById("hudMotd").textContent = "şu an kapalı";
      document.getElementById("hudPing").textContent = "—";
    }
  }catch(err){
    statusText.textContent = "BİLİNMİYOR";
    document.getElementById("hudMotd").textContent = "durum alınamadı";
  }
}

loadServerStatus();
setInterval(loadServerStatus, 60000);

/* ---------- Scroll reveal ---------- */
const revealTargets = document.querySelectorAll(".mode-card, .stat, .cta-inner");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(16px)";
  el.style.transition = "opacity .6s ease, transform .6s ease";
  io.observe(el);
});
