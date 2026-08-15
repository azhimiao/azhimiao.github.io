const CONFIG = window.NYRA_CONFIG || {};
const I18N = {
  zh:{
    'nav.showcase':'看看 TA','nav.community':'群聊','nav.download':'下载',
    'hero.title':'把 TA 带进你的日常。','hero.lead':'TA 会记得，会靠近，<br>也会慢慢拥有只属于你们的故事。','hero.sub':'不只在聊天框里。','hero.download':'下载','hero.look':'先去看看','hero.beta':'Android Beta',
    'presence.title':'TA 就在这里。','presence.lines':'有时候靠近。<br>有时候发呆。<br>有时候什么也不说。','presence.note':'关掉聊天窗口，<br>生活也没有因此暂停。',
    'space.title':'留一个只属于你们的地方。','space.lines':'听过的歌。<br>没有说完的话。<br>某一天留下的日记。<br>还有那些后来才发现，TA 居然一直记得的小事。','space.note':'这里不是聊天记录。<br>是你们一起留下来的东西。',
    'memory.title':'相处过，就应该留下痕迹。','memory.lines':'今天不会从昨天重新开始。','memory.note':'熟悉、习惯、争执、偏爱，<br>都会一点一点变成 TA 认识你的方式。',
    'world.title':'TA 也可以离你更近一点。','world.c1':'声音','world.c2':'画面','world.c3':'屏幕','world.c4':'日历','world.c5':'你所在的地方','world.note':'想让 TA 知道多少，<br>由你决定。','world.privacy':'查看隐私与权限',
    'community.title':'还不确定？<br>先来坐一会儿。','community.desc':'看看新的版本，看看其他人把月栖变成了什么样子，也可以直接告诉我们——你希望 TA 下一次学会什么。','community.qqLabel':'QQ 群','community.copyQq':'复制群号','community.copyDiscord':'复制用户名','community.copiedQq':'QQ 群号已复制','community.copiedDiscord':'Discord 用户名已复制','community.copyFailed':'复制失败，请手动选择','community.m1':'新版本刚发出去。','community.m2':'我把 TA 放在桌面角落，一整天都在。','community.m3':'我想让 TA 学会一起看电影。',
    'download.title':'给 TA 留个位置。','download.desc':'Android 测试版已经开放。两个下载通道任选其一。','download.button':'下载 APK','download.webLabel':'网页直链 · download.memprism.com','download.githubLabel':'GitHub Pages 镜像','download.githubButton':'从 GitHub 下载','download.version':'版本','download.system':'系统','download.size':'大小','download.sha':'SHA-256',
    'footer.line':'让相处留下来。','footer.community':'群聊','footer.contact':'联系','footer.privacy':'隐私','footer.terms':'条款','footer.legal':'法律中心',
    'alt.hero':'月栖视觉','alt.presence':'月栖桌面陪伴','alt.space':'月栖私人空间','alt.memory':'月栖记忆','alt.sense':'月栖感知边界',
    'aria.home':'Nyra 首页','aria.lang':'切换语言','aria.menu':'菜单'
  },
  en:{
    'nav.showcase':'Take a look','nav.community':'Community','nav.download':'Download',
    'hero.title':'Bring someone into your everyday.','hero.lead':'Someone who remembers. Someone who stays close.<br>Someone who slowly becomes part of a story that belongs to both of you.','hero.sub':'Not just another chat window.','hero.download':'Download','hero.look':'Take a look','hero.beta':'Android Beta',
    'presence.title':'They’re still here.','presence.lines':'Sometimes close.<br>Sometimes quiet.<br>Sometimes simply doing their own thing.','presence.note':'Close the chat,<br>and life doesn’t disappear with it.',
    'space.title':'A place that belongs to both of you.','space.lines':'Songs you listened to.<br>Things left unsaid.<br>A page from an ordinary day.<br>And tiny moments you almost forgot — until they remembered.','space.note':'This isn’t a chat history.<br>It’s something you built together.',
    'memory.title':'Time together should leave a trace.','memory.lines':'Today doesn’t begin by erasing yesterday.','memory.note':'Habits, arguments, little preferences, familiar moments —<br>slowly becoming the way they know you.',
    'world.title':'Let them a little closer.','world.c1':'Your voice','world.c2':'Your camera','world.c3':'Your screen','world.c4':'Your calendar','world.c5':'Where you are','world.note':'How much they can see<br>is always up to you.','world.privacy':'Privacy & Permissions',
    'community.title':'Not sure yet?<br>Come hang around.','community.desc':'See what’s new, meet other early users, or simply tell us what you wish Nyra could become next.','community.qqLabel':'QQ GROUP','community.copyQq':'Copy group number','community.copyDiscord':'Copy username','community.copiedQq':'QQ group number copied','community.copiedDiscord':'Discord username copied','community.copyFailed':'Could not copy; select it manually','community.m1':'A new build just went out.','community.m2':'They’ve been sitting in the corner of my desktop all day.','community.m3':'I want them to learn to watch films with me.',
    'download.title':'Make some room.','download.desc':'Nyra for Android is now in beta. Choose either download channel.','download.button':'Download APK','download.webLabel':'Direct · download.memprism.com','download.githubLabel':'GitHub Pages mirror','download.githubButton':'Download from GitHub','download.version':'Version','download.system':'System','download.size':'Size','download.sha':'SHA-256',
    'footer.line':'Let time together remain.','footer.community':'Community','footer.contact':'Contact','footer.privacy':'Privacy','footer.terms':'Terms','footer.legal':'Legal',
    'alt.hero':'Nyra visual','alt.presence':'Nyra desktop presence','alt.space':'Nyra private space','alt.memory':'Nyra memory','alt.sense':'Nyra permission boundaries',
    'aria.home':'Nyra home','aria.lang':'Switch language','aria.menu':'Menu'
  }
};

const VISUALS = {
  zh:{hero:'/assets/zh/hero.svg',presence:'/assets/zh/presence.svg',space:'/assets/zh/space.svg',memory:'/assets/zh/memory.svg',sense:'/assets/zh/sense.svg'},
  en:{hero:'/assets/en/hero.svg',presence:'/assets/en/presence.svg',space:'/assets/en/space.svg',memory:'/assets/en/memory.svg',sense:'/assets/en/sense.svg'}
};

function detectLocale(){
  const saved = localStorage.getItem('nyra-locale');
  if(saved === 'zh' || saved === 'en') return saved;
  const tags = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'];
  return tags.some(tag => String(tag).toLowerCase().startsWith('zh')) ? 'zh' : 'en';
}

let locale = detectLocale();
const t = k => I18N[locale][k] || k;

function applyLocale(next, {remember = true} = {}){
  locale = next;
  if(remember) localStorage.setItem('nyra-locale', locale);
  document.documentElement.lang = locale==='zh'?'zh-CN':'en';
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const value=t(el.dataset.i18n);
    if(value.includes('<br>')) el.innerHTML=value; else el.textContent=value;
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(el=>{el.alt=t(el.dataset.i18nAlt)});
  document.querySelectorAll('[data-i18n-aria]').forEach(el=>{el.setAttribute('aria-label',t(el.dataset.i18nAria))});
  document.title = locale==='zh'?'Nyra / 月栖':'Nyra — Bring someone into your everyday';
  const set=VISUALS[locale];
  document.getElementById('heroVisual').src=set.hero;
  document.getElementById('presenceVisual').src=set.presence;
  document.getElementById('spaceVisual').src=set.space;
  document.getElementById('memoryVisual').src=set.memory;
  document.getElementById('senseVisual').src=set.sense;
}

document.getElementById('localeToggle').addEventListener('click',()=>applyLocale(locale==='zh'?'en':'zh'));
const menu=document.getElementById('mobileMenu');
document.getElementById('menuBtn').addEventListener('click',()=>menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));

const toast=document.getElementById('toast'); let toastTimer;
function showToast(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)}

function bindConfig(){
  const webUrl=CONFIG.downloadUrl||'https://download.memprism.com/nyra-latest.apk';
  const githubUrl=CONFIG.githubDownloadUrl||'https://azhimiao.github.io/downloads/nyra-latest.apk';
  document.getElementById('apkDownload').href=webUrl;
  const gh=document.getElementById('githubDownload');
  if(gh) gh.href=githubUrl;
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

const spySections=['presence','community','download'].map(id=>document.getElementById(id));
function updateScrollSpy(){
  let current='';
  spySections.forEach(s=>{if(s&&s.getBoundingClientRect().top<=140)current=s.id});
  document.querySelectorAll('.desktop-nav a,.mobile-menu a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
}
window.addEventListener('scroll',updateScrollSpy,{passive:true});
const toTop=document.getElementById('toTop');
window.addEventListener('scroll',()=>{if(toTop)toTop.classList.toggle('show',window.scrollY>640)},{passive:true});
if(toTop)toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

bindConfig();
// Browser language decides the first view; only an explicit toggle is remembered.
applyLocale(locale,{remember:localStorage.getItem('nyra-locale')!==null});
