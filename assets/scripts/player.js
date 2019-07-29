cc.Class({
    extends: cc.Component,

    properties: {
        score_game_text: cc.Label,
        score_end_text: cc.Label,
        score_top_text: cc.Label,
        gameover_node: cc.Node,
        map_node: cc.Node,
    },

    onLoad() {
        this.score_game_text.string = 0 + "";
        this.highscore = cc.sys.localStorage.getItem('topscore');
        this.score = 0;
        this.ismove = false;
        this.map = this.map_node.getComponent("map");
       
    },

    MoveUp() {
       if(this.node.y + 10 > 495) return;//改成对象
        if(this.ismove) return;
        cc.game.emit("move");
        this.ismove = true;
        var act1 = cc.moveBy(1,cc.p(0,90));
        var fcal = cc.callFunc(function(){
            this.ismove = false;
            cc.log(this.node.x, this.node.y);
        },this);
        var seq = cc.sequence(act1,fcal);
        this.node.runAction(seq);
    },

    MoveDown() {
        if(this.node.y - 10 < -135) return;
        if(this.ismove) return;
        cc.game.emit("move");
        this.ismove = true;
        var act1 = cc.moveBy(1,cc.p(0,-90));
        var fcal = cc.callFunc(function(){
            this.ismove = false;
            cc.log(this.node.x, this.node.y);
        },this);
        var seq = cc.sequence(act1,fcal);
        this.node.runAction(seq);
    },

    MoveLeft() {
        if(this.node.x - 100 < -405) return;
        if(this.ismove) return;
        cc.game.emit("move");
        this.ismove = true;
        var act1 = cc.moveBy(1,cc.p(-90,0));
        var fcal = cc.callFunc(function(){
            this.ismove = false;
        },this);
        var seq = cc.sequence(act1,fcal);
        this.node.runAction(seq);
    },

    MoveRight() {
        if(this.node.x + 100 > 405) return;
        if(this.ismove) return;
        cc.game.emit("move");
        this.ismove = true;
        var act1 = cc.moveBy(1,cc.p(90,0));
        var fcal = cc.callFunc(function(){
            this.ismove = false;
        },this);
        var seq = cc.sequence(act1,fcal);
        this.node.runAction(seq);
    },

    onCollisionEnter: function (other, self) {
        cc.log('miss');
        if(other.node.groupIndex == 3) {
            cc.log('win');
            self.node.x = 1000;
            self.node.y = 1000;
            other.node.active = false;
            this.score ++;
            if(this.score > this.highscore) {
                cc.sys.localStorage.setItem('topscore',this.score);
            }
            this.score_game_text.string = this.score + "";
            this.map.destroy_map();
            this.scheduleOnce(function() {
                // 这里的 this 指向 component
                cc.log('hello');
                this.map.creator_map();
              // cc.director.loadScene('02');
            }, 1);
            this.rndShowAD();
        }

        if(other.node.groupIndex == 2) {
            cc.log('lose');
            this.gameover_node.active = true;
            this.score_end_text.string = this.score + "";
            this.score_top_text.string = this.highscore + "";
            this.rndShowAD();
        }

    },

    Game_Restart() {
        cc.director.loadScene('02');

    },

    Game_Menu() {
        cc.director.loadScene('01');
    },


    rndShowAD() {
        var rnd = cc.random0To1() * 1 + 1;
        rnd = Math.floor(rnd);
        if (rnd == 1) {
            if (cc.sys.OS_ANDROID == cc.sys.os) {

                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showInter", "()V");
            } else if (cc.sys.OS_IOS == cc.sys.os) {
                jsb.reflection.callStaticMethod("AppController", "game2NativeShow");//ios
            }
        }
    }


})