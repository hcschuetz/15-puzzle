import React from "react";
import ReactDOM from "react-dom";
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';

import {randomPermutation, permute, permutationTranspositionCount} from "./permutation";

function randomState() {
	const four = [0, 1, 2, 3];
	let p = randomPermutation(16);
	const idx = p.indexOf(0);
	const j = idx % 4;
	const i = (idx - j) / 4;
	if ((permutationTranspositionCount(p) + i + j) % 2 === 0)
		// We have an unsolvable state.	 Flip two non-empty fields to
		// make it solvable.
		p = p[0] && p[1] ? permute(p, [0,1]) : permute(p, [2,3]);
	return {
		empty: {i, j},
		fields: [for (i of four) [for (j of four) p[4*i+j]]]
	};
}

function move(i, j) {
	return {
		type: "MOVE_TO_EMPTY",
		payload: {i, j}
	};
}

const initialState = randomState();

function puzzleReducer(state = initialState, {type, payload}) {
	switch (type) {
	case "MOVE_TO_EMPTY": {
		const {i, j} = payload;
		const {fields, empty} = state;
		return {
			empty: {i, j},
			fields: fields.map(
				(r, ii) => r.map(
					(f, jj) =>
						ii == i && jj == j ? 0 :
						ii == empty.i && jj == empty.j ? fields[i][j] :
						f
				)
			)
		};
	}
	default:
		return state;
	}
}


const Puzzle = connect(state => state)(
	({dispatch, empty, fields}) =>
	<table>
		<tbody>
			{
				fields.map((row, i) => (
					<tr key={i}>
						{
							row.map((label, j) => {
								const movable = Math.abs(i - empty.i) + Math.abs(j - empty.j) == 1;
								return (
									<td style={{
											textAlign: "center",
											width: "2em",
											height: "2em",
											border: label === 0 ? undefined : "1px solid black",
											backgroundColor: movable ? "#F8F8F8" : undefined
										}}
										onClick={movable ? () => dispatch(move(i, j)) : undefined}
										key={j}
									>
										{
											label !== 0 && label
										}
									</td>
								)
							})
						}
					</tr>
				))
			}
		</tbody>
	</table>
);

const store = createStore(puzzleReducer);

ReactDOM.render(
	<Provider store={store}>
		<Puzzle />
	</Provider>,
	document.getElementById('mnt')
);
