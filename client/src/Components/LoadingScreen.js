import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import styled from 'styled-components';
const Icon = styled.img`
	width: 10vw;
`;

export default function LoadingScreen() {
	const [open] = React.useState(true);
	/*  const handleClose = () => {
    setOpen(false);
  }; */
	return (
		<div>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
				//onClick={handleClose}
			>
				<Icon src='https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWVqd215MnppbmMzZGw0Y3pybWFyeTI4N3lyYmxrM2ZvMDUyY3ExNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/HZnlkt4Zr5HH6YlkeX/giphy_s.gif' />
			</Backdrop>
		</div>
	);
}
