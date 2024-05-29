import React from 'react';
import { Container, Title } from './styled';
import Button from '../ReUsableComponents/IconButton';
import MemberIcon from '@mui/icons-material/PersonOutlineOutlined';
import LabelIcon from '@mui/icons-material/LabelOutlined';
import CheckIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import DateIcon from '@mui/icons-material/ScheduleOutlined';
import AttachmentIcon from '@mui/icons-material/AttachFileOutlined';
import CoverIcon from '@mui/icons-material/TableChartOutlined';
import BasePopover from '../ReUsableComponents/BasePopover';
import MembersPopover from '../Popovers/Members/MembersPopover';
import LabelsPopover from '../Popovers/Labels/LabelsPopover';
import ChecklistPopover from '../Popovers/Checklist/ChecklistPopover';
import DatePopover from '../Popovers/Date/DatePopover';
import AddAttachmentPopover from '../Popovers/Attachment/AddAttachmentPopover';
import CoverPopover from '../Popovers/Cover/CoverPopover';

const AddToCard = () => {
	const [memberPopover, setMemberPopover] = React.useState(null);
	const [labelPopover, setLabelPopover] = React.useState(null);
	const [checklistPopover, setChecklistPopover] = React.useState(null);
	const [datePopover, setDatePopover] = React.useState(null);
	const [attachmentPopover, setAttachmentPopover] = React.useState(null);
	const [coverPopover, setCoverPopover] = React.useState(null);
	const [labelsBackArrow, setLabelsBackArrow] = React.useState(false);
	const [labelsTitle, setLabelsTitle] = React.useState('Labels');
	return (
		<Container>
			<Title></Title>

			<Button
				clickCallback={(event) => setMemberPopover(event.currentTarget)}
				title='Members'
				icon={<MemberIcon fontSize='small' />}
			></Button>
			{memberPopover && (
				<BasePopover
					anchorElement={memberPopover}
					closeCallback={() => {
						setMemberPopover(null);
					}}
					title='Members'
					contents={<MembersPopover />}
				/>
			)}

			
			
		</Container>
	);
};

export default AddToCard;
