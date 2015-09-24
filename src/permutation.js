export function randomPermutation(n) {
	const p = Array(n);
	for (var i = 0; i < n; i++)
		p[i] = {i, r: Math.random()};
	p.sort(({r: r1}, {r: r2}) => r2 - r1);
	return p.map(({i}) => i);
}

export function permutationTranspositionCount(p) {
	const n = p.length;
	const seen = Array(n);
	var count = 0;
	for (var i = 0; i < n; i++) {
		if (!seen[i]) {
			seen[i] = true;
			for (var j = p[i]; j != i; j = p[j]) {
				seen[j] = true;
				count++;
			}
		}
	}
	return count;
}

export function permute(p, [i, j]) {
	p = p.slice();
	const aux = p[j];
	p[j] = p[i];
	p[i] = aux;
	return p;
}

/*
const flips = [
//	[2,5],
//	[2,4],
//	[1,6],
//	[4,5],
//	[5,0],
//	[3,6],
//	[0,3],
//	[6,5],
];

const p = flips.reduce(permute, [0,1,2,3,4,5,6]);

console.log(p);
console.log(permutationIsEven(p));


console.log(randomPermutation(5));
console.log(randomPermutation(16));
*/
