const dialog=document.querySelector('#booking');
const form=document.querySelector('#booking-form');
const confirmation=document.querySelector('#confirmation');
const dateInput=form.elements.date;
const today=new Date();
const localDate=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
dateInput.min=localDate;
document.querySelector('#year').textContent=today.getFullYear();
document.querySelectorAll('.book').forEach(button=>button.addEventListener('click',()=>{form.hidden=false;confirmation.hidden=true;if(button.dataset.service)form.elements.service.value=button.dataset.service;dialog.showModal()}));
document.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close()});
form.addEventListener('submit',event=>{event.preventDefault();if(dateInput.value<localDate){dateInput.setCustomValidity('Please choose today or a future date.');dateInput.reportValidity();return}const visit={name:form.elements.name.value,email:form.elements.email.value,service:form.elements.service.value,date:dateInput.value,vision:form.elements.vision.value};try{localStorage.setItem('saloon-visit',JSON.stringify(visit));confirmation.textContent=`Your visit plan is saved, ${visit.name}. ${visit.service} · ${visit.date}. This is a personal reminder only; no appointment has been confirmed.`}catch{confirmation.textContent='Your visit plan is ready, but this browser could not save it. No appointment has been confirmed.'}form.hidden=true;confirmation.hidden=false});
dateInput.addEventListener('input',()=>dateInput.setCustomValidity(''));
const collections=[{title:'THE CRAFT OF GOOD HAIR',copy:'Expert hands.<br>A personal touch.',filter:'saturate(.35)',position:'center 30%'},{title:'A SOFTER PERSPECTIVE',copy:'Soft movement.<br>A little more freedom.',filter:'sepia(.3) saturate(.6)',position:'45% 40%'},{title:'YOUR OWN EXPRESSION',copy:'Beautifully considered.<br>Unmistakably you.',filter:'grayscale(1)',position:'60% 20%'}];let slide=0;
function showSlide(direction){slide=(slide+direction+collections.length)%collections.length;const collection=collections[slide];document.querySelector('.edition>span').textContent=collection.title;document.querySelector('.edition p').innerHTML=collection.copy;document.querySelector('.edition small').textContent=`COLLECTION — 0${slide+1} / 03`;document.querySelector('#slide-number').innerHTML=`0${slide+1} <i>/ 03</i>`;document.querySelector('.photo').style.filter=collection.filter;document.querySelector('.photo').style.backgroundPosition=collection.position}
document.querySelector('#previous').addEventListener('click',()=>showSlide(-1));document.querySelector('#next').addEventListener('click',()=>showSlide(1));

// Progressive enhancement: content remains readable without motion support.
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if('IntersectionObserver' in window){
 document.documentElement.classList.add('js-motion');
 document.querySelectorAll('.intro h2,.showcase h2,.why h2,.proof h2').forEach(heading=>{
  let index=0;
  const walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT);const nodes=[];
  while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(node=>{const fragment=document.createDocumentFragment();node.textContent.split(/(\s+)/).forEach(word=>{if(!word.trim()){fragment.append(document.createTextNode(word));return}const span=document.createElement('span');span.className='reveal-word';span.style.setProperty('--word-index',index++);span.textContent=word;fragment.append(span)});node.replaceWith(fragment)});
  heading.classList.add('text-reveal');
 });
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add('is-visible');observer.unobserve(entry.target)}),{threshold:.12});
 document.querySelectorAll('.intro h2,.showcase h2,.why h2,.proof h2,.service-card,.case-caption,.advantage-grid article,.story-placeholder').forEach(element=>{element.classList.add('reveal');observer.observe(element)});
 const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const element=entry.target;const target=Number(element.dataset.count);counterObserver.unobserve(element);if(reducedMotion)return;const start=performance.now();function tick(now){const progress=Math.min((now-start)/1100,1);element.textContent=Math.round(target*(1-Math.pow(1-progress,3)));if(progress<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)}),{threshold:.5});
 document.querySelectorAll('[data-count]').forEach(element=>counterObserver.observe(element));
}
const stage=document.querySelector('.object-stage'),bottle=document.querySelector('#bottle'),rotation=document.querySelector('#rotation');
function rotateBottle(value){rotation.value=Math.max(-180,Math.min(180,Math.round(value)));bottle.style.setProperty('--rotation',`${rotation.value}deg`);document.querySelector('#rotation-value').textContent=`${rotation.value}°`}
rotation.addEventListener('input',()=>rotateBottle(rotation.value));let drag=null;
bottle.addEventListener('pointerdown',event=>{if(event.button!==0)return;drag={x:event.clientX,rotation:Number(rotation.value)};bottle.setPointerCapture(event.pointerId)});
bottle.addEventListener('pointermove',event=>{if(drag)rotateBottle(drag.rotation+(event.clientX-drag.x)*1.5)});
['pointerup','pointercancel','lostpointercapture'].forEach(type=>bottle.addEventListener(type,()=>drag=null));
document.querySelectorAll('.finish').forEach(button=>button.addEventListener('click',()=>{stage.dataset.finish=button.dataset.finish;document.querySelectorAll('.finish').forEach(item=>{const active=item===button;item.classList.toggle('selected',active);item.setAttribute('aria-pressed',String(active))})}));
const track=document.querySelector('.case-track');
function moveCase(direction){const card=track.querySelector('.case-card');track.scrollBy({left:direction*(card.getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap)),behavior:reducedMotion?'instant':'smooth'})}
document.querySelector('#case-prev').addEventListener('click',()=>moveCase(-1));document.querySelector('#case-next').addEventListener('click',()=>moveCase(1));
track.addEventListener('keydown',event=>{if(event.target!==track)return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();moveCase(event.key==='ArrowRight'?1:-1)}});
document.querySelector('#comparison').addEventListener('input',event=>document.querySelector('.comparison').style.setProperty('--compare',`${event.target.value}%`));
const lookDialog=document.querySelector('#look-dialog');
document.querySelectorAll('.zoom-look').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#look-title').textContent=button.dataset.look;const image=button.querySelector('img');lookDialog.querySelector('img').src=image.getAttribute('src');lookDialog.querySelector('img').alt=image.alt;lookDialog.querySelector('img').style.filter=button.classList.contains('monochrome')?'grayscale(1)':'none';lookDialog.showModal()}));
document.querySelector('.look-close').addEventListener('click',()=>lookDialog.close());
const contactDialog=document.querySelector('#contact-dialog');
// Configure a verified business number in international digits before publishing.
const WHATSAPP_NUMBER='';
document.querySelectorAll('.whatsapp').forEach(button=>button.addEventListener('click',()=>{if(/^\d{8,15}$/.test(WHATSAPP_NUMBER)){window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello SALOON, I would like to enquire about a consultation.')}`,'_blank','noopener,noreferrer')}else{contactDialog.showModal()}}));
document.querySelector('.contact-close').addEventListener('click',()=>contactDialog.close());
document.querySelector('#contact-plan').addEventListener('click',()=>{contactDialog.close();form.hidden=false;confirmation.hidden=true;dialog.showModal()});
[lookDialog,contactDialog].forEach(modal=>modal.addEventListener('click',event=>{if(event.target===modal){const rect=modal.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)modal.close()}}));

// A welcome invitation appears once per page visit, without interrupting another dialog.
const welcomeDialog=document.querySelector('#welcome-dialog');
const welcomeTimer=window.setTimeout(()=>{if(!document.querySelector('dialog[open]'))welcomeDialog.showModal()},900);
function closeWelcome(){window.clearTimeout(welcomeTimer);welcomeDialog.close()}
document.querySelector('.welcome-close').addEventListener('click',closeWelcome);
document.querySelector('#welcome-book').addEventListener('click',()=>{closeWelcome();form.hidden=false;confirmation.hidden=true;dialog.showModal()});
document.querySelector('#welcome-explore').addEventListener('click',()=>{closeWelcome();document.querySelector('#services').scrollIntoView({behavior:reducedMotion?'instant':'smooth'});document.querySelector('#services h2').setAttribute('tabindex','-1');document.querySelector('#services h2').focus({preventScroll:true})});
welcomeDialog.addEventListener('click',event=>{if(event.target!==welcomeDialog)return;const rect=welcomeDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeWelcome()});
