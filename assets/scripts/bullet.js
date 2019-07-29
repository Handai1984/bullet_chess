cc.Class({
    extends: cc.Component,
    properties: {
        pos:cc.Vec2,
    },

    onLoad() {
        this.count = 0;
        this.prePos = cc.p(this.node.x,this.node.y);
        cc.game.on("move",function() {
                        
            var act1 = cc.moveBy(1,cc.p(this.pos.x,this.pos.y));
            var pos_move = cc.callFunc(function() {
                //如果坐标大于或小于预定坐标,则变换坐标
                if(this.node.x < -330) {
                    this.node.x = 405;
                    return;
                }else if(this.node.x > 330) {
                    this.node.x = -405;
                    return;
                }else if(this.node.y > 500) {
                    this.node.y = -225;
                    return;
                }else if(this.node.y < -145) {
                    this.node.y = 585;
                    return;
                }
            },this)
            var seq = cc.sequence(act1, pos_move);
            this.node.runAction(seq);
        },this);
    }
})