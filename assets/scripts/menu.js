 cc.Class({
     extends: cc.Component,

     game_Start() {
        cc.director.loadScene('02');
     },

     game_MoreGame() {
        cc.sys.openURL('https://play.google.com/store/apps/dev?id=4869921288501347163');
     },

     game_NoAD() {
        if(cc.sys.OS_ANDROID == cc.sys.os) {

           
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","showReward","()V");//展示视频广告
        }
         else if(cc.sys.OS_IOS == cc.sys.os) {
            jsb.reflection.callStaticMethod("AppController", "game2NativeShow");//ios
        }
     },

     
 })