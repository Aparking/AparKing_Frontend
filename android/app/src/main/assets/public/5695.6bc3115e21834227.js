"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5695],{5695:(y,c,n)=>{n.r(c),n.d(c,{TabsPageModule:()=>j});var b=n(177),d=n(4341),i=n(5933),m=n(1626),v=n(8986),p=n(4665),T=n(1620),g=n(467),P=n(4736),t=n(4438),f=n(4517),u=n(3999),h=n(7268);const C=[{path:"aparKing",component:(()=>{var a;class e{constructor(o,s,r,R){this.navCtrl=o,this.datamanagement=s,this.loadingCtrl=r,this.wsService=R,this.constants=P.A}logout(){var o=this;return(0,g.A)(function*(){const s=yield o.loadingCtrl.create({message:"Cerrando sesi\xf3n..."});yield o.wsService.disconnect(),s.present(),o.datamanagement.postLogout().then(r=>{o.navCtrl.navigateRoot("/"),s.dismiss()})})()}goToCesion(){var o=this;return(0,g.A)(function*(){o.navCtrl.navigateRoot("G11/aparKing/list-parking-cesion")})()}goRegisterVehicle(){this.navCtrl.navigateForward("/registerVehicle")}goToSubscriptions(){var o=this;return(0,g.A)(function*(){o.navCtrl.navigateRoot("/api/subscriptions")})()}}return(a=e).\u0275fac=function(o){return new(o||a)(t.rXU(f.q9),t.rXU(u.P),t.rXU(i.Xi),t.rXU(h.H))},a.\u0275cmp=t.VBU({type:a,selectors:[["app-tabs"]],decls:28,vars:1,consts:[["translucent","true"],[1,"appbar"],["slot","end","color","light",2,"background-color","transparent","--background","transparent",3,"click"],["slot","bottom"],["tab","map","href","/aparking/map"],["name","map-outline"],["tab","garages"],["aria-hidden","true","name","reader-outline"],["tab","tab3"],["aria-hidden","true","name","square"],["tab","list-parking-cesion",3,"click"],["name","car"]],template:function(o,s){1&o&&(t.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title",1),t.EFF(3),t.k0s(),t.j41(4,"ion-button",2),t.bIt("click",function(){return s.goToSubscriptions()}),t.EFF(5," subscription "),t.k0s(),t.j41(6,"ion-button",2),t.bIt("click",function(){return s.goRegisterVehicle()}),t.EFF(7," Registrar vehiculo "),t.k0s(),t.j41(8,"ion-button",2),t.bIt("click",function(){return s.logout()}),t.EFF(9," Salir "),t.k0s()()(),t.j41(10,"ion-tabs")(11,"ion-tab-bar",3)(12,"ion-tab-button",4),t.nrm(13,"ion-icon",5),t.j41(14,"ion-label"),t.EFF(15,"Mapa"),t.k0s()(),t.j41(16,"ion-tab-button",6),t.nrm(17,"ion-icon",7),t.j41(18,"ion-label"),t.EFF(19,"Alquileres"),t.k0s()(),t.j41(20,"ion-tab-button",8),t.nrm(21,"ion-icon",9),t.j41(22,"ion-label"),t.EFF(23,"Tab 3"),t.k0s()(),t.j41(24,"ion-tab-button",10),t.bIt("click",function(){return s.goToCesion()}),t.nrm(25,"ion-icon",11),t.j41(26,"ion-label"),t.EFF(27,"Cesiones"),t.k0s()()()()),2&o&&(t.R7$(3),t.JRh(s.constants.APP_NAME))},dependencies:[i.Jm,i.eU,i.iq,i.he,i.Jq,i.qW,i.BC,i.ai,i.p4],styles:[".appbar[_ngcontent-%COMP%]{font-weight:700;font-family:Lobster,sans-serif}"]}),e})(),children:[{path:"map",loadChildren:()=>Promise.all([n.e(5083),n.e(7703)]).then(n.bind(n,7703)).then(a=>a.Tab1PageModule)},{path:"garages",loadChildren:()=>n.e(6479).then(n.bind(n,6479)).then(a=>a.Tab2PageModule)},{path:"tab3",loadChildren:()=>n.e(3069).then(n.bind(n,3069)).then(a=>a.Tab3PageModule)},{path:"list-parking-cesion",component:p.N,canActivate:[T.q],loadChildren:()=>n.e(7984).then(n.bind(n,7984)).then(a=>a.Tab4PageModule)},{path:"",redirectTo:"/G11/aparKing/map",pathMatch:"full"}]},{path:"",redirectTo:"/G11/aparKing/map",pathMatch:"full"}];let F=(()=>{var a;class e{}return(a=e).\u0275fac=function(o){return new(o||a)},a.\u0275mod=t.$C({type:a}),a.\u0275inj=t.G2t({imports:[v.iI.forChild(C)]}),e})();var M=n(689);let j=(()=>{var a;class e{}return(a=e).\u0275fac=function(o){return new(o||a)},a.\u0275mod=t.$C({type:a}),a.\u0275inj=t.G2t({providers:[u.P,h.H,M.G],imports:[i.bv,b.MD,d.YN,F,m.q1,d.X1]}),e})()}}]);