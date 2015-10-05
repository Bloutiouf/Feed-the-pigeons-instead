'use strict';

var gameElement = document.getElementById('game');
var objectsElement = document.getElementById('objects');
var messageElement = document.getElementById('message');
var cooldownElement = document.getElementById('cooldown');

var pigeonComponents = [];
var pigeonCount = 0;
var breadComponents = [];

var styleVendors = ['webkit', 'moz', 'ms', 'o'];
function setStyleVendor(element, property, value) {
	element.style[property] = value;
	property = property[0].toUpperCase() + property.substr(1);
	styleVendors.forEach(function(prefix) {
		element.style[prefix + property] = value;
	});
}

var AllMessages = {
	en: {
		START: [
			'Click to feed the pigeons.',
			'Otherwise they\'ll die.',
		],
		CONTINUE: [
			'Congratulations!',
			'Wait for the bottom right gauge to disappear to click again.',
			'Your goal is to increase the pigeon population.',
		],
		SWEEPER: [
			'Damn it! They are too many pigeons!',
			'The authoritites want to lower their population.',
			'Watch out for their sweeepers!',
		],
		VAGABOND: [
			'The pigeon population has decreased, and the sweepers has been fired.',
			'Some of them have ended up on the street.',
		],
		GAME_OVER: [
			'Game Over',
		],
		CREDITS: [
			'Feed the pigeons instead',
			'Jonathan Giroux "Bloutiouf" 2015',
		],
	},
	fr: {
		START: [
			'Cliquez pour nourrir les pigeons.',
			'Sinon ils vont mourir.',
		],
		CONTINUE: [
			'Bravo !',
			'Attendez que la jauge en bas à droite se vide pour recommencer.',
			'Votre but est d\'accroître le nombre de pigeons !',
		],
		SWEEPER: [
			'Horreur ! Il y a trop de pigeons !',
			'Les autorités veulent réduire leur population.',
			'Faites attention à leurs agents de nettoyage !'
		],
		VAGABOND: [
			'La population de pigeons a considérablement diminué, et les agents ont été licensiés.',
			'Certains se sont retrouvés à la rue.',
		],
		GAME_OVER: [
			'Game Over'
		],
		CREDITS: [
			'Feed the pigeons instead',
			'Jonathan Giroux "Bloutiouf" 2015',
		],
	},
};

var Messages = AllMessages[location.hash.substr(1)];
if (!Messages)
	Messages = AllMessages['en'];

var Images = {
	BREAD_0: {
		source: 'bread-0.png',
		width: 46,
		height: 39,
		offsetX: 22,
		offsetY: 18,
	},
	BREAD_1: {
		source: 'bread-1.png',
		width: 52,
		height: 43,
		offsetX: 26,
		offsetY: 22,
	},
	BREAD_2: {
		source: 'bread-0.png',
		width: 47,
		height: 38,
		offsetX: 23,
		offsetY: 19,
	},
	PIGEON_DEAD: {
		source: 'pigeon-dead.png',
		width: 83,
		height: 56,
		offsetX: 41,
		offsetY: 24,
	},
	PIGEON_EAT_0: {
		source: 'pigeon-eat-0.png',
		width: 73,
		height: 55,
		offsetX: 40,
		offsetY: 46,
	},
	PIGEON_EAT_1: {
		source: 'pigeon-eat-1.png',
		width: 72,
		height: 68,
		offsetX: 40,
		offsetY: 62,
	},
	PIGEON_IDLE_0: {
		source: 'pigeon-idle-0.png',
		width: 88,
		height: 71,
		offsetX: 61,
		offsetY: 59,
	},
	PIGEON_IDLE_1: {
		source: 'pigeon-idle-1.png',
		width: 88,
		height: 70,
		offsetX: 61,
		offsetY: 59,
	},
	PIGEON_WALK_0: {
		source: 'pigeon-walk-0.png',
		width: 87,
		height: 73,
		offsetX: 59,
		offsetY: 61,
	},
	PIGEON_WALK_1: {
		source: 'pigeon-walk-1.png',
		width: 84,
		height: 70,
		offsetX: 50,
		offsetY: 61,
	},
	SWEEPER_EAT_0: {
		source: 'sweeper-eat-0.png',
		width: 125,
		height: 243,
		offsetX: 78,
		offsetY: 226,
	},
	SWEEPER_EAT_1: {
		source: 'sweeper-eat-1.png',
		width: 90,
		height: 245,
		offsetX: 43,
		offsetY: 228,
	},
	SWEEPER_IDLE_0: {
		source: 'sweeper-idle-0.png',
		width: 133,
		height: 246,
		offsetX: 87,
		offsetY: 225,
	},
	SWEEPER_IDLE_1: {
		source: 'sweeper-idle-1.png',
		width: 143,
		height: 248,
		offsetX: 96,
		offsetY: 226,
	},
	SWEEPER_WALK_0: {
		source: 'sweeper-walk-0.png',
		width: 123,
		height: 249,
		offsetX: 66,
		offsetY: 224,
	},
	SWEEPER_WALK_1: {
		source: 'sweeper-walk-1.png',
		width: 168,
		height: 236,
		offsetX: 114,
		offsetY: 220,
	},
	VAGABOND_DEAD: {
		source: 'vagabond-dead.png',
		width: 233,
		height: 88,
		offsetX: 140,
		offsetY: 68,
	},
	VAGABOND_EAT_0: {
		source: 'vagabond-eat-0.png',
		width: 210,
		height: 100,
		offsetX: 134,
		offsetY: 92,
	},
	VAGABOND_EAT_1: {
		source: 'vagabond-eat-1.png',
		width: 194,
		height: 104,
		offsetX: 120,
		offsetY: 96,
	},
	VAGABOND_IDLE_0: {
		source: 'vagabond-idle-0.png',
		width: 184,
		height: 147,
		offsetX: 101,
		offsetY: 133,
	},
	VAGABOND_IDLE_1: {
		source: 'vagabond-idle-1.png',
		width: 182,
		height: 148,
		offsetX: 101,
		offsetY: 136,
	},
	VAGABOND_WALK_0: {
		source: 'vagabond-walk-0.png',
		width: 176,
		height: 149,
		offsetX: 101,
		offsetY: 117,
	},
	VAGABOND_WALK_1: {
		source: 'vagabond-walk-1.png',
		width: 243,
		height: 136,
		offsetX: 126,
		offsetY: 134,
	},
};

var Animations = {
	PIGEON_EAT: {
		interval: 0.2,
		images: [
			Images.PIGEON_EAT_0,
			Images.PIGEON_EAT_1,
		],
	},
	PIGEON_IDLE: {
		interval: 0.3,
		images: [
			Images.PIGEON_IDLE_0,
			Images.PIGEON_IDLE_1,
		],
	},
	PIGEON_RUSH: {
		interval: 0.1,
		images: [
			Images.PIGEON_WALK_0,
			Images.PIGEON_WALK_1,
		],
	},
	PIGEON_WALK: {
		interval: 0.3,
		images: [
			Images.PIGEON_WALK_0,
			Images.PIGEON_WALK_1,
		],
	},
	SWEEPER_EAT: {
		interval: 0.1,
		images: [
			Images.SWEEPER_EAT_0,
			Images.SWEEPER_EAT_1,
		],
	},
	SWEEPER_IDLE: {
		interval: 0.3,
		images: [
			Images.SWEEPER_IDLE_0,
			Images.SWEEPER_IDLE_1,
		],
	},
	SWEEPER_RUSH: {
		interval: 0.1,
		images: [
			Images.SWEEPER_WALK_0,
			Images.SWEEPER_WALK_1,
		],
	},
	SWEEPER_WALK: {
		interval: 0.3,
		images: [
			Images.SWEEPER_WALK_0,
			Images.SWEEPER_WALK_1,
		],
	},
	VAGABOND_EAT: {
		interval: 0.1,
		images: [
			Images.VAGABOND_EAT_0,
			Images.VAGABOND_EAT_1,
		],
	},
	VAGABOND_IDLE: {
		interval: 0.3,
		images: [
			Images.VAGABOND_IDLE_0,
			Images.VAGABOND_IDLE_1,
		],
	},
	VAGABOND_RUSH: {
		interval: 0.1,
		images: [
			Images.VAGABOND_WALK_0,
			Images.VAGABOND_WALK_1,
		],
	},
	VAGABOND_WALK: {
		interval: 0.3,
		images: [
			Images.VAGABOND_WALK_0,
			Images.VAGABOND_WALK_1,
		],
	},
};

function GameObject() {
	this.componentList = [];
	this.components = {};
	this.x = 0;
	this.y = 0;
	this.dx = 0;
	this.dy = 0;
	this.removed = false;
}

GameObject.prototype.addComponent = function(component) {
	this.componentList.push(component);
	this.components[component.name] = component;
};

GameObject.prototype.trigger = function(name) {
	var args = Array.prototype.slice.call(arguments, 1);
	this.componentList.forEach(function(component) {
		var f = component[name];
		if (f)
			f.apply(component, args);
	});
};

GameObject.prototype.remove = function() {
	this.removed = true;
};


function Component(object) {
	this.object = object;
}

Component.prototype.name = 'Component';

Component.prototype.init = function() {};

Component.prototype.remove = function() {};

Component.prototype.update = function() {};


function ImageComponent(object, desc) {
	this.object = object;

	this.element = document.createElement('div');
	desc.parentElement.appendChild(this.element);
}

ImageComponent.prototype = Object.create(Component.prototype);

ImageComponent.prototype.name = 'ImageComponent';

ImageComponent.prototype.remove = function() {
	this.element.remove();
};

ImageComponent.prototype.setAnimation = function(animation) {
	this.animation = animation;
	this.animationIndex = 0;
	this.animationTimer = animation.interval;
	this.setImage(animation.images[this.animationIndex]);
};

ImageComponent.prototype.setFixedImage = function(image) {
	this.animation = null;
	this.setImage(image);
};

ImageComponent.prototype.setImage = function(image) {
	this.image = image;

	if (image.className)
		this.element.className = image.className;

	if (image.source)
		this.element.style.backgroundImage = 'url("' + image.source + '")';
	
	this.element.style.width = image.width + 'px';
	this.element.style.height = image.height + 'px';
	this.element.style.left = -image.offsetX + 'px';
	this.element.style.top = -image.offsetY + 'px';
	setStyleVendor(this.element, 'transform-origin', image.offsetX + 'px ' + image.offsetY + 'px');
};

ImageComponent.prototype.update = function(dt) {
	if (this.animation) {
		this.animationTimer -= dt;
		while (this.animationTimer < 0) {
			this.animationIndex = (this.animationIndex + 1) % this.animation.images.length;
			this.animationTimer += this.animation.interval;
			this.setImage(this.animation.images[this.animationIndex]);
		}
	}

	var transform = 'translate(' + (this.object.x) + 'px,' + (this.object.y) + 'px)';
	if (this.object.rotation)
		transform += ' rotate(' + this.object.rotation + 'rad)';
	if (this.object.mirror)
		transform += ' scale(-1,1)';

	setStyleVendor(this.element, 'transform', transform);
};

function EatComponent(object, constants) {
	this.object = object;
	this.constants = constants;
}

var MARGIN_TOP = 50;
var MARGIN_BOTTOM = 50;
var MARGIN_LEFT = 50;
var MARGIN_RIGHT = 50;

EatComponent.Constants = {
	PIGEON: {
		MIN_ROAMING_INTERVAL: 0.5,
		MAX_ROAMING_INTERVAL: 3,

		MIN_WALK_SPEED: 20,
		MAX_WALK_SPEED: 100,
		RUSH_SPEED: 200,

		SIGHT_RADIUS: 400,
		EAT_RADIUS: 50,

		EAT_ANIMATION: Animations.PIGEON_EAT,
		IDLE_ANIMATION: Animations.PIGEON_IDLE,
		RUSH_ANIMATION: Animations.PIGEON_RUSH,
		WALK_ANIMATION: Animations.PIGEON_WALK,

		TARGET_COLLECTION: breadComponents,
	},
	SWEEPER: {
		MIN_ROAMING_INTERVAL: 2,
		MAX_ROAMING_INTERVAL: 5,

		MIN_WALK_SPEED: 100,
		MAX_WALK_SPEED: 300,
		RUSH_SPEED: 400,

		SIGHT_RADIUS: 2500,
		EAT_RADIUS: 100,

		EAT_ANIMATION: Animations.SWEEPER_EAT,
		IDLE_ANIMATION: Animations.SWEEPER_IDLE,
		RUSH_ANIMATION: Animations.SWEEPER_RUSH,
		WALK_ANIMATION: Animations.SWEEPER_WALK,

		TARGET_COLLECTION: breadComponents,
	},
	VAGABOND: {
		MIN_ROAMING_INTERVAL: 0.5,
		MAX_ROAMING_INTERVAL: 3,

		MIN_WALK_SPEED: 200,
		MAX_WALK_SPEED: 500,
		RUSH_SPEED: 600,

		SIGHT_RADIUS: 1000,
		EAT_RADIUS: 100,

		EAT_ANIMATION: Animations.VAGABOND_EAT,
		IDLE_ANIMATION: Animations.VAGABOND_IDLE,
		RUSH_ANIMATION: Animations.VAGABOND_RUSH,
		WALK_ANIMATION: Animations.VAGABOND_WALK,

		TARGET_COLLECTION: pigeonComponents,
	},
};

EatComponent.MIN_WALK = 20;
EatComponent.MIN_MIRROR = 1;
EatComponent.MAX_ROAMING_TRIES = 10;
EatComponent.RUSH_THRESHOLD = 10;

EatComponent.State = {
	ROAMING: 0,
	RUSHING: 1,
	EATING: 2,
};

EatComponent.prototype = Object.create(Component.prototype);

EatComponent.prototype.name = 'EatComponent';

EatComponent.prototype.init = function() {
	this.health = this.constants.START_HEALTH;
	this.state = EatComponent.State.ROAMING;
	this.roamingInterval = -1;
};

EatComponent.prototype.roam = function() {
	this.state = EatComponent.State.ROAMING;
	this.roamingInterval = 0;

	var speed, angle, moveX, moveY, x, y;
	var tries = 0;
	do {
		speed = this.constants.MIN_WALK_SPEED + Math.random() * (this.constants.MAX_WALK_SPEED - this.constants.MIN_WALK_SPEED);
		angle = Math.random() * 2 * Math.PI;
		moveX = speed * Math.cos(angle);
		moveY = speed * Math.sin(angle);
		x = this.object.x + moveX;
		y = this.object.y + moveY;
		++tries;
	} while (tries < EatComponent.MAX_ROAMING_TRIES &&
		(x < MARGIN_LEFT || x >= windowWidth - MARGIN_RIGHT ||
		y < MARGIN_TOP || y >= windowHeight - MARGIN_BOTTOM));

	if (tries >= EatComponent.MAX_ROAMING_TRIES) {
		x = windowWidth / 2;
		y = windowHeight / 2;
	}

	this.targetSpeed = speed;
	this.targetX = x;
	this.targetY = y;

	this.object.components.ImageComponent.setAnimation(this.constants.WALK_ANIMATION);
};

EatComponent.prototype.rush = function(object) {
	if (this.state !== EatComponent.State.RUSHING && this.state !== EatComponent.State.EATING ||
		this.rushedObject !== object) {
		this.rushedObject = object;
		this.object.components.ImageComponent.setAnimation(this.constants.RUSH_ANIMATION);
		this.state = EatComponent.State.RUSHING;
	}

	this.targetSpeed = this.constants.RUSH_SPEED;
	this.targetX = object.x;
	this.targetY = object.y;
};

EatComponent.prototype.update = function(dt) {
	if (this.object.dead) return;

	var that = this;

	if (this.state === EatComponent.State.ROAMING && this.roamingInterval) {
		this.roamingInterval -= dt;
		if (this.roamingInterval <= 0) {
			this.roam();
		}
	}

	var sortedBreadComponents = this.constants.TARGET_COLLECTION.map(function(breadComponent) {
		var dx = that.object.x - breadComponent.object.x;
		var dy = that.object.y - breadComponent.object.y;
		var d2 = dx * dx + dy * dy;
		return [breadComponent, d2];
	}).filter(function(desc) {
		return desc[1] < that.constants.SIGHT_RADIUS * that.constants.SIGHT_RADIUS;
	}).sort(function(a, b) {
		return a[1] - b[1];
	});

	var breadComponent;
	if (sortedBreadComponents.length > 0) {
		breadComponent = sortedBreadComponents[0][0];
		this.rush(breadComponent.object);
	}

	if ((this.state === EatComponent.State.RUSHING || this.state === EatComponent.State.EATING) && !sortedBreadComponents.length)
		this.wait();

	if (this.targetSpeed) {
		var dx = this.targetX - this.object.x;
		var dy = this.targetY - this.object.y;
		var d = Math.sqrt(dx * dx + dy * dy);
		var dm = this.targetSpeed * dt;
		
		if (this.state === EatComponent.State.EATING && d > this.constants.EAT_RADIUS * 1.2) {
			this.state = EatComponent.State.RUSHING;
			this.object.components.ImageComponent.setAnimation(this.constants.RUSH_ANIMATION);
		} else if (breadComponent && d <= this.constants.EAT_RADIUS) {
			this.object.trigger('eat', breadComponent, dt);
			breadComponent.object.trigger('kill');
			if (this.state === EatComponent.State.RUSHING) {
				this.state = EatComponent.State.EATING;
				this.object.components.ImageComponent.setAnimation(this.constants.EAT_ANIMATION);
			}
		} else if (d <= dm) {
			this.object.x = this.targetX;
			this.object.y = this.targetY;
			this.wait();
		} else {
			this.object.dx += dx / d * dm;
			this.object.dy += dy / d * dm;
		}
	}

	if (this.state === EatComponent.State.ROAMING) {
		var walking = (Math.abs(this.object.dx) + Math.abs(this.object.dy) > EatComponent.MIN_WALK * dt);
		if (!walking && this.object.components.ImageComponent.animation !== this.constants.IDLE_ANIMATION)
			this.object.components.ImageComponent.setAnimation(this.constants.IDLE_ANIMATION);
		else if (walking && this.object.components.ImageComponent.animation === this.constants.IDLE_ANIMATION)
			this.object.components.ImageComponent.setAnimation(this.constants.WALK_ANIMATION);
	}

	if (this.object.dx) {
		if (this.object.dx > EatComponent.MIN_MIRROR)
			this.object.mirror = false;
		if (this.object.dx < -EatComponent.MIN_MIRROR)
			this.object.mirror = true;

		this.object.x += this.object.dx;
		if (this.object.x < MARGIN_LEFT)
			this.object.x = MARGIN_LEFT;
		if (this.object.x > windowWidth - MARGIN_RIGHT)
			this.object.x = windowWidth - MARGIN_RIGHT;

		this.object.dx = 0;
	}

	if (this.object.dy) {
		this.object.y += this.object.dy;

		if (this.object.y < MARGIN_TOP)
			this.object.y = MARGIN_TOP;
		if (this.object.y > windowHeight - MARGIN_BOTTOM)
			this.object.y = windowHeight - MARGIN_BOTTOM;

		this.object.dy = 0;
	}
};

EatComponent.prototype.wait = function() {
	this.targetSpeed = 0;
	this.state = EatComponent.State.ROAMING;
	this.roamingInterval = this.constants.MIN_ROAMING_INTERVAL + Math.random() * (this.constants.MAX_ROAMING_INTERVAL - this.constants.MIN_ROAMING_INTERVAL);
	this.object.components.ImageComponent.setAnimation(this.constants.IDLE_ANIMATION);
};


function HealthComponent(object, constants) {
	this.object = object;
	this.constants = constants;
}

HealthComponent.Constants = {
	PIGEON: {
		START_HEALTH: 20,
		EAT_HEALTH_BONUS: 5,
		HEALTH_REPRODUCTION: 60,
		DEAD_IMAGE: Images.PIGEON_DEAD,
	},
	VAGABOND: {
		START_HEALTH: 20,
		EAT_HEALTH_BONUS: 2,
		DEAD_IMAGE: Images.VAGABOND_DEAD,
	},
};

HealthComponent.DEAD_TIMER = 10;

HealthComponent.prototype = Object.create(Component.prototype);

HealthComponent.prototype.name = 'HealthComponent';

HealthComponent.prototype.eat = function(food, dt) {
	if (food.quantity > 0) {
		food.quantity -= dt;
		this.health += this.constants.EAT_HEALTH_BONUS * dt;
		// console.log(food.quantity, this.health)
		if (food.quantity <= 0)
			food.object.remove();
	}
};

HealthComponent.prototype.hit = function(dt) {
	this.health -= dt;
	if (this.health <= 0)
		this.kill();
};

HealthComponent.prototype.init = function() {
	this.health = this.constants.START_HEALTH;
};

HealthComponent.prototype.kill = function() {
	this.object.dead = true;
	this.deadTimer = HealthComponent.DEAD_TIMER;
	this.object.components.ImageComponent.setFixedImage(this.constants.DEAD_IMAGE);
	this.object.trigger('die');
};

var userEntered;
HealthComponent.prototype.update = function(dt) {
	if (!userEntered) return;

	if (this.object.dead) {
		this.deadTimer -= dt;
		if (this.deadTimer < 0)
			this.object.remove();
		return;
	}

	this.health -= dt;
	if (this.health <= 0) {
		return this.kill();
	}

	if (this.health >= this.constants.HEALTH_REPRODUCTION) {
		this.health = this.constants.START_HEALTH;
		var baby = spawn(Objects.PIGEON);
		var angle = Math.random() * 2 * Math.PI;
		baby.x = this.object.x + 5 * Math.cos(angle);
		baby.y = this.object.y + 5 * Math.sin(angle);
		baby.mirror = this.object.mirror;
		this.object.trigger('roam');
	}
};



function PigeonComponent(object) {
	this.object = object;

	this.quantity = PigeonComponent.START_QUANTITY;
}

PigeonComponent.START_QUANTITY = 3;
PigeonComponent.PIGEON_FORCE = 50000;
PigeonComponent.CHARACTER_FORCE = 20000000;
PigeonComponent.MAX_FORCE_RADIUS = 500;
PigeonComponent.PROXIMITY_RADIUS = 50;

PigeonComponent.prototype = Object.create(Component.prototype);

PigeonComponent.prototype.name = 'PigeonComponent';

PigeonComponent.prototype.die = function() {
	if (!this.dead) {
		--pigeonCount;
		this.dead = true;
	}
};

PigeonComponent.prototype.init = function() {
	pigeonComponents.push(this);
	++pigeonCount;
};

PigeonComponent.prototype.remove = function() {
	var index = pigeonComponents.indexOf(this);
	pigeonComponents.splice(index, 1);
};

PigeonComponent.prototype.update = function(dt) {
	if (this.object.dead) return;

	var that = this;
	var forceX = 0;
	var forceY = 0;

	pigeonComponents.forEach(function(component) {
		if (that === component) return;
		var dx = that.object.x - component.object.x;
		var dy = that.object.y - component.object.y;
		var d2 = Math.max(dx * dx + dy * dy, 1);
		var d = Math.sqrt(d2);
		if (d < PigeonComponent.MAX_FORCE_RADIUS) {
			forceX += dx / d * PigeonComponent.PIGEON_FORCE / d2;
			forceY += dy / d * PigeonComponent.PIGEON_FORCE / d2;
			if (d < PigeonComponent.PROXIMITY_RADIUS) {
				that.object.trigger('hit', dt)
			}
		}
	});

	characterObjects.forEach(function(character) {
		var dx = that.object.x - character.x;
		var dy = that.object.y - character.y;
		var d2 = Math.max(dx * dx + dy * dy, 1);
		var d = Math.sqrt(d2);
		if (d < PigeonComponent.MAX_FORCE_RADIUS) {
			forceX += dx / d * PigeonComponent.CHARACTER_FORCE / d2;
			forceY += dy / d * PigeonComponent.CHARACTER_FORCE / d2;
		}
	});

	this.object.dx += forceX * dt;
	this.object.dy += forceY * dt;
};


function BreadComponent(object) {
	this.object = object;
	this.quantity = BreadComponent.START_QUANTITY;
}

BreadComponent.START_QUANTITY = 20;

BreadComponent.IMAGES = [
	Images.BREAD_0,
	Images.BREAD_1,
	Images.BREAD_2,
];

BreadComponent.prototype = Object.create(Component.prototype);

BreadComponent.prototype.name = 'BreadComponent';

BreadComponent.prototype.init = function() {
	var index = Math.floor(BreadComponent.IMAGES.length * Math.random());
	this.object.components.ImageComponent.setFixedImage(BreadComponent.IMAGES[index]);
	this.object.rotation = Math.random() * 2 * Math.PI;
	breadComponents.push(this);
};

BreadComponent.prototype.remove = function() {
	var index = breadComponents.indexOf(this);
	breadComponents.splice(index, 1);
};


var characterObjects = [];

var sweeperExists = false;

function SweeperComponent(object) {
	this.object = object;
	object.x = windowWidth / 2;
	object.y = windowHeight - 20;
	sweeperExists = true;
	characterObjects.push(object);
}

SweeperComponent.SPAWN_PIGEON_THRESHOLD = 15;
SweeperComponent.CLEAN_FACTOR = 20;

SweeperComponent.prototype = Object.create(Component.prototype);

SweeperComponent.prototype.name = 'SweeperComponent';

SweeperComponent.prototype.eat = function(food, dt) {
	if (food.quantity > 0) {
		food.quantity -= dt * SweeperComponent.CLEAN_FACTOR;
		if (food.quantity <= 0)
			food.object.remove();
	}
};

SweeperComponent.prototype.remove = function() {
	sweeperExists = false;
	var index = characterObjects.indexOf(this.object);
	characterObjects.splice(index, 1);
};

SweeperComponent.prototype.update = function() {
	if (pigeonCount <= VagabondComponent.SPAWN_PIGEON_THRESHOLD) {
		var vagabond = spawn(Objects.VAGABOND);
		vagabond.x = this.object.x;
		vagabond.y = this.object.y;
		vagabond.mirror = this.object.mirror;
		this.object.remove();
		showMessage(Messages.VAGABOND);
	}
};


function VagabondComponent(object) {
	this.object = object;
	characterObjects.push(object);
}

VagabondComponent.SPAWN_PIGEON_THRESHOLD = 10;

VagabondComponent.prototype = Object.create(Component.prototype);

VagabondComponent.prototype.name = 'VagabondComponent';

VagabondComponent.prototype.remove = function() {
	var index = characterObjects.indexOf(this.object);
	characterObjects.splice(index, 1);
};


function KeyboardComponent(object) {
	this.object = object;

	var keyDowns = this.keyDowns = {};
	var keyPresseds = this.keyPresseds = {};

	addEventListener('keydown', function(event) {
		console.log(event.which);
		keyDowns[event.which] = keyPresseds[event.which] = true;
	});
	
	addEventListener('keyup', function(event) {
		keyPresseds[event.which] = false;
	});
}

KeyboardComponent.prototype = Object.create(Component.prototype);

KeyboardComponent.prototype.name = 'KeyboardComponent';

KeyboardComponent.prototype.update = function() {
	if (this.keyPresseds[37]) {
		this.object.mirror = true;
	}

	if (this.keyPresseds[39]) {
		this.object.mirror = false;
	}
	
	this.keyDowns = {};
};


var Objects = {
	PIGEON: function(object) {
		object.addComponent(new PigeonComponent(object));
		object.addComponent(new EatComponent(object, EatComponent.Constants.PIGEON));
		object.addComponent(new HealthComponent(object, HealthComponent.Constants.PIGEON));

		object.addComponent(new ImageComponent(object, {
			parentElement: objectsElement,
		}));
	},
	BREAD: function(object) {
		object.addComponent(new BreadComponent(object));

		object.addComponent(new ImageComponent(object, {
			parentElement: objectsElement,
		}));
	},
	SWEEPER: function(object) {
		object.addComponent(new EatComponent(object, EatComponent.Constants.SWEEPER));
		object.addComponent(new SweeperComponent(object));

		object.addComponent(new ImageComponent(object, {
			parentElement: objectsElement,
		}));
	},
	VAGABOND: function(object) {
		object.addComponent(new EatComponent(object, EatComponent.Constants.VAGABOND));
		object.addComponent(new HealthComponent(object, HealthComponent.Constants.VAGABOND));
		object.addComponent(new VagabondComponent(object));

		object.addComponent(new ImageComponent(object, {
			parentElement: objectsElement,
		}));
	},
};

var windowWidth = 1920;
var windowHeight = 1080;

var objects = [];

function spawn(type) {
	var object = new GameObject();
	type(object);
	object.trigger('init');
	objects.push(object);
	return object;
}

var MESSAGE_DURATION = 5;
var messageTimeoutId;
function showMessage(texts, auto) {
	messageElement.textContent = '';
	texts.forEach(function(text) {
		var element = document.createElement('div');
		element.textContent = text;
		messageElement.appendChild(element);
	});
	
	clearTimeout(messageTimeoutId);
	if (auto !== false)
		messageTimeoutId = setTimeout(function() {
			messageElement.textContent = '';
		}, MESSAGE_DURATION * 1000);
}

function start() {
	gameElement.style.width = windowWidth + 'px';
	gameElement.style.height = windowHeight + 'px';
	var gameScale;
	function onWindowResize() {
		if (window.innerWidth * windowHeight > window.innerHeight * windowWidth) {
			gameScale = window.innerHeight / windowHeight;
			gameElement.style.left = (window.innerWidth - gameScale * windowWidth) / 2 + 'px';
			gameElement.style.top = '0px';
		} else {
			gameScale = window.innerWidth / windowWidth;
			gameElement.style.top = (window.innerHeight - gameScale * windowHeight) / 2 + 'px';
			gameElement.style.left = '0px';
		}
		setStyleVendor(gameElement, 'transform', 'scale(' + gameScale + ')');
	}
	
	window.addEventListener('resize', onWindowResize);
	onWindowResize();

	var COOLDOWN_PERIOD = 3000;
	var clickTime;

	gameElement.addEventListener('mousedown', function(event) {
		event.preventDefault();
		
		var now = Date.now();
		if (now < clickTime) return;
		clickTime = now + COOLDOWN_PERIOD;

		var x = (event.pageX - gameElement.offsetLeft) / gameScale;
		var y = (event.pageY - gameElement.offsetTop) / gameScale;
		if (x < MARGIN_LEFT || x >= windowWidth - MARGIN_RIGHT ||
			y < MARGIN_TOP || y >= windowHeight - MARGIN_BOTTOM)
			return;

		var bread = spawn(Objects.BREAD);
		bread.x = x;
		bread.y = y;

		if (!userEntered) {
			userEntered = true;
			showMessage(Messages.CONTINUE);
		}
	});

	var startTime;
	var lastTime = 0;
	var time;
	var dt;

	var gameOver;

	function render() {
		requestAnimationFrame(render);
		
		time = (Date.now() - startTime) / 1000;
		dt = Math.min(time - lastTime, 0.1);
		lastTime = time;

		for (var i = 0; i < objects.length; ++i) {
			var object = objects[i];
			object.trigger('update', dt);
			if (object.removed) {
				objects.splice(i, 1);
				object.trigger('remove');
			}
		}

		if (!sweeperExists && pigeonCount >= SweeperComponent.SPAWN_PIGEON_THRESHOLD) {
			spawn(Objects.SWEEPER);
			showMessage(Messages.SWEEPER);
		}

		if (!pigeonCount && !gameOver) {
			gameOver = true;
			showMessage(Messages.GAME_OVER);
			setTimeout(function() {
				showMessage(Messages.CREDITS);
			}, MESSAGE_DURATION * 1000);
			setTimeout(startGame, MESSAGE_DURATION * 3000);
		}

		var now = Date.now();
		if (now < clickTime) {
			var height = (clickTime - now) / COOLDOWN_PERIOD * 200;
			cooldownElement.style.height = height + 'px';
		} else
			cooldownElement.style.height = '0px';
	}

	startTime = Date.now();
	
	function startGame() {
		objects.forEach(function(object) {
			object.trigger('remove');
		});
		objects = [];

		clickTime = startTime;
		gameOver = false;
		userEntered = false;

		for (var i = 0; i < 10; ++i) {
			var pigeon = spawn(Objects.PIGEON);
			pigeon.x = MARGIN_LEFT + Math.random() * (windowWidth - MARGIN_LEFT - MARGIN_RIGHT);
			pigeon.y = MARGIN_TOP + Math.random() * (windowHeight - MARGIN_TOP - MARGIN_BOTTOM);
			pigeon.mirror = (Math.random() < 0.5);
		}

		showMessage(Messages.START, false);

		requestAnimationFrame(render);
	}

	return startGame();
}
