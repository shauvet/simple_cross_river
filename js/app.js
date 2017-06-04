// 公共对象
var MovableObject = function (x, y, url) {
	this.x = x;
	this.y = y;

	this.sprite = url;
};

MovableObject.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 这是我们的玩家要躲避的敌人
var Enemy = function(x, y, speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    MovableObject.call(this, x, y, 'images/enemy-bug.png');
    this.speed = speed;

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    // this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(MovableObject.prototype);

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的

    var self = this;
    var move = function () {
    	self.x += dt * self.speed;
    };

    setInterval(move, 1000);

    if (this.x >= gameConst.canvasWidth) {
    	this.x = -gameConst.gridWidth;
    }
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x, y) {
	MovableObject.call(this, x, y, 'images/char-boy.png');

// 保存初始位置
	this.originX = x;
  this.originY = y;
}

Player.prototype = Object.create(MovableObject.prototype);

Player.prototype.update = function(){
	// 边界判断
	if (this.x < 0) {
		this.x = 0;
	}
	if (this.x > gameConst.gridWidth * 4) {
		this.x = gameConst.gridWidth * 4;
	}
	if (this.y > (gameConst.firstWay + 83 * 4)) {
		this.y = gameConst.firstWay + 83 * 4;
	}

	if (this.y < gameConst.firstWay) {
		this.restart();
		writeText('Congralations!');
		setTimeout(clearText, 2000);
	}
};

Player.prototype.restart = function(){
	this.x = this.originX;
	this.y = this.originY;
};

Player.prototype.handleInput = function(key){
	switch (key) {
		case 'up':
			this.y -= gameConst.gridHeight;
			break;
		case 'down':
			this.y += gameConst.gridHeight;
			break;
		case 'left':
			this.x -= gameConst.gridWidth;
			break;
		case 'right':
			this.x += gameConst.gridWidth;
			break;
		default:
			// statements_def
			break;
	}
};

function writeText (txt) {
	ctx.font = '36pt Impact';
	ctx.textAlign = 'center';

	ctx.fillStyle = 'white';
	ctx.fillText(txt, gameConst.canvasWidth / 2, 40);

	ctx.strokeStyle = 'black';
	ctx.lineWidth = 3;
	ctx.strokeText(txt, gameConst.canvasWidth / 2, 40);
}

function clearText () {
	ctx.clearRect(0, 0, gameConst.canvasWidth, gameConst.firstWay);
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var em1 = new Enemy(-gameConst.gridWidth-20, gameConst.firstWay, 3);
var em2 = new Enemy(-gameConst.gridWidth, gameConst.secondWay, 2);
var em3 = new Enemy(-gameConst.gridWidth-50, gameConst.thirdWay, 1.5);
var em4 = new Enemy(-gameConst.gridWidth*2, gameConst.secondWay, 2.5);
var em5 = new Enemy(-gameConst.gridWidth*3, gameConst.thirdWay, 2);
var allEnemies = [];
allEnemies.push(em1, em2, em3, em4, em5);
var player = new Player(gameConst.gridWidth*2, gameConst.originY);


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
