import React from 'react';
import { Container, ButtonContainer } from './styled';
import MenuButton from './MenuButton';
import { Hr } from '../../styled';
import BoardIcon from '@mui/icons-material/Dashboard';
import BackgroundIcon from '@mui/icons-material/Wallpaper';
import ActivitySection from './ActivitySection/ActivitySection';
const MainMenu = (props) => {
	return (
		<Container>
			<ButtonContainer>
				<MenuButton
					icon={<BoardIcon fontSize='small' color='inherit'/>}
					title='About this Task'
					description='Add a description to your Task'
					clickCallback={()=>props.menuCallback('About this Task')}
				/>
				<MenuButton
					icon={<BackgroundIcon fontSize='small' color='inherit'/>}
					title='Change background'
					description='Change the background of your task'
					clickCallback={()=>props.menuCallback('Change background')}
				/>
			</ButtonContainer>
			<Hr />
			<ActivitySection />
		</Container>
	);
};

export default MainMenu;
