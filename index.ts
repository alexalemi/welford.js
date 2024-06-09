
export class Welford {
	constructor(count = 0, mean = 0, m2 = 0) {
		this.count = count;
		this.mean = mean;
		this.m2 = m2;
	}

	update(new_value) {
		let count = this.count + 1;
		let delta = new_value - this.mean;
		let mean = this.mean + delta / count;
		let delta2 = new_value - mean;
		let m2 = this.m2 + delta * delta2;
		return new Welford(count, mean, m2)
	}

	finalize() {
		let mean = this.mean;
		let variance = this.m2 / this.count;
		let sd = Math.sqrt(variance);
		let sem = sd / Math.sqrt(this.count);
		return {mean, sd, sem};
	}

	toString() {
		let {mean, sd, sem} = this.finalize();
		return `${mean}+/-${sem}`;
	}
}

