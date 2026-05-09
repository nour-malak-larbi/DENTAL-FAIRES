(()=>{var e={};e.id=11,e.ids=[11],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},7774:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>o.a,__next_app__:()=>m,originalPathname:()=>p,pages:()=>c,routeModule:()=>u,tree:()=>d}),t(47502),t(32029),t(35866);var a=t(23191),n=t(88716),i=t(37922),o=t.n(i),s=t(95231),l={};for(let e in s)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>s[e]);t.d(r,l);let d=["",{children:["register",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,47502)),"D:\\DENTAL-FAIRES\\src\\app\\register\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,32029)),"D:\\DENTAL-FAIRES\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,35866,23)),"next/dist/client/components/not-found-error"]}],c=["D:\\DENTAL-FAIRES\\src\\app\\register\\page.tsx"],p="/register/page",m={require:t,loadChunk:()=>Promise.resolve()},u=new a.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/register/page",pathname:"/register",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},96507:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,12994,23)),Promise.resolve().then(t.t.bind(t,96114,23)),Promise.resolve().then(t.t.bind(t,9727,23)),Promise.resolve().then(t.t.bind(t,79671,23)),Promise.resolve().then(t.t.bind(t,41868,23)),Promise.resolve().then(t.t.bind(t,84759,23))},18702:()=>{},33500:(e,r,t)=>{Promise.resolve().then(t.bind(t,81229))},81229:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>o});var a=t(10326),n=t(17577),i=t(90434);function o(){let[e,r]=(0,n.useState)("student");return(0,a.jsxs)(a.Fragment,{children:[a.jsx("style",{children:`
        .auth-bg {
          position: fixed; inset: 0; z-index: 0; overflow: hidden;
          background: #091209;
        }
        .auth-bg-radial {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 90% 80% at 50% 40%, #1C3A1C 0%, #0F1F0F 45%, #060C06 100%);
          opacity: 0.85;
        }
        .auth-bg-glow {
          position: absolute; bottom: 0; left: 0; right: 0; height: 50%;
          background: radial-gradient(ellipse at 50% 100%, rgba(196,153,58,0.12) 0%, transparent 70%);
        }
        .auth-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 100% 100% at 50% 50%,
            transparent 30%, rgba(8,14,8,0.6) 65%, rgba(8,14,8,0.95) 100%);
        }
        .auth-green-fog {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 30%, rgba(30,60,30,0.25) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 15% 60%, rgba(20,40,20,0.35) 0%, transparent 65%),
            radial-gradient(ellipse 60% 40% at 85% 60%, rgba(20,40,20,0.35) 0%, transparent 65%);
          animation: fogPulse 8s ease-in-out infinite;
        }
        .auth-scanline {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
        }
        #auth-dust { position: absolute; inset: 0; pointer-events: none; }

        .auth-wrap {
          position: relative; z-index: 2;
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 3rem 1.5rem;
          font-family: 'Jost', sans-serif;
        }
        .auth-inner { width: 100%; max-width: 440px; }
        .auth-logo-wrap { text-align: center; margin-bottom: 2.5rem; }
        .auth-logo { height: 90px; filter: drop-shadow(0 0 18px rgba(196,153,58,0.5)); display: block; margin: 0 auto; }
        .auth-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem; font-weight: 200; color: #F5F2EC;
          text-align: center; line-height: 1.1; margin-top: 1.5rem;
        }
        .auth-headline em { font-style: italic; color: #E2C47A; }
        .auth-sub {
          text-align: center; font-size: 0.78rem; letter-spacing: 0.12em;
          color: rgba(245,242,236,0.45); margin-top: 0.6rem;
        }
        .auth-card {
          margin-top: 2.5rem;
          background: rgba(8,14,8,0.82);
          border: 1px solid rgba(196,153,58,0.15);
          border-radius: 4px;
          padding: 2.5rem 2.5rem;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(24px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.6);
        }
        .auth-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(196,153,58,0.4), transparent);
        }

        .role-tabs { display: flex; gap: 0; margin-bottom: 2rem; border-bottom: 1px solid rgba(196,153,58,0.12); }
        .role-tab {
          flex: 1; padding: 0.75rem 0; background: none; border: none; cursor: pointer;
          font-family: 'Jost', sans-serif; font-size: 0.68rem; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(245,242,236,0.35);
          border-bottom: 2px solid transparent; margin-bottom: -1px;
          transition: all 0.3s;
        }
        .role-tab.active { color: #C4993A; border-bottom-color: #C4993A; }
        .role-tab:hover:not(.active) { color: rgba(245,242,236,0.6); }

        .form-group { margin-bottom: 1.4rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.4rem; }
        .form-label {
          display: block; font-size: 0.6rem; letter-spacing: 0.22em;
          text-transform: uppercase; color: #C4993A; margin-bottom: 0.5rem;
        }
        .form-input, .form-select {
          width: 100%; background: rgba(4,8,4,0.8);
          border: 1px solid rgba(26,46,26,0.8); border-radius: 0;
          padding: 0.85rem 1rem; color: #F5F2EC;
          font-family: 'Jost', sans-serif; font-size: 0.82rem; font-weight: 200;
          outline: none; transition: border-color 0.3s;
          appearance: none; -webkit-appearance: none;
        }
        .form-input:focus, .form-select:focus { border-color: rgba(196,153,58,0.55); }
        .form-input::placeholder { color: rgba(245,242,236,0.2); }
        .form-select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23C4993A' opacity='.5'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 1rem center; padding-right: 2.5rem; }
        .form-select option { background: #111A11; color: #F5F2EC; }

        .dynamic-fields { animation: riseIn 0.4s ease-out forwards; }

        .btn-submit {
          width: 100%; margin-top: 0.5rem;
          background: linear-gradient(135deg, #C4993A, #8B6820);
          color: #080E08; border: none; cursor: pointer;
          font-family: 'Jost', sans-serif; font-size: 0.7rem;
          font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase;
          padding: 1rem; transition: all 0.4s;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          position: relative; overflow: hidden;
        }
        .btn-submit::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #E2C47A, #C4993A);
          opacity: 0; transition: opacity 0.4s;
        }
        .btn-submit:hover::before { opacity: 1; }
        .btn-submit:hover { box-shadow: 0 8px 40px rgba(196,153,58,0.35); transform: translateY(-1px); }
        .btn-submit span { position: relative; z-index: 1; }

        .auth-footer { text-align: center; margin-top: 1.8rem; font-size: 0.78rem; color: rgba(245,242,236,0.35); }
        .auth-link { color: #C4993A; text-decoration: none; transition: color 0.3s; }
        .auth-link:hover { color: #E2C47A; }
      `}),(0,a.jsxs)("div",{className:"auth-bg",children:[a.jsx("div",{className:"auth-bg-radial"}),a.jsx("div",{className:"auth-bg-glow"}),a.jsx("div",{className:"auth-green-fog"}),a.jsx("div",{className:"auth-vignette"}),a.jsx("div",{className:"auth-scanline"}),a.jsx("div",{id:"auth-dust",suppressHydrationWarning:!0})]}),a.jsx("div",{className:"auth-wrap",children:(0,a.jsxs)("div",{className:"auth-inner",children:[(0,a.jsxs)("div",{className:"auth-logo-wrap",children:[a.jsx(i.default,{href:"/",children:a.jsx("img",{src:"/logo-transparent.png",alt:"Dental Fairies",style:{height:"220px",width:"auto",display:"block",margin:"-55px auto -70px",filter:"drop-shadow(0 0 20px rgba(196,153,58,0.55))"}})}),(0,a.jsxs)("h1",{className:"auth-headline",children:["Rejoindre l'",a.jsx("em",{children:"acad\xe9mie"})]}),a.jsx("p",{className:"auth-sub",children:"L'excellence clinique commence ici."})]}),(0,a.jsxs)("div",{className:"auth-card",children:[(0,a.jsxs)("div",{className:"role-tabs",children:[a.jsx("button",{className:`role-tab${"student"===e?" active":""}`,onClick:()=>r("student"),children:"\xc9tudiant / Praticien"}),a.jsx("button",{className:`role-tab${"formateur"===e?" active":""}`,onClick:()=>r("formateur"),children:"Formateur"})]}),(0,a.jsxs)("form",{onSubmit:e=>e.preventDefault(),children:[(0,a.jsxs)("div",{className:"form-row",children:[(0,a.jsxs)("div",{children:[a.jsx("label",{className:"form-label",children:"Nom"}),a.jsx("input",{type:"text",className:"form-input",placeholder:"Votre nom",required:!0})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"form-label",children:"Pr\xe9nom"}),a.jsx("input",{type:"text",className:"form-input",placeholder:"Votre pr\xe9nom",required:!0})]})]}),(0,a.jsxs)("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Email"}),a.jsx("input",{type:"email",className:"form-input",placeholder:"contact@exemple.com",required:!0})]}),(0,a.jsxs)("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Mot de passe"}),a.jsx("input",{type:"password",className:"form-input",placeholder:"••••••••",required:!0})]}),"student"===e&&(0,a.jsxs)("div",{className:"dynamic-fields",children:[(0,a.jsxs)("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Niveau / Ann\xe9e d'\xe9tude"}),(0,a.jsxs)("select",{className:"form-select",children:[a.jsx("option",{value:"",children:"S\xe9lectionnez votre niveau"}),a.jsx("option",{value:"1",children:"1\xe8re ann\xe9e"}),a.jsx("option",{value:"2",children:"2\xe8me ann\xe9e"}),a.jsx("option",{value:"3",children:"3\xe8me ann\xe9e"}),a.jsx("option",{value:"4",children:"4\xe8me ann\xe9e"}),a.jsx("option",{value:"5",children:"5\xe8me ann\xe9e"}),a.jsx("option",{value:"6",children:"6\xe8me ann\xe9e"}),a.jsx("option",{value:"interne",children:"Interne"}),a.jsx("option",{value:"resident",children:"R\xe9sident"}),a.jsx("option",{value:"praticien",children:"Chirurgien-dentiste dipl\xf4m\xe9"})]})]}),(0,a.jsxs)("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Sp\xe9cialit\xe9 / Int\xe9r\xeat"}),(0,a.jsxs)("select",{className:"form-select",children:[a.jsx("option",{value:"",children:"S\xe9lectionnez une sp\xe9cialit\xe9"}),a.jsx("option",{value:"omni",children:"Omnipratique"}),a.jsx("option",{value:"implanto",children:"Implantologie"}),a.jsx("option",{value:"paro",children:"Parodontologie"}),a.jsx("option",{value:"odf",children:"Orthop\xe9die Dento-Faciale (ODF)"}),a.jsx("option",{value:"prothese",children:"Proth\xe8se"}),a.jsx("option",{value:"endo",children:"Endodontie"}),a.jsx("option",{value:"pedo",children:"P\xe9dodontie"}),a.jsx("option",{value:"chiro",children:"Chirurgie orale"}),a.jsx("option",{value:"autre",children:"Autre"})]})]})]}),"formateur"===e&&(0,a.jsxs)("div",{className:"dynamic-fields",children:[(0,a.jsxs)("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Domaine d'expertise"}),a.jsx("input",{type:"text",className:"form-input",placeholder:"Ex : Implantologie avanc\xe9e"})]}),(0,a.jsxs)("div",{className:"form-group",children:[(0,a.jsxs)("label",{className:"form-label",children:["Lien vers vos travaux ",a.jsx("span",{style:{opacity:.4},children:"(optionnel)"})]}),a.jsx("input",{type:"url",className:"form-input",placeholder:"https://"})]})]}),a.jsx("button",{type:"submit",className:"btn-submit",children:a.jsx("span",{children:"Cr\xe9er mon compte"})})]})]}),(0,a.jsxs)("p",{className:"auth-footer",children:["D\xe9j\xe0 membre ?"," ",a.jsx(i.default,{href:"/login",className:"auth-link",children:"Connectez-vous"})]})]})})]})}},32029:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>p,metadata:()=>c});var a=t(19510),n=t(73400),i=t.n(n),o=t(60880),s=t.n(o),l=t(78426),d=t.n(l);t(5023);let c={title:"Dental Fairies Academy",description:"Accredited Dental Excellence. Elevate your career with our premier medical education platform."};function p({children:e}){return a.jsx("html",{lang:"en",className:`${i().variable} ${d().variable} ${s().variable}`,children:a.jsx("body",{children:e})})}},47502:(e,r,t)=>{"use strict";t.r(r),t.d(r,{$$typeof:()=>o,__esModule:()=>i,default:()=>s});var a=t(68570);let n=(0,a.createProxy)(String.raw`D:\DENTAL-FAIRES\src\app\register\page.tsx`),{__esModule:i,$$typeof:o}=n;n.default;let s=(0,a.createProxy)(String.raw`D:\DENTAL-FAIRES\src\app\register\page.tsx#default`)},5023:()=>{}};var r=require("../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),a=r.X(0,[948,777,434],()=>t(7774));module.exports=a})();