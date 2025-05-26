import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ListIcon from '@mui/icons-material/List';
import { IconButton, Tooltip } from '@mui/material';
import { useUser } from '../common/UserContext';
import { useGlobalAlert } from '../common/AlertProvider';
import { attendEvent, deleteEvent } from '../services/event-service';
import type { AxiosError } from 'axios';
import type { AttendanceRequest } from '../model/AttendanceRequest';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const options = ['GOING', 'MAYBE', 'DECLINED'];

export default function AttendButtonGroup(props: { eventId: string; onUpdate : (page: number, size: number) => void }) {


  const { user } = useUser();
  const { showAlert } = useGlobalAlert();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleMenuItemClick = async (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
    setOpen(false);
    try {

      const attendanceRequest: AttendanceRequest = {
        userId: user?.id || "",
        eventId: props.eventId || "",
        status: options[index]
      };

      const response = await attendEvent(attendanceRequest);
      if (response.status == 200) {
        showAlert(`Attendance updated successfully!` , "success")
        props.onUpdate(1,2);
      }
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage = error.response?.data || 'Something went wrong.';
      showAlert(`${errorMessage}`, "error")
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup size='small' ref={anchorRef}  >
        <Tooltip title="Attendance">
          <IconButton sx={{margin:'0', padding:'0'}} onClick={handleToggle} color='secondary'>
            <EmojiPeopleIcon />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
      <Popper sx={{ zIndex: 1 }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal  >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}>
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
