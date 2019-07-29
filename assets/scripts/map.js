cc.Class({
    extends: cc.Component,
    properties: {
        object_Pre: {//敌人,玩家,金币等
            type: cc.Prefab,
            default: [],
        },
        point_pos: cc.Node,//初始坐标
        player: cc.Node,
        flag: cc.Node,
        mash_hit: cc.Node,
    },

    onLoad() {
       
        this.destence_x = 0;
        this.destence_y = 0;
        this.counta = 0;
        this.countb = 0;
        this.countc = 0;
        this.countd = 0;
        this.counte = 0;
        this.countf = 0;
        this.creator_map();
        // this.destroy_map();
    },
    
    creator_map() {
        
                for (var i = 0; i < 8; i++) {
                    this.destence_x = 0;
                    for (var j = 0; j < 8; j++) {
                        var rnd = cc.random0To1() * 6;
                        rnd = Math.floor(rnd);
                       
                        var x = this.point_pos.x + this.destence_x;
                        var y = this.point_pos.y - this.destence_y;
                        // cc.log(cc.p(x,y));
                        switch (rnd) {
                            case 0://right
                                if (this.counta >= 8) break;
                                var trnd = cc.random0To1() * 1;
                                if(trnd >0.5) {
                                    var node_pre = cc.instantiate(this.object_Pre[rnd]);
                                    node_pre.parent = this.node;
                                    node_pre.x = x;
                                    node_pre.y = y;
                                    this.counta++;
        
                                }
        
                                break;
                            case 1://down
                                if (this.countb >= 8) break;
                                var trnd = cc.random0To1() * 1;
                                
                                if(trnd > 0.5) {
        
                                    var node_pre = cc.instantiate(this.object_Pre[rnd]);
                                    node_pre.parent = this.node;
                                    node_pre.x = x;
                                    node_pre.y = y;
                                    this.countb++;
                                }
                               
                                break;
                            case 2://up
                                if (this.countc >= 8) break;
                                var trnd = cc.random0To1() * 1;
                                if(trnd >0.5) {
        
                                    var node_pre = cc.instantiate(this.object_Pre[rnd]);
                                    node_pre.parent = this.node;
                                    node_pre.x = x;
                                    node_pre.y = y;
                                    this.countc++;
                                }
        
                                break;
                            case 3://left
                                if (this.countd >= 8) break;
                                var trnd = cc.random0To1() * 1;
                                if(trnd >0.5) {
        
                                    var node_pre = cc.instantiate(this.object_Pre[rnd]);
                                    node_pre.parent = this.node;
                                    node_pre.x = x;
                                    node_pre.y = y;
                                    this.countd ++;
                                }
        
                                break;
                            case 4://player
                                if (this.counte >= 1) break;
                                var trnd = cc.random0To1() * 1;
                                if(trnd >0.5) {
        
                                    this.player.x = x;
                                    this.player.y = y;
                                    this.counte++;
                                }
                                break;
                            case 5://flag
                                if (this.countf >= 1) break;
                                var trnd = cc.random0To1() * 1;
                                if(trnd >0.5) {
                                     this.flag.active = true;   
                                    this.flag.x = x;
                                    this.flag.y = y;
                                    this.countf ++;
                                }
                                break;
                            case 6:
                                break;
                        }
        
        
        
        
                        this.destence_x += 90;
                    }
                    this.destence_y += 90;
                }
                this.mash_hit.active = false;
    },
    destroy_map() {
        this.mash_hit.active = true;
        this.destence_x = 0;
        this.destence_y = 0;
        this.counta = 0;
        this.countb = 0;
        this.countc = 0;
        this.countd = 0;
        this.counte = 0;
        this.countf = 0;
        var enemys = this.node.children;

        for(var i = 0; i < enemys.length; i++ ) {
           var enemy = enemys[i];
            if(enemy.groupIndex == 2) {
                enemy.destroy();
            }
        }
    }
})