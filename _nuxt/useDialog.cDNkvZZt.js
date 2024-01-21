import{n as _,r as d,g as N,_ as $,v as T,x as F,o as k,c as V,B as I,s as A,a as i,t as p,b as w,w as C,d as D,u as E,A as S,G as U}from"./entry.c8Fz298c.js";import{B as j}from"./Button.CUEB_LMa.js";const z=_({name:"Checkbox",props:{modelValue:{type:Boolean,default:!1},disable:{type:Boolean,default:!1}},emits:["update:modelValue"],setup(e,t){const o=d(e.modelValue);return N(()=>e.modelValue,()=>{o.value=e.modelValue}),{model:o,changeInputValue:()=>{o.value=!o.value,t.emit("update:modelValue",o.value)}}}}),G=["checked","disabled"];function L(e,t,o,u,c,r){return T((k(),V("input",{"onUpdate:modelValue":t[0]||(t[0]=n=>e.model=n),checked:e.model,disabled:e.disable,type:"checkbox",class:"w-6 h-6",onInput:t[1]||(t[1]=(...n)=>e.changeInputValue&&e.changeInputValue(...n))},null,40,G)),[[F,e.model]])}const Y=$(z,[["render",L]]),M=_({name:"Dialog",components:{Button:j},props:{action:{type:String,default:"delete"}},emits:["close-dialog","confirm-action","confirm"],setup(e,t){const o=I(()=>e.action==="delete"?"Удалить заметку?":e.action==="edit"?"Изменить заметку?":e.action==="delete-todo"||e.action==="delete-new-todo"?"Удалить задачу?":e.action==="edit-todo"||e.action==="edit-new-todo"?"Изменить задачу?":""),u=()=>{t.emit("confirm-action"),(e.action==="delete-new-todo"||e.action==="edit-new-todo")&&c()},c=()=>{t.emit("confirm")};return{actionContent:o,closeDialog:()=>{t.emit("close-dialog")},confirmAction:u}}}),O={class:"w-full fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 z-10"},R={class:"w-2/3 right-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white m-auto z-20",style:{"max-width":"600px","min-width":"360px"}},X={class:"px-6 py-4"},q={class:"flex justify-between mb-2 sm:mb-4"},H=i("h2",{class:"font-bold text-xl sm:text-3xl"},"Подвердите действие:",-1),J={class:"text-lg sm:text-xl"},K={class:"flex w-full justify-end mt-6 sm:mt-12"};function P(e,t,o,u,c,r){const n=A("Button");return k(),V("div",O,[i("div",R,[i("div",X,[i("div",q,[H,i("button",{onClick:t[0]||(t[0]=(...a)=>e.closeDialog&&e.closeDialog(...a))},"X")]),i("div",J,p(e.$t(`${e.actionContent}`)),1),i("div",K,[w(n,{class:"text-white w-48 bg-gray-300 cursor-pointer mr-4 sm:mr-8",type:"button",onClick:e.closeDialog},{default:C(()=>[D(p(e.$t("Отменить")),1)]),_:1},8,["onClick"]),w(n,{class:"text-white w-48 bg-red-500 cursor-pointer",type:"button",onClick:e.confirmAction},{default:C(()=>[D(p(e.$t("Подвердить")),1)]),_:1},8,["onClick"])])])])])}const Z=$(M,[["render",P]]);function ee(){const e=E(),{deleteNote:t,editNote:o,deleteTodo:u,editTodo:c}=e,{notes:r}=S(e),n=d(!1),a=d(0),f=d(0),l=d(""),v=d(""),x=s=>{n.value=!0,a.value=s.uid,l.value=s.action,s.todoUid&&(f.value=s.todoUid),s.title&&(v.value=s.title)},y=()=>{n.value=!1,l.value="",a.value=0},B=s=>{if(l.value==="delete"&&t(a.value),l.value==="edit"){const m=r.value.find(g=>g.uid===a.value)||{};m.title!==v.value&&(m.title=v.value),o(m)}if(l.value==="delete-todo"&&u(a.value,f.value),l.value==="edit-todo"){const g=(r.value.find(h=>h.uid===a.value)||{}).todos.find(h=>h.uid===f.value)||{};c(g,a.value)}s==="note"&&l.value==="delete"&&b(),n.value=!1,l.value="",a.value=0,f.value=0},b=()=>{U("/notes")};return{isDialogOpen:n,noteForConfirm:a,actionForConfirm:l,showDialog:x,closeDialog:y,confirmAction:B,toNotesLayout:b}}export{Y as C,Z as D,ee as u};
