const BUSINESS={name:"Modern Barber Studio",whatsapp:"905510126346"};
const SERVICES=[{name:"Saç Kesimi",duration:"30 dk",price:350},{name:"Sakal Tıraşı",duration:"20 dk",price:200},{name:"Saç + Sakal",duration:"50 dk",price:500},{name:"VIP Bakım",duration:"60 dk",price:750}];
const STAFF=["Fark Etmez","Emre","Mert","Can"];
const TIMES=["09:30","10:30","11:30","13:00","14:30","15:30","17:00","18:30","20:00"];
const s={service:null,staff:null,date:null,time:null};
const $=id=>document.getElementById(id);
$("businessName").textContent=BUSINESS.name;
const money=n=>new Intl.NumberFormat("tr-TR").format(n)+" TL";
function toast(m){$("toast").textContent=m;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2200)}
function drawServices(){$("services").innerHTML="";SERVICES.forEach(x=>{let b=document.createElement("button");b.className="service"+(s.service?.name===x.name?" selected":"");b.innerHTML=`<div><b>${x.name}</b><small>${x.duration}</small></div><span class="price">${money(x.price)}</span>`;b.onclick=()=>{s.service=x;drawServices();sum()};$("services").appendChild(b)})}
function drawStaff(){$("staff").innerHTML="";STAFF.forEach(x=>{let b=document.createElement("button");b.className="chip"+(s.staff===x?" selected":"");b.textContent=x;b.onclick=()=>{s.staff=x;drawStaff();sum()};$("staff").appendChild(b)})}
function dateOptions(){let a=[];for(let i=0;i<7;i++){let d=new Date();d.setDate(d.getDate()+i);let val=new Intl.DateTimeFormat("tr-TR",{day:"2-digit",month:"2-digit",year:"numeric"}).format(d);let lab=new Intl.DateTimeFormat("tr-TR",{weekday:"short",day:"2-digit",month:"short"}).format(d);if(i===0)lab="Bugün · "+lab;if(i===1)lab="Yarın · "+lab;a.push({label:lab,value:val})}return a}
const DATES=dateOptions();
function drawDates(){$("dates").innerHTML="";DATES.forEach(x=>{let b=document.createElement("button");b.className="chip"+(s.date?.value===x.value?" selected":"");b.textContent=x.label;b.onclick=()=>{s.date=x;drawDates();sum()};$("dates").appendChild(b)})}
function drawTimes(){$("times").innerHTML="";TIMES.forEach(x=>{let b=document.createElement("button");b.className="chip"+(s.time===x?" selected":"");b.textContent=x;b.onclick=()=>{s.time=x;drawTimes();sum()};$("times").appendChild(b)})}
function sum(){$("summaryService").textContent=s.service?.name||"Seçilmedi";$("summaryStaff").textContent=s.staff||"Seçilmedi";$("summaryDate").textContent=s.date?.value||"Seçilmedi";$("summaryTime").textContent=s.time||"Seçilmedi";$("summaryPrice").textContent=s.service?money(s.service.price):"—"}
$("wa").onclick=()=>{let name=$("customerName").value.trim();if(!s.service)return toast("Önce hizmet seç.");if(!s.staff)return toast("Personel seç.");if(!s.date)return toast("Tarih seç.");if(!s.time)return toast("Saat seç.");if(!name)return toast("Ad soyad yaz.");let note=$("note").value.trim();let msg=[`Merhaba, ${BUSINESS.name} için randevu talebi oluşturmak istiyorum.`,``,`👤 Ad Soyad: ${name}`,`✂️ Hizmet: ${s.service.name}`,`🧑 Personel: ${s.staff}`,`📅 Tarih: ${s.date.value}`,`🕒 Saat: ${s.time}`,`💳 Ücret: ${money(s.service.price)}`,note?`📝 Not: ${note}`:"",``,`RandevuPro üzerinden gönderildi.`].filter(Boolean).join("\n");window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`,"_blank")};
drawServices();drawStaff();drawDates();drawTimes();sum();
