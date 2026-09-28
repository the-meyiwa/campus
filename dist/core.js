(function(root){
  'use strict';
  const schools=['Babcock','Covenant','ABUAD'];
  const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const clean=v=>String(v??'').trim();
  const key=(name,school)=>`campus.v2.${school.toLowerCase()}.${clean(name).toLowerCase().replace(/\s+/g,' ')}`;
  function identity(name,school){name=clean(name).replace(/\s+/g,' ');if(name.length<3||name.length>80||name.split(' ').length<2||!/[\p{L}]/u.test(name))throw Error('Enter your first and last name.');if(!schools.includes(school))throw Error('Choose Babcock, Covenant or ABUAD.');return {name,school};}
  function fresh(user){return {version:2,profile:identity(user.name,user.school),courses:[],tasks:[],results:[],read:[],updatedAt:new Date().toISOString()};}
  function load(storage,user){const text=storage.getItem(key(user.name,user.school));if(!text)return fresh(user);const state=JSON.parse(text);if(state.version!==2||!Array.isArray(state.courses)||!Array.isArray(state.tasks)||!Array.isArray(state.results)||!state.profile)throw Error('We could not read your saved workspace.');return state;}
  function save(storage,state){const next={...state,updatedAt:new Date().toISOString()};storage.setItem(key(next.profile.name,next.profile.school),JSON.stringify(next));return next;}
  function course(state,input){const code=clean(input.code).toUpperCase(),title=clean(input.title),room=clean(input.room),day=Number(input.day),start=clean(input.start),end=clean(input.end),units=Number(input.units);if(!/^[A-Z0-9 -]{2,15}$/.test(code))throw Error('Enter a course code of 2–15 letters or numbers.');if(title.length<2||title.length>100)throw Error('Enter a course title of 2–100 characters.');if(!Number.isInteger(units)||units<1||units>6)throw Error('Units must be between 1 and 6.');if(state.courses.some(c=>c.code===code&&c.id!==input.id))throw Error('You already added this course code.');if(day<0||day>6||!Number.isInteger(day))throw Error('Choose a valid class day.');if(!/^\d\d:\d\d$/.test(start)||!/^\d\d:\d\d$/.test(end)||start>=end)throw Error('Choose a start time before the end time.');if(room.length>80)throw Error('Room must be 80 characters or fewer.');for(const other of state.courses){if(other.id!==input.id&&other.day===day&&start<other.end&&other.start<end)throw Error(`${code} overlaps ${other.code}. Change the time before saving.`);}const record={id:input.id||crypto.randomUUID(),code,title,units,day,start,end,room};return {...state,courses:input.id?state.courses.map(c=>c.id===input.id?record:c):[...state.courses,record]};}
  function task(state,input){const title=clean(input.title),due=clean(input.due),courseId=clean(input.courseId);if(title.length<2||title.length>120)throw Error('Enter a task of 2–120 characters.');if(!/^\d{4}-\d{2}-\d{2}$/.test(due)||Number.isNaN(Date.parse(due+'T12:00:00Z')))throw Error('Choose a valid due date.');if(courseId&&!state.courses.some(c=>c.id===courseId))throw Error('Choose a course already in your planner.');const record={id:input.id||crypto.randomUUID(),title,due,courseId,done:input.id?state.tasks.find(t=>t.id===input.id)?.done||false:false};return {...state,tasks:input.id?state.tasks.map(t=>t.id===input.id?record:t):[...state.tasks,record]};}
  function result(state,input){const courseId=clean(input.courseId),score=Number(input.score);if(!state.courses.some(c=>c.id===courseId))throw Error('Choose a course in your planner.');if(!Number.isFinite(score)||score<0||score>100)throw Error('Enter a score from 0 to 100.');if(state.results.some(r=>r.courseId===courseId&&r.id!==input.id))throw Error('You already recorded a result for this course.');const record={id:input.id||crypto.randomUUID(),courseId,score};return {...state,results:input.id?state.results.map(r=>r.id===input.id?record:r):[...state.results,record]};}
  const grade=score=>score>=70?['A',5]:score>=60?['B',4]:score>=50?['C',3]:score>=45?['D',2]:score>=40?['E',1]:['F',0];
  function gpa(state){const rows=state.results.map(r=>({result:r,course:state.courses.find(c=>c.id===r.courseId)})).filter(x=>x.course);const units=rows.reduce((n,x)=>n+x.course.units,0);return units?rows.reduce((n,x)=>n+x.course.units*grade(x.result.score)[1],0)/units:null;}
  function updates(state,now=new Date()){
    const today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
    const todayText=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    const list=[];
    for(const t of state.tasks.filter(t=>!t.done)){
      const due=new Date(`${t.due}T00:00:00`),daysAway=Math.round((due-today)/86400000);
      if(daysAway<=7)list.push({id:`task:${t.id}:${t.due}`,title:daysAway<0?'Overdue task':daysAway===0?'Due today':daysAway===1?'Due tomorrow':'Coming up',body:t.title,date:t.due,kind:'task'});
    }
    const day=(now.getDay()+6)%7;
    for(const c of state.courses.filter(c=>c.day===day&&c.end>now.toTimeString().slice(0,5)))list.push({id:`class:${c.id}:${todayText}`,title:'Class today',body:`${c.code} · ${c.start}–${c.end}${c.room?' · '+c.room:''}`,date:todayText,kind:'class'});
    return list.sort((a,b)=>a.date.localeCompare(b.date));
  }
  const api={schools,days,key,identity,fresh,load,save,course,task,result,grade,gpa,updates};if(typeof module!=='undefined')module.exports=api;else root.CampusCore=api;
})(globalThis);
