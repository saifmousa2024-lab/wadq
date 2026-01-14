function $(id){ return document.getElementById(id); }

function toast(msg){
  const t = $("toast");
  if(!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=>t.classList.remove("show"), 2600);
}

function initMenu(){
  const btn = $("menuBtn");
  const nav = $("navLinks");
  if(!btn || !nav) return;

  btn.addEventListener("click", ()=> nav.classList.toggle("open"));
  nav.querySelectorAll("a[data-nav]").forEach(a=>{
    a.addEventListener("click", ()=> nav.classList.remove("open"));
  });
}

function setActiveNav(){
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("#navLinks a.link").forEach(a=>{
    const href = (a.getAttribute("href") || "").toLowerCase();
    if(href && href === path){
      a.classList.add("active");
      a.setAttribute("aria-current","page");
    } else {
      a.classList.remove("active");
      a.removeAttribute("aria-current");
    }
  });
}

function initYear(){
  const y = $("year");
  if(y) y.textContent = new Date().getFullYear();
}

function initFeedbackForm(){
  const f = $("feedbackForm");
  if(!f) return;
  f.addEventListener("submit", (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(f).entries());
    const store = JSON.parse(localStorage.getItem("alwadaq_feedback") || "[]");
    store.unshift({ ...data, ts: new Date().toISOString() });
    localStorage.setItem("alwadaq_feedback", JSON.stringify(store));
    f.reset();
    toast("Your message has been sent successfully.");
  });
}

function initQuoteForm(){
  const f = $("quoteForm");
  if(!f) return;
  f.addEventListener("submit", (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(f).entries());
    const store = JSON.parse(localStorage.getItem("alwadaq_quotes") || "[]");
    store.unshift({ ...data, ts: new Date().toISOString() });
    localStorage.setItem("alwadaq_quotes", JSON.stringify(store));
    f.reset();
    toast("Quote request received.");
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  initMenu();
  setActiveNav();
  initYear();
  initFeedbackForm();
  initQuoteForm();
});
