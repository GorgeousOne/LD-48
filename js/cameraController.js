class CameraController {

	constructor(target) {
		this.target = target;
		this.followTargetX = true;
		this.followTargetY = false;

		this.pos = createVector();
		this.focusOffset = createVector();
		this.zoom = 1;
	}

	minX() {
		return (-width / 2 + this.focusOffset.x * width) / this.zoom + this.pos.x;
	}

	maxX() {
		return (width / 2 + this.focusOffset.x * width) / this.zoom + this.pos.x;
	}

	minY() {
		return (-height / 2 + this.focusOffset.y * height) / this.zoom + this.pos.y;
	}

	maxY() {
		return (height / 2 + this.focusOffset.y * height) / this.zoom + this.pos.y;
	}

	setPos(x, y) {
		this.pos.set(x, y);
	}

	/**
	 * Sets offset of viewing center to targeted object
	 * @param relX
	 * @param relY
	 */
	setOffset(relX, relY) {
		this.focusOffset.set(relX, relY)
	}

	shake(amplitude, duration) {
		this.isShaking = true;
		this.shakeStrength = amplitude;
		this.shakeDuration = duration;
		this.shakeStart = Date.now();
	}

	focus() {
		if (this.target) {
			if (this.followTargetX) {
				this.pos.x = this.target.pos.x;
			}
			if (this.followTargetY) {
				this.pos.y = this.target.pos.y;
			}
		}
		translate(width / 2 - this.focusOffset.x * width, height / 2 - this.focusOffset.y * height);
		scale(this.zoom);
		translate(-this.pos.x, -this.pos.y);

		if (this.isShaking) {
			this.applyShake();
		}
	}

	applyShake() {
		let timeSinceStart = Date.now() - this.shakeStart;

		if (timeSinceStart > this.shakeDuration) {
			this.isShaking = false;
			return;
		}
		let currentStrength = (1 - (timeSinceStart / this.shakeDuration));
		currentStrength *= currentStrength * this.shakeStrength;
		translate(random(-currentStrength, currentStrength), random(-currentStrength, currentStrength));
	}
}