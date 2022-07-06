import { useState, useEffect } from 'react';

export default function Item({ quantity, item, notes, remove, id, edit }) {
	const [editable, setEditable] = useState(false);
	const [currentItem, setCurrentItem] = useState({
		quantity,
		item,
		notes,
		id
	});

	const handleChange = event => {
		const { name, value } = event.target;
		setCurrentItem(prevState => {
			return {
				...prevState,
				[name]: value
			};
		});
	};

	// eslint-disable-next-line
	useEffect(() => edit(id, currentItem), [currentItem]);

	return (
		<tr
			style={{ color: 'darkblue' }}
			onMouseOver={() => setEditable(true)}
			onMouseOut={() => setEditable(false)}
		>
			<th style={{ width: '30px' }}>
				<button
					style={{ border: 'none', backgroundColor: 'transparent' }}
					onClick={() => remove(id)}
				>
					<i className='fa-solid fa-circle-xmark'></i>
				</button>
			</th>
			<th style={{ width: '100px' }}>
				{editable ? (
					<input
						type='number'
						onChange={handleChange}
						value={currentItem.quantity}
						min='1'
						name='quantity'
						style={{
							width: '80px',
							border: '1px solid black'
						}}
					/>
				) : (
					<div>{quantity}</div>
				)}
			</th>
			<th style={{ width: '150px' }}>
				{editable ? (
					<input
						type='text'
						value={currentItem.item}
						name='item'
						onChange={handleChange}
						style={{
							width: '130px',
							border: '1px solid black'
						}}
					/>
				) : (
					<div>{item}</div>
				)}
			</th>
			<th style={{ width: '200px' }}>
				{editable ? (
					<input
						type='text'
						value={currentItem.notes}
						name='notes'
						onChange={handleChange}
						style={{
							width: '180px',
							border: '1px solid black'
						}}
					/>
				) : (
					<div>{notes}</div>
				)}
			</th>
		</tr>
	);
}
