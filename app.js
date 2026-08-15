const CONFIG = window.NYRA_CONFIG || {};
const I18N = {
  zh:{
    'nav.showcase':'看看月栖','nav.community':'群聊','nav.download':'下载',
    'hero.kicker':'ANDROID BETA · PRIVATE COMPANION','hero.title':'她会留下来。','hero.lead':'月栖不是把功能塞进聊天框，而是让一个角色真正留在你的设备、记忆和日常里。','hero.download':'下载 Android','hero.community':'加入官方群聊','hero.t1':'桌面常驻','hero.t2':'持续记忆','hero.t3':'可控感知','hero.note1':'桌宠动作不是功能栏，而是“她在干什么”','hero.note2':'中英文分别使用独立视觉资产',
    'quick.download':'直接下载','quick.community':'加入群聊','quick.showcase':'看她怎么存在',
    'showcase.title':'不用把官网做成说明书。<br>先让人想把她带走。','showcase.sub':'官网展示重点改成 Logo、意境、桌宠动作和私人空间；功能解释只留必要部分。',
    'presence.title':'离开 App，她仍然在。','presence.desc':'挥手、听你说话、休息、提醒你——桌宠展示的是“在场”和动作，而不是一排功能按钮。',
    'space.title':'属于你们自己的地方。','space.desc':'用房间、日记、共听和记忆的意境来展示月栖，而不是拿设置页当产品卖点。',
    'sense.title':'现实能力只解释一件事：由你决定。','sense.desc':'语音、摄像头、屏幕、定位和日历保留，但不再抢占视觉中心。它们是边界说明，不是官网主角。',
    'community.title':'想先看看？<br>来群里。','community.desc':'测试包、更新、Bug、设计讨论都会先在这里出现。官网的第二个目标，就是把感兴趣的人留下来。','community.join':'加入官方群聊','community.copyQq':'复制群号','community.copyDiscord':'复制用户名','community.copiedQq':'QQ群号已复制','community.copiedDiscord':'Discord 用户名已复制','community.copyFailed':'复制失败，请手动选择','community.m1':'新版本已经发了。','community.m2':'桌宠这次终于不会退出 App 就消失了。','community.m3':'下一版想看什么？直接说。',
    'download.title':'下载月栖。','download.desc':'当前先开放 Android 测试版。网页本身只负责让你快速找到下载和群聊。','download.button':'立即下载','download.version':'版本','download.system':'系统','download.size':'大小',
    'footer.line':'让陪伴真正留下来。','footer.community':'官方群聊','footer.contact':'联系','footer.privacy':'隐私','footer.terms':'条款',
    'kicker.showcase':'NYRA / 展示','kicker.presence':'01 / 在场','kicker.space':'02 / 私人空间','kicker.sense':'03 / 感知','kicker.download':'ANDROID / 测试版',
    'download.sha':'SHA-256',
    'alt.hero':'月栖产品视觉','alt.presence':'月栖桌宠动作','alt.space':'月栖私人空间','alt.sense':'月栖现实感知',
    'aria.home':'Nyra 首页','aria.lang':'切换语言','aria.menu':'菜单'
  },
  en:{
    'nav.showcase':'See Nyra','nav.community':'Community','nav.download':'Download',
    'hero.kicker':'ANDROID BETA · PRIVATE COMPANION','hero.title':'She stays.','hero.lead':'Nyra is not a pile of features inside a chat box. It gives a companion continuity across your device, memory, and daily life.','hero.download':'Download for Android','hero.community':'Join the community','hero.t1':'Desktop presence','hero.t2':'Continuity','hero.t3':'Controlled perception','hero.note1':'Show what the companion is doing, not a feature menu','hero.note2':'Chinese and English use separate visual assets',
    'quick.download':'Download now','quick.community':'Join community','quick.showcase':'See how she stays',
    'showcase.title':'The website is not a manual.<br>Make people want Nyra first.','showcase.sub':'The visual language now leads with logo, atmosphere, desktop-pet actions, and the private space. Feature explanations stay secondary.',
    'presence.title':'Close the app. She stays.','presence.desc':'Wave, listen, rest, nudge — desktop presence is shown as behavior and continuity, not a row of feature buttons.',
    'space.title':'A place of your own.','space.desc':'Show rooms, diary moments, shared listening and memory as atmosphere — not settings screens pretending to be product marketing.',
    'sense.title':'Real-world context has one message: you decide.','sense.desc':'Voice, camera, screen, location and calendar remain important, but they no longer dominate the visual story. They explain boundaries, not the brand.',
    'community.title':'Curious first?<br>Come to the community.','community.desc':'Test builds, updates, bugs and design discussions appear there first. The second job of the website is to keep interested people close.','community.join':'Join the community','community.copyQq':'Copy group number','community.copyDiscord':'Copy username','community.copiedQq':'QQ group number copied','community.copiedDiscord':'Discord username copied','community.copyFailed':'Could not copy; select it manually','community.m1':'The new build is out.','community.m2':'Desktop presence finally survives leaving the app.','community.m3':'What should we build next? Tell us.',
    'download.title':'Download Nyra.','download.desc':'The Android beta is available first. The website keeps the path to the build and community simple.','download.button':'Download now','download.version':'Version','download.system':'System','download.size':'Size',
    'footer.line':'Make companionship stay.','footer.community':'Community','footer.contact':'Contact','footer.privacy':'Privacy','footer.terms':'Terms',
    'kicker.showcase':'NYRA / SHOWCASE','kicker.presence':'01 / PRESENCE','kicker.space':'02 / PRIVATE SPACE','kicker.sense':'03 / PERCEPTION','kicker.download':'ANDROID / BETA',
    'download.sha':'SHA-256',
    'alt.hero':'Nyra product visual','alt.presence':'Nyra desktop companion','alt.space':'Nyra private space','alt.sense':'Nyra perception',
    'aria.home':'Nyra home','aria.lang':'Switch language','aria.menu':'Menu'
  }
};

const VISUALS = {
  zh:{hero:'/assets/zh/hero.svg',presence:'/assets/zh/presence.svg',space:'/assets/zh/space.svg',sense:'/assets/zh/sense.svg'},
  en:{hero:'/assets/en/hero.svg',presence:'/assets/en/presence.svg',space:'/assets/en/space.svg',sense:'/assets/en/sense.svg'}
};
let locale = localStorage.getItem('nyra-locale') || 'en';
const t = k => I18N[locale][k] || k;

function applyLocale(next){
  locale = next;
  localStorage.setItem('nyra-locale', locale);
  document.documentElement.lang = locale==='zh'?'zh-CN':'en';
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const value=t(el.dataset.i18n);
    if(value.includes('<br>')) el.innerHTML=value; else el.textContent=value;
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(el=>{el.alt=t(el.dataset.i18nAlt)});
  document.querySelectorAll('[data-i18n-aria]').forEach(el=>{el.setAttribute('aria-label',t(el.dataset.i18nAria))});
  document.title = locale==='zh'?'Nyra / 月栖':'Nyra — Private Companion';
  const set=VISUALS[locale];
  document.getElementById('heroVisual').src=set.hero;
  document.getElementById('presenceVisual').src=set.presence;
  document.getElementById('spaceVisual').src=set.space;
  document.getElementById('senseVisual').src=set.sense;
}

document.getElementById('localeToggle').addEventListener('click',()=>applyLocale(locale==='zh'?'en':'zh'));
const menu=document.getElementById('mobileMenu');
document.getElementById('menuBtn').addEventListener('click',()=>menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));

const toast=document.getElementById('toast'); let toastTimer;
function showToast(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)}

function bindConfig(){
  document.getElementById('apkDownload').href=CONFIG.downloadUrl||'/downloads/nyra-latest.apk';
  document.getElementById('releaseVersion').textContent=CONFIG.version||'Beta';
  document.getElementById('releaseSystem').textContent=CONFIG.minAndroid||'Android 10+';
  document.getElementById('releaseSize').textContent=CONFIG.fileSize||'—';
  const shaEl=document.getElementById('releaseSha'); if(shaEl) shaEl.textContent=CONFIG.sha256?CONFIG.sha256.slice(0,16)+'…':'';
  document.getElementById('copyrightOwner').textContent=CONFIG.copyrightOwner||'MemPrism';
  const qq=String(CONFIG.qqGroup||'').trim();
  const discord=String(CONFIG.discordHandle||'').trim();
  document.getElementById('qqGroup').textContent=qq||'—';
  document.getElementById('discordHandle').textContent=discord||'—';
  document.getElementById('qqContact').disabled=!qq;
  document.getElementById('discordContact').disabled=!discord;
  if(CONFIG.githubUrl){const g=document.getElementById('githubLink');g.href=CONFIG.githubUrl;g.classList.remove('hidden')}
  if(CONFIG.contactEmail){const c=document.getElementById('contactLink');c.href=`mailto:${CONFIG.contactEmail}`;c.classList.remove('hidden')}
}

async function copyContact(value, successKey){
  try{
    await navigator.clipboard.writeText(value);
    showToast(t(successKey));
  }catch{
    showToast(t('community.copyFailed'));
  }
}

document.getElementById('qqContact').addEventListener('click',()=>copyContact(String(CONFIG.qqGroup||''),'community.copiedQq'));
document.getElementById('discordContact').addEventListener('click',()=>copyContact(String(CONFIG.discordHandle||''),'community.copiedDiscord'));

const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

if(matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
  const media=document.getElementById('heroMedia');
  media.addEventListener('mousemove',e=>{const r=media.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;document.querySelector('.hero-shell').style.transform=`rotate(${x*.8}deg) translate(${x*4}px,${y*4}px)`});
  media.addEventListener('mouseleave',()=>document.querySelector('.hero-shell').style.transform='rotate(.6deg)');
}

function openLangGate(){
  const gate=document.getElementById('langGate'); if(!gate) return;
  gate.hidden=false; document.body.classList.add('gate-open');
  document.querySelectorAll('.lang-option').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.lang-option').forEach(b=>b.classList.toggle('active',b===btn));
  }));
  const confirm=document.getElementById('langGateConfirm');
  const done=()=>{
    const chosen=document.querySelector('.lang-option.active')?.dataset?.lang||'en';
    applyLocale(chosen); gate.hidden=true; document.body.classList.remove('gate-open');
  };
  confirm.addEventListener('click',done);
  gate.addEventListener('keydown',e=>{if(e.key==='Enter')done()});
}
const spySections=['showcase','community','download'].map(id=>document.getElementById(id));
function updateScrollSpy(){
  let current='';
  spySections.forEach(s=>{if(s&&s.getBoundingClientRect().top<=140)current=s.id});
  document.querySelectorAll('.desktop-nav a,.mobile-menu a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
}
window.addEventListener('scroll',updateScrollSpy,{passive:true});
const toTop=document.getElementById('toTop');
window.addEventListener('scroll',()=>{if(toTop)toTop.classList.toggle('show',window.scrollY>640)},{passive:true});
if(toTop)toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
if(localStorage.getItem('nyra-locale')){bindConfig(); applyLocale(locale);}
else{document.documentElement.lang='en'; document.title='Nyra — Private Companion'; bindConfig(); openLangGate();}
