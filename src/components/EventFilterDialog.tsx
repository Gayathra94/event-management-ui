import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Grid } from "@mui/material";


interface PaymentSearchProps {
    open: boolean;
    onClose: () => void;
    onApplyFilters: (filters: any) => void;
    onRestFilters: (filters: any) => void;
}

export default function EventFilterDialog({ open, onClose, onApplyFilters, onRestFilters }: PaymentSearchProps) {

    const [localFilters, setLocalFilters] = React.useState({
        hostName: '',
        startTime: null,
        endTime: null,
    });
    React.useEffect(() => {
        if (open) {
            setLocalFilters({ hostName: '', startTime: null, endTime: null });
        }
    }, [open]);

    const handleFilterChange = (key: string, value: any) => {
        setLocalFilters((prev) => ({ ...prev, [key]: value }));
    };

    const applyFilters = () => {
        onApplyFilters(localFilters);
        onClose();
    };

    const resetFilters = () => {
        setLocalFilters({ hostName: '', startTime: null, endTime: null });
        onRestFilters(localFilters)
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Filter Events</DialogTitle>
            <DialogContent>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 12, lg: 12 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 12, lg: 12 }} >
                                <InputLabel >Find by</InputLabel>

                                <TextField fullWidth  variant="outlined" size="small" value={localFilters.hostName}
                                    onChange={(e) => handleFilterChange('hostName', e.target.value)}></TextField>
                            </Grid>

                            <Grid size={{ xs: 12, md: 12, lg: 12 }}>
                                <InputLabel >Start At</InputLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker value={localFilters.startTime} onChange={(date) => handleFilterChange('startTime', date)}
                                        slotProps={{ textField: { id: 'start-date-picker', fullWidth: true, variant: 'outlined', size: 'small' }, }} />
                                </LocalizationProvider>
                            </Grid>
                            <Grid size={{ xs: 12, md: 12, lg: 12 }}>
                                <InputLabel >End at</InputLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker value={localFilters.endTime} onChange={(date) => handleFilterChange('endTime', date)}
                                        slotProps={{ textField: { id: 'end-date-picker', fullWidth: true, variant: 'outlined', size: 'small' }, }} />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" size="small" onClick={resetFilters}> Reset </Button>
                <Button variant="outlined" size="small" onClick={onClose}> Close </Button>
                <Button variant="contained" size="small" onClick={applyFilters}> Apply Filters </Button>
            </DialogActions>
        </Dialog>
    );
}
