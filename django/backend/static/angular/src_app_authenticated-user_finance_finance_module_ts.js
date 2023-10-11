"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_app_authenticated-user_finance_finance_module_ts"],{3372:(Sn,C,u)=>{u.r(C),u.d(C,{FinanceModule:()=>bn});var g=u(9808),a=u(2382),p=u(4394),r=u(2323),m=u(6533),i=u(9049),n=u(5e3);let F=(()=>{class t{constructor(e){this.store=e}ngOnInit(){this.store.dispatch(new i.jh)}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(r.yh))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-finance"]],decls:1,vars:0,template:function(e,o){1&e&&n._UZ(0,"router-outlet")},directives:[m.lC],styles:[""]}),t})();const v=(0,u(5685).H)({sortComparer:function E(t,c){const e=t.bank.bank_name,o=c.bank.bank_name;let s=0;return e>o?s=1:e<o&&(s=-1),s}}),y=v.getInitialState({errorMessage:void 0,savingsAccountsLoaded:!1,successMessage:void 0});function U(t=y,c){switch(c.type){case i.vn.SavingsAccountAdded:return v.addOne(c.payload.savingsAccount,Object.assign(Object.assign({},t),{errorMessage:void 0,successMessage:"You have successfully submitted a new account!"}));case i.vn.SavingsAccountAddedCancelled:console.log("error adding savings account!"),console.log(c.payload);let e="Error! Savings Account Submission Failed!";return c.payload.err.error.Error&&(e=c.payload.err.error.Error),Object.assign(Object.assign({},t),{successMessage:void 0,errorMessage:e});case i.vn.SavingsAccountDeletionCancelled:let o="Error! Savings Account Deletion Failed!";return c.payload.err.error.Error&&(o=c.payload.err.error.Error),Object.assign(Object.assign({},t),{successMessage:void 0,errorMessage:o});case i.vn.SavingsAccountDeletionSaved:return v.removeOne(c.payload.id,Object.assign(Object.assign({},t),{errorMessage:void 0,successMessage:c.payload.message}));case i.vn.SavingsAccountEditCancelled:let s="Error! Savings Account Update Failed!";return c.payload.err.error.Error&&(console.log(c.payload.err.error.Error),s=c.payload.err.error.Error),Object.assign(Object.assign({},t),{successMessage:void 0,errorMessage:s});case i.vn.SavingsAccountEditUpdated:return v.updateOne(c.payload.savingsAccount,Object.assign(Object.assign({},t),{errorMessage:void 0,successMessage:"You have successfully updated the account info!"}));case i.vn.SavingsAccountsCleared:return y;case i.vn.SavingsAccountsLoaded:return v.setAll(c.payload.savingsAccounts,Object.assign(Object.assign({},t),{savingsAccountsLoaded:!0}));case i.vn.SavingsAccountsMessagesCleared:return Object.assign(Object.assign({},t),{successMessage:void 0,errorMessage:void 0});default:return t}}const{selectAll:k}=v.getSelectors(),A=(0,r.ZF)("accounts"),q=(0,r.P1)(A,k),I=(0,r.P1)(A,t=>t.savingsAccountsLoaded),M=(0,r.P1)(A,t=>t.errorMessage),T=(0,r.P1)(A,t=>t.successMessage);var P=u(3889),Y=u(7670),J=u(9317);function $(t,c){if(1&t&&(n.TgZ(0,"option",13),n._uU(1),n.qZA()),2&t){const e=c.$implicit;n.Q6J("ngValue",e),n.xp6(1),n.hij("",e.bank_name," ")}}function N(t,c){1&t&&(n.TgZ(0,"div"),n._uU(1," Please select a bank. "),n.qZA())}function Q(t,c){1&t&&(n.TgZ(0,"div"),n._uU(1,"Please enter an account description."),n.qZA())}function j(t,c){1&t&&(n.TgZ(0,"div"),n._uU(1," Please enter an account balance. "),n.qZA())}function L(t,c){if(1&t&&(n.TgZ(0,"option",13),n._uU(1),n.qZA()),2&t){const e=c.$implicit;n.Q6J("ngValue",e),n.xp6(1),n.AsE("",e.currency_name,", ",e.currency_code," ")}}function D(t,c){1&t&&(n.TgZ(0,"div"),n._uU(1," Please select a currency. "),n.qZA())}let z=(()=>{class t{constructor(e){this.store=e}ngOnInit(){}onSubmitSavingsAccount(e){e.invalid?this.store.dispatch(new i.k4({err:{error:{Error:"The form values were not properly filled in!"}}})):(this.store.dispatch(new i.Pq({savingsAccount:{bank:e.value.bank,account_name:e.value.account_name,currency:e.value.currency,account_balance:e.value.account_balance,account_owner:this.usrProfile.user}})),e.reset())}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(r.yh))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-account-submit-form"]],inputs:{usrProfile:"usrProfile",banks:"banks",currencies:"currencies"},decls:37,vars:6,consts:[[3,"submit"],["savingsAccountForm","ngForm"],["name","bank","ngModel","","required","",1,"form-control"],["bank","ngModel"],[3,"ngValue",4,"ngFor","ngForOf"],[4,"ngIf"],["type","text","minlength","2","rows","4","name","account_name","ngModel","","required","","placeholder","Savings Account Description",1,"form-control"],["account_name","ngModel"],["type","number","min","0.00","max","20000","rows","4","name","account_balance","ngModel","","required","","placeholder","0.00",1,"form-control"],["account_balance","ngModel"],["name","currency","ngModel","","required","",1,"form-control"],["currency","ngModel"],["type","submit",1,"btn","btn-outline-secondary"],[3,"ngValue"]],template:function(e,o){if(1&e){const s=n.EpF();n.TgZ(0,"div")(1,"form",0,1),n.NdJ("submit",function(){n.CHM(s);const d=n.MAs(2);return o.onSubmitSavingsAccount(d)}),n.TgZ(3,"div")(4,"label"),n._uU(5,"Bank"),n.qZA(),n.TgZ(6,"select",2,3),n.YNc(8,$,2,2,"option",4),n.qZA(),n.YNc(9,N,2,0,"div",5),n.qZA(),n._UZ(10,"br"),n.TgZ(11,"div")(12,"label"),n._uU(13,"Account Description"),n.qZA(),n._UZ(14,"input",6,7),n.YNc(16,Q,2,0,"div",5),n.qZA(),n._UZ(17,"br"),n.TgZ(18,"div")(19,"label"),n._uU(20,"Account Balance"),n.qZA(),n._UZ(21,"input",8,9),n.YNc(23,j,2,0,"div",5),n.qZA(),n._UZ(24,"br"),n.TgZ(25,"div")(26,"label"),n._uU(27,"Currency"),n.qZA(),n.TgZ(28,"select",10,11),n.YNc(30,L,2,3,"option",4),n.qZA(),n.YNc(31,D,2,0,"div",5),n.qZA(),n._UZ(32,"br"),n.TgZ(33,"div")(34,"button",12),n._uU(35," Submit "),n.qZA()()(),n._UZ(36,"br"),n.qZA()}if(2&e){const s=n.MAs(7),l=n.MAs(15),d=n.MAs(22),x=n.MAs(29);n.xp6(8),n.Q6J("ngForOf",o.banks),n.xp6(1),n.Q6J("ngIf",s.touched&&s.invalid),n.xp6(7),n.Q6J("ngIf",l.touched&&l.invalid),n.xp6(7),n.Q6J("ngIf",d.touched&&d.invalid),n.xp6(7),n.Q6J("ngForOf",o.currencies),n.xp6(1),n.Q6J("ngIf",x.touched&&x.invalid)}},directives:[a._Y,a.JL,a.F,a.EJ,a.JJ,a.On,a.Q7,g.sg,a.YN,a.Kr,g.O5,a.Fj,a.wO,a.qQ,a.Fd,a.wV],styles:[""]}),t})();function B(t,c){if(1&t){const e=n.EpF();n.TgZ(0,"div")(1,"div",2)(2,"h4",3),n._uU(3),n.qZA(),n.TgZ(4,"button",4),n.NdJ("click",function(){return n.CHM(e),n.oxw().onClearStatusMsgs()}),n.qZA()()()}if(2&t){const e=c.ngIf;n.xp6(3),n.Oqu(e)}}function R(t,c){if(1&t){const e=n.EpF();n.TgZ(0,"div")(1,"div",5)(2,"h6"),n._uU(3),n.qZA(),n.TgZ(4,"button",4),n.NdJ("click",function(){return n.CHM(e),n.oxw().onClearStatusMsgs()}),n.qZA()()()}if(2&t){const e=c.ngIf;n.xp6(3),n.Oqu(e)}}function V(t,c){if(1&t&&(n.TgZ(0,"div"),n._UZ(1,"hr",7)(2,"app-account-submit-form",8)(3,"hr",7),n.qZA()),2&t){const e=c.ngIf,o=n.oxw().ngIf,s=n.oxw().ngIf;n.xp6(2),n.Q6J("usrProfile",s)("currencies",e)("banks",o)}}function H(t,c){if(1&t&&(n.TgZ(0,"div"),n.YNc(1,V,4,3,"div",0),n.ALo(2,"async"),n.qZA()),2&t){const e=n.oxw(2);n.xp6(1),n.Q6J("ngIf",n.lcZ(2,1,e.currencies$))}}function G(t,c){if(1&t&&(n.TgZ(0,"div",6),n.YNc(1,H,3,3,"div",0),n.ALo(2,"async"),n.qZA()),2&t){const e=n.oxw();n.xp6(1),n.Q6J("ngIf",n.lcZ(2,1,e.banks$))}}let W=(()=>{class t{constructor(e){this.store=e}ngOnInit(){this.store.dispatch(new i.yj),this.usrProfile$=this.store.pipe((0,r.Ys)(J.d)),this.banks$=this.store.pipe((0,r.Ys)(P.Cl)),this.currencies$=this.store.pipe((0,r.Ys)(Y.Xg)),this.accountSubmitErrMsg$=this.store.pipe((0,r.Ys)(M)),this.accountSubmitSuccessMsg$=this.store.pipe((0,r.Ys)(T))}onClearStatusMsgs(){this.store.dispatch(new i.yj)}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(r.yh))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-create-account"]],decls:9,vars:9,consts:[[4,"ngIf"],["class","container",4,"ngIf"],["role","alert",1,"alert","alert-danger","alert-dismissible","fade","show"],[1,"text-danger"],["type","button","data-bs-dismiss","alert","aria-label","Close",1,"btn-close",3,"click"],["role","alert",1,"alert","alert-secondary","alert-dismissible","fade","show"],[1,"container"],[1,"thick-br"],[3,"usrProfile","currencies","banks"]],template:function(e,o){1&e&&(n._UZ(0,"br"),n.TgZ(1,"h3"),n._uU(2,"Create a Savings Account"),n.qZA(),n.YNc(3,B,5,1,"div",0),n.ALo(4,"async"),n.YNc(5,R,5,1,"div",0),n.ALo(6,"async"),n.YNc(7,G,3,3,"div",1),n.ALo(8,"async")),2&e&&(n.xp6(3),n.Q6J("ngIf",n.lcZ(4,3,o.accountSubmitErrMsg$)),n.xp6(2),n.Q6J("ngIf",n.lcZ(6,5,o.accountSubmitSuccessMsg$)),n.xp6(2),n.Q6J("ngIf",n.lcZ(8,7,o.usrProfile$)))},directives:[g.O5,z],pipes:[g.Ov],styles:["h1[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{text-align:center}hr.thick-br[_ngcontent-%COMP%]{border:2px solid #758d97}"]}),t})();function X(t,c){1&t&&(n.TgZ(0,"div"),n._uU(1,"Please enter an account description."),n.qZA())}function K(t,c){1&t&&(n.TgZ(0,"div"),n._uU(1," Please enter an account balance. "),n.qZA())}let nn=(()=>{class t{constructor(e){this.store=e}ngOnInit(){}onSubmitEditedSavingsAccount(e){if(console.log(e.value),e.invalid)return console.log("the form is invalid!"),this.store.dispatch(new i.k4({err:{error:{Error:"The form values were not properly filled in!"}}})),void e.reset();this.store.dispatch(new i.QE({id:this.savingsAccount.id,savingsAccount:{account_balance:e.value.account_balance,account_name:e.value.account_name}})),e.resetForm()}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(r.yh))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-account-edit-form"]],inputs:{savingsAccount:"savingsAccount"},decls:21,vars:4,consts:[[3,"submit"],["savingsAccountForm","ngForm"],["type","text","minlength","2","rows","4","name","account_name","ngModel","","required","",1,"form-control",3,"placeholder"],["account_name","ngModel"],[4,"ngIf"],["type","number","min","0.00","max","20000","rows","4","name","account_balance","ngModel","","required","",1,"form-control",3,"placeholder"],["account_balance","ngModel"],["type","submit",1,"btn","btn-outline-secondary"]],template:function(e,o){if(1&e){const s=n.EpF();n.TgZ(0,"div")(1,"form",0,1),n.NdJ("submit",function(){n.CHM(s);const d=n.MAs(2);return o.onSubmitEditedSavingsAccount(d)}),n.TgZ(3,"div")(4,"label"),n._uU(5,"Account Description"),n.qZA(),n._UZ(6,"input",2,3),n.YNc(8,X,2,0,"div",4),n.qZA(),n._UZ(9,"br"),n.TgZ(10,"div")(11,"label"),n._uU(12,"Account Balance"),n.qZA(),n._UZ(13,"input",5,6),n.YNc(15,K,2,0,"div",4),n.qZA(),n._UZ(16,"br"),n.TgZ(17,"div")(18,"button",7),n._uU(19," Submit "),n.qZA()()(),n._UZ(20,"br"),n.qZA()}if(2&e){const s=n.MAs(7),l=n.MAs(14);n.xp6(6),n.s9C("placeholder",o.savingsAccount.account_name),n.xp6(2),n.Q6J("ngIf",s.touched&&s.invalid),n.xp6(5),n.s9C("placeholder",o.savingsAccount.account_balance),n.xp6(2),n.Q6J("ngIf",l.touched&&l.invalid)}},directives:[a._Y,a.JL,a.F,a.Fj,a.wO,a.JJ,a.On,a.Q7,g.O5,a.qQ,a.Fd,a.wV],styles:[""]}),t})();function tn(t,c){if(1&t){const e=n.EpF();n.TgZ(0,"div")(1,"div",2)(2,"h4",3),n._uU(3),n.qZA(),n.TgZ(4,"button",4),n.NdJ("click",function(){return n.CHM(e),n.oxw().onClearStatusMsgs()}),n.qZA()()()}if(2&t){const e=c.ngIf;n.xp6(3),n.Oqu(e)}}function en(t,c){if(1&t){const e=n.EpF();n.TgZ(0,"div")(1,"div",5)(2,"h6"),n._uU(3),n.qZA(),n.TgZ(4,"button",4),n.NdJ("click",function(){return n.CHM(e),n.oxw().onClearStatusMsgs()}),n.qZA()()()}if(2&t){const e=c.ngIf;n.xp6(3),n.Oqu(e)}}function cn(t,c){if(1&t&&(n.TgZ(0,"div",6),n._UZ(1,"hr",7)(2,"app-account-edit-form",8)(3,"hr",7),n.qZA()),2&t){const e=c.ngIf;n.xp6(2),n.Q6J("savingsAccount",e)}}let on=(()=>{class t{constructor(e,o){this.route=e,this.store=o}ngOnInit(){this.store.dispatch(new i.yj),this.idFromRouteData=this.route.snapshot.params.id,this.savingsAccount$=this.store.pipe((0,r.Ys)((t=>(0,r.P1)(A,c=>c.entities[t]))(this.idFromRouteData))),this.accountSubmitErrMsg$=this.store.pipe((0,r.Ys)(M)),this.accountSubmitSuccessMsg$=this.store.pipe((0,r.Ys)(T))}onClearStatusMsgs(){this.store.dispatch(new i.yj)}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(m.gz),n.Y36(r.yh))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-edit-account"]],decls:9,vars:9,consts:[[4,"ngIf"],["class","container",4,"ngIf"],["role","alert",1,"alert","alert-danger","alert-dismissible","fade","show"],[1,"text-danger"],["type","button","data-bs-dismiss","alert","aria-label","Close",1,"btn-close",3,"click"],["role","alert",1,"alert","alert-secondary","alert-dismissible","fade","show"],[1,"container"],[1,"thick-br"],[3,"savingsAccount"]],template:function(e,o){1&e&&(n._UZ(0,"br"),n.TgZ(1,"h3"),n._uU(2,"Edit Savings Account"),n.qZA(),n.YNc(3,tn,5,1,"div",0),n.ALo(4,"async"),n.YNc(5,en,5,1,"div",0),n.ALo(6,"async"),n.YNc(7,cn,4,1,"div",1),n.ALo(8,"async")),2&e&&(n.xp6(3),n.Q6J("ngIf",n.lcZ(4,3,o.accountSubmitErrMsg$)),n.xp6(2),n.Q6J("ngIf",n.lcZ(6,5,o.accountSubmitSuccessMsg$)),n.xp6(2),n.Q6J("ngIf",n.lcZ(8,7,o.savingsAccount$)))},directives:[g.O5,nn],pipes:[g.Ov],styles:["h1[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{text-align:center}hr.thick-br[_ngcontent-%COMP%]{border:2px solid #758d97}"]}),t})();function sn(t,c){if(1&t){const e=n.EpF();n.TgZ(0,"div",7)(1,"button",8),n.NdJ("click",function(){return n.CHM(e),n.oxw().showDeletionPopup()}),n._uU(2," Remove "),n.qZA()()}}function an(t,c){if(1&t){const e=n.EpF();n.TgZ(0,"div",9)(1,"button",8),n.NdJ("click",function(){return n.CHM(e),n.oxw().hideDeletionPopup()}),n._uU(2," Don't Delete "),n.qZA()(),n.TgZ(3,"div",9)(4,"button",10),n.NdJ("click",function(){return n.CHM(e),n.oxw().onRemoveSavingsAccount()}),n._uU(5," Confirm Delete "),n.qZA()()}}const rn=function(t){return["/authenticated-user/finance/edit-account",t]};let un=(()=>{class t{constructor(e){this.store=e,this.deletionPopupVisible=!1}ngOnInit(){}showDeletionPopup(){this.deletionPopupVisible=!0}hideDeletionPopup(){this.deletionPopupVisible=!1}onRemoveSavingsAccount(){this.store.dispatch(new i.Y2({id:+this.savingsAccount.id}))}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(r.yh))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-single-savings-account"]],inputs:{savingsAccount:"savingsAccount"},decls:18,vars:9,consts:[[1,"row"],[1,"col"],[1,"text-secondary"],[3,"routerLink"],["class","text-center",4,"ngIf","ngIfElse"],["class","row"],["delAccount",""],[1,"text-center"],[1,"btn","btn-sm","btn-outline-secondary",3,"click"],[1,"col","text-center"],[1,"btn","btn-sm","btn-outline-danger",3,"click"]],template:function(e,o){if(1&e&&(n.TgZ(0,"tr",0)(1,"th",1)(2,"h5",2),n._uU(3),n.qZA()(),n.TgZ(4,"th",1)(5,"h5",2)(6,"a",3),n._uU(7),n.qZA()()(),n.TgZ(8,"th",1)(9,"h5",2),n._uU(10),n.qZA()(),n.TgZ(11,"th",1)(12,"h5",2),n._uU(13),n.qZA()(),n.TgZ(14,"th",1),n.YNc(15,sn,3,0,"div",4),n.YNc(16,an,6,0,"ng-template",5,6,n.W1O),n.qZA()()),2&e){const s=n.MAs(17);n.xp6(3),n.hij(" ",o.savingsAccount.bank.bank_name," "),n.xp6(3),n.Q6J("routerLink",n.VKq(7,rn,o.savingsAccount.id)),n.xp6(1),n.hij(" ",o.savingsAccount.account_name," "),n.xp6(3),n.hij(" ",o.savingsAccount.account_balance," "),n.xp6(3),n.hij(" ",o.savingsAccount.currency.currency_code," "),n.xp6(2),n.Q6J("ngIf",!o.deletionPopupVisible)("ngIfElse",s)}},directives:[m.yS,g.O5],styles:[""]}),t})();function ln(t,c){if(1&t&&(n.TgZ(0,"div"),n._UZ(1,"app-single-savings-account",9),n.qZA()),2&t){const e=c.$implicit;n.xp6(1),n.Q6J("savingsAccount",e)}}function dn(t,c){if(1&t&&(n.TgZ(0,"div",1)(1,"div",2)(2,"table",3)(3,"thead",4)(4,"tr",5)(5,"th",6)(6,"h5",7),n._uU(7,"Bank"),n.qZA()(),n.TgZ(8,"th",6)(9,"h5",7),n._uU(10,"Description"),n.qZA()(),n.TgZ(11,"th",6)(12,"h5",7),n._uU(13,"Balance"),n.qZA()(),n.TgZ(14,"th",6)(15,"h5",7),n._uU(16,"Currency"),n.qZA()()()(),n.TgZ(17,"tbody",4),n.YNc(18,ln,2,1,"div",8),n.qZA()()()()),2&t){const e=c.ngIf;n.xp6(18),n.Q6J("ngForOf",e)}}const gn=[{path:"",component:F,children:[{path:"savings-accounts",component:(()=>{class t{constructor(e){this.store=e}ngOnInit(){this.savingsAccounts$=this.store.pipe((0,r.Ys)(q))}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(r.yh))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-savings-accounts"]],decls:4,vars:3,consts:[["class","container",4,"ngIf"],[1,"container"],[1,"large-scr-tbl"],[1,"table"],[1,"table-dark"],[1,"row"],[1,"col"],[1,"text-secondary"],[4,"ngFor","ngForOf"],[3,"savingsAccount"]],template:function(e,o){1&e&&(n.TgZ(0,"h3"),n._uU(1,"Savings Accounts"),n.qZA(),n.YNc(2,dn,19,1,"div",0),n.ALo(3,"async")),2&e&&(n.xp6(2),n.Q6J("ngIf",n.lcZ(3,1,o.savingsAccounts$)))},directives:[g.O5,g.sg,un],pipes:[g.Ov],styles:["h3[_ngcontent-%COMP%]{text-align:center}hr.thick-br[_ngcontent-%COMP%]{border:2px solid #758d97}.small-scr-tbl[_ngcontent-%COMP%]{display:none}@media screen and (max-width: 767px){#edit[_ngcontent-%COMP%], .large-scr-tbl[_ngcontent-%COMP%]{display:none}.small-scr-tbl[_ngcontent-%COMP%]{display:block}}"]}),t})()},{path:"edit-account/:id",component:on},{path:"create-account",component:W}]}];let pn=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[[m.Bz.forChild(gn)],m.Bz]}),t})();var vn=u(2843),Z=u(9646),mn=u(1365),An=u(9300),f=u(5577),_=u(4004),b=u(262),h=u(520),S=u(2340),hn=u(3702);let fn=(()=>{class t{constructor(e,o){this.http=e,this.authService=o}deleteSavingsAccount(e){let o=this.authService.getAuthToken();return this.http.delete(`${S.N.apiUrl}/api/financial-accounts/savings-account/${e}/`,{headers:new h.WM({Authorization:`Token ${o}`})})}fetchAllSavingsAccounts(){let e=this.authService.getAuthToken();return this.http.get(`${S.N.apiUrl}/api/financial-accounts/savings-accounts/`,{headers:new h.WM({Authorization:`Token ${e}`})})}submitEditedSavingsAccount(e,o){let s=this.authService.getAuthToken();return this.http.patch(`${S.N.apiUrl}/api/financial-accounts/savings-account/${e}/`,o,{headers:new h.WM({Authorization:`Token ${s}`})})}submitNewSavingsAccount(e){let o=this.authService.getAuthToken();return this.http.post(`${S.N.apiUrl}/api/financial-accounts/savings-accounts/`,e,{headers:new h.WM({Authorization:`Token ${o}`})})}}return t.\u0275fac=function(e){return new(e||t)(n.LFG(h.eN),n.LFG(hn.e))},t.\u0275prov=n.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})(),_n=(()=>{class t{constructor(e,o,s){this.actions$=e,this.savingsAccountsService=o,this.store=s,this.loadSavingsAccounts$=(0,p.GW)(()=>this.actions$.pipe((0,p.l4)(i.vn.SavingsAccountsRequested),(0,mn.M)(this.store.pipe((0,r.Ys)(I))),(0,An.h)(([l,d])=>!d),(0,f.z)(l=>this.savingsAccountsService.fetchAllSavingsAccounts().pipe((0,_.U)(d=>new i.uU({savingsAccounts:d})),(0,b.K)(d=>(0,vn._)(()=>d)))))),this.removeSavingsAccount$=(0,p.GW)(()=>this.actions$.pipe((0,p.l4)(i.vn.SavingsAccountDeletionRequested),(0,f.z)(l=>this.savingsAccountsService.deleteSavingsAccount(l.payload.id).pipe((0,_.U)(d=>new i.MA(d)),(0,b.K)(d=>(this.store.dispatch(new i.l9({err:d})),(0,Z.of)())))))),this.submitSavingsAccount$=(0,p.GW)(()=>this.actions$.pipe((0,p.l4)(i.vn.SavingsAccountSubmitted),(0,f.z)(l=>this.savingsAccountsService.submitNewSavingsAccount(l.payload.savingsAccount).pipe((0,b.K)(d=>(this.store.dispatch(new i.LN({err:d})),(0,Z.of)())))),(0,_.U)(l=>new i.$B({savingsAccount:l})))),this.updateSavingsAccount$=(0,p.GW)(()=>this.actions$.pipe((0,p.l4)(i.vn.SavingsAccountEditSubmitted),(0,f.z)(l=>this.savingsAccountsService.submitEditedSavingsAccount(l.payload.id,l.payload.savingsAccount).pipe((0,b.K)(d=>(this.store.dispatch(new i.k4({err:d})),(0,Z.of)())))),(0,_.U)(l=>new i.qK({savingsAccount:{id:l.id,changes:l}}))))}}return t.\u0275fac=function(e){return new(e||t)(n.LFG(p.eX),n.LFG(fn),n.LFG(r.yh))},t.\u0275prov=n.Yz7({token:t,factory:t.\u0275fac}),t})(),bn=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[[g.ez,pn,a.u5,r.Aw.forFeature("accounts",U),p.sQ.forFeature([_n])]]}),t})()}}]);