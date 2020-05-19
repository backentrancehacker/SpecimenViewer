const getCursor = (e, _target) => {
	let target = _target.getBoundingClientRect(),
		x = e.pageX - target.left,
		y = e.pageY - target.top
	return {
		x: x - window.pageXOffset,
		y: y - window.pageYOffset
	}
}
class Lens{
	constructor(target, zoom){
		this.target = document.getElementById(target)
		this.zoom = zoom

		let glass = document.createElement('div')
			glass.className = 'glass'
		Object.assign(glass.style, {
			backgroundImage: `url(${this.target.src})`,
			backgroundRepeat: 'no-repeat',
			backgroundSize: `${this.target.width * this.zoom}px ${this.target.height *this.zoom}px`,
			transform: 'scale(1)'
		})

		this.glass = glass
		this.target.parentElement.appendChild(this.glass)
		// this.target.parentElement.insertBefore(this.glass, this.target)

		this.meta = {
			h: this.glass.offsetHeight / 2,
			w: this.glass.offsetWidth / 2,
			bw: 3
		}

		this.target.addEventListener('mousemove', e => {
			e.preventDefault()
			this.handle(e)
		})
		this.timer
	}
	handle(e){
		let target = this.target,
			{x, y} = getCursor(e, target),
			{h, w, bw} = this.meta,
			glass = this.glass

		if(this.timer) clearTimeout(this.timer)
		
		if(x > target.width - (w / this.zoom)) x = target.width - (w / this.zoom)

		if(x < w / this.zoom) x = w / this.zoom

		if(y > target.height - (h / this.zoom)) y = target.height - (h / thi.zoom)

		if(y < h / this.zoom) y = h / this.zoom

		Object.assign(glass.style, {
			left: `${x - w}px`,
			top: `${y - h}px`,
			backgroundPosition: `-${(x * this.zoom) - w + bw}px -${(y * this.zoom) - h + bw}px`,
			transform: 'scale(2)'
		})
		this.timer = setTimeout(() => {
			glass.style.transform = 'scale(1)'
		}, 1000)
	}
	
}
new Lens('specimen', 2)